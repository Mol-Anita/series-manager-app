import {Genre} from "./genre"

export type Series = {
    id: number;
    title: string;
    img: string;
    genre: Genre[];
    description: string;
    totalSeasons: number;
    status: 'Watched' | 'Currently Watching' | 'Watchlist'
    platform: string;
    isFavourite: boolean;
};