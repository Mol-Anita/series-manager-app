import { Series } from "@/types/series";

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

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchSeries = async (
  pageNumber: number,
  pageSize: number,
  options?: SeriesFilters
): Promise<FetchSeriesResponse> => {
  try {
    const url = new URL(`${BASE_URL}/api/series`);

    url.searchParams.append("pageNumber", pageNumber.toString());
    url.searchParams.append("pageSize", pageSize.toString());

    if (options?.genres?.length) {
      options.genres.forEach((genre) => url.searchParams.append("genres", genre));
    }
    if (options?.search) url.searchParams.set("search", options.search);
    if (options?.seasonNumber) url.searchParams.set("seasonNumber", options.seasonNumber.toString());
    if (options?.sortBySeasons) url.searchParams.set("sortBySeasons", String(options.sortBySeasons));

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      mode: "cors",
      credentials: "same-origin", // or 'include' if using auth/cookies
    });

    const metaRaw = response.headers.get("X-Pagination");

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch series: ${response.statusText}. Details: ${errorText}`);
    }

    const data = await response.json();

    const meta = metaRaw ? JSON.parse(metaRaw) : {
      TotalCount: 0,
      PageSize: 0,
      CurrentPage: 0,
      TotalPages: 0,
      HasNext: false,
      HasPrevious: false,
    };

    return {
      result: data.Result || [],
      meta,
    };
  } catch (error) {
    console.error("Error fetching series:", error);
    throw error;
  }
};

export const getSeriesById = async (id: number): Promise<Series> => {
  const response = await fetch(`${BASE_URL}/api/series/${id}`, {
    headers: { Accept: "application/json" },
    mode: "cors",
    credentials: "same-origin",
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch series: ${response.statusText}. Details: ${errorText}`);
  }

  const json = await response.json();
  return json.Result;
};

export const saveSeries = async (data: SeriesData) => {
  const response = await fetch(`${BASE_URL}/api/series`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
    mode: "cors",
    credentials: "same-origin",
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to save series: ${response.statusText}. Details: ${errorText}`);
  }

  return response.json();
};

export const updateSeriesById = async (id: number, data: SeriesData) => {
  const response = await fetch(`${BASE_URL}/api/series/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
    mode: "cors",
    credentials: "same-origin",
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to update series: ${response.statusText}. Details: ${errorText}`);
  }

  return response.json();
};

export const deleteSeriesById = async (id: number) => {
  const response = await fetch(`${BASE_URL}/api/series/${id}`, {
    method: "DELETE",
    headers: { Accept: "application/json" },
    mode: "cors",
    credentials: "same-origin",
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to delete series: ${response.statusText}. Details: ${errorText}`);
  }

  return response.json();
};

export const classifySeriesLength = (series: { totalSeasons: number }): number => {
  if (!series || typeof series.totalSeasons !== "number") return 1;

  const avg = 5;
  const range = avg * 0.33;

  if (series.totalSeasons < avg - range) return 1;
  if (series.totalSeasons > avg + range) return 3;
  return 2;
};
