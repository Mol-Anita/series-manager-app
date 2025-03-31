import { seriesList } from "../../seriesStore";
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
  image?: string;
  genre: string[];
  description: string;
  totalSeasons: number;
  status: SeriesStatus;
};


export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const param = await params;
  const id = await Number(param.id);
  const foundSeries = seriesList.find((series) => series.id === id);

  if (!foundSeries) {
    return NextResponse.json({ error: "Series not found" }, { status: 404 });
  }

  return NextResponse.json({result: foundSeries});
}

export async function PUT(request: NextRequest, { params }: { params: {id: number} }) {
  const param = await params;
  const id = Number(param.id);
  const index = seriesList.findIndex((series) => series.id === id);

  if (index === -1) {
    return NextResponse.json({ error: "Series not found" }, { status: 404 });
  }

  const data: SeriesData = await request.json();

  seriesList[index] = {
    ...seriesList[index], 
    title: data.title ?? seriesList[index].title,
    genre: data.genre ?? seriesList[index].genre,
    description: data.description ?? seriesList[index].description,
    totalSeasons: data.totalSeasons ?? seriesList[index].totalSeasons,
    status: data.status ?? seriesList[index].status,
    img: data.image || seriesList[index].img,
  };
  
  return NextResponse.json({ message: "Series updated successfully" }, { status: 200 });
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const param = await params;
  const id = Number(param.id);
  const index = seriesList.findIndex((series) => series.id === id);

  if (index === -1) {
    return NextResponse.json({ error: "Series not found" }, { status: 404 });
  }

  seriesList.splice(seriesList.findIndex((series) => series.id === id), 1);

  return NextResponse.json({ message: "Series deleted successfully" }, { status: 200 });
}
