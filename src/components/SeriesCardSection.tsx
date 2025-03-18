"use client";

import SeriesCard from "./SeriesCard";
import {Series} from "@/types/series";


type SeriesCardSectionProps = {
    heading: string;
    seriesList: Series[];
}

const SeriesCardSection = ({ heading, seriesList }: SeriesCardSectionProps) => {
  const series = seriesList.slice(0, 4);

  return (
    <section className="bg-neutral-950 p-4 my-5"> 
    <div className="p-4">
        <h2 className="text-white mb-4 font-semibold text-2xl pb-3">{heading}</h2> 
      
      <ul className="flex flex-row justify-between px-6">
        {series.map((series) => {
          return (
            <li key={series.id} className="flex-none">
              <SeriesCard
                isOnMaster={true}
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

export default SeriesCardSection;
