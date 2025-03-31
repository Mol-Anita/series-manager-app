import { series } from "../../app/api/mockdata/series";
import generateRandomSeries from "../../app/api/mockdata/series"
import { SeriesStatus } from "@/types/seriesStatus";
import { Genre } from "@/types/genre";


export type SeriesFilters = {
  genres?: string[];
  search?: string;
  seasonNumber?: number;
  sortBySeasons?: boolean;
};

type SeriesData = {
  title: string;
  image: string;
  genre: string[];
  description: string;
  totalSeasons: number;
  status: SeriesStatus;
};

let seriesList = [...series];

export const fetchSeries = async (options?: SeriesFilters) => {
  const url = new URL("http://localhost:3000/api/series"); 

  if (options?.genres && options.genres.length > 0) options.genres.forEach((genre) => url.searchParams.append("genres", genre));
  if (options?.search) url.searchParams.set("search", options.search);
  if (options?.seasonNumber) url.searchParams.set("seasonNumber", options.seasonNumber.toString());
  if (options?.sortBySeasons) url.searchParams.set("sortBySeasons", options.sortBySeasons.toString());

  const response = await fetch(url.toString(), { cache: "no-store" });
  const data = await response.json();
  
  return data.result;
};

export const getSeriesById = async (id: number) => {
  const response = await fetch(`http://localhost:3000/api/series/${id}`)
  const seriesData = await response.json();

  return seriesData.result;
};

export const saveSeries = async (data: SeriesData) => {
  const response = await fetch("/api/series", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to save series");
  }

  return response.json();
};

export const updateSeriesById = async (id: number, data: SeriesData) => {
  const response = await fetch(`/api/series/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update series");
  }

};

export const deleteSeriesById = async (id: number) => {
  const response = await fetch(`/api/series/${id}`,{
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete series");
  }
};


export const getGenreData = async () => {
  const genreData: Record<Genre, number> = {
    "Crime": 0,
    "Drama": 0,
    "Thriller": 0,
    "Sci-Fi": 0,
    "Horror": 0,
    "Mystery": 0,
    "Fantasy": 0,
    "Adventure": 0,
    "Action": 0,
    "Comedy": 0,
    "Romance": 0,
    "Dark Comedy": 0,
    "Animation": 0,
    "Anthology": 0,
    "Biography": 0,
    "Anime": 0,
  };

  seriesList.forEach(series => {
    series["genre"].forEach(genre => {
      genreData[genre as Genre]++;
    });
  });

  const formattedGenreData = Object.entries(genreData).map(([name, value]) => ({
    value,
    name,
  }));

  return formattedGenreData;
}

export const updateChartDataAsync = async (
  currentData: { name: string; value: number }[]
): Promise<{ name: string; value: number }[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (currentData.length === 0) {
        resolve(currentData);
        return;
      }

      const newSeries = generateRandomSeries(1)[0];
      seriesList.push(newSeries);
      const newGenre = newSeries.genre[0];
      const existingGenreIndex = currentData.findIndex((item) => item.name === newGenre);

      let updatedData;
      if (existingGenreIndex !== -1) {
        updatedData = currentData.map((item, index) =>
          index === existingGenreIndex ? { ...item, value: item.value + 1 } : item
        );
      } else {
        updatedData = [...currentData, { name: newGenre, value: 1 }];
      }


      resolve(updatedData);
    }, 500);
  });
};



export const classifySeriesLength = (series: { seasons: number }): number => {
  if (!seriesList || seriesList.length === 0) return 1; 

  const totalSeasons = seriesList.reduce((sum, s) => sum + s.totalSeasons, 0);
  const avgLength = Math.round(totalSeasons / seriesList.length);

  const seasonCount = series.seasons;

  console.log("Seasons:", seasonCount, "Avg Length:", avgLength);


  const mediumRange = avgLength * 0.33; 

  if (seasonCount < avgLength - mediumRange) return 1; 
  if (seasonCount > avgLength + mediumRange) return 3; 

  return 2; 
};
