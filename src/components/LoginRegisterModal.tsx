/** @jsxImportSource @emotion/react */

import { capitalizeFirstLetter } from '../utils/misc';
import { LoginOrRegisterModalProps } from '../types';
import { FaTimes } from 'react-icons/fa';

import { CircleButton } from './styledComponentsLibrary';
import LoginForm from '../components/LoginForm';
import { Dialog } from '@reach/dialog';
import { css } from '@emotion/react';

const styles = {
  dialogStyle: css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '380px',
    ':click': {
      transition: 'transform 0.3s',
      transitionDuration: '0.3s',
      transitionTimingFunction: 'ease',
      transitionProperty: 'all',
    },
  }),
  closeButtonDivStyle: css({
    alignSelf: 'flex-end',
  }),
  modalInnerContainerStyle: css({
    padding: '40px 0 30px 0',
  }),
  titleStyle: css({
    margin: '0 0 20px 0',
  }),
  iconStyle: css({
    width: 'auto',
    height: '65%',
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
    <Dialog
      aria-label={ariaLabel}
      isOpen={openModal === loginOrRegister}
      css={styles.dialogStyle}
    >
      <div css={styles.closeButtonDivStyle}>
        <CircleButton onClick={() => setOpenModal('none')}>
          <FaTimes />
        </CircleButton>
      </div>
      <div css={styles.modalInnerContainerStyle}>
        <h3 css={styles.titleStyle}>
          {capitalizeFirstLetter(loginOrRegister)}
        </h3>
        <LoginForm
          setOpenModal={setOpenModal}
          loginOrRegister={loginOrRegister}
        />
      </div>
    </Dialog>
  );
};

export default LoginRegisterModal;
