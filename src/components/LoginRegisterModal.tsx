/** @jsxImportSource @emotion/react */

import { capitalizeFirstLetter } from '../utils/misc';
import { LoginOrRegisterModalProps } from '../types';

import { CircleButton } from './styledComponentsLibrary';
import LoginForm from '../components/LoginForm';
import { Dialog } from '@reach/dialog';

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
      css={{
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
      }}
    >
      <div css={{ alignSelf: 'flex-end' }}>
        <CircleButton onClick={() => setOpenModal('none')}>x</CircleButton>
      </div>
      <div className='modalInnerContainer' css={{ padding: '40px 0 30px 0' }}>
        <h3 css ={{margin: '0 0 20px 0'}}>{capitalizeFirstLetter(loginOrRegister)}</h3>
        <LoginForm
          setOpenModal={setOpenModal}
          loginOrRegister={loginOrRegister}
        />
      </div>
    </Dialog>
  );
};

export default LoginRegisterModal;
