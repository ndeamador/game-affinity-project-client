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
  subrating?: number;
}

export type Rating = 0 | 1 | 2 | 3 | 4 ;

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
  scrollHeight: number;
  scrollWidth: number;
}

export interface AnimatedParticleBaseProps {
  x: number;
  y: number;
  directionX: number;
  directionY: number;
  size: number;
  color: string | 'black';
}

export interface AnimatedParticleProps extends AnimatedParticleBaseProps {
  mouseRadius?: number;
  windowSize: WindowSize;
  bounceElements?: BounceBoxState;
  index: number;
  onNewFrame: (index: number, initialParticle: AnimatedParticleBaseProps) => void;
  mouse: MousePositionProps;
}

export interface MousePositionProps {
  x: number | null;
  y: number | null;
}

export interface Point {
  x: number,
  y: number,
}

export interface ConnectingLinesProps {
  particlesArray: AnimatedParticleBaseProps[] | undefined;
  stickyElements?: BounceBoxState;
}

export interface DeconstructedDOMRect {
  top: number,
  left: number,
  bottom: number,
  right: number
}

export interface RectWithBoundingPoints extends DeconstructedDOMRect {
  width: number,
  height: number,
  boundingPoints?: {
    center: Point
    top: Point,
    bottom: Point,
    left: Point,
    right: Point
  }
}

// export type BounceBoxKey = 'searchBar' | 'testBox';
export type BounceBoxKey = 'searchBar';


// https://www.typescriptlang.org/docs/handbook/2/mapped-types.html
export type BounceBoxState = {
  [key in BounceBoxKey]: RectWithBoundingPoints;
};

export interface BounceBoxUseStateContext {
  bounceBoxes: BounceBoxState | undefined;
  storeBounceBox: (propName: BounceBoxKey, ref: React.MutableRefObject<HTMLElement | null>) => void;
}

