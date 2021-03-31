/** @jsxImportSource @emotion/react */

import { LoginDetails, LoginOrRegisterButtonProps } from '../types';
import { useMutation, useApolloClient } from '@apollo/client';
import LoginForm from '../components/LoginForm';
import { Dialog } from '@reach/dialog';
import { capitalizeFirstLetter } from '../utils/misc';

import { LOGIN, REGISTER_NEW_USER } from '../graphql/mutations';
import { Button, CircleButton } from './styledComponentsLibrary';

const LoginRegisterButton = ({
  loginOrRegister,
  setOpenModal,
  openModal,
}: LoginOrRegisterButtonProps) => {
  const apolloClient = useApolloClient();

  const [registerNewUser, { loading: registerLoading }] = useMutation(
    REGISTER_NEW_USER,
    {
      onCompleted: (result) => {
        console.log(result);
        setOpenModal('none');
      },
      onError: (err) => {
        console.log(err.message);
      },
    }
  );

  const [login, { loading: loginLoading }] = useMutation(LOGIN, {
    onCompleted: (result) => {
      console.log('login result: ', result);
      apolloClient.resetStore();
      setOpenModal('none');
    },
    onError: (err) => {
      console.log('login error:', err.message);
    },
  });

  const submitLogin = async (data: LoginDetails) => {
    login({ variables: { email: data.email, password: data.password } });
  };

  const submitRegistration = (data: LoginDetails) => {
    registerNewUser({
      variables: { email: data.email, password: data.password },
    });
  };

  const ariaLabel =
    loginOrRegister === 'login' ? 'Login form' : 'Registration form';
  const handleSubmit =
    loginOrRegister === 'login' ? submitLogin : submitRegistration;
  const loading = loginOrRegister === 'login' ? loginLoading : registerLoading;

  return (
    <div>
      <Button onClick={() => setOpenModal(loginOrRegister)}>
        {capitalizeFirstLetter(loginOrRegister)}
      </Button>

      <Dialog
        aria-label={ariaLabel}
        isOpen={openModal === loginOrRegister}
        css={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          ':click': {
            transition: 'transform 0.3s',
            transitionDuration: '0.3s',
            transitionTimingFunction: 'ease',
            transitionProperty: 'all',
          },
        }}
      >
        <div css={{ alignSelf: 'flex-end' }}>
          <CircleButton onClick={() => setOpenModal('none')}>x</CircleButton>
        </div>
        <h3>{capitalizeFirstLetter(loginOrRegister)}</h3>
        <LoginForm
          onSubmit={handleSubmit}
          buttonLabel={capitalizeFirstLetter(loginOrRegister)}
          loading={loading}
        />
      </Dialog>
    </div>
  );
};

export default LoginRegisterButton;
