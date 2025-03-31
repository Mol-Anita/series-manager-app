import { seriesList } from "../seriesStore";
import { NextResponse, NextRequest } from "next/server";
import { SeriesStatus } from "@/types/seriesStatus";

export type SeriesFilters = {
  genres?: string[];
  search?: string;
  seasonNumber?: number;
  sortBySeasons?: boolean;
};

type SeriesData = {
  title: string;
  image: string;
  genre: string[];
  description: string;
  totalSeasons: number;
  status: SeriesStatus;
};


export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  let filteredSeries = [...seriesList];

  const genres = searchParams.getAll("genres"); 
  const seasonNumber = searchParams.get("seasonNumber")
    ? parseInt(searchParams.get("seasonNumber") || "", 10)
    : undefined;
  const search = searchParams.get("search") || "";
  const sortBySeasons = searchParams.get("sortBySeasons") === "true"; 

  if (genres.length > 0) {
    filteredSeries = filteredSeries.filter((series) =>
      series.genre.some((genre) => genres.includes(genre))
    );
  }

  if (seasonNumber) {
    filteredSeries = filteredSeries.filter((series) => series.totalSeasons >= seasonNumber);
  }

  if (search) {
    filteredSeries = filteredSeries.filter((series) =>
      series.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (sortBySeasons) {
    filteredSeries.sort((a, b) => a.totalSeasons - b.totalSeasons);
  }

  return NextResponse.json({ result: filteredSeries }, { status: 200 });
}

export async function POST(request: NextRequest) {
  try {
    const data: SeriesData = await request.json();

    if (!data.title || !data.genre || !data.description || !data.totalSeasons || !data.status) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newId = seriesList.length > 0 ? seriesList[seriesList.length - 1].id + 1 : 1;

    const date = new Date();
    const addDate = `${date.getMonth() + 1}-${date.getFullYear()}-${date.getTime()}`;

    const newSeries = {
      id: newId,
      title: data.title,
      genre: data.genre,
      description: data.description,
      img: data.image || "", 
      totalSeasons: data.totalSeasons,
      status: data.status,
      addDate: addDate,
      isFavourite: false,
    };

    seriesList.push(newSeries);

    return NextResponse.json({ message: "Series added successfully", newSeries }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request data" }, { status: 400 });
  }
}
