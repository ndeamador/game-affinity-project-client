/** @jsxImportSource @emotion/react */

import { useState } from 'react';
import { OpenLoginRegisterModalOptions } from '../types';

import LoginRegisterButton from '../components/LoginRegisterButton';
import LogoutButton from '../components/LogoutButton';
import { NavLink } from 'react-router-dom';
import { css } from '@emotion/react';
import useCurrentUser from '../hooks/useCurrentUser';

const navBarStyle = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  height: 'var(--navbar-height)',
  backgroundColor: 'lightGrey',
  // padding: '10px 30px',
});

const navInnerContainerStyle = css({
  display: 'flex',
  alignItems: 'center',
  height: '100%',
});

const navLinkStyle = css({
  display: 'flex',
  alignItems: 'center',
  padding: '5px 10px',
  margin: '5px 0',
  height: '100%',
  color: 'var(--color-text)',
  borderRadius: 'var(--border-radius)',
  textDecoration: 'none',
  '&:hover': {
    color: 'var(--color-indigo)',
    background: 'var(--color-gray10)',
  },
});

const navLinkActiveStyle: React.CSSProperties = {
  fontWeight: 'bold',
  color: 'red',
};

const NavBar = () => {
  const { currentUser } = useCurrentUser();
  const [openModal, setOpenModal] =
    useState<OpenLoginRegisterModalOptions>('none');

  return (
    <div css={navBarStyle}>
      <div css={navInnerContainerStyle}>
        <NavLink
          to='/'
          activeStyle={navLinkActiveStyle}
          css={navLinkStyle}
          exact={true} // to avoid that the home navlink is set as active by any route starting with /
        >
          Home
        </NavLink>

        <NavLink
          to='/ranking'
          activeStyle={navLinkActiveStyle}
          css={navLinkStyle}
          exact={true}
        >
          Ranking
        </NavLink>

        {currentUser && (
          <NavLink
            to='/library'
            activeStyle={navLinkActiveStyle}
            css={navLinkStyle}
            exact={true}
          >
            My library
          </NavLink>
        )}
      </div>

      {currentUser ? (
        <div css={navInnerContainerStyle}>
          <div aria-label='Current User'>{currentUser.email}</div>
          <LogoutButton />
        </div>
      ) : (
        <div css={navInnerContainerStyle}>
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
