import React, { useState, useRef, useEffect } from "react";

type MinSeasonSelectorProps = {
  value: number;
  onChange: (newValue: number) => void;
};

const MinSeasonSelector: React.FC<MinSeasonSelectorProps> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const numbers = Array.from({ length: 10 }, (_, i) => i + 1);

  // Toggle dropdown visibility
  const toggleDropdown = () => setIsOpen(prev => !prev);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle selection
  const handleSelect = (num: number) => {
    onChange(num);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block w-60 px-2.5" ref={dropdownRef}>
      {/* Trigger button */}
      <button
        type="button"
        onClick={toggleDropdown}
        className="text-white bg-transparent hover:bg-stone-900 outline-1 -outline-offset-1 outline-neutral-700 focus:ring-2 focus:outline-none focus:ring-gray-500 font-medium rounded-full text-sm px-5 py-2.5 inline-flex items-center justify-between w-full"
      >
        {value ? `${value}+ Seasons` : "Number of seasons"}
        <svg className="w-2.5 h-2.5 ml-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 1l4 4 4-4"
          />
        </svg>
      </button>

      {/* Dropdown list */}
      {isOpen && (
  <div className="absolute z-10 mt-2 w-full bg-stone-900 border border-stone-700 rounded-lg shadow-lg">
    <ul className="py-2 text-sm text-white">
      {numbers.map((num) => (
        <li key={num}>
          <button
            onClick={() => handleSelect(num)}
            className="block w-full text-left px-4 py-2 hover:bg-stone-800 hover:text-white"
          >
            {num}+ Seasons
          </button>
        </li>
      ))}
    </ul>
  </div>
)}

    </div>
  );
};

export default MinSeasonSelector;
