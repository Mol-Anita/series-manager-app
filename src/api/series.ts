import { series } from "./mockdata/series";
import { SeriesStatus } from "@/types/seriesStatus";

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
