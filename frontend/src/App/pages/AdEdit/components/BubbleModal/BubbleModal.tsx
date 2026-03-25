import { Button } from "antd";
import './BubbleModal.css'
import type { AiStatus } from "shared/types";

interface BubbleModalProps {
    text: string | null,
    onApply: () => void,
    onClose: () => void,
    status: AiStatus
}

function BubbleModal({ text, onApply, onClose, status }: BubbleModalProps) {
    return (
        <>
            {
                status === 'success' &&
                < div className="ai-bubble">
                    <div className="ai-bubble-header">
                        <span>Ответ AI:</span>
                    </div>
                    <div className="ai-bubble-body">{text}</div>
                    <div className="ai-bubble-footer">
                        <Button type="primary" size="small" onClick={onApply}>Применить</Button>
                        <Button size="small" onClick={onClose}>Закрыть</Button>
                    </div>
                    <div className="ai-bubble-arrow" />
                </div >
            }
            {
                status === 'error' &&
                < div className="ai-bubble ai-bubble-error">
                    <div className="ai-bubble-header">
                        <span className="ai-bubble-header-error">Произошла ошибка при запросе к AI</span>
                    </div>
                    <div className="ai-bubble-body">Попробуйте повторить запрос или закройте уведомление</div>
                    <div className="ai-bubble-footer">
                        <Button size="small" className="ai-bubble-close-error" onClick={onClose}>Закрыть</Button>
                    </div>
                    <div className="ai-bubble-arrow" />
                </div >
            }

        </>
    );
}

export default BubbleModal;