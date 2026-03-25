import { Select } from "antd";
import { observer } from "mobx-react-lite";
import { FIELD_LABELS } from "shared/consts";

const CharSelect = observer(({ name, store, optionsMap }: { name: string, store: any, optionsMap: Record<string, string> }) => {
    const value = store.formData.params?.[name];

    const options = Object.entries(optionsMap).map(([val, label]) => ({
        value: val,
        label: label
    }));

    return (
        <div className="input-container">
            <label>{FIELD_LABELS[name] || name}</label>
            <Select
                className="full-width"
                style={{width: 456}}
                status={!value ? 'warning' : undefined}
                value={value}
                onChange={(v) => store.updateParam(name, v)}
                options={options}
                allowClear
                placeholder="Выберите..."
            />
        </div>
    );
});

export default CharSelect;