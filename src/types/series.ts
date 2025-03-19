import { SeriesStatus } from "./seriesStatus";

export type Series = {
    id: number;
    title: string;
    img: string;
    genre: string[];
    description: string;
    totalSeasons: number;
    status: SeriesStatus;
    addDate: string;
    isFavourite: boolean;
};