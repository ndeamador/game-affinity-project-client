import React, { ProviderProps, useEffect } from 'react';
import { User } from 'types';
import FullPageSpinner from 'components/shared/FullPageSpinner';
import useLazyCurrentUser from 'hooks/useLazyCurrentUser';
import ErrorMessage from 'components/shared/ErrorMessage';

// THIS FILE IS DEPRECATED
// Access to authentication info has been refactored to use exclusively Apollo's caching instead of React Context.

interface AuthContextValue {
  currentUser: User;
}

type AuthCtxtProviderPropsOmitValue = Omit<
  ProviderProps<AuthContextValue>,
  'value'
>;

const AuthContext = React.createContext<AuthContextValue | undefined>(
  undefined
);
// Provide a more specific name to be shown in React Dev Tools > Components
AuthContext.displayName = 'AuthContext';

const useAuthContext = () => {
  const context = React.useContext(AuthContext);
  console.log('in useauthcontext:', context?.currentUser);
  if (context === undefined) {
    throw new Error(
      `Context is undefined. useAuth must be used within an AuthContext provider.`
    );
  }
  return { currentUser: context.currentUser };
};

const AuthProvider: React.FunctionComponent<AuthCtxtProviderPropsOmitValue> = (
  props
) => {
  // const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { getCurrentUser, currentUser, loading, error } = useLazyCurrentUser();

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  if (loading) return <FullPageSpinner />;
  if (error) return <ErrorMessage variant='stacked'>{error}</ErrorMessage>;

  // Thanks to {...props} we can wrap other components with this exported context provider.
  return <AuthContext.Provider value={{ currentUser }} {...props} />;
};

export { AuthProvider, useAuthContext };

// Resources:
// https://stackoverflow.com/questions/67067155/type-props-for-a-context-provider-wrapping-app
// https://kentcdodds.com/blog/how-to-use-react-context-effectively/
