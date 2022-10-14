/** @jsxImportSource @emotion/react */

import { useState } from 'react';
import { OpenLoginRegisterModalOptions } from '../../types';

import LoginRegisterButton from './LoginRegisterButton';
import LogoutButton from './LogoutButton';
import { NavLink } from 'react-router-dom';
import { css, keyframes } from '@emotion/react';
import useCurrentUser from '../../hooks/useCurrentUser';
import LonginWithTestAccountButton from './LoginWithTestAccountButton';
import GitHubButton from './GitHubButton';

const animations = {
  rotateDownWithBounce: keyframes`
  0% {
    transform: rotateX(-90deg)
  }
  70% {
    transform: rotateX(20deg)
  }
  100% {
    transform: rotateX(0deg)
  }
  `,
  borderGlow: keyframes`
  to {
    background-position: 200% center;
  }
  `,
};

const styles = {
  myLibraryButton: css({
    transformOrigin: 'top center',
    background: 'var(--animated-text-gradient)',
    animation: `${animations.rotateDownWithBounce} 330ms ease-out forwards, ${animations.borderGlow} 3.5s linear infinite`,
    backgroundClip: 'text',
    backgroundSize: '400% auto', // https://codersblock.com/blog/gradient-animation-trick/
    // textFillColor: 'transparent',
    color: 'transparent',
    '&:hover': {
      background: 'none',
    },
  }),
  outerNavBar: css({
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
    zIndex: 100,
  }),
  innerNavBar: css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  }),
  navLinkGroup: css({
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    justifyContent: 'space-between',
    gap: '10px',
  }),
  navLink: css({
    fontSize: '1.15em',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '5px 10px',
    minWidth: 'var(--min-nav-item-width)',
    height: '100%',
    borderRadius: 'var(--border-radius)',
    textDecoration: 'none',
    // color: 'var(--navbar-link-text-color)',

    // The following three properties replace color above, they are only neede so that all buttons appear with the same font weight.
    // The 'backgrond-clip: text' needed for myLibraryButton's text background animation makes text look thinner.
    color: 'transparent',
    backgroundClip: 'text',
    backgroundColor: 'var(--navbar-link-text-color)',

    '&:hover': {
      textFillColor: 'initial',
      color: 'var(--navbar-link-text-color-hover)',
      background: 'none',
    },
    // '&.active: hover': {
    // }
  }),
  userStrip: css({
    padding: '5px 10px',
    color: 'var(--navbar-user-text-color)'
  }),
  /* const navLinkActiveStyle: React.CSSProperties = {}  */
  navLinkActive: {
    color: 'var(--navbar-link-text-color-active)',
    background: 'none',
  },
};

const NavBar = () => {
  const { currentUser } = useCurrentUser();
  const [openModal, setOpenModal] =
    useState<OpenLoginRegisterModalOptions>('none');

  return (
    <div css={styles.outerNavBar}>
      <div css={styles.innerNavBar}>
        <div css={styles.navLinkGroup}>
          <NavLink
            to='/'
            activeStyle={styles.navLinkActive}
            css={styles.navLink}
            exact={true} // to avoid that the home navlink is set as active by any route starting with /
          >
            Home
          </NavLink>

          <NavLink
            to='/ranking'
            activeStyle={styles.navLinkActive}
            css={styles.navLink}
            exact={true}
          >
            Ranking
          </NavLink>

          {currentUser && (
            <NavLink
              to='/library'
              activeStyle={styles.navLinkActive}
              css={[styles.navLink, styles.myLibraryButton]}
              exact={true}
            >
              My library
            </NavLink>
          )}
        </div>

        {!currentUser && <LonginWithTestAccountButton />}

        <div css={styles.navLinkGroup}>
          {currentUser ? (
            <>
              <div aria-label='Current User' css={styles.userStrip}>
                {currentUser.email}
              </div>
              <LogoutButton />
            </>
          ) : (
            <>
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
            </>
          )}
          <GitHubButton />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
