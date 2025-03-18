"use client";

import SeriesCard from "./SeriesCard";
import {Series} from "@/types/series"

type SeriesCardListProps = {
    seriesList: Series[];
}

const SeriesList = ({seriesList}: SeriesCardListProps) => {
  const series = seriesList;

  return (
    <section className="bg-neutral-950 p-4 my-5"> 
    <div className="p-4">      
      <ul className="flex flex-wrap justify-between">
        {series.map((series: Series) => {
          return (
            <li key={series.id} className="flex-none m-2">
              <SeriesCard
                isOnMaster={false}
                title={series.title}
                image={series.img}
                genres={series.genre}
                platform={series.platform}
              />
            </li>
          );
        })}
      </ul>
    </div>
      
    </section>
  );
};

export default SeriesList;
