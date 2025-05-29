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


export const fetchSeries = async (pageNumber: number, pageSize: number, options?: SeriesFilters): Promise<FetchSeriesResponse> => {
  try {
    const url = new URL(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/series`); 

    url.searchParams.append("pageNumber", pageNumber.toString());
    url.searchParams.append("pageSize", pageSize.toString());

    if (options?.genres && options.genres.length > 0) options.genres.forEach((genre) => url.searchParams.append("genres", genre));
    if (options?.search) url.searchParams.set("search", options.search);
    if (options?.seasonNumber) url.searchParams.set("seasonNumber", options.seasonNumber.toString());
    if (options?.sortBySeasons) url.searchParams.set("sortBySeasons", options.sortBySeasons.toString());

    console.log('Fetching from URL:', url.toString());
    
    const response = await fetch(url.toString(), { 
      cache: "no-store",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      mode: 'cors',
    });
    const metaRaw = response.headers.get("X-Pagination");
    
    console.log('Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(`Failed to fetch series: ${response.statusText}. Details: ${errorText}`);
    }
    
    const data = await response.json();
    console.log('API Response:', data);

    let meta = null;

    if (metaRaw) {
      try {
        meta = JSON.parse(metaRaw);
      } catch (error) {
        console.warn("Failed to parse X-Pagination header:", error);
      }
    }
    
    if (!data.Result) {
      console.warn('No Result field in response:', data);
      return {result: [], meta: {
        TotalCount: 0,
        PageSize: 0,
        CurrentPage: 0,
        TotalPages: 0,
        HasNext: false,
        HasPrevious: false
      }};
    }
    
    console.log('Returning series data:', data.Result);
    return { result: data.Result, meta }
  } catch (error) {
    console.error('Error fetching series:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
      console.error('Error stack:', error.stack);
    }
    throw error;
  }
};

export const getSeriesById = async (id: number) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/series/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch series: ${response.statusText}`);
  }
  const seriesData = await response.json();
  console.log(seriesData);

  return seriesData.Result;
};

export const saveSeries = async (data: SeriesData) => {
  try {
    console.log('Sending data to server:', data);
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/series`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Server error response:', errorText);
      throw new Error(`Failed to save series: ${response.statusText}. Details: ${errorText}`);
    }

    const responseData = await response.json();
    console.log('Server response:', responseData);
    return responseData;
  } catch (error) {
    console.error('Error in saveSeries:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
      console.error('Error stack:', error.stack);
    }
    throw error;
  }
};

export const updateSeriesById = async (id: number, data: SeriesData) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/series/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Failed to update series: ${response.statusText}`);
  }

  return response.json();
};

export const deleteSeriesById = async (id: number) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/series/${id}`,{
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Failed to delete series: ${response.statusText}`);
  }

  return response.json();
};


export const classifySeriesLength = (series: { totalSeasons: number }): number => {
  if (!series || !series.totalSeasons) return 1;

  const totalSeasons = series.totalSeasons;
  const avgLength = 5; 

  const mediumRange = avgLength * 0.33;

  if (totalSeasons < avgLength - mediumRange) return 1;
  if (totalSeasons > avgLength + mediumRange) return 3;

  return 2;
};




