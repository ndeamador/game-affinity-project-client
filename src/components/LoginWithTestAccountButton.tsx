/** @jsxImportSource @emotion/react */

import { useMutation } from '@apollo/client';
import { LOGIN } from '../graphql/mutations';
import { CURRENT_USER } from '../graphql/queries';
import { Button } from './styledComponentsLibrary';

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

  return <Button onClick={() => submitLogin()}>Login with test account</Button>;
};

export default LonginWithTestAccountButton;
