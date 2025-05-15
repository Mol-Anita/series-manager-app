
export type Genre = {
  id: number;
  name: string;
};

export type SeriesStatus = {
  id: number;
  name: string;
};

export type Series = {
  Id: number;
  Title: string;
  Description: string;
  ImagePath: string;
  TotalSeasons: number;
  AddDate: string;
  IsFavourite: boolean;
  StatusId: number;
  Genres: string[];
  Status: string;
};