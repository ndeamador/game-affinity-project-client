/** @jsxImportSource @emotion/react */

import { useMutation } from '@apollo/client';
import { css, keyframes } from '@emotion/react';
import { LOGIN } from '../graphql/mutations';
import { CURRENT_USER } from '../graphql/queries';
import { Button } from './styledComponentsLibrary';

const animations = {
  borderGlow: keyframes`
  to {
    background-position: 200% center;
  }
  `,
};

const styles = {
  animatedBorder: css({
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 'var(--border-radius)',
    background: 'var(--animated-border-gradient)',
    backgroundSize: '200% auto', // https://codersblock.com/blog/gradient-animation-trick/
    animation: `${animations.borderGlow} 2s linear infinite`,
  }),
  button: css({
    backgroundColor: 'var(--button-gradient-border-color-1)',
    margin: '2px',
    // opacity: 0,
  }),
};

const LonginWithTestAccountButton = () => {
  const [login, { loading: loginLoading, error: loginError }] = useMutation(
    LOGIN,
    {
      // onCompleted: () => {
      // },
      onError: (err) => {
        console.log('login error:', err.message);
      },
      refetchQueries: [{ query: CURRENT_USER }],
    }
  );

  // important: currently requires test account to be set in the server manually.
  const submitLogin = async () => {
    await login({
      variables: {
        email: 'test-account@gap.com',
        password: 'TestAccountPassword',
      },
    });
  };

  return (
    <div css={styles.animatedBorder}>
      <Button css={styles.button} onClick={() => submitLogin()}>
        Login with test account
      </Button>
    </div>
  );
};

export default LonginWithTestAccountButton;
