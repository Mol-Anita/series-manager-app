"use client";


const AddCard = ({onClick}) => {
  
  return (
    <button onClick={onClick} className="bg-neutral-900 text-white rounded-2xl flex flex-col justify-center p-5 w-[310px] h-[460px] hover:cursor-pointer">
      <div className="flex justify-center py-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={0.8}
          stroke="currentColor"
          className="size-40"
        >
          <path
            strokeLinecap="square"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </div>
      <p className="text-lg font-normal text-neutral-300">Add series</p>

    </button>
  );
};

export default AddCard;
