/** @jsxImportSource @emotion/react */

import { useMutation } from '@apollo/client';
import { LOGIN } from '../../../graphql/mutations';
import { CURRENT_USER } from '../../../graphql/queries';
import { Button, Spinner } from '../../shared/styledComponentsLibrary';
import styles from './styles';

const LonginWithTestAccountButton = () => {
  const [login, { loading, error }] = useMutation(LOGIN, {
    // onCompleted: () => {
    // },
    onError: (err) => {
      console.log('login error:', err.message);
    },
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
