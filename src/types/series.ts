import { Genre } from "./genre"
import { SeriesStatus } from "./seriesStatus";

export type Series = {
    id: number;
    title: string;
    img: string;
    genre: Genre[];
    description: string;
    totalSeasons: number;
    status: SeriesStatus;
    addDate: string;
    isFavourite: boolean;
};