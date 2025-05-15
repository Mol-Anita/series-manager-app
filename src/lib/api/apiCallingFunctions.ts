import { Series, Genre } from "@/types/series";
import { SeriesStatus } from "@/types/seriesStatus";

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

const API_BASE_URL = "http://localhost:5001/api";

export const fetchSeries = async (options?: SeriesFilters) => {
  try {
    const url = new URL(`${API_BASE_URL}/series`); 

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
    
    console.log('Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(`Failed to fetch series: ${response.statusText}. Details: ${errorText}`);
    }
    
    const data = await response.json();
    console.log('API Response:', data);
    
    if (!data.Result) {
      console.warn('No Result field in response:', data);
      return [];
    }
    
    console.log('Returning series data:', data.Result);
    return data.Result || [];
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
  const response = await fetch(`${API_BASE_URL}/series/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch series: ${response.statusText}`);
  }
  const seriesData = await response.json();

  return seriesData.Result;
};

export const saveSeries = async (data: SeriesData) => {
  try {
    console.log('Sending data to server:', data);
    
    const response = await fetch(`${API_BASE_URL}/series`, {
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
  const response = await fetch(`${API_BASE_URL}/series/${id}`, {
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
  const response = await fetch(`${API_BASE_URL}/series/${id}`,{
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Failed to delete series: ${response.statusText}`);
  }

  return response.json();
};

export const getGenreData = async () => {
  const genreData: Record<string, number> = {
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

  const series = await fetchSeries();
  series.forEach((series: Series) => {
    series.Genres.forEach((genre: string) => {
      genreData[genre]++;
    });
  });

  const formattedGenreData = Object.entries(genreData).map(([name, value]) => ({
    value,
    name,
  }));

  return formattedGenreData;
};

export const updateChartDataAsync = async (
  currentData: { name: string; value: number }[]
): Promise<{ name: string; value: number }[]> => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      if (currentData.length === 0) {
        resolve(currentData);
        return;
      }

      const series = await fetchSeries();
      if (series.length === 0) {
        resolve(currentData);
        return;
      }

      const randomIndex = Math.floor(Math.random() * series.length);
      const randomSeries = series[randomIndex];
      
      if (randomSeries.genres.length > 0) {
        const newGenre = randomSeries.genres[0].name;
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
      } else {
        resolve(currentData);
      }
    }, 500);
  });
};

export const classifySeriesLength = (series: { totalSeasons: number }): number => {
  if (!series || !series.totalSeasons) return 1;

  const totalSeasons = series.totalSeasons;
  const avgLength = 5; // Default average length

  const mediumRange = avgLength * 0.33;

  if (totalSeasons < avgLength - mediumRange) return 1;
  if (totalSeasons > avgLength + mediumRange) return 3;

  return 2;
};
