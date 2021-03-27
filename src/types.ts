export interface Game {
  id: string;
  name: string;
  summary?: string;
  firstReleaseDate?: number;
}

export interface GameQuery {
  findGames: Game[]
}

export interface LoginDetails {
  email: string;
  password: string;
}