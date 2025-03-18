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
    <div>
      <select value={value} onChange={handleChange}>
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
