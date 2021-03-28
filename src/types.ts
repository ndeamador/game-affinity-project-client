export interface Game {
  id: string;
  name: string;
  summary?: string;
  firstReleaseDate?: number;
}

export interface GameQuery {
  findGames: Game[]
}

export interface User {
  id: string;
  // username: String!
  email: string;
}

export interface LoginDetails {
  email: string;
  password: string;
}


export type LoginOrRegisterOptions = 'login' | 'register';
export type OpenLoginRegisterModalOptions = LoginOrRegisterOptions | 'none';

export interface LoginOrRegisterButtonProps {
  loginOrRegister: LoginOrRegisterOptions;
  setOpenModal: React.Dispatch<React.SetStateAction<OpenLoginRegisterModalOptions>>;
  openModal: OpenLoginRegisterModalOptions;
}