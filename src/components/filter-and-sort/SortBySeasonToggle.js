const SortBySeasonsToggle = ({ value, onChange }) => {
  const handleChange = () => {
    onChange(!value);
  };

  return (
    <div className="inline-flex items-center justify-between rounded-full bg-transparent w-60 h-10 px-5 py-2.5 text-white font-light text-sm/6 outline-1 -outline-offset-1 outline-neutral-700">
      <label className="flex items-center w-full justify-between cursor-pointer">
        <span className="mr-3 text-white font-medium text-sm py-2.5">
          Sort by seasons
        </span>
        <div className="relative">
          <input
            type="checkbox"
            checked={value}
            onChange={handleChange}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-transparent rounded-full peer ring-1 ring-neutral-500 peer-checked:bg-neutral-600 peer-focus:ring-white"></div>
          <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-neutral-300 rounded-full transition-transform peer-checked:bg-neutral-100 peer-checked:translate-x-5"></div>
        </div>
      </label>
    </div>
  );
};

export default SortBySeasonsToggle;
