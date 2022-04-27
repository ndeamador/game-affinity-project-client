import { number } from 'yup';

export interface Game {
  id: string;
  name: string;
  summary?: string;
  first_release_date?: number;
  cover: Cover;
  platforms: Platform[];
  genres: Genre[];
  total_rating_count: number;
  involved_companies: InvolvedCompany[];
  average_rating?: number;
}

export interface InvolvedCompany {
  id: number;
  developer: boolean;
  company: Company;
}

export interface Company {
  id: number;
  name: string;
}


export interface Platform {
  id: number;
  name: string;
  platform_family?: number;
  category?: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Cover {
  id: number;
  image_id: string;
}

export interface GameQuery {
  findGames: Game[]
}

export interface LoginDetails {
  email: string;
  password: string;
}

export interface User {
  id: string;
  // username: String!
  email: string;
  gamesInLibrary: [GameInUserLibrary];
}

export interface GameInUserLibrary {
  id: string;
  igdb_game_id: number;
  rating?: Rating;
}

export type Rating = 0 | 1 | 2 | 3 | null;

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

export interface WindowSize {
  height: number;
  width: number;
}


// temp anys
export interface SquidParticleBaseProps {
  x: number;
  y: number;
  directionX: number;
  directionY: number;
  size: number;
  color?: string;
}

export interface SquidParticleProps extends SquidParticleBaseProps {
  mouseRadius: number;
  windowSize: WindowSize;
  // bounceElement?: React.MutableRefObject<HTMLDivElement | null>
  bounceElement?: DOMRect | undefined;
}

export interface MousePositionProps {
  x: number | null;
  y: number | null;
}