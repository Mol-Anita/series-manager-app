
import Image from "next/image";
import Link from "next/link";
import DeleteButton from "./DeleteButton";
import SeasonNumberStats from "./SeasonNumberStats"

const SeriesCard = ({ isOnMaster, id, image, title, genres, seasons, onDelete}) => {
  
  return (
    <div className="bg-neutral-900 text-white rounded-2xl flex flex-col p-5 w-[310px] h-[460px]">
      {!isOnMaster && (
        <div className="flex justify-between mb-2">
          <Link href={`/edit-series/${id}`} className="text-sm">Edit</Link>
          <DeleteButton seriesId={id} onDelete={onDelete}/>
        </div>
      )}

      
      <div className="flex justify-center overflow-hidden">
      <Link href={`series/${id}`}>
        <Image
          src={image}
          width={230}
          height={335}
          alt={title}
          className="object-cover max-w-[230px] max-h-[335px] scale-95"
        />
        </Link>
      </div>
      
      

      <div className="pt-2 text-left">
        <h1 className="font-bold">{title}</h1>
        <h2 className="font-light text-sm pb-3">{genres.join(', ')}</h2>
        <div className="flex flex-row justify-between">
        <h3 className="font-normal text-sm text-neutral-400">{seasons > 1 ? `${seasons} Seasons` : `${seasons} Season`}</h3>
        <SeasonNumberStats seasons={seasons} />
        </div>
      </div>
    </div>
  );
};

export default SeriesCard;

