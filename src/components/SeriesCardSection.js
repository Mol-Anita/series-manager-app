"use client";

import SeriesCard from "./SeriesCard";
import Series from "../mock/database.json";

const SeriesCardSection = ({ heading, seriesList }) => {
  const series = Series.slice(0, 4);

  return (
    <section className="bg-neutral-950 p-4 my-5"> 
    <div className="p-4">
        <h2 className="text-white mb-4 font-semibold text-2xl pb-3">{heading}</h2> 
      
      <ul className="flex flex-row justify-between px-6">
        {series.map((serie) => {
            console.log(serie.platform);
          return (
            <li key={serie.id} className="flex-none">
              <SeriesCard
                isOnMaster={true}
                title={serie.title}
                image={serie.img}
                genres={serie.genre}
                platform={serie.platform}
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
