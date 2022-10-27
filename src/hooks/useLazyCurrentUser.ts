import { ApolloError, useLazyQuery } from '@apollo/client';
import { CURRENT_USER } from 'graphql/queries';


const useLazyCurrentUser = () => {

  const [getCurrentUser, { data, ...result }] = useLazyQuery(CURRENT_USER, {
    fetchPolicy: 'cache-first',
    onError: (err: ApolloError) => {
      console.log('useLazyCurrentUser error: ', err.message);
    },
  });

  const currentUser = data?.me;
  // console.log('uselazycurrentuser response: ', data);
  // console.log('useLazyCurrentUser data:', currentUser?.email);
  return { getCurrentUser, currentUser, ...result };
};


export default useLazyCurrentUser;


