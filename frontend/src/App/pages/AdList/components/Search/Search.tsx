import { Dropdown, Input, type MenuProps, Button, Space } from 'antd'
import { AppstoreOutlined, UnorderedListOutlined, DownOutlined, SortAscendingOutlined } from '@ant-design/icons'
import './Search.css'
import { observer } from 'mobx-react-lite'
import { useStore } from 'store/RootStore/RootStore' 
import type { ItemSortColumn, SortDirection } from 'store/models/item'
import SearchIcon from 'components/Icons/SearchIcon'

const Search = observer(() => {
    const { itemListStore } = useStore();

    const handleMenuClick: MenuProps['onClick'] = (e) => {
        const [column, direction] = e.key.split('-');
        itemListStore.setSorting(column as ItemSortColumn, direction as SortDirection);
    };

    const items: MenuProps['items'] = [
        {
            key: 'title-header',
            label: 'По названию',
            type: 'group',
            children: [
                { key: 'title-asc', label: 'А → Я' },
                { key: 'title-desc', label: 'Я → А' },
            ],
        },
        {
            key: 'date-header',
            label: 'По новизне',
            type: 'group',
            children: [
                { key: 'createdAt-desc', label: 'Сначала новые' },
                { key: 'createdAt-asc', label: 'Сначала старые' },
            ],
        },
        {
            key: 'price-header',
            label: 'По цене',
            type: 'group',
            children: [
                { key: 'price-asc', label: 'Сначала дешевле' },
                { key: 'price-desc', label: 'Сначала дороже' },
            ],
        },
    ];

    const getSortLabel = () => {
        const currentKey = `${itemListStore.sortColumn}-${itemListStore.sortDirection}`;
        const labels: Record<string, string> = {
            'title-asc': 'А → Я',
            'title-desc': 'Я → А',
            'createdAt-desc': 'Сначала новые',
            'createdAt-asc': 'Сначала старые',
            'price-asc': 'Сначала дешевле',
            'price-desc': 'Сначала дороже',
        };
        return labels[currentKey] || 'Сортировка';
    };

    return (
        <div className='search-container'>
            <div className='input-search-container'>
                <Input.Search
                    className='input-search' 
                    placeholder='Найти объявление...' 
                    enterButton={<Button style={{backgroundColor: 'rgba(247, 245, 248, 1)', border: 'transparent'}}><SearchIcon/></Button>}
                    onSearch={(value) => itemListStore.setSearchQuery(value)}
                />
            </div>

            <div className='grid-switch'>
                <Space size={12}>
                    <AppstoreOutlined className='switch-icon' />
                    <UnorderedListOutlined className='switch-icon'/>
                </Space>
            </div>

            <Dropdown 
                menu={{ 
                    items, 
                    onClick: handleMenuClick,
                    selectable: true,
                    defaultSelectedKeys: [`${itemListStore.sortColumn}-${itemListStore.sortDirection}`]
                }} 
                trigger={['click']}
            >
                <Button>
                    <Space>
                        <SortAscendingOutlined />
                        {getSortLabel()}
                        <DownOutlined />
                    </Space>
                </Button>
            </Dropdown>
        </div>
    );
});

export default Search;