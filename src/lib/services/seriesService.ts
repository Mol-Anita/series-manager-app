import { Series } from "@/types/series";
import axiosInstance from '../axios';

export type SeriesFilters = {
  genres?: string[];
  search?: string;
  seasonNumber?: number;
  sortBySeasons?: boolean;
};

type SeriesData = {
  Id: number;
  Title: string;
  Description: string;
  ImagePath: string;
  TotalSeasons: number;
  Genres: string[];
  Status: string;
};

export interface FetchSeriesResponse {
  result: Series[];
  meta: {
    TotalCount: number;
    PageSize: number;
    CurrentPage: number;
    TotalPages: number;
    HasNext: boolean;
    HasPrevious: boolean;
  };
}

export const fetchSeries = async (
  pageNumber: number,
  pageSize: number,
  options?: SeriesFilters
): Promise<FetchSeriesResponse> => {
  try {
    const params = new URLSearchParams();
    params.append("pageNumber", pageNumber.toString());
    params.append("pageSize", pageSize.toString());

    if (options?.genres?.length) {
      options.genres.forEach((genre) => params.append("genres", genre));
    }
    if (options?.search) params.set("search", options.search);
    if (options?.seasonNumber) params.set("seasonNumber", options.seasonNumber.toString());
    if (options?.sortBySeasons) params.set("sortBySeasons", String(options.sortBySeasons));

    const response = await axiosInstance.get<{ Result: Series[] }>('/api/series', { params });
    const metaRaw = response.headers['x-pagination'];

    const meta = metaRaw ? JSON.parse(metaRaw) : {
      TotalCount: 0,
      PageSize: 0,
      CurrentPage: 0,
      TotalPages: 0,
      HasNext: false,
      HasPrevious: false,
    };

    return {
      result: response.data.Result || [],
      meta,
    };
  } catch (error: any) {
    console.error("Error fetching series:", error);
    throw new Error(error.response?.data?.error || 'Failed to fetch series');
  }
};

export const getSeriesById = async (id: number): Promise<Series> => {
  try {
    const response = await axiosInstance.get<{ Result: Series }>(`/api/series/${id}`);
    return response.data.Result;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Failed to fetch series');
  }
};

export const saveSeries = async (data: SeriesData) => {
  try {
    const response = await axiosInstance.post('/api/series', data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Failed to save series');
  }
};

export const updateSeriesById = async (id: number, data: SeriesData) => {
  try {
    const response = await axiosInstance.put(`/api/series/${id}`, data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Failed to update series');
  }
};

export const deleteSeriesById = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/api/series/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Failed to delete series');
  }
};

export const classifySeriesLength = (series: { totalSeasons: number }): number => {
  if (!series || typeof series.totalSeasons !== "number") return 1;

  const avg = 5;
  const range = avg * 0.33;

  if (series.totalSeasons < avg - range) return 1;
  if (series.totalSeasons > avg + range) return 3;
  return 2;
};
