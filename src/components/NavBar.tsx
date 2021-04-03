/** @jsxImportSource @emotion/react */

import { useState } from 'react';
import { OpenLoginRegisterModalOptions } from '../types';

import LoginRegisterButton from '../components/LoginRegisterButton';
import useCurrentUser from '../hooks/useCurrentUser';
import LogoutButton from '../components/LogoutButton';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  const { authenticatedUser: userLoggedIn } = useCurrentUser();
  const [openModal, setOpenModal] = useState<OpenLoginRegisterModalOptions>(
    'none'
  );

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        paddingBottom: '10px',
      }}
    >
      <div css={{ display: 'flex', justifyContent: 'flex-start' }}>
        <NavLink css={{ padding: 5 }} to='/'>
          Home
        </NavLink>

        <NavLink css={{ padding: 5 }} to='/library'>
          My library
        </NavLink>
      </div>

      {userLoggedIn ? (
        <div css={{ display: 'flex' }}>
          <div
            css={{ display: 'flex', alignItems: 'center', padding: '0 10px' }}
          >
            {userLoggedIn.email}
          </div>
          <LogoutButton />
        </div>
      ) : (
        <div css={{ display: 'flex' }}>
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
