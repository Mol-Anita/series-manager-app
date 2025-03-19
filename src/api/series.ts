import { series } from "./mockdata/series";
import { Genre } from "@/types/genre";
import { MultiSelect } from 'primereact/multiselect';
        
export type SeriesFilters = {
  genres?: Genre[];
  search?: string;
  seasonNumber?: number;
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
