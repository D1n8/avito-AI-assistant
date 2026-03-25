import { ITEM_CATEGORIES } from "shared/consts";

export interface BaseItem {
  id: number;
  title: string;
  description?: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  needsRevision: boolean;
}

export interface AutoItem extends BaseItem {
  category: ITEM_CATEGORIES.AUTO;
  params: AutoItemParams;
}

export interface RealEstateItem extends BaseItem {
  category: ITEM_CATEGORIES.REAL_ESTATE;
  params: RealEstateItemParams;
}

export interface ElectronicsItem extends BaseItem {
  category: ITEM_CATEGORIES.ELECTRONICS;
  params: ElectronicsItemParams;
}

export type ItemDetail = AutoItem | RealEstateItem | ElectronicsItem;

export type ItemList = {
  id: number,
  category: ITEM_CATEGORIES;
  title: string;
  price: number;
  // Требуются ли доработки
  needsRevision: boolean;
}

type AutoItemParams = {
  brand?: string;
  model?: string;
  yearOfManufacture?: number;
  transmission?: 'automatic' | 'manual';
  mileage?: number;
  enginePower?: number;
};

type RealEstateItemParams = {
  type?: 'flat' | 'house' | 'room';
  address?: string;
  area?: number;
  floor?: number;
};

type ElectronicsItemParams = {
  type?: 'phone' | 'laptop' | 'misc';
  brand?: string;
  model?: string;
  condition?: 'new' | 'used';
  color?: string;
};

export type ItemSortColumn = Extract<keyof BaseItem, 'title' | 'createdAt'>;

export type SortDirection = 'asc' | 'desc';

export type ViewMode = 'grid' | 'list'