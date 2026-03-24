import { Button } from "antd";
import { useLocalStore } from "hooks/useLocalStore";
import { observer } from "mobx-react-lite";
import { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { FIELD_LABELS, ITEM_CATEGORIES, Meta, REQUIRED_FIELDS_BY_CATEGORY } from "shared/consts";
import ItemStore from "store/ItemStore";
import './AdDetail.css'
import img from 'App/assets/placeholder-image.png'
import Charateristic from "./components/Characteristic";
import { routes } from "config/routes";
import { formatDate } from "utils/index";
import RevisionBanner from "./components/RevisionBanner";

const AdDetail = observer(() => {
    const store = useLocalStore(() => new ItemStore())
    const { id } = useParams()
    const navigate = useNavigate()
    const item = store.item

    useEffect(() => {
        if (id) store.fetchItemDetail(id)
    }, [store, id])

    const getMissingFields = useCallback(() => {
        if (!item) return []
        const missing: string[] = []

        if (!item.description || item.description.trim() === "") {
            missing.push(FIELD_LABELS.description);
        }

        const fieldsToCheck = REQUIRED_FIELDS_BY_CATEGORY[item.category] || []

        fieldsToCheck.forEach((fieldName) => {
            const value = (item.params as any)[fieldName]

            if (value === undefined || value === null || value === "") {
                missing.push(FIELD_LABELS[fieldName] || fieldName)
            }
        })

        return missing
    }, [item])

    if (store.meta === Meta.Loading) return <div>Loading...</div>
    if (!item) return null

    const missingFields = getMissingFields()

    return (
        <main className="ad-main">
            <div className="ad-detail">
                <div className="top-container">
                    <div className="info main-info">
                        <h2 className="ad-detail-title">{item.title}</h2>
                        <p className="ad-detail-price">{item.price?.toLocaleString()} ₽</p>
                    </div>
                    <div className="info">
                        <Button type="primary" onClick={() => navigate(routes.edit.create(item.id.toString()))}>
                            Редактировать
                        </Button>
                        <div className="dates">
                            <p>Опубликовано: {formatDate(item.createdAt)}</p>
                            <p>Отредактировано: {formatDate(item.updatedAt)}</p>
                        </div>
                    </div>
                </div>

                <div className="ad-info">
                    <img className="ad-detail-img" src={img} alt={item.title} />
                    <div className="ad-characters">
                        {item.needsRevision && missingFields.length > 0 && (
                            <RevisionBanner missingFields={missingFields} />
                        )}
                        <div className="characters">
                            <h3 className="ad-detail-subtitle">Характеристики</h3>
                            <div className="characters-list">
                                {item.category === ITEM_CATEGORIES.AUTO && (
                                    <>
                                        {item.params.brand && <Charateristic name="Бренд" value={item.params.brand} />}
                                        {item.params.model && <Charateristic name="Модель" value={item.params.model} />}
                                        {item.params.yearOfManufacture && <Charateristic name="Год изготовления" value={item.params.yearOfManufacture.toString()} />}
                                        {item.params.transmission && <Charateristic name="Трансмиссия" value={item.params.transmission} />}
                                        {item.params.mileage && <Charateristic name="Пробег" value={item.params.mileage.toString()} />}
                                        {item.params.enginePower && <Charateristic name="Мощность" value={item.params.enginePower.toString()} />}
                                    </>
                                )}
                                {item.category === ITEM_CATEGORIES.ELECTRONICS && (
                                    <>
                                        {item.params.type && <Charateristic name="Тип" value={item.params.type} />}
                                        {item.params.brand && <Charateristic name="Бренд" value={item.params.brand} />}
                                        {item.params.model && <Charateristic name="Модель" value={item.params.model} />}
                                        {item.params.condition && <Charateristic name="Состояние" value={item.params.condition} />}
                                        {item.params.color && <Charateristic name="Цвет" value={item.params.color} />}
                                    </>
                                )}
                                {item.category === ITEM_CATEGORIES.REAL_ESTATE && (
                                    <>
                                        {item.params.type && <Charateristic name="Тип" value={item.params.type} />}
                                        {item.params.address && <Charateristic name="Адрес" value={item.params.address} />}
                                        {item.params.area && <Charateristic name="Площадь" value={item.params.area.toString()} />}
                                        {item.params.floor && <Charateristic name="Этаж" value={item.params.floor.toString()} />}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="ad-detail-descr">
                    <h3 className="ad-detail-subtitle">Описание</h3>
                    <p className={!item.description ? "no-descr" : ""}>
                        {item.description || "Отсутствует"}
                    </p>
                </div>
            </div>
        </main>
    );
});

export default AdDetail;