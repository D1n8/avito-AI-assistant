import './Characteristic.css'

interface CharateristicProps {
    name: string,
    value: string
}

function Charateristic({ name, value }: CharateristicProps) {
    return (
        <div className="characteristic">
            <p className='character-name'>{name}</p>
            <p className='character-value'>{value}</p>
        </div>
    );
}

export default Charateristic;