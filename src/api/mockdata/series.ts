import { Series } from '@/types/series';
import { SeriesStatus } from '@/types/seriesStatus';

export const series: Series[] = [
  {
    id: 1,
    title: "Breaking Bad",
    genre: ["Crime", "Drama", "Thriller"],
    description: "A high school chemistry teacher turned methamphetamine manufacturer.",
    img: "/images/mockup.jpg",
    totalSeasons: 5,
    status: "Watched",
    addDate: "2024-03-15",
    isFavourite: false
  },
  {
    id: 2,
    title: "Stranger Things",
    genre: ["Sci-Fi", "Horror", "Mystery"],
    description: "A group of kids uncover supernatural mysteries in their small town.",
    img: "/images/mockup.jpg",
    totalSeasons: 4,
    status: "Currently Watching",
    addDate: "2024-03-16",
    isFavourite: false
  },
  {
    id: 3,
    title: "Game of Thrones",
    genre: ["Fantasy", "Drama", "Adventure"],
    description: "Noble families vie for control of the Iron Throne in a medieval fantasy world.",
    img: "/images/mockup.jpg",
    totalSeasons: 8,
    status: "Watched",
    addDate: "2024-03-14",
    isFavourite: false
  },
  {
    id: 4,
    title: "The Witcher",
    genre: ["Fantasy", "Adventure", "Action"],
    description: "A monster hunter navigates a world filled with magic and political intrigue.",
    img: "/images/mockup.jpg",
    totalSeasons: 3,
    status: "Watchlist",
    addDate: "2024-03-12",
    isFavourite: false
  },
  {
    id: 5,
    title: "Dark",
    genre: ["Sci-Fi", "Mystery", "Thriller"],
    description: "A mind-bending time travel story set in a small German town.",
    img: "/images/mockup.jpg",
    totalSeasons: 3,
    status: "Watched",
    addDate: "2024-03-10",
    isFavourite: false
  },
  {
    id: 6,
    title: "Money Heist",
    genre: ["Crime", "Drama", "Thriller"],
    description: "A criminal mastermind plans a heist on the Royal Mint of Spain.",
    img: "/images/mockup.jpg",
    totalSeasons: 5,
    status: "Currently Watching",
    addDate: "2024-03-18",
    isFavourite: false
  },
  {
    id: 7,
    title: "Sherlock",
    genre: ["Crime", "Mystery", "Drama"],
    description: "A modern adaptation of Sherlock Holmes solving crimes in London.",
    img: "/images/mockup.jpg",
    totalSeasons: 4,
    status: "Watched",
    addDate: "2024-03-07",
    isFavourite: false
  },
  {
    id: 8,
    title: "The Mandalorian",
    genre: ["Sci-Fi", "Adventure", "Action"],
    description: "A bounty hunter explores the galaxy in the Star Wars universe.",
    img: "/images/mockup.jpg",
    totalSeasons: 3,
    status: "Watchlist",
    addDate: "2024-03-08",
    isFavourite: false
  },
  {
    id: 9,
    title: "Westworld",
    genre: ["Sci-Fi", "Drama", "Mystery"],
    description: "A futuristic theme park where AI gains consciousness.",
    img: "/images/mockup.jpg",
    totalSeasons: 4,
    status: "Watched",
    addDate: "2024-03-05",
    isFavourite: false
  },
  {
    id: 10,
    title: "Better Call Saul",
    genre: ["Crime", "Drama"],
    description: "The story of a small-time lawyer before Breaking Bad.",
    img: "/images/mockup.jpg",
    totalSeasons: 6,
    status: "Currently Watching",
    addDate: "2024-03-17",
    isFavourite: false
  },
  ...generateRandomSeries(30)
];

function generateRandomSeries(count: number) {
  const genres = ["Crime", "Drama", "Thriller", "Sci-Fi", "Horror", "Mystery", "Fantasy", "Adventure", "Action", "Comedy", "Romance", "Dark Comedy", "Animation", "Anthology", "Biography", "Anime"];
  const statuses : SeriesStatus[] = ["Watched" , "Currently Watching", "Watchlist"];

  return Array.from({ length: count }, (_, i) => ({
    id: i + 11,
    title: `Series ${i + 11}`,
    genre: [genres[Math.floor(Math.random() * genres.length)], genres[Math.floor(Math.random() * genres.length)]],
    description: "A random description for the series.",
    img: "/images/mockup.jpg",
    totalSeasons: Math.floor(Math.random() * 10) + 1,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    addDate: `2024-03-${Math.floor(Math.random() * 30) + 1}`,
    isFavourite: false
  }));
}
