
type CheckboxProps = {
  label: string;
    value: boolean;
    onChange: (newValue: boolean) => void;
};


const Checkbox = ({ label, value, onChange }: CheckboxProps) => {
    return(
        <label>
            <input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} />
            {label}
        </label>
    );

};
export default Checkbox;