export interface Game {
  id: number;
  name: string;
  background_image: string;
  rating: number;
  released: string;
  genres: {
    [x: string]: Key | null | undefined; name: string 
}[];
  platforms: { platform: {
    id: any; name: string 
} }[];
  metacritic?: number;
}

export interface APIResponse {
  count: number;
  results: Game[];
}
