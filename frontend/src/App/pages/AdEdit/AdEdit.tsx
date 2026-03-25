import { Button, Input, Select, App, Typography } from 'antd';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useStore } from 'store/RootStore/RootStore';
import { CATEGORY_LABELS, FIELD_LABELS, ITEM_CATEGORIES, Meta, VALUE_LABELS } from 'shared/consts';
import Clear from 'components/Icons/Clear';
import { BulbOutlined, LoadingOutlined, SyncOutlined } from '@ant-design/icons';
import './AdEdit.css';
import CharInput from './components/CharInput';
import CharSelect from './components/CharSelect';
import BubbleModal from './components/BubbleModal';
import type { AiStatus } from 'shared/types';
import SkeletonAdDetail from './components/SkeletonAdEdit';

const { TextArea } = Input
const { Text } = Typography

const AdEdit = observer(() => {
    const { itemStore, itemEditStore } = useStore()
    const { id } = useParams()
    const navigate = useNavigate()
    const { message } = App.useApp()

    const [touched, setTouched] = useState<Record<string, boolean>>({})

    const [priceAiStatus, setPriceAiStatus] = useState<AiStatus>('idle')
    const [aiPriceText, setAiPriceText] = useState<string | null>(null)

    const [descAiStatus, setDescAiStatus] = useState<AiStatus>('idle')
    const [aiDescText, setAiDescText] = useState<string | null>(null)

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
        setPriceAiStatus('loading');
        try {
            const result = await itemEditStore.getMarketPrice()
            if (result) {
                setAiPriceText(String(result));
                setPriceAiStatus('success');
            } else {
                setPriceAiStatus('error');
            }
        } catch {
            setPriceAiStatus('error');
        }
    };

    const applyAiPrice = () => {
        if (aiPriceText) {
            const price = parseInt(aiPriceText.replace(/\s/g, '').match(/\d+/)?.[0] || '0');
            itemEditStore.updateField('price', price);
            setPriceAiStatus('idle');
        }
    }

    const onGetAiDescription = async () => {
        setDescAiStatus('loading');
        try {
            const result = await itemEditStore.generateDescription();
            if (result) {
                setAiDescText(result);
                setDescAiStatus('success');
            } else {
                setDescAiStatus('error');
            }
        } catch {
            setDescAiStatus('error');
        }
    };

    if (itemStore.meta === Meta.Loading || !itemEditStore.formData.id) {
        return (<SkeletonAdDetail />)
    }

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
                            value={formData.price}
                            onChange={(e) => itemEditStore.updateField('price', Number(e.target.value))}
                            allowClear={{ clearIcon: <Clear /> }}
                        />
                        <div className="ai-wrapper">
                            <Button
                                className={priceAiStatus === 'idle' ? "ai-btn-secondary" : "ai-btn-active"}
                                icon={priceAiStatus === 'loading' ? <LoadingOutlined /> : (priceAiStatus === 'idle' ? <BulbOutlined /> : <SyncOutlined />)}
                                onClick={onGetAiPrice}
                                loading={priceAiStatus === 'loading'}
                            >
                                {priceAiStatus === 'idle' ? 'Узнать рыночную цену' :
                                    priceAiStatus === 'loading' ? 'Выполняется запрос' : 'Повторить запрос'}
                            </Button>

                            <BubbleModal
                                text={aiPriceText}
                                onApply={applyAiPrice}
                                onClose={() => setPriceAiStatus('idle')}
                                status={priceAiStatus} />
                        </div>
                    </div>
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
                        value={formData.description}
                        onChange={(e) => itemEditStore.updateField('description', e.target.value)}
                        showCount
                        maxLength={1000}
                        rows={4}
                    />

                    <div className="ai-wrapper" style={{ marginTop: 12 }}>
                        <Button
                            className={descAiStatus === 'idle' ? "ai-btn-text" : "ai-btn-active"}
                            icon={descAiStatus === 'loading' ? <LoadingOutlined /> : (descAiStatus === 'idle' ? <BulbOutlined /> : <SyncOutlined />)}
                            onClick={onGetAiDescription}
                        >
                            {descAiStatus === 'loading' ? 'Выполняется запрос' :
                                descAiStatus !== 'idle' ? 'Повторить запрос' :
                                    (formData.description ? 'Улучшить описание' : 'Придумать описание')}
                        </Button>

                        <BubbleModal
                            text={aiDescText}
                            onApply={() => { itemEditStore.updateField('description', aiDescText!); setDescAiStatus('idle'); }}
                            onClose={() => setDescAiStatus('idle')}
                            status={descAiStatus} />

                    </div>
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