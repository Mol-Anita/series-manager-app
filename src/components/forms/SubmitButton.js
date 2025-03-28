const SubmitButton = ({ text }) => {
  return (
    <button
      type="submit"
      data-testid="button"
      className="bg-stone-800 rounded-full text-white w-60 h-12 hover:cursor-pointer my-5 "
    >
      {text}
    </button>
  );
};
export default SubmitButton;
