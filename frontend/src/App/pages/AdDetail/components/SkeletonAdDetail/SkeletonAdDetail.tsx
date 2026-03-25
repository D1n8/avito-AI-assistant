import { Skeleton } from "antd";
import '../../AdDetail.css'

function SkeletonAdDetail() {
    return (
        <main className="ad-main">
            <div className="ad-detail">
                <div className="top-container">
                    <div className="main-info">
                        <Skeleton.Button active style={{ width: 24, height: 24 }} />
                        <div className="info">
                            <Skeleton.Input active style={{ width: 300 }} size="large" />
                            <Skeleton.Input active style={{ width: 150 }} size="large" />
                        </div>
                    </div>
                    <div className="info">
                        <Skeleton.Button active style={{ width: 120 }} size="large" />
                        <div className="dates">
                            <Skeleton active paragraph={{ rows: 2, width: 150 }} title={false} />
                        </div>
                    </div>
                </div>

                <div className="ad-info">
                    <div className="skeleton-img-placeholder">
                        <Skeleton.Button active style={{ width: 480, height: 360 }} />
                    </div>
                    <div className="ad-characters" style={{ flexGrow: 1 }}>
                        <div className="characters">
                            <Skeleton.Button active style={{ width: 200, marginBottom: 16 }} />
                            <div className="characters-list">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                        <Skeleton.Input active style={{ width: 100 }} size="small" />
                                        <Skeleton.Input active style={{ width: 150 }} size="small" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="ad-detail-descr">
                    <Skeleton.Button active style={{ width: 150, marginBottom: 16 }} />
                    <Skeleton active paragraph={{ rows: 4, width: '100%' }} title={false} />
                </div>
            </div>
        </main>
    );
}

export default SkeletonAdDetail;