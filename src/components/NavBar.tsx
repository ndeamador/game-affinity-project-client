/** @jsxImportSource @emotion/react */

import { useState } from 'react';
import { OpenLoginRegisterModalOptions } from '../types';

import LoginRegisterButton from '../components/LoginRegisterButton';
import LogoutButton from '../components/LogoutButton';
import { NavLink } from 'react-router-dom';
import { css } from '@emotion/react';
import * as colors from '../styles/colors';
import { useAuthContext } from '../context/AuthContext';

const navLinkStyle = css({
  // display: 'block',
  padding: '5px 10px',
  margin: '5px 0',
  // width: '100%',
  height: '100%',
  color: colors.text,
  borderRadius: '2px',
  textDecoration: 'none',
  // borderLeft: '5px solid transparent',
  ':hover': {
    color: colors.indigo,
    background: colors.gray10,
  },
});

// const navLinkActiveStyle = {
//   fontWeight: 'bold',
//   color: 'red',
// };

const NavBar = () => {
  const { currentUser } = useAuthContext();
  // const currentUser = authContext?.currentUser;
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
        <NavLink
          to='/'
          // activeClassName='selected'
          activeStyle={{
            fontWeight: 'bold',
            color: 'red',
          }}
          css={navLinkStyle}
          exact={true} // to avoid that the home navlink is set as active by any route starting with /
        >
          Home
        </NavLink>

        {currentUser && (
          <NavLink
            to='/library'
            // activeClassName='selected'
            activeStyle={{
              fontWeight: 'bold',
              color: 'green',
            }}
            css={navLinkStyle}
            exact={true}
          >
            My library
          </NavLink>
        )}
      </div>

      {currentUser ? (
        <div css={{ display: 'flex' }}>
          <div
            css={{ display: 'flex', alignItems: 'center', padding: '0 10px' }}
          >
            {currentUser.email}
          </div>
          <LogoutButton />
        </div>
      ) : (
        <div css={{ display: 'flex' }}>
          <LoginRegisterButton
            loginOrRegister='login'
            setOpenModal={setOpenModal}
            openModal={openModal}
            buttonType='regular'
          />
          <LoginRegisterButton
            loginOrRegister='register'
            setOpenModal={setOpenModal}
            openModal={openModal}
            buttonType='regular'
          />
        </div>
      )}
    </div>
  );
};

export default NavBar;
