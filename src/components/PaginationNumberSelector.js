

const PaginationNumberSelector = ({value, onChange}) => {
    const numbers = Array.from({ length: 5 }, (_, i) => i * 10);

    const handleChange = (event) => {
            onChange(parseInt(event.target.value, 10)); 
          };

    return (
        <div className="px-2.5">
      <select value={value} 
      onChange={handleChange}
      className="inline-flex rounded-full bg-transparent w-60 h-9 px-3 py-1.5 text-white font-light text-sm/6 outline-1 -outline-offset-1 outline-neutral-700"
      >
        <option value={0} disabled>Series shown</option>
        {numbers.map((number) => (
          <option key={number} value={number}>
            {`${number}`}
          </option>
        ))}
      </select>
    </div>
    );
}
export default PaginationNumberSelector;