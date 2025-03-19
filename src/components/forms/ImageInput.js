const ImageInput = ({ type, label, id, inputProps, errors }) => {
  return (
    <div className="py-3">
      <label htmlFor={id}>{label}</label>
      <div className="relative pt-1">
        <input
          className="block w-full h-11 rounded-full bg-transparent px-4 py-2 text-white text-sm/6 placeholder:text-gray-200 outline-1 -outline-offset-1 outline-neutral-700  focus:outline-2 focus:-outline-offset-2"
          id={type}
          type="file"
          {...inputProps}
        />
      </div>

      {errors?.image && (
        <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
      )}
    </div>
  );
};

export default ImageInput;
