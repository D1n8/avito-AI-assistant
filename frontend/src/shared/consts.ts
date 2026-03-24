export enum ITEM_CATEGORIES {
  AUTO = 'auto',
  REAL_ESTATE = 'real_estate',
  ELECTRONICS = 'electronics',
}

export enum Meta {
  Initial = 'initial',
  Loading = 'loading',
  Error = 'error',
  Success = 'success'
}

export const FIELD_LABELS: Record<string, string> = {
    brand: "Бренд",
    model: "Модель",
    yearOfManufacture: "Год изготовления",
    transmission: "Трансмиссия",
    mileage: "Пробег",
    enginePower: "Мощность",
    type: "Тип",
    address: "Адрес",
    area: "Площадь",
    floor: "Этаж",
    condition: "Состояние",
    color: "Цвет",
    description: "Описание",
};


export const REQUIRED_FIELDS_BY_CATEGORY: Record<string, string[]> = {
    [ITEM_CATEGORIES.AUTO]: [
        'brand', 'model', 'yearOfManufacture', 'transmission', 'mileage', 'enginePower'
    ],
    [ITEM_CATEGORIES.REAL_ESTATE]: [
        'type', 'address', 'area', 'floor'
    ],
    [ITEM_CATEGORIES.ELECTRONICS]: [
        'type', 'brand', 'model', 'condition', 'color'
    ],
};