import { useApolloClient, useMutation } from '@apollo/client';
import { LOGOUT } from '../graphql/mutations';
import { Button } from './styledComponentsLibrary';

const LogoutButton = () => {
  const [logout] = useMutation(LOGOUT, {
    onError: (err) => {
      console.log('Logout mutation error: ', err);
    },
  });
  const apolloClient = useApolloClient();

  const handleClick = async () => {
    try {
      await logout();
      await apolloClient.resetStore(); // This also refetches all queries
    } catch (err) {
      console.log('Error logging out: ', err);
    }
  };

  return <Button onClick={handleClick}>Logout</Button>;
};

export default LogoutButton;
