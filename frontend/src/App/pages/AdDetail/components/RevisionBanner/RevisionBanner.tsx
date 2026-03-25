import { InfoCircleFilled } from "@ant-design/icons";
import './RevisionBanner.css'

interface RevisionBannerProps {
    missingFields: string[]
}

function RevisionBanner({missingFields}: RevisionBannerProps) {
    return (
        <div className="revision-banner">
            <InfoCircleFilled className="revision-icon" />
            <div className="revision-content">
                <h4>Требуются доработки</h4>
                <p>У объявления не заполнены поля:</p>
                <ul>
                    {missingFields.map((field) => (
                        <li key={field}>{field}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default RevisionBanner;