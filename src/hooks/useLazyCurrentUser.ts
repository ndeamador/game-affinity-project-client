import { ApolloError, useLazyQuery } from '@apollo/client';
import { CURRENT_USER } from '../graphql/queries';


const useLazyCurrentUser = () => {

  // return useLazyQuery(CURRENT_USER, {
  //   fetchPolicy: 'cache-first',
  //   onError: (err) => {
  //     console.log('CURRENT_USER Query error: ', err.message);
  //   },
  // });


  const [getCurrentUser, { data, ...result }] = useLazyQuery(CURRENT_USER, {
    fetchPolicy: 'cache-first',
    onError: (err: ApolloError) => {
      console.log('useLazyCurrentUser error: ', err.message);
    },
  });
  const currentUser = data.me;
  return { getCurrentUser, currentUser, ...result };
};


export default useLazyCurrentUser;


