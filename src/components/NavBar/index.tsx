/** @jsxImportSource @emotion/react */

import { useState } from 'react';
import { OpenLoginRegisterModalOptions } from '../../types';

import LogoutButton from './LogoutButton';
import { NavLink } from 'react-router-dom';
import useCurrentUser from '../../hooks/useCurrentUser';
import LonginWithTestAccountButton from './LoginWithTestAccountButton';
import GitHubButton from './GitHubButton';
import styles from './index.styles';
import LoginRegisterButton from './LoginRegisterButton';

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
