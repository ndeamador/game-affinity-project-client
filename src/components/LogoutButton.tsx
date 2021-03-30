import { useApolloClient, useMutation } from '@apollo/client';
import { LOGOUT } from '../graphql/mutations';
import { Button } from './styledComponentsLibrary';

const LogoutButton = () => {
  const [logout] = useMutation(LOGOUT);
  const apolloClient = useApolloClient();

  const handleClick = async () => {
    await logout();
    await apolloClient.resetStore();
  };

  return <Button onClick={handleClick}>Logout</Button>;
};

export default LogoutButton;
