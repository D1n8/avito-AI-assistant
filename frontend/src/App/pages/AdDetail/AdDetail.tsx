import { Button } from "antd";
import { useLocalStore } from "hooks/useLocalStore";
import { observer } from "mobx-react-lite";
import { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { FIELD_LABELS, VALUE_LABELS, ITEM_CATEGORIES, Meta, REQUIRED_FIELDS_BY_CATEGORY } from "shared/consts";
import ItemStore from "store/ItemStore";
import './AdDetail.css'
import { ArrowLeftOutlined } from '@ant-design/icons'
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
                    <div className="main-info">
                        <ArrowLeftOutlined
                            style={{ fontSize: 20, cursor: "pointer" }}
                            onClick={() => navigate(routes.list.mask)} />

                        <div className="info">
                            <h2 className="ad-detail-title">{item.title}</h2>
                            <p className="ad-detail-price">{item.price?.toLocaleString()} ₽</p>
                        </div>
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
                                        {item.params.brand && <Charateristic name={FIELD_LABELS.brand} value={item.params.brand} />}
                                        {item.params.model && <Charateristic name={FIELD_LABELS.model} value={item.params.model} />}
                                        {item.params.yearOfManufacture && <Charateristic name={FIELD_LABELS.yearOfManufacture} value={item.params.yearOfManufacture.toString()} />}
                                        {item.params.transmission && <Charateristic name={FIELD_LABELS.transmission} value={VALUE_LABELS.transmission[item.params.transmission]} />}
                                        {item.params.mileage && <Charateristic name={FIELD_LABELS.mileage} value={item.params.mileage.toString()} />}
                                        {item.params.enginePower && <Charateristic name={FIELD_LABELS.enginePower} value={item.params.enginePower.toString()} />}
                                    </>
                                )}

                                {item.category === ITEM_CATEGORIES.ELECTRONICS && (
                                    <>
                                        {item.params.type && <Charateristic name={FIELD_LABELS.type} value={VALUE_LABELS.electronicsType[item.params.type]} />}
                                        {item.params.brand && <Charateristic name={FIELD_LABELS.brand} value={item.params.brand} />}
                                        {item.params.model && <Charateristic name={FIELD_LABELS.model} value={item.params.model} />}
                                        {item.params.condition && <Charateristic name={FIELD_LABELS.condition} value={VALUE_LABELS.condition[item.params.condition]} />}
                                        {item.params.color && <Charateristic name={FIELD_LABELS.color} value={item.params.color} />}
                                    </>
                                )}

                                {item.category === ITEM_CATEGORIES.REAL_ESTATE && (
                                    <>
                                        {item.params.type && <Charateristic name={FIELD_LABELS.type} value={VALUE_LABELS.realEstateType[item.params.type]} />}
                                        {item.params.address && <Charateristic name={FIELD_LABELS.address} value={item.params.address} />}
                                        {item.params.area && <Charateristic name={FIELD_LABELS.area} value={item.params.area.toString()} />}
                                        {item.params.floor && <Charateristic name={FIELD_LABELS.floor} value={item.params.floor.toString()} />}
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