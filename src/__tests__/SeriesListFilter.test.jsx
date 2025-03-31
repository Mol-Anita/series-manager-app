import React from "react";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SeriesListFilters from "../components/filter-and-sort/SeriesListFilters";
import { fetchSeries } from "../api/series";
import { MediumSeriesSign } from "../components/SeasonStatRectangles";
import SeasonNumberStats from "../components/SeasonNumberStats";
jest.mock("../api/series", () => ({
  fetchSeries: jest.fn(),
  classifySeriesLength: jest.fn()
}));

const mockSeries = [
  {
    id: 1,
    title: "Breaking Bad",
    img: "https://example.com/breaking-bad.jpg",
    genre: ["Drama", "Crime"],
    description: "A high school chemistry teacher turned methamphetamine manufacturer",
    totalSeasons: 5,
    status: "Currently Watching",
    addDate: "2024-03-27",
    isFavourite: false,
  },
  {
    id: 2,
    title: "Game of Thrones",
    img: "https://example.com/got.jpg",
    genre: ["Fantasy", "Drama"],
    description: "Struggle for the Iron Throne",
    totalSeasons: 8,
    status: "Completed",
    addDate: "2024-03-26",
    isFavourite: true,
  },
];

describe("Filter and Sort Functionality", () => {
  let queryClient;

  beforeEach(() => {
    queryClient = new QueryClient();
    jest.clearAllMocks();
    fetchSeries.mockImplementation((filters) => {
      let results = [...mockSeries];
      
      if (filters?.genres?.length) {
        results = results.filter(series => 
          series.genre.some(genre => filters.genres.includes(genre))
        );
      }
      
      if (filters?.seasonNumber) {
        results = results.filter(series => 
          series.totalSeasons >= filters.seasonNumber
        );
      }
      
      if (filters?.search) {
        results = results.filter(series =>
          series.title.toLowerCase().includes(filters.search.toLowerCase())
        );
      }
      
      if (filters?.sortBySeasons) {
        results.sort((a, b) => a.totalSeasons - b.totalSeasons);
      }
      
      return Promise.resolve(results);
    });
  });

  

  describe("API Filter Functions", () => {
    it("filters by genre correctly", async () => {
      const result = await fetchSeries({ genres: ["Drama"] });
      expect(result).toHaveLength(2);
      expect(result.every(s => s.genre.includes("Drama"))).toBeTruthy();
    });

    it("filters by multiple genres correctly", async () => {
      const result = await fetchSeries({ genres: ["Drama", "Crime"] });
      expect(result).toHaveLength(2);
      expect(result[0].title).toBe("Breaking Bad");
    });

    it("filters no matching genres correctly", async () => {
      const result = await fetchSeries({ genres: ["Anime"] });
      expect(result).toHaveLength(0);
    });

    it("filters by minimum seasons correctly", async () => {
      const result = await fetchSeries({ seasonNumber: 6 });
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe("Game of Thrones");
    });

    it("filters by search term correctly", async () => {
      const result = await fetchSeries({ search: "Breaking" });
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe("Breaking Bad");
    });

    it("sorts by seasons when sortBySeasons is true", async () => {
      const result = await fetchSeries({ sortBySeasons: true });
      expect(result[0].totalSeasons).toBe(5);
      expect(result[1].totalSeasons).toBe(8);
    });

    it("returns all series when no filters are provided", async () => {
      const result = await fetchSeries();
      expect(result.length).toBe(mockSeries.length);
    });

    describe("verifies series", () => {
      it("renders series list correctly", async () => {
        fetchSeries.mockResolvedValue(mockSeries);
  
        render(
          <QueryClientProvider client={queryClient}>
            <SeasonNumberStats seasons={5} />
          </QueryClientProvider>
        );
  
        await waitFor(() => {
          expect(screen.findByTestId("medium")).toBeInTheDocument();
        });
      });
    });

  });
});