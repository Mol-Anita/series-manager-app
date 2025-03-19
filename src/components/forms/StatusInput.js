const StatusInput = ({ register, errors }) => {
    return (
      <div className="py-2">
        <label className="py-3">Status</label>
        <div className="flex space-x-6">
          <label className="flex items-center space-x-2 text-white">
            <input
              type="radio"
              value="Currently Watching"
              {...register}
              className="w-4 h-4 text-white text-sm/6 bg-transparent border-gray-300 focus:white focus:ring-2"
            />
            <span>Currently Watching</span>
          </label>
  
          <label className="flex items-center space-x-2 text-white text-sm/6">
            <input
              type="radio"
              value="Watched"
              {...register}
              className="w-4 h-4 text-white text-sm/6 bg-gray-100 border-gray-300 focus:white focus:ring-2"
            />
            <span>Watched</span>
          </label>
  
          <label className="flex items-center space-x-2 text-white">
            <input
              type="radio"
              value="Watchlist"
              {...register}
              className="w-4 h-4 text-white text-sm/6 bg-gray-100 border-gray-300 focus:white focus:ring-2"
            />
            <span>Watchlist</span>
          </label>
        </div>
        {errors.status && (
            <p className="text-red-500">{errors.status.message}</p>
          )}
      </div>
    );
  };
  
  export default StatusInput;
  