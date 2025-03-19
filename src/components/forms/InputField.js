const InputField = ({ type, label, id, placeholder, inputProps, errors }) => {
  return (
    <div className="py-3">
      <label htmlFor={id}>{label}</label>
      <div className="relative pt-1">
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          className="block w-full h-11 rounded-full bg-transparent px-4 py-1.5 text-white text-sm/6 placeholder:text-gray-200 outline-1 -outline-offset-1 outline-neutral-700  focus:outline-2 focus:-outline-offset-2"
          {...inputProps}
        />
        {errors?.[id] && (
          <p className="text-red-500 text-sm mt-1">{errors[id].message}</p>
        )}
      </div>
    </div>
  );
};
export default InputField;
