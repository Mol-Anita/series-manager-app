"use client";

import SeriesCard from "./SeriesCard";
import { Series } from "@/types/series";

type SeriesCardSectionProps = {
  heading: string;
  seriesList: Series[];
};

const SeriesCardSection = ({ heading, seriesList }: SeriesCardSectionProps) => {
  console.log('SeriesCardSection - Received seriesList:', seriesList);
  
  if (!seriesList || seriesList.length === 0) {
    console.log('SeriesCardSection - No series data available');
    return null;
  }

  return (
    <section className="bg-neutral-950 p-4 my-5">
      <div className="p-4">
        <h2 className="text-white mb-4 font-semibold text-2xl pb-3">
          {heading}
        </h2>

        <ul className="flex flex-row justify-between px-6">
          {seriesList.map((seriesItem) => {
            console.log('SeriesCardSection - Rendering series:', seriesItem);
            return (
              <li key={`series-${seriesItem.Id}`} className="flex-none">
                <SeriesCard
                  series={seriesItem}
                  onDelete={undefined}
                  isOnMaster={true}
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
