export interface Game {
  id: number;
  name: string;
  background_image: string;
  rating: number;
  released: string;
  genres: { name: string }[];
  platforms: { platform: { name: string } }[];
  metacritic?: number;
}

export interface APIResponse {
  count: number;
  results: Game[];
}
