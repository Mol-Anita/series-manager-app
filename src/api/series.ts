import { series } from "./mockdata/series";
import { SeriesStatus } from "@/types/seriesStatus";
      
export type SeriesFilters = {
  genres?: string[];
  search?: string;
  seasonNumber?: number;
};


type SeriesData = {
    title: string;
    image: string;
    genre: string[];
    description: string;
    totalSeasons: number;
    status: SeriesStatus;
};

export const fetchProducts = async (options?: SeriesFilters) => {

  let filteredProducts = series;
  console.log(series);
  if (options?.genres && options?.genres.length != 0) {
    filteredProducts = filteredProducts.filter((product) => {
      return product.genre.some((genre) => options.genres!.includes(genre));
    });
  }

  if (options?.seasonNumber) {
    filteredProducts = filteredProducts.filter((product) => {
      return product.totalSeasons >= (options.seasonNumber as number);
    });
  }

  if (options?.search && options.search.length > 0) {
    filteredProducts = filteredProducts.filter((product) => {
      return product.title.toLowerCase().includes(options.search!.toLowerCase());
    });
  }
  return filteredProducts;
};

export const saveSeries = async (data: SeriesData) => {
  const newId = series[series.length - 1].id + 1;
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
  series.push(newSeries);
};
