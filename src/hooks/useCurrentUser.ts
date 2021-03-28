import { useQuery } from '@apollo/client';
import { CURRENT_USER } from '../graphql/queries';
import { User } from '../types';

interface useCurrentUserReturn {
  authenticatedUser: User;
  loading: boolean;
}

const useCurrentUser = (): useCurrentUserReturn => {

  const { data, loading } = useQuery(CURRENT_USER, {
    fetchPolicy: 'cache-and-network',
    onCompleted: (data) => {
      if (data.me === null) {
        console.log('User not logged in');
      } else {
        console.log('User logged in: ', data);
      }
    },
    onError: (err) => {
      console.log('CURRENT_USER Query error: ', err.message);
    },
  });

  return {
    authenticatedUser: data ? data.me : null,
    loading,
  }
}

export default useCurrentUser;


