/** @jsxImportSource @emotion/react */

import { FaTimes } from 'react-icons/fa';

import { CircleButton } from './styledComponentsLibrary';
import { Dialog } from '@reach/dialog';
import GameProfile from '../views/GameProfile';
import { css } from '@emotion/react';
import GenericContainer from './GenericContainer';

const styles = {
  dialog: css({
    display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'center',
    // maxWidth: '380px',
    backgroundColor: 'transparent',
    ':click': {
      transition: 'transform 0.3s',
      transitionDuration: '0.3s',
      transitionTimingFunction: 'ease',
      transitionProperty: 'all',
    },
  }),
  container: css({
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

  })
};

const GameProfileModal = ({
  setOpenModal,
  openModal,
}: {
  setOpenModal: React.Dispatch<React.SetStateAction<string>>;
  openModal: string;
}) => {
  const ariaLabel = `Game Profile`;

  return (
    <Dialog
      aria-label={ariaLabel}
      isOpen={openModal !== 'none'}
      css={styles.dialog}
    >
      <GenericContainer additionalStyle={styles.container}>
        <div css={{ alignSelf: 'flex-end' }}>
          <CircleButton onClick={() => setOpenModal('none')}>
            <FaTimes />
          </CircleButton>
        </div>
        {/* <div className='modalInnerContainer' css={{ padding: '40px 0 30px 0' }}> */}
          <GameProfile modalGame={openModal} />
        {/* </div> */}
      </GenericContainer>
    </Dialog>
  );
};

export default GameProfileModal;
