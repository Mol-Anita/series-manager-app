import React from "react";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MySeries from "../app/my-series/page";
import AddSeriesForm from "../components/forms/AddSeriesForm";
import EditSeriesForm from "../components/forms/EditSeriesForm";
import SeriesCard from "../components/SeriesCard";
import { saveSeries, updateSeriesById, deleteSeriesById, fetchSeries, getSeriesById, classifySeriesLength } from "../api/series";
import userEvent from '@testing-library/user-event';
import SeasonNumberStats from "../components/SeasonNumberStats";

jest.mock("../api/series", () => ({
  saveSeries: jest.fn(),
  updateSeriesById: jest.fn(),
  deleteSeriesById: jest.fn(),
  fetchSeries: jest.fn(),
  getSeriesById: jest.fn(),
  classifySeriesLength: jest.fn()
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
  useParams: () => ({ id: "1" }),
  useSearchParams: () => ({ get: jest.fn(() => "1") }),
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

describe("Series CRUD Operations", () => {
  let queryClient;

  beforeEach(() => {
    queryClient = new QueryClient();
    jest.clearAllMocks();
  });

  describe("Create Series", () => {
    let queryClient;

    beforeEach(() => {
      queryClient = new QueryClient();
      jest.clearAllMocks();
      global.FileReader = class {
        constructor() {
          this.onload = null;
        }
        readAsDataURL() {
          setTimeout(() => {
            this.onload({ target: { result: "data:image/png;base64,mock" } });
          }, 0);
        }
      };
    });

    it("submits a new series successfully", async () => {
      saveSeries.mockResolvedValue({ id: 3 });

      render(
        <QueryClientProvider client={queryClient}>
          <AddSeriesForm />
        </QueryClientProvider>
      );

      fireEvent.change(screen.getByLabelText(/Series Title/i), {
        target: { value: "New Series" },
      });

      fireEvent.change(screen.getByLabelText(/Genres/i), {
        target: { value: "Drama, Crime" },
      });

      fireEvent.change(screen.getByLabelText(/Description/i), {
        target: { value: "A new exciting series" },
      });

      fireEvent.change(screen.getByLabelText(/Number of seasons/i), {
        target: { value: 5 },
      });

      const file = new File(['test content'], 'test.png', { type: 'image/png' });
      const fileInput = screen.getByTestId('image-input');
      await userEvent.upload(fileInput, file);

      await act(async () => {
        fireEvent.click(screen.getByTestId("button"));
      });

      await waitFor(() => {
        expect(saveSeries).toHaveBeenCalledWith({
          title: "New Series",
          genre: ["Drama", "Crime"],
          description: "A new exciting series",
          totalSeasons: 5,
          status: "Currently Watching",
          image: undefined,
        });
      });
    });
  });

  describe("Update Series", () => {
    it("updates an existing series successfully", async () => {
      getSeriesById.mockResolvedValue(mockSeries[0]);
      updateSeriesById.mockResolvedValue({
        ...mockSeries[0],
        title: "Updated Breaking Bad",
      });

      render(
        <QueryClientProvider client={queryClient}>
          <EditSeriesForm seriesId={1} />
        </QueryClientProvider>
      );

      await waitFor(() => {
        expect(screen.getByLabelText(/Series Title/i)).toHaveValue("Breaking Bad");
      });

      fireEvent.change(screen.getByLabelText(/Series Title/i), {
        target: { value: "Updated Breaking Bad" },
      });

      fireEvent.click(screen.getByRole("button"));

      await waitFor(() => {
        expect(updateSeriesById).toHaveBeenCalledWith(
          1,
          expect.objectContaining({
            title: "Updated Breaking Bad",
          })
        );
      });
    });
  });

  describe("Delete Series", () => {
    it("deletes a series successfully", async () => {
      deleteSeriesById.mockResolvedValue(true);
      fetchSeries.mockResolvedValue(mockSeries.filter((s) => s.id !== 1));

      const mockOnDelete = jest.fn();

      render(
        <SeriesCard
          id={1}
          title="Breaking Bad"
          image="https://example.com/breaking-bad.jpg"
          genres={["Drama", "Crime"]}
          seasons={5}
          onDelete={mockOnDelete}
          isOnMaster={false}
        />
      );

      fireEvent.click(screen.getByText(/Delete/i));

      const confirmDeleteButtons = screen.getAllByText(/Delete/i);
      fireEvent.click(confirmDeleteButtons[confirmDeleteButtons.length - 1]);

      await waitFor(() => {
        expect(mockOnDelete).toHaveBeenCalledWith(1);
      });
    });
  });

  describe("List Series", () => {
    it("renders series list correctly", async () => {
      fetchSeries.mockResolvedValue(mockSeries);

      render(
        <QueryClientProvider client={queryClient}>
          <MySeries />
        </QueryClientProvider>
      );

      await waitFor(() => {
        expect(screen.getByText("Breaking Bad")).toBeInTheDocument();
        expect(screen.getByText("Game of Thrones")).toBeInTheDocument();
      });
    });
  });
});