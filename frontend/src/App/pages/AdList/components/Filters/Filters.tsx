import { Checkbox, Switch, Button, Collapse, Space } from 'antd';
import { observer } from 'mobx-react-lite';
import { useStore } from 'store/RootStore/RootStore';
import { ITEM_CATEGORIES } from 'shared/consts';
import './Filters.css';

const { Panel } = Collapse;

const Filters = observer(() => {
    const { itemListStore } = useStore();

    const categoryOptions = [
        { label: 'Авто', value: ITEM_CATEGORIES.AUTO },
        { label: 'Электроника', value: ITEM_CATEGORIES.ELECTRONICS },
        { label: 'Недвижимость', value: ITEM_CATEGORIES.REAL_ESTATE },
    ];

    return (
        <aside className="filters-container">
            <div className="filters-card">
                <h3 className="filters-title">Фильтры</h3>

                <Collapse 
                    ghost 
                    defaultActiveKey={['1']} 
                    expandIconPlacement="end"
                    className="filters-collapse"
                >
                    <Panel header="Категория" key="1">
                        <Space orientation="vertical" className="checkbox-group">
                            {categoryOptions.map(option => (
                                <Checkbox
                                    key={option.value}
                                    checked={itemListStore.categories.includes(option.value)}
                                    onChange={() => itemListStore.toggleCategory(option.value)}
                                >
                                    {option.label}
                                </Checkbox>
                            ))}
                        </Space>
                    </Panel>
                </Collapse>

                <div className="revision-filter">
                    <span className="revision-label">Только требующие доработок</span>
                    <Switch 
                        checked={itemListStore.needsRevision} 
                        onChange={(val) => itemListStore.setNeedsRevision(val)} 
                    />
                </div>
            </div>

            <Button 
                className="reset-button" 
                block 
                onClick={() => itemListStore.resetFilters()}
            >
                Сбросить фильтры
            </Button>
        </aside>
    );
});

export default Filters;