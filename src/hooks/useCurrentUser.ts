import { ApolloError, useQuery } from '@apollo/client';
import { CURRENT_USER } from 'graphql/queries';
import { User } from 'types';

interface useCurrentUserReturn {
  currentUser: User;
  loading: boolean;
  error: ApolloError | undefined;
}

const useCurrentUser = (): useCurrentUserReturn => {

  const { data, loading, error } = useQuery(CURRENT_USER, {
    fetchPolicy: 'cache-first',
    onError: (err) => {
      console.log('CURRENT_USER Query error: ', err.message);
    },
  });

  return {
    currentUser: data ? data.me : null,
    loading,
    error
  }
}

export default useCurrentUser;


