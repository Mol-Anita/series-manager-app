"use client";

import SeriesCard from "./SeriesCard";
import AddCard from "./AddCard";
import { Series } from "@/types/series";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const SeriesList = ({ seriesList, onDelete, pageNumber }) => {
  const router = useRouter();

  const handleAddButtonClick = () => {
    router.push("/add-series");
  };

  return (
    <section className="bg-neutral-950 p-4 my-5">
      <div className="p-4">
        <ul className="flex flex-wrap justify-start">
          {pageNumber == 1 && <li key="000" className="flex-none m-2">
            <AddCard onClick={handleAddButtonClick} />
          </li>}
          {seriesList.map((series) => {
            return (
              <li key={series.Id} className="flex-none m-2">
                <SeriesCard
                  series={series}
                  onDelete={onDelete}
                  isOnMaster={false}
                />
              </li>
            );
          })}
        </ul>
      </div>
      {pageNumber > 1 && (<button className="fixed bottom-10 right-10 bg-neutral-600 text-white p-4 rounded-full shadow-lg">
        +
      </button>)}
    </section>
  );
};

export default SeriesList;
