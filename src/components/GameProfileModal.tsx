/** @jsxImportSource @emotion/react */

import { DialogContent, DialogOverlay } from '@reach/dialog';
import GameProfile from '../views/GameProfile';
import { css } from '@emotion/react';
import { User } from '../types';

const styles = {
  dialogOverlay: css({
    backdropFilter: 'blur(10px)',
    background: 'rgba(0, 0, 0, 0.4)',
  }),
  dialogContent: css({
    display: 'flex',
    maxHeight: '90vh',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    minWidth:'400px',
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
  }),
};

const GameProfileModal = ({
  currentUser,
  setOpenModal,
  openModal,
}: {
  currentUser: User;
  setOpenModal: React.Dispatch<React.SetStateAction<string>>;
  openModal: string;
}) => {
  const ariaLabel = `Game Profile`;

  return (
    <DialogOverlay
      isOpen={openModal !== 'none'}
      onDismiss={() => setOpenModal('none')}
      css={styles.dialogOverlay}
    >
      <DialogContent css={styles.dialogContent} aria-label={ariaLabel}>
        <GameProfile modalGame={openModal} currentUser={currentUser} />
      </DialogContent>
    </DialogOverlay>
  );
};

export default GameProfileModal;
