import React, { ChangeEvent } from "react";

type MinSeasonSelectorProps = {
  value: number; 
  onChange: (newValue: number) => void;
};


const MinSeasonSelector: React.FC<MinSeasonSelectorProps> = ({ value, onChange }) => {
    const numbers = Array.from({ length: 10 }, (_, i) => i + 1);
  
    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        onChange(parseInt(event.target.value, 10) as number); 
      };

    return (
    <div className="px-2.5">
      <select value={value} 
      onChange={handleChange}
      className="inline-flex rounded-full bg-transparent w-60 h-9 px-3 py-1.5 text-white font-light text-sm/6 outline-1 -outline-offset-1 outline-neutral-700"
      >
        <option value={0} disabled>Number of seasons</option>
        {numbers.map((number) => (
          <option key={number} value={number}>
            {`${number}+ Seasons`}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MinSeasonSelector;
