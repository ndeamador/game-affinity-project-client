import { useLazyQuery } from '@apollo/client';
import { CURRENT_USER } from '../graphql/queries';


const useLazyCurrentUser = () => {

  return useLazyQuery(CURRENT_USER, {
    fetchPolicy: 'cache-first',
    onError: (err) => {
      console.log('CURRENT_USER Query error: ', err.message);
    },
  });

}

export default useLazyCurrentUser;


