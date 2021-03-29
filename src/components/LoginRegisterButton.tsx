import { LoginDetails, LoginOrRegisterButtonProps } from '../types';
import { useMutation, useApolloClient } from '@apollo/client';
import LoginForm from '../components/LoginForm';
import { Dialog } from '@reach/dialog';
import { capitalizeFirstLetter } from '../utils/misc';

import { LOGIN, REGISTER_NEW_USER } from '../graphql/mutations';

const LoginRegisterButton = ({
  loginOrRegister,
  setOpenModal,
  openModal,
}: LoginOrRegisterButtonProps) => {
  const apolloClient = useApolloClient();

  const [registerNewUser] = useMutation(REGISTER_NEW_USER, {
    onCompleted: (result) => {
      console.log(result);
      setOpenModal('none');
    },
    onError: (err) => {
      console.log(err.message);
    },
  });

  const [login] = useMutation(LOGIN, {
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

  return (
    <div>
      <button onClick={() => setOpenModal(loginOrRegister)}>
        {capitalizeFirstLetter(loginOrRegister)}
      </button>

      <Dialog aria-label={ariaLabel} isOpen={openModal === loginOrRegister}>
        <div>
          <button onClick={() => setOpenModal('none')}>Close</button>
        </div>
        <h3>{capitalizeFirstLetter(loginOrRegister)}</h3>
        <LoginForm
          onSubmit={handleSubmit}
          buttonLabel={capitalizeFirstLetter(loginOrRegister)}
        />
      </Dialog>
    </div>
  );
};

export default LoginRegisterButton;
