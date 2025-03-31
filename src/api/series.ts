import { series } from "./mockdata/series";
import generateRandomSeries from "./mockdata/series"
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
  let filteredSeries = [...seriesList];

  if (options?.genres && options?.genres.length != 0) {
    filteredSeries = filteredSeries.filter((series) => {
      return series.genre.some((genre) => options.genres!.includes(genre));
    });
  }

  if (options?.seasonNumber) {
    filteredSeries = filteredSeries.filter((series) => {
      return series.totalSeasons >= (options.seasonNumber as number);
    });
  }

  if (options?.search && options.search.length > 0) {
    filteredSeries = filteredSeries.filter((series) => {
      return series.title.toLowerCase().includes(options.search!.toLowerCase());
    });
  }

  if (options?.sortBySeasons) {
    filteredSeries = filteredSeries.sort((a, b) => a.totalSeasons - b.totalSeasons);
  }


  return filteredSeries;
};

export const getSeriesById = async (id: number) => {
  return seriesList.find((series) => series.id === Number(id));
};

export const saveSeries = async (data: SeriesData) => {
  const newId = seriesList[seriesList.length - 1].id + 1;
  const date = new Date();
  const addDate = `${date.getMonth()}-${date.getFullYear()}-${date.getTime()}`;

  const newSeries = {
    id: newId,
    title: data.title,
    genre: data.genre,
    description: data.description,
    img: data.image,
    totalSeasons: data.totalSeasons,
    status: data.status,
    addDate: addDate,
    isFavourite: false,
  };
  seriesList.push(newSeries);
};

export const updateSeriesById = async (id: number, data: SeriesData) => {
  const index = seriesList.findIndex((series) => series.id === Number(id));

  const editedSeries = seriesList[index];

  if (editedSeries.title != data.title) {
    editedSeries.title = data.title;
  }

  if (editedSeries.genre != data.genre) {
    editedSeries.genre = data.genre;
  }
  if (editedSeries.description != data.description) {
    editedSeries.description = data.description;
  }
  if (editedSeries.totalSeasons != data.totalSeasons) {
    editedSeries.totalSeasons = data.totalSeasons;
  }
  if (editedSeries.status != data.status) {
    editedSeries.status = data.status;
  }

  if (data.image !== "") {
    editedSeries.img = data.image;
  }

  seriesList[index] = editedSeries;
};

export const deleteSeriesById = async (id: number) => {
  const index = seriesList.findIndex((series) => series.id === Number(id));
  if (index !== -1) {
    seriesList.splice(index, 1);
  } else {
    throw new Error("Error occurred at delete");
  }
  console.log(`Series with ID ${id} deleted successfully.`);
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
