/** @jsxImportSource @emotion/react */

import { useState } from 'react';
import { OpenLoginRegisterModalOptions } from '../types';

import LoginRegisterButton from '../components/LoginRegisterButton';
import LogoutButton from '../components/LogoutButton';
import { NavLink } from 'react-router-dom';
import { css } from '@emotion/react';
import useCurrentUser from '../hooks/useCurrentUser';

const outerNavBarStyle = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  height: 'var(--navbar-height)',
  padding: '0px 50px',
  position: 'fixed',
  top: '0px',
  backdropFilter: 'saturate(180%) blur(5px)',
  backgroundColor: 'var(--navbar-background)',
});

const innerNavBarStyle = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
});

const navLinkGroupStyle = css({
  display: 'flex',
  alignItems: 'center',
  height: '100%',
  justifyContent: 'space-between',
});

const navLinkStyle = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '5px 10px',
  minWidth: 'var(--min-nav-item-width)',
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
  color: 'var(--color-green)',
};

const userStripStyle = css({
  padding: '5px 25px',
});

const NavBar = () => {
  const { currentUser } = useCurrentUser();
  const [openModal, setOpenModal] =
    useState<OpenLoginRegisterModalOptions>('none');

  return (
    <div css={outerNavBarStyle}>
      <div css={innerNavBarStyle}>
        <div css={navLinkGroupStyle}>
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
          <div css={navLinkGroupStyle}>
            <div aria-label='Current User' css={userStripStyle}>
              {currentUser.email}
            </div>
            <LogoutButton />
          </div>
        ) : (
          <div css={navLinkGroupStyle}>
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
    </div>
  );
};

export default NavBar;
