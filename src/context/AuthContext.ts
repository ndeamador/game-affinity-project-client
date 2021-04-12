
import React from 'react';
import { User } from '../types';

interface AuthContextProps {
  currentUser: User;
}

const AuthContext = React.createContext<AuthContextProps | undefined>(undefined);

export default AuthContext;