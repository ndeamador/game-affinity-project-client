/** @jsxImportSource @emotion/react */

import { useApolloClient, useMutation } from '@apollo/client';
import { LOGOUT } from 'graphql/mutations';
import { Button, Spinner } from 'components/shared/styledComponentsLibrary';
import styles from './LogoutButton.styles';

const LogoutButton = () => {
  const [logout, { loading }] = useMutation(LOGOUT, {
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

  return (
    <Button css={styles.button} onClick={handleClick}>
      {loading ? <Spinner /> : 'Logout'}
    </Button>
  );
};

export default LogoutButton;
