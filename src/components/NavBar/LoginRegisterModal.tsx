/** @jsxImportSource @emotion/react */

import { capitalizeFirstLetter } from '../../utils/misc';
import { LoginOrRegisterModalProps } from '../../types';
import { FaTimes } from 'react-icons/fa';

import { CircleButton } from '../shared/styledComponentsLibrary';
import LoginForm from './LoginForm';
import { DialogContent, DialogOverlay } from '@reach/dialog';
import GenericContainer from '../shared/GenericContainer';
import styles from './LoginRegisterModal.styles';

const LoginRegisterModal = ({
  loginOrRegister,
  setOpenModal,
  openModal,
}: LoginOrRegisterModalProps) => {
  const ariaLabel =
    loginOrRegister === 'login' ? 'Login form' : 'Registration form';

  return (
    <DialogOverlay
      isOpen={openModal === loginOrRegister}
      onDismiss={() => setOpenModal('none')}
      css={styles.dialogOverlay}
    >
      <DialogContent css={styles.dialogContent} aria-label={ariaLabel}>
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
