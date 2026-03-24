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
    title: "Название",
    description: "Описание",
    price: "Цена",
    category: "Категория",
    
    brand: "Бренд",
    model: "Модель",
    yearOfManufacture: "Год изготовления",
    transmission: "Трансмиссия",
    mileage: "Пробег",
    enginePower: "Мощность",
    
    type: "Тип",
    condition: "Состояние",
    color: "Цвет",
    address: "Адрес",
    area: "Площадь",
    floor: "Этаж"
};

export const CATEGORY_LABELS: Record<string, string> = {
    [ITEM_CATEGORIES.AUTO]: 'Транспорт',
    [ITEM_CATEGORIES.ELECTRONICS]: 'Электроника',
    [ITEM_CATEGORIES.REAL_ESTATE]: 'Недвижимость',
};

export const VALUE_LABELS = {
    transmission: {
        manual: 'Механика',
        automatic: 'Автомат'
    },
    condition: {
        new: 'Новое',
        used: 'Б/у'
    },
    electronicsType: {
        phone: 'Телефон',
        laptop: 'Ноутбук',
        misc: 'Другое'
    },
    realEstateType: {
        flat: 'Квартира',
        house: 'Дом',
        room: 'Комната'
    }
} as const;

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