import './AdList.css'
import { Pagination, Skeleton, Empty } from 'antd';
import { useCallback, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import AdCard from './components/AdCard';
import Search from './components/Search';
import { useNavigate } from 'react-router';
import { routes } from 'config/routes';
import { useStore } from 'store/RootStore/RootStore';
import Filters from './components/Filters';
import { Meta } from 'shared/consts';

const AdList = observer(() => {
    const { itemListStore } = useStore()
    const navigate = useNavigate()

    useEffect(() => {
        itemListStore.fetchItemList()

        return () => itemListStore.destroy()
    }, [itemListStore])

    const handleClickToCard = useCallback((id: string) => {
        navigate(routes.detail.create(id))
    }, [navigate])

    const renderContent = () => {
        const listClassName = itemListStore.viewMode === 'grid' ? 'list' : 'list-view';

        if (itemListStore.meta === Meta.Loading ) {
            return (
                <section className={listClassName}>
                    {Array.from({ length: itemListStore.limit }).map((_, index) => (
                        <div key={index} className="card-skeleton">
                            <Skeleton.Button active
                                style={{
                                    height: itemListStore.viewMode === 'grid' ? 260 : 130,
                                    width: itemListStore.viewMode === 'grid' ? 200 : '100%'
                                }} />
                        </div>
                    ))}
                </section>
            )
        }

        if (itemListStore.list.length === 0) {
            return (
                <div className="empty-container">
                    <Empty description="Объявления не найдены" />
                </div>
            )
        }

        return (
            <section className={listClassName}>
                {itemListStore.list.map(item => (
                    <AdCard
                        key={item.id}
                        onClick={() => handleClickToCard(item.id.toString())}
                        id={item.id}
                        title={item.title}
                        price={item.price}
                        category={item.category}
                        needsRevision={item.needsRevision}
                        viewMode={itemListStore.viewMode}
                    />
                ))}
            </section>
        )
    }

    return (
        <main className='list-main'>
            <h2 className='listPage-title'>Мои объявления</h2>
            <p className='listPage-subtitle'>{itemListStore.total} объявления</p>

            <Search />
            <div className="list-layout">
                <Filters />
                <div className="list-container">
                    {renderContent()}

                    <div className="pagination-wrapper">
                        <Pagination
                            current={itemListStore.currentPage}
                            total={itemListStore.total}
                            pageSize={itemListStore.limit}
                            onChange={(page) => itemListStore.setPage(page)}
                            showSizeChanger={false}
                        />
                    </div>
                </div>
            </div>
        </main>
    )
})

export default AdList;