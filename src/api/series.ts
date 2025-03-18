import { series } from "./mockdata/series";
import { Genre } from "@/types/genre";

export type SeriesFilters = {
  genres?: Genre[];
  search?: string;
  seasonNumber?: number;
};

export const fetchProducts = async (options?: SeriesFilters) => {

  let filteredProducts = series;
  console.log(series);
  if (options?.genres) {
    filteredProducts = filteredProducts.filter((product) => {
      product.genre.forEach(genre => {
        if (options?.genres && genre in options.genres){
            return true;
        }
        return false;
      }); 
    });
  }

  if (options?.seasonNumber) {
    filteredProducts = filteredProducts.filter((product) => {
      return product.totalSeasons >= (options.seasonNumber as number);
    });
  }

  if (options?.search) {
    filteredProducts = filteredProducts.filter((product) => {
      return product.title.toLowerCase().includes(options.search!.toLowerCase());
    });
  }
  return filteredProducts;
};
