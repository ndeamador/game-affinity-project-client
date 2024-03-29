/** @jsxImportSource @emotion/react */

import { useMutation } from '@apollo/client';
import { LOGIN } from 'graphql/mutations';
import { CURRENT_USER } from 'graphql/queries';
import styles from './LoginWithTestAccountButton.styles';
import Button from 'components/shared/Button';
import Spinner from 'components/shared/Spinner';

const LonginWithTestAccountButton = () => {
  const [login, { loading, error }] = useMutation(LOGIN, {
    refetchQueries: [{ query: CURRENT_USER }],
  });

  // important: currently requires test account to be set in the server manually.
  const submitLogin = async () => {
    await login({
      variables: {
        email: 'guest-account@gap.com',
        password: 'GuestAccountPassword',
        guest: true,
      },
    });
  };

  return (
    <div css={styles.animatedBorder}>
      <Button css={styles.button} onClick={() => submitLogin()}>
        {loading ? (
          <Spinner />
        ) : error ? (
          'Something went wrong'
        ) : (
          'Login with test account'
        )}
      </Button>
    </div>
  );
};

export default LonginWithTestAccountButton;
