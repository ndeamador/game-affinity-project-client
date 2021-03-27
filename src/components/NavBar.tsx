import React, { useState } from 'react';
import { Dialog } from '@reach/dialog';
import { LoginDetails } from '../types';
import LoginForm from '../components/LoginForm';
import { useMutation } from '@apollo/client';
import { LOGIN, REGISTER_NEW_USER } from '../graphql/mutations';

const NavBar = () => {
  const [openModal, setOpenModal] = useState('none');

  const submitLogin = (data: LoginDetails) => {
    console.log('login', data);
    login({ variables: { email: data.email, password: data.password } });
  };

  const submitRegistration = (data: LoginDetails) => {
    console.log('register', data);
    registerNewUser({
      variables: { email: data.email, password: data.password },
    });
  };

  const [registerNewUser] = useMutation(REGISTER_NEW_USER, {
    onCompleted: (result) => {
      console.log(result);
    },
    onError: (err) => {
      console.log(err.message);
    },
  });

  const [login] = useMutation(LOGIN, {
    onCompleted: (result) => {
      console.log(result);
    },
    onError: (err) => {
      console.log(err.message);
    },
  });

  return (
    <div style={{ display: 'flex' }}>
      <div>
        <button onClick={() => setOpenModal('login')}>Login</button>
      </div>
      <div>
        <button onClick={() => setOpenModal('register')}>Register</button>
      </div>
      <Dialog aria-label='Login form' isOpen={openModal === 'login'}>
        <div>
          <button onClick={() => setOpenModal('none')}>Close</button>
        </div>
        <h3>Login</h3>
        <LoginForm onSubmit={submitLogin} buttonLabel='Login' />
      </Dialog>
      <Dialog aria-label='Registration form' isOpen={openModal === 'register'}>
        <div>
          <button onClick={() => setOpenModal('none')}>Close</button>
        </div>
        <h3>Register</h3>
        <LoginForm onSubmit={submitRegistration} buttonLabel='Register' />
      </Dialog>
    </div>
  );
};

export default NavBar;
