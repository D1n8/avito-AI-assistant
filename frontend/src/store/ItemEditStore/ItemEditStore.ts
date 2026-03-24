import { action, computed, makeObservable, observable, runInAction, toJS } from "mobx";
import axios from "axios";
import { BASE_URL } from "App/consts";
import type { ItemDetail } from "store/models/item";
import { ITEM_CATEGORIES, Meta } from "shared/consts";

type PrivateFields = '_formData' | '_meta' | '_aiLoading'

export default class ItemEditStore {
    private _formData: Partial<ItemDetail> = {}
    private _meta: Meta = Meta.Initial
    private _aiLoading = false

    constructor() {
        makeObservable<ItemEditStore, PrivateFields>(this, {
            _formData: observable,
            _meta: observable,
            _aiLoading: observable,
            meta: computed,
            formData: computed,
            aiLoading: computed,
            saveItem: action,
            setInitialData: action,
            updateField: action,
            updateParam: action,
        })
    }

    get meta() { return this._meta }
    get formData() { return this._formData }
    get aiLoading() { return this._aiLoading }

    setInitialData(item: ItemDetail) {
        const savedDraft = localStorage.getItem(`draft_${item.id}`);
        if (savedDraft) {
            this._formData = JSON.parse(savedDraft);
        } else {
            this._formData = JSON.parse(JSON.stringify(item));
        }
    }

    updateField = (key: keyof ItemDetail, value: any) => {
        this._formData = { ...this._formData, [key]: value };
        this.saveToLocalStorage();
    };

    updateParam = (key: string, value: any) => {
        if (!this._formData.params) this._formData.params = {};
        this._formData.params = { ...this._formData.params, [key]: value };
        this.saveToLocalStorage();
    };

    async saveItem() {
        if (!this._formData.id) return false;
        this._meta = Meta.Loading;

        const rawData = toJS(this._formData) as ItemDetail;
        let cleanParams = { ...rawData.params };

        switch (rawData.category) {
            case ITEM_CATEGORIES.AUTO:
                cleanParams = {
                    ...rawData.params,
                    yearOfManufacture: rawData.params.yearOfManufacture ? Number(rawData.params.yearOfManufacture) : undefined,
                    mileage: rawData.params.mileage ? Number(rawData.params.mileage) : undefined,
                    enginePower: rawData.params.enginePower ? Number(rawData.params.enginePower) : undefined,
                };
                break;
            case ITEM_CATEGORIES.REAL_ESTATE:
                cleanParams = {
                    ...rawData.params,
                    area: rawData.params.area ? Number(rawData.params.area) : undefined,
                    floor: rawData.params.floor ? Number(rawData.params.floor) : undefined,
                };
                break;
            case ITEM_CATEGORIES.ELECTRONICS:
                cleanParams = { ...rawData.params };
                break;
        }

        const payload = {
            title: rawData.title,
            price: Number(rawData.price),
            description: rawData.description || '',
            category: rawData.category,
            params: cleanParams
        };

        console.log("Payload to server:", payload);

        try {
            await axios.put(`${BASE_URL}/items/${rawData.id}`, payload);
            runInAction(() => {
                this._meta = Meta.Success;
            });
            localStorage.removeItem(`draft_${rawData.id}`);
            return true;
        } catch (e: any) {
            console.error("Save error:", e.response?.data || e.message);
            runInAction(() => {
                this._meta = Meta.Error;
            });
            return false;
        }
    }

    async improveDescription() {
        this._aiLoading = true;
        try {
            const res = await axios.post('http://localhost:11434/api/generate', {
                model: 'llama3',
                prompt: `Напиши привлекательное описание для объявления на Авито. 
                         Товар: ${this._formData.title}. 
                         Текущее описание: ${this._formData.description || 'отсутствует'}.
                         Ответь только текстом нового описания.`,
                stream: false
            });

            return res.data.response;
        } finally {
            runInAction(() => this._aiLoading = false);
        }
    }

    async getMarketPrice() {
        this._aiLoading = true;
        try {
            const res = await axios.post('http://localhost:11434/api/generate', {
                model: 'llama3',
                prompt: `Назови только число (рыночную цену в рублях) для товара: ${this._formData.title}. 
                         Характеристики: ${JSON.stringify(this._formData.params)}. 
                         Ответь только одним числом.`,
                stream: false
            });
            return parseInt(res.data.response.replace(/\D/g, ''));
        } finally {
            runInAction(() => { this._aiLoading = false; });
        }
    }

    async generateDescription() {
        this._aiLoading = true;
        try {
            const res = await axios.post('http://localhost:11434/api/generate', {
                model: 'llama3',
                prompt: `Напиши продающее описание для Авито. Товар: ${this._formData.title}. 
                         Характеристики: ${JSON.stringify(this._formData.params)}. 
                         Текст должен быть на русском языке.`,
                stream: false
            });
            return res.data.response;
        } finally {
            runInAction(() => { this._aiLoading = false; });
        }
    }

    private saveToLocalStorage() {
        localStorage.setItem(`draft_${this._formData.id}`, JSON.stringify(this._formData));
    }

    destroy() {
    }
}