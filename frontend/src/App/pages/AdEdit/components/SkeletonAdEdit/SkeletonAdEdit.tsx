import { Skeleton } from "antd";
import '../../AdEdit.css'

function SkeletonAdEdit() {
    return (
        <main className="edit-main">
            <Skeleton.Button active style={{ width: 300, height: 32, marginBottom: 24 }} />

            <div className='edit-block'>
                <div className="input-container">
                    <Skeleton.Input active size="small" style={{ width: 100, marginBottom: 8 }} />
                    <Skeleton.Input active style={{ width: 456 }} />
                </div>
            </div>

            <div className='edit-block'>
                <div className="input-container">
                    <Skeleton.Input active size="small" style={{ width: 100, marginBottom: 8 }} />
                    <Skeleton.Input active style={{ width: 456 }} />
                </div>
            </div>

            <div className="edit-block">
                <div className="input-container">
                    <Skeleton.Input active size="small" style={{ width: 80, marginBottom: 8 }} />
                    <div className="price-container">
                        <Skeleton.Input active style={{ width: 456 }} />
                        <Skeleton.Button active style={{ width: 180 }} />
                    </div>
                </div>
            </div>

            <div className="edit-block">
                <Skeleton.Input active size="small" style={{ width: 120, marginBottom: 16 }} />
                <div className='edit-charaters-container'>
                    <div className="char-grid">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="input-container">
                                <Skeleton.Input active size="small" style={{ width: 80, marginBottom: 8 }} />
                                <Skeleton.Input active style={{ width: '100%' }} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="edit-block no-border">
                <div className="input-container descr-input-container">
                    <Skeleton.Input active size="small" style={{ width: 100, marginBottom: 8 }} />
                    <Skeleton.Input active style={{ width: '100%', height: 120 }} />
                    <Skeleton.Button active style={{ width: 175, marginTop: 12 }} />
                </div>
            </div>

            <div className="edit-btns-container">
                <Skeleton.Button active style={{ width: 100 }} />
                <Skeleton.Button active style={{ width: 100 }} />
            </div>
        </main>
    );
}

export default SkeletonAdEdit;