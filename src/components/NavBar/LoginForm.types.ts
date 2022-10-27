import { OpenLoginRegisterModalOptions } from '../../types';

export interface LoginFormProps {
  setOpenModal: React.Dispatch<
    React.SetStateAction<OpenLoginRegisterModalOptions>
  >;
  loginOrRegister: 'login' | 'register';
}

export type FormInputs = {
  email: string;
  password: string;
};