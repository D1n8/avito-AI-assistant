import { Input } from "antd";
import Clear from "components/Icons/Clear";
import { observer } from "mobx-react-lite";
import { FIELD_LABELS } from "shared/consts";

const CharInput = observer(({ name, store, type = "text" }: { name: string, store: any, type?: string }) => {
    const value = store.formData.params?.[name]

    return (
        <div className="input-container">
            <label>{FIELD_LABELS[name] || name}</label>
            <Input
                type={type}
                style={{width: 456}}
                status={!value ? 'warning' : undefined}
                value={value}
                onChange={(e) => store.updateParam(name, e.target.value)}
                allowClear={{ clearIcon: <Clear /> }}
            />
        </div>
    );
});

export default CharInput;