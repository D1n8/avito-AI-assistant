import type { ItemList, ViewMode } from "store/models/item";
import { ITEM_CATEGORIES } from "shared/consts";
import './AdCard.css'
import PicturePlaceholder from "components/PicturePlaceholder";

interface AdCardProps extends ItemList {
    onClick: () => void,
    viewMode?: ViewMode
}

const categoryMap = {
    [ITEM_CATEGORIES.AUTO]: 'Авто',
    [ITEM_CATEGORIES.ELECTRONICS]: 'Электроника',
    [ITEM_CATEGORIES.REAL_ESTATE]: 'Недвижимость',
}

function AdCard({ viewMode, ...props }: AdCardProps) {
    const isList = viewMode === 'list';
    const cardClassName = `card ${isList ? 'card-list-view' : 'asd'}`;

    return ( 
        <article className={cardClassName} onClick={props.onClick}>
            <div className="card-image-placeholder">
                <PicturePlaceholder />
            </div>
            <div className="card-content">
                <span className="card-category-tag">{categoryMap[props.category]}</span>
                <h3 className="card-title">{props.title}</h3>
                <p className="card-price">{props.price?.toLocaleString()} ₽</p>
                
                {props.needsRevision && (
                    <div className="card-badge-revision">
                        <span className="dot" />
                        Требует доработок
                    </div>
                )}
            </div>
        </article>
    );
}

export default AdCard;