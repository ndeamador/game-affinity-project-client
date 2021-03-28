import React, { useState } from 'react';
import { OpenLoginRegisterModalOptions } from '../types';

import LoginRegisterButton from '../components/LoginRegisterButton';
import useCurrentUser from '../hooks/useCurrentUser';
import LogoutButton from '../components/LogoutButton';

const NavBar = () => {
  const { authenticatedUser: userLoggedIn } = useCurrentUser();
  const [openModal, setOpenModal] = useState<OpenLoginRegisterModalOptions>(
    'none'
  );

  return (
    <div style={{ display: 'flex' }}>
      {userLoggedIn ? (
        <div style={{ display: 'flex' }}>
          <div>{userLoggedIn.email}</div>
          <LogoutButton />
        </div>
      ) : (
        <div style={{ display: 'flex' }}>
          <LoginRegisterButton
            loginOrRegister='login'
            setOpenModal={setOpenModal}
            openModal={openModal}
          />
          <LoginRegisterButton
            loginOrRegister='register'
            setOpenModal={setOpenModal}
            openModal={openModal}
          />
        </div>
      )}
    </div>
  );
};

export default NavBar;
