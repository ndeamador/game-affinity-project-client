export interface Game {
  id: string;
  name: string;
  summary?: string;
  firstReleaseDate?: number;
}

export interface GameQuery {
  findGames: Game[]
}