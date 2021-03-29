import { useApolloClient, useMutation } from '@apollo/client';
import { LOGOUT } from '../graphql/mutations';

const LogoutButton = () => {
  const [logout] = useMutation(LOGOUT);
  const apolloClient = useApolloClient();

  const handleClick = async () => {
    await logout();
    await apolloClient.resetStore();
  };

  return <button onClick={handleClick}>Logout</button>;
};

export default LogoutButton;
