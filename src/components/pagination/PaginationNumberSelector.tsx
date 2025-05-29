import React, { useState, useRef, useEffect } from "react";

type PaginationNumberSelectorProps = {
  value: number | null;
  onChange: (newValue: number) => void;
};

const PaginationNumberSelector: React.FC<PaginationNumberSelectorProps> = ({
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const numbers = [0, 10, 20, 30, 40, 50];

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (num: number) => {
    onChange(num);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block w-60 px-3.5 pt-2.5" ref={dropdownRef}>
      <button
        type="button"
        onClick={toggleDropdown}
        className="text-white bg-transparent hover:bg-stone-900 outline-1 -outline-offset-1 outline-neutral-700 focus:ring-2 focus:outline-none focus:ring-gray-500 font-medium rounded-full text-sm px-5 py-2.5 inline-flex items-center justify-between w-full"
      >
        {value !== null ? `${value} Shown` : "Series shown"}
        <svg
          className="w-2.5 h-2.5 ml-3"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 1l4 4 4-4"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-full bg-stone-900 border border-stone-700 rounded-lg shadow-lg">
          <ul className="py-2 text-sm text-white">
            {numbers.map((num) => (
              <li key={num}>
                <button
                  onClick={() => handleSelect(num)}
                  className="block w-full text-left px-4 py-2 hover:bg-stone-800 hover:text-white transition-colors duration-150"
                >
                  {num}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PaginationNumberSelector;
