import { makeObservable, observable } from "mobx";
import type { ItemSortColumn, SortDirection } from "store/models/item";

type PrivateFields = '_list'

export default class ItemListStore {
    private _list = []
    private _sortDirection: SortDirection | null = null
    private _itemSortColumn: ItemSortColumn | null = null
    private _categories: string[] = []

    constructor() {
        makeObservable<ItemListStore, PrivateFields>(this, {
            _list: observable
        })
    }

    get list() {
        return this._list
    }
}