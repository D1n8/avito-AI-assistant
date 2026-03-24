import { Button, Input, message, Skeleton } from 'antd';
import './AdEdit.css'
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ITEM_CATEGORIES, Meta } from 'shared/consts';
import { observer } from 'mobx-react-lite';
import Clear from 'components/Icons/Clear';
import TextArea from 'antd/es/input/TextArea';
import { useStore } from 'store/RootStore/RootStore';

const AdEdit = observer(() => {
    const { itemStore, itemEditStore } = useStore()
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (id)
            itemStore.fetchItemDetail(id)
    }, [itemStore, id])

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
            message.error('Ошибка при сохранении')
        }
    }

    // const handleAiImprove = async () => {
    //     const newDescription = await itemEditStore.improveDescription()
    //     if (newDescription) {
    //         itemEditStore.updateField('description', newDescription)
    //     }
    // }

    if (itemStore.meta === Meta.Loading) return <Skeleton active />

    const { formData } = itemEditStore

    return (
        <main className="edit-main">
            <h2>Редактирование объявления</h2>

            <div className='edit-category'>

            </div>

            <div className='edit-block edit-title'>
                <div className="input-container">
                    <label className='edit-label' htmlFor="title">Название</label>
                    <Input
                        name='title'
                        value={formData.title || ''}
                        onChange={(e) => itemEditStore.updateField('title', e.target.value)}
                        placeholder={formData.title}
                        allowClear={{ clearIcon: <Clear /> }} />
                </div>
            </div>

            <div className="edit-block edit-price">
                <div className="input-container">
                    <label className='edit-label' htmlFor="price">Цена</label>
                    <Input
                        name='price'
                        type="number"
                        value={formData.price}
                        onChange={(e) => itemEditStore.updateField('price', Number(e.target.value))}
                        placeholder='Цена' allowClear={{ clearIcon: <Clear /> }} />
                </div>
            </div>

            <div className="edit-block input-container">
                <label className='edit-label' htmlFor="edit-charaters-container">Характеристики</label>
                <div className='edit-charaters-container' id='edit-charaters-container'>
                    {
                        formData.category == ITEM_CATEGORIES.AUTO &&
                        <>
                            <div className="input-container characters-input">
                                <label htmlFor="brand">Бренд</label>
                                <Input name='brand'
                                    value={formData.params?.brand}
                                    onChange={(e) => itemEditStore.updateParam('brand', e.target.value)}
                                    placeholder='Бренд'
                                    allowClear={{ clearIcon: <Clear /> }} />
                            </div>
                            <div className="input-container characters-input">
                                <label htmlFor="model">Модель</label>
                                <Input name='model'
                                    value={formData.params?.model}
                                    onChange={(e) => itemEditStore.updateParam('model', e.target.value)}
                                    placeholder='Модель'
                                    allowClear={{ clearIcon: <Clear /> }} />
                            </div>
                            <div className="input-container characters-input">
                                <label htmlFor="year">Год изготовления</label>
                                <Input name='year'
                                    value={formData.params?.yearOfManufacture}
                                    onChange={(e) => itemEditStore.updateParam('yearOfManufacture', e.target.value)}
                                    placeholder='Год изготовления'
                                    allowClear={{ clearIcon: <Clear /> }} />
                            </div>
                            <div className="input-container characters-input">
                                <label htmlFor="transmission">Трансмиссия</label>
                                <Input name='transmission'
                                    value={formData.params?.transmission}
                                    onChange={(e) => itemEditStore.updateParam('transmission', e.target.value)}
                                    placeholder='Трансмиссия'
                                    allowClear={{ clearIcon: <Clear /> }} />
                            </div>
                            <div className="input-container characters-input">
                                <label htmlFor="mileage">Пробег</label>
                                <Input name='mileage'
                                    value={formData.params?.mileage}
                                    onChange={(e) => itemEditStore.updateParam('mileage', e.target.value)}
                                    placeholder='Пробег'
                                    allowClear={{ clearIcon: <Clear /> }} />
                            </div>
                            <div className="input-container characters-input">
                                <label htmlFor="enginePower">Мощность</label>
                                <Input name='enginePower'
                                    value={formData.params?.enginePower}
                                    onChange={(e) => itemEditStore.updateParam('enginePower', e.target.value)}
                                    placeholder='Мощность'
                                    allowClear={{ clearIcon: <Clear /> }} />
                            </div>
                        </>
                    }

                    {
                        formData.category == ITEM_CATEGORIES.ELECTRONICS &&
                        <>
                            <div className="input-container characters-input">
                                <label htmlFor="type">Тип</label>
                                <Input name='type'
                                    value={formData.params?.type}
                                    onChange={(e) => itemEditStore.updateParam('type', e.target.value)}
                                    placeholder='Тип'
                                    allowClear={{ clearIcon: <Clear /> }} />
                            </div>
                            <div className="input-container characters-input">
                                <label htmlFor="brand">Бренд</label>
                                <Input name='brand'
                                    value={formData.params?.brand}
                                    onChange={(e) => itemEditStore.updateParam('brand', e.target.value)}
                                    placeholder='Бренд'
                                    allowClear={{ clearIcon: <Clear /> }} />
                            </div>
                            <div className="input-container characters-input">
                                <label htmlFor="model">Модель</label>
                                <Input name='model'
                                    value={formData.params?.model}
                                    onChange={(e) => itemEditStore.updateParam('model', e.target.value)}
                                    placeholder='Модель'
                                    allowClear={{ clearIcon: <Clear /> }} />
                            </div>

                            <div className="input-container characters-input">
                                <label htmlFor="condition">Состояние</label>
                                <Input name='condition'
                                    value={formData.params?.condition}
                                    onChange={(e) => itemEditStore.updateParam('condition', e.target.value)}
                                    placeholder='Состояние'
                                    allowClear={{ clearIcon: <Clear /> }} />
                            </div>
                            <div className="input-container characters-input">
                                <label htmlFor="color">Цвет</label>
                                <Input name='color'
                                    value={formData.params?.color}
                                    onChange={(e) => itemEditStore.updateParam('color', e.target.value)}
                                    placeholder='Цвет'
                                    allowClear={{ clearIcon: <Clear /> }} />
                            </div>
                        </>
                    }

                    {
                        formData.category == ITEM_CATEGORIES.REAL_ESTATE &&
                        <>
                            <div className="input-container characters-input">
                                <label htmlFor="type">Тип</label>
                                <Input name='type'
                                    value={formData.params?.type}
                                    onChange={(e) => itemEditStore.updateParam('type', e.target.value)}
                                    placeholder='Тип'
                                    allowClear={{ clearIcon: <Clear /> }} />
                            </div>
                            <div className="input-container characters-input">
                                <label htmlFor="address">Адрес</label>
                                <Input name='address'
                                    value={formData.params?.address}
                                    onChange={(e) => itemEditStore.updateParam('address', e.target.value)}
                                    placeholder='Адрес'
                                    allowClear={{ clearIcon: <Clear /> }} />
                            </div>
                            <div className="input-container characters-input">
                                <label htmlFor="area">Площадь</label>
                                <Input name='area'
                                    value={formData.params?.area}
                                    onChange={(e) => itemEditStore.updateParam('area', e.target.value)}
                                    placeholder='Площадь'
                                    allowClear={{ clearIcon: <Clear /> }} />
                            </div>

                            <div className="input-container characters-input">
                                <label htmlFor="floor">Этаж</label>
                                <Input name='floor'
                                    value={formData.params?.floor}
                                    onChange={(e) => itemEditStore.updateParam('floor', e.target.value)}
                                    placeholder='Этаж'
                                    allowClear={{ clearIcon: <Clear /> }} />
                            </div>
                        </>
                    }

                </div>
            </div>

            <div className="edit-block edit-descr">
                <div className="input-container descr-input-container">
                    <label className='edit-label' htmlFor="descr">Описание</label>
                    <TextArea name='descr'
                        value={formData.description}
                        onChange={(e) => itemEditStore.updateField('description', e.target.value)}
                        placeholder='Описание'
                        showCount
                        rows={6} />
                </div>
            </div>

            <div className="edit-btns-container">
                <Button
                    type='primary'
                    onClick={handleSave}
                    loading={itemEditStore.meta === Meta.Loading}>Сохранить</Button>
                <Button onClick={() => navigate(-1)}>Отменить</Button>
            </div>
        </main>
    )
})

export default AdEdit;