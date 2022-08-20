/** @jsxImportSource @emotion/react */

import { capitalizeFirstLetter } from '../utils/misc';
import { LoginOrRegisterModalProps } from '../types';
import { FaTimes } from 'react-icons/fa';

import { CircleButton } from './styledComponentsLibrary';
import LoginForm from '../components/LoginForm';
import { DialogContent, DialogOverlay } from '@reach/dialog';
import { css } from '@emotion/react';
import GenericContainer from './GenericContainer';

const styles = {
  dialogOverlay: css({
    backdropFilter: 'blur(10px)',
    background: 'rgba(0, 0, 0, 0.3)',
  }),
  dialogContent: css({
    backgroundColor: 'transparent',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '380px',
    padding: 0,
    marginTop: '15vh',
    ':click': {
      transition: 'transform 0.3s',
      transitionDuration: '0.3s',
      transitionTimingFunction: 'ease',
      transitionProperty: 'all',
    },
  }),
  genericContainer: css({
    flexDirection: 'column',
    padding: '30px',
    width: '100%',
  }),
  closeButtonDiv: css({
    alignSelf: 'flex-end',
  }),
  modalInnerContainer: css({
    padding: '40px 0 30px 0',
  }),
  title: css({
    margin: '0 0 20px 0',
  }),
};

const LoginRegisterModal = ({
  loginOrRegister,
  setOpenModal,
  openModal,
}: LoginOrRegisterModalProps) => {
  const ariaLabel =
    loginOrRegister === 'login' ? 'Login form' : 'Registration form';

  return (
    <DialogOverlay
      aria-label={ariaLabel}
      isOpen={openModal === loginOrRegister}
      onDismiss={() => setOpenModal('none')}
      css={styles.dialogOverlay}
    >
      <DialogContent css={styles.dialogContent}>
        <GenericContainer additionalStyle={styles.genericContainer}>
          <div css={styles.closeButtonDiv}>
            <CircleButton onClick={() => setOpenModal('none')}>
              <FaTimes />
            </CircleButton>
          </div>
          <div css={styles.modalInnerContainer}>
            <h3 css={styles.title}>{capitalizeFirstLetter(loginOrRegister)}</h3>
            <LoginForm
              setOpenModal={setOpenModal}
              loginOrRegister={loginOrRegister}
            />
          </div>
        </GenericContainer>
      </DialogContent>
    </DialogOverlay>
  );
};

export default LoginRegisterModal;
