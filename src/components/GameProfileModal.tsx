/** @jsxImportSource @emotion/react */

import { DialogContent, DialogOverlay } from '@reach/dialog';
import GameProfile from '../views/GameProfile';
import { css } from '@emotion/react';

const styles = {
  dialogOverlay: css({
    backdropFilter: 'blur(10px)',
    background: 'rgba(0, 0, 0, 0.4)',
  }),
  dialog: css({
    display: 'flex',
    maxHeight: '90vh',
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
  }),
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
    <DialogOverlay
      aria-label={ariaLabel}
      isOpen={openModal !== 'none'}
      onDismiss={() => setOpenModal('none')}
      css={styles.dialogOverlay}
    >
      <DialogContent css={styles.dialog}>
        <GameProfile modalGame={openModal} />
      </DialogContent>
    </DialogOverlay>
  );
};

export default GameProfileModal;
