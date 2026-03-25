import { BASE_URL } from "App/consts";
import axios from "axios";
import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { Meta } from "shared/consts";
import type { ItemDetail } from "store/models/item";

type PrivateFields = '_item' | '_meta'

export default class ItemStore {
    private _item: ItemDetail | null = null
    private _meta: Meta = Meta.Initial

    constructor() {
        makeObservable<ItemStore, PrivateFields>(this, {
            _item: observable,
            _meta: observable,
            item: computed,
            meta: computed,
            fetchItemDetail: action
        })
    }

    get item() {
        return this._item
    }

    get meta() {
        return this._meta
    }

    async fetchItemDetail(id: string) {
        try {
            this._meta = Meta.Loading
    
            const response = await axios({
                method: 'GET',
                url: `${BASE_URL}/items/${id}`
            })

            runInAction(() => {
                this._item = response.data
                this._meta = Meta.Success
            })
        } catch {
            this._meta = Meta.Error
        }   
    }

    destroy() {
        this._item = null
    }
}