/** @jsxImportSource @emotion/react */

import { LoginOrRegisterButtonProps } from '../types';
import { capitalizeFirstLetter } from '../utils/misc';
import { Button } from './styledComponentsLibrary';
import LoginRegisterModal from './LoginRegisterModal';

const LoginRegisterButton = ({
  loginOrRegister,
  setOpenModal,
  openModal,
  buttonType,
}: LoginOrRegisterButtonProps) => {
  return (
    <div>
      {buttonType === 'regular' && (
        <Button onClick={() => setOpenModal(loginOrRegister)}>
          {capitalizeFirstLetter(loginOrRegister)}
        </Button>
      )}

      <LoginRegisterModal
        loginOrRegister={loginOrRegister}
        setOpenModal={setOpenModal}
        openModal={openModal}
      />
    </div>
  );
};

export default LoginRegisterButton;
