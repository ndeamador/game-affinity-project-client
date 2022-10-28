/** @jsxImportSource @emotion/react */

import { useApolloClient, useMutation } from '@apollo/client';
import { LOGOUT } from 'graphql/mutations';
import styles from './LogoutButton.styles';
import Button from 'components/shared/Button';
import Spinner from 'components/shared/Spinner';

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
