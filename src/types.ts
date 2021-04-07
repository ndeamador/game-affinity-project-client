export interface Game {
  id: string;
  name: string;
  summary?: string;
  firstReleaseDate?: number;
  cover: Cover;
}

export interface Cover {
  id: number;
  image_id: string;
  url: string;
  height: number;
  width: number;
}

export interface GameQuery {
  findGames: Game[]
}

export interface User {
  id: string;
  // username: String!
  email: string;
  gamesInLibrary: [GameInUserLibrary];
}

export interface LoginDetails {
  email: string;
  password: string;
}

export interface GameInUserLibrary {
  id: number;
  igdb_game_id: number;
}

export interface libraryIdsResponse { // review
  getLibraryIds: GameInUserLibrary[];
}

export interface MeResponse {
  me: User;
}

export type LoginOrRegisterOptions = 'login' | 'register';
export type OpenLoginRegisterModalOptions = LoginOrRegisterOptions | 'none';

export interface LoginOrRegisterModalProps {
  loginOrRegister: LoginOrRegisterOptions;
  setOpenModal: React.Dispatch<React.SetStateAction<OpenLoginRegisterModalOptions>>;
  openModal: OpenLoginRegisterModalOptions;
}

export type ButtonTypes = 'regular' | 'hoverDot';
export interface LoginOrRegisterButtonProps extends LoginOrRegisterModalProps {
  buttonType: ButtonTypes;
}