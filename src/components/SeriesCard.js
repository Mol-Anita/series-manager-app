import Image from "next/image";
import Link from "next/link";
import DeleteButton from "./DeleteButton";
import SeasonNumberStats from "./SeasonNumberStats";
import { StarIcon } from "@heroicons/react/24/outline";

const SeriesCard = ({ series, onDelete, isOnMaster }) => {
  if (!series) return null;

  const imageUrl = series.ImagePath
  ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/seriesCoverImages/${series.ImagePath}`
    : "/images/mockup.jpg";

  return (
    <div className="bg-neutral-900 text-white rounded-2xl flex flex-col p-5 w-[310px] h-[500px] hover:cursor-pointer">
      <div className="flex justify-center items-center w-full h-[360px] relative overflow-hidden rounded-lg">
        <img
          src={imageUrl}
          alt={series.Title}
          className="w-[260px] h-full object-cover"
        />
        {series.IsFavourite && (
          <div className="absolute top-2 right-2">
            <StarIcon className="h-6 w-6 text-yellow-400" />
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{series.Title}</h3>
        <div className="relative overflow-hidden">
          <div className="flex gap-2 whitespace-nowrap overflow-hidden text-ellipsis">
            {series.Genres?.map((genre, index) => (
              <span
                key={index}
                className="bg-stone-700 text-sm px-2 py-1 rounded"
              >
                {genre}
              </span>
            ))}
          </div>
          <div className="absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-neutral-900 to-transparent" />
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-sm text-gray-400">
            {series.TotalSeasons || 0}{" "}
            {series.TotalSeasons === 1 ? "Season" : "Seasons"}
          </span>
          <span className="text-sm text-gray-400">
            {series.Status || "No status"}
          </span>
        </div>

      </div>
              {!isOnMaster && (
        <div className="mt-4 flex justify-between items-center">
          <Link href={`/edit-series/${series.Id}`} className="text-sm text-blue-400 hover:underline">
            Edit
          </Link>
          <DeleteButton seriesId={series.Id} onDelete={onDelete} />
        </div>
      )}
    </div>
  );
};

export default SeriesCard;
