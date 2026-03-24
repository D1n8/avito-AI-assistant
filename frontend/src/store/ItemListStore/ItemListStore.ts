import { BASE_URL } from "App/consts";
import axios from "axios";
import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { Meta } from "shared/consts";
import type { ItemList, ItemSortColumn, SortDirection } from "store/models/item";

type PrivateFields = '_list' | '_meta' | '_total' | '_sortColumn' | '_sortDirection' | '_q' | '_categories' | '_needsRevision' | '_limit' | '_skip'

export default class ItemListStore {
    private _list: ItemList[] = []
    private _meta: Meta = Meta.Initial
    private _total: number = 0
    private _q: string = ''
    private _sortColumn: ItemSortColumn = 'createdAt'
    private _sortDirection: SortDirection = 'desc'
    private _categories: string[] = []
    private _needsRevision: boolean = false
    private _limit = 10
    private _skip = 0

    constructor() {
        makeObservable<ItemListStore, PrivateFields>(this, {
            _list: observable,
            _meta: observable,
            _total: observable,
            _sortColumn: observable,
            _sortDirection: observable,
            _q: observable,
            _categories: observable,
            _needsRevision: observable,
            _limit: observable,
            _skip: observable,
            list: computed,
            meta: computed,
            total: computed,
            sortColumn: computed,
            sortDirection: computed,
            categories: computed,
            needsRevision: computed,
            setPage: action,
            setSearchQuery: action,
            setSorting: action,
            fetchItemList: action
        })
    }

    get list() { return this._list }
    get meta() { return this._meta }
    get total() { return this._total }
    get sortColumn() { return this._sortColumn }
    get sortDirection() { return this._sortDirection }
    get categories() { return this._categories }
    get needsRevision() { return this._needsRevision }

    get currentPage() {
        return Math.floor(this._skip / this._limit) + 1
    }

    setPage(page: number) {
        this._skip = (page - 1) * this._limit;
        this.fetchItemList();
    }

    setSearchQuery(q: string) {
        this._q = q;
        this.fetchItemList();
    }

    setSorting(column: ItemSortColumn, direction: SortDirection) {
        this._sortColumn = column
        this._sortDirection = direction
        this.fetchItemList()
    }

    toggleCategory(category: string) {
        const index = this._categories.indexOf(category);
        if (index === -1) {
            this._categories.push(category);
        } else {
            this._categories.splice(index, 1);
        }
        this.fetchItemList();
    }

    setNeedsRevision(val: boolean) {
        this._needsRevision = val;
        this.fetchItemList();
    }

    resetFilters() {
        this._categories = [];
        this._needsRevision = false;
        this._q = '';
        this.fetchItemList();
    }

    async fetchItemList() {
        try {
            this._meta = Meta.Loading
            const response = await axios.get(`${BASE_URL}/items`, {
                params: {
                    sortColumn: this._sortColumn,
                    sortDirection: this._sortDirection,
                    q: this._q,
                    needsRevision: this._needsRevision || undefined,
                    categories: this._categories.length > 0 ? this._categories.join(',') : undefined,
                    limit: this._limit,
                    skip: this._skip
                }
            });

            runInAction(() => {
                this._list = response.data.items
                this._total = response.data.total
                this._meta = Meta.Success
            });
        } catch {
            runInAction(() => {
                this._list = []
                this._total = 0
                this._meta = Meta.Error
            });
        }
    }

    destroy() {
        this._list = []
        this._q = ''
        this._meta = Meta.Initial
    }
}