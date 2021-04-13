import React, { ProviderProps, useEffect } from 'react';
import useCurrentUser from '../hooks/useCurrentUser';
import { User } from '../types';
import FullPageSpinner from '../components/FullPageSpinner';
import { FullPageError } from '../components/styledComponentsLibrary';
import useLazyCurrentUser from '../hooks/useLazyCurrentUser';

interface AuthContextValue {
  currentUser: User;
}

type AuthCtxtProviderPropsOmitValue = Omit<ProviderProps<AuthContextValue>, 'value'>

const AuthContext = React.createContext<AuthContextValue | undefined>(
  undefined
);
// Provide a more specific name to be shown in React Dev Tools > Components
AuthContext.displayName = 'AuthContext';

const useAuthContext = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(
      `Context is undefined. useAuth must be used withing an AuthContext provider.`
    );
  }
  return { currentUser: context.currentUser };
};


const AuthProvider: React.FunctionComponent<AuthCtxtProviderPropsOmitValue> = (props) => {
  // const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { getCurrentUser, currentUser, loading, error } = useLazyCurrentUser();

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  console.log('user: ', currentUser, ' - loadingUser: ', loading);

  if (loading) return <FullPageSpinner />;
  if (error) return <FullPageError error={error} />;

  return <AuthContext.Provider value={{ currentUser }} {...props} />;
  // return (
  //   <AuthContext.Provider value={{ currentUser }}>
  //     {children}
  //   </AuthContext.Provider>
  // );
};

export { AuthProvider, useAuthContext };
