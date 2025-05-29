/* import { Series, Genre } from "@/types/series";
import { SeriesStatus } from "@/types/seriesStatus";
import { fetchSeries } from "./seriesService";

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

  const series = await fetchSeries(1,1);
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

      const series = await fetchSeries(1,1);
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

 */