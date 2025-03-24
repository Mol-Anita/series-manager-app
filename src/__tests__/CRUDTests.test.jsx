import "@testing-library/jest-dom";

import {
  getSeriesById,
  fetchSeries,
  saveSeries,
  updateSeriesById,
  deleteSeriesById,
} from "../api/series";

jest.mock("../api/series", () => ({
  seriesList: [
    { id: 1, title: "Breaking Bad", genre: ["Crime"], totalSeasons: 5 },
    { id: 2, title: "Stranger Things", genre: ["Sci-Fi"], totalSeasons: 4 },
  ]

}));

test("fetches correct series by ID", async () => {
  const series = await getSeriesById(1);
  expect(series).toEqual({
    id: 1,
    title: "Breaking Bad",
    genre: ["Crime"],
    totalSeasons: 5,
  });
});
