import { Button, Input, Select, App, Skeleton, Typography } from 'antd';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useStore } from 'store/RootStore/RootStore';
import { CATEGORY_LABELS, FIELD_LABELS, ITEM_CATEGORIES, Meta, VALUE_LABELS } from 'shared/consts';
import Clear from 'components/Icons/Clear';
import { BulbOutlined, CheckOutlined } from '@ant-design/icons';
import './AdEdit.css';
import CharInput from './components/CharInput';
import CharSelect from './components/CharSelect';

const { TextArea } = Input;
const { Text } = Typography;

const AdEdit = observer(() => {
    const { itemStore, itemEditStore } = useStore()
    const { id } = useParams()
    const navigate = useNavigate()
    const { message } = App.useApp()

    const [touched, setTouched] = useState<Record<string, boolean>>({})
    const [aiDescription, setAiDescription] = useState<string | null>(null)
    const [aiPrice, setAiPrice] = useState<number | null>(null)

    useEffect(() => {
        if (id) itemStore.fetchItemDetail(id)
    }, [id, itemStore])

    useEffect(() => {
        if (itemStore.meta === Meta.Success && itemStore.item) {
            itemEditStore.setInitialData(itemStore.item)
        }
    }, [itemStore.item, itemStore.meta, itemEditStore])

    const handleSave = async () => {
        const success = await itemEditStore.saveItem()
        if (success) {
            message.success('Объявление сохранено')
            navigate(`/ads/${id}`)
        } else {
            message.error('Ошибка сохранения')
        }
    }

    const getStatus = (value: any, mandatory: boolean, name: string) => {
        if (mandatory && !value && touched[name]) return 'error'
        if (!mandatory && !value) return 'warning'
        return undefined
    }

    const onGetAiPrice = async () => {
        const price = await itemEditStore.getMarketPrice()
        if (price) setAiPrice(price)
    }

    const onGenerateAiDescription = async () => {
        const desc = await itemEditStore.generateDescription()
        if (desc) setAiDescription(desc)
    }

    if (itemStore.meta === Meta.Loading || !itemEditStore.formData.id) return <Skeleton active />

    const { formData } = itemEditStore
    const isSaveDisabled = !formData.title || !formData.price || formData.price <= 0

    return (
        <main className="edit-main">
            <h2>Редактирование объявления</h2>

            <div className='edit-block'>
                <div className="input-container">
                    <label className='edit-label mandatory'>{FIELD_LABELS.category}</label>
                    <Select
                        className="full-width"
                        style={{ width: 456 }}
                        value={formData.category}
                        onChange={(val) => itemEditStore.updateField('category', val)}
                        options={Object.entries(CATEGORY_LABELS).map(([value, label]) => ({ value, label }))}
                    />
                </div>
            </div>

            <div className='edit-block'>
                <div className="input-container">
                    <label className='edit-label mandatory'>Название</label>
                    <Input
                        status={getStatus(formData.title, true, 'title')}
                        style={{ width: 456 }}
                        value={formData.title}
                        onChange={(e) => itemEditStore.updateField('title', e.target.value)}
                        onBlur={() => setTouched(p => ({ ...p, title: true }))}
                        allowClear={{ clearIcon: <Clear /> }}
                    />
                    {!formData.title && touched.title && <Text type="danger">Обязательное поле</Text>}
                </div>
            </div>

            <div className="edit-block">
                <div className="input-container">
                    <label className='edit-label mandatory'>Цена</label>
                    <div className="price-container">
                        <Input
                            type="number"
                            style={{ width: 456 }}
                            status={getStatus(formData.price, true, 'price')}
                            value={formData.price}
                            onChange={(e) => itemEditStore.updateField('price', Number(e.target.value))}
                            onBlur={() => setTouched(p => ({ ...p, price: true }))}
                            allowClear={{ clearIcon: <Clear /> }}
                        />
                        <Button
                            className="ai-btn-secondary"
                            icon={<BulbOutlined />}
                            onClick={onGetAiPrice}>
                            Узнать рыночную цену
                        </Button>
                    </div>


                    {aiPrice && (
                        <div className="ai-suggestion">
                            AI рекомендует: <b>{aiPrice} ₽</b>
                            <Button
                                type="link"
                                size="small"
                                onClick={() => { itemEditStore.updateField('price', aiPrice); setAiPrice(null); }}
                            >Применить</Button>
                        </div>
                    )}
                </div>
            </div>

            <div className="edit-block">
                <label className='edit-label'>Характеристики</label>
                <div className='edit-charaters-container'>

                    {formData.category === ITEM_CATEGORIES.AUTO && (
                        <div className="char-grid">
                            <CharInput name="brand" store={itemEditStore} />
                            <CharInput name="model" store={itemEditStore} />
                            <CharInput name="yearOfManufacture" store={itemEditStore} type="number" />
                            <CharSelect name="transmission" store={itemEditStore} optionsMap={VALUE_LABELS.transmission} />
                            <CharInput name="mileage" store={itemEditStore} type="number" />
                            <CharInput name="enginePower" store={itemEditStore} type="number" />
                        </div>
                    )}

                    {formData.category === ITEM_CATEGORIES.ELECTRONICS && (
                        <div className="char-grid">
                            <CharSelect name="type" store={itemEditStore} optionsMap={VALUE_LABELS.electronicsType} />
                            <CharInput name="brand" store={itemEditStore} />
                            <CharInput name="model" store={itemEditStore} />
                            <CharSelect name="condition" store={itemEditStore} optionsMap={VALUE_LABELS.condition} />
                            <CharInput name="color" store={itemEditStore} />
                        </div>
                    )}

                    {formData.category === ITEM_CATEGORIES.REAL_ESTATE && (
                        <div className="char-grid">
                            <CharSelect name="type" store={itemEditStore} optionsMap={VALUE_LABELS.realEstateType} />
                            <CharInput name="address" store={itemEditStore} />
                            <CharInput name="area" store={itemEditStore} type="number" />
                            <CharInput name="floor" store={itemEditStore} type="number" />
                        </div>
                    )}
                </div>
            </div>

            <div className="edit-block no-border">
                <div className="input-container descr-input-container">
                    <label className='edit-label'>Описание</label>
                    <TextArea
                        status={getStatus(formData.description, false, 'description')}
                        value={formData.description}
                        onChange={(e) => itemEditStore.updateField('description', e.target.value)}
                        showCount
                        maxLength={1000}
                        rows={4}
                    />
                    <Button
                        className="ai-btn-text"
                        type="text"
                        icon={<BulbOutlined />}
                        onClick={onGenerateAiDescription}
                        loading={itemEditStore.aiLoading}
                    >
                        Улучшить описание
                    </Button>
                    {aiDescription && (
                        <div className="ai-suggestion-box">
                            <p>{aiDescription}</p>
                            <Button
                                type="primary"
                                size="small"
                                icon={<CheckOutlined />}
                                onClick={() => { itemEditStore.updateField('description', aiDescription); setAiDescription(null); }}>
                                Применить
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            <div className="edit-btns-container">
                <Button
                    type='primary'
                    onClick={handleSave}
                    disabled={isSaveDisabled}
                    loading={itemEditStore.meta === Meta.Loading}>
                    Сохранить
                </Button>
                <Button onClick={() => navigate(-1)}>Отменить</Button>
            </div>
        </main>
    );
});

export default AdEdit;