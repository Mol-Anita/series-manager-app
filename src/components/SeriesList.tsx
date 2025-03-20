"use client";

import SeriesCard from "./SeriesCard";
import AddCard from "./AddCard";
import { Series } from "@/types/series";

type SeriesCardListProps = {
  seriesList: Series[];
};

const SeriesList = ({ seriesList }: SeriesCardListProps) => {
  const series = seriesList;

  return (
    <section className="bg-neutral-950 p-4 my-5">
      <div className="p-4">
        <ul className="flex flex-wrap justify-between">
          <li key="000" className="flex-none m-2">
            <AddCard />
          </li>
          {series.map((series: Series) => {
            return (
              <li key={series.id} className="flex-none m-2">
                <SeriesCard
                  id={series.id}
                  isOnMaster={false}
                  title={series.title}
                  image={series.img}
                  genres={series.genre}
                  seasons={series.totalSeasons}
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
