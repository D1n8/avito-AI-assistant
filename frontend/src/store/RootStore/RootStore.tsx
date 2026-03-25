import ItemStore from "../ItemStore";
import ItemEditStore from "../ItemEditStore";
import ItemListStore from "../ItemListStore";
import ThemeStore from "../ThemeStore";

export default class RootStore {
    itemStore: ItemStore;
    itemEditStore: ItemEditStore;
    itemListStore: ItemListStore;
    themeStore: ThemeStore;

    constructor() {
        this.itemStore = new ItemStore();
        this.itemEditStore = new ItemEditStore();
        this.itemListStore = new ItemListStore();
        this.themeStore = new ThemeStore();
    }
}

import { createContext, useContext } from "react";
export const RootStoreContext = createContext<RootStore | null>(null);

export const useStore = () => {
    const context = useContext(RootStoreContext);
    if (!context) throw new Error("useStore must be used within RootStoreContext");
    return context;
};