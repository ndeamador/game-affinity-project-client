/** @jsxImportSource @emotion/react */

import { useMutation } from '@apollo/client';
import { css, keyframes } from '@emotion/react';
import { LOGIN } from '../graphql/mutations';
import { CURRENT_USER } from '../graphql/queries';
import { Button } from './styledComponentsLibrary';

const animations = {
  shine: keyframes`
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
    background: `linear-gradient(40deg,
        var(--button-gradient-border-color-1) 20%,
        var(--button-gradient-border-color-1) 40%,
        var(--button-gradient-border-color-2) 50%,
        var(--button-gradient-border-color-2) 55%,
        var(--button-gradient-border-color-1) 70%,
        var(--button-gradient-border-color-1) 100%)`,
    backgroundSize: '200% auto', // https://codersblock.com/blog/gradient-animation-trick/
    animation: `${animations.shine} 2s linear infinite`,
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
