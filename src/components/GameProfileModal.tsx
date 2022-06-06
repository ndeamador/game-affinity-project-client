/** @jsxImportSource @emotion/react */

import { Dialog, DialogContent, DialogOverlay } from '@reach/dialog';
import GameProfile from '../views/GameProfile';
import { css } from '@emotion/react';
import GenericContainer from './GenericContainer';

const styles = {
  dialogOverlay: css({
    backdropFilter: 'blur(10px)',
    background: 'rgba(0, 0, 0, 0.4)',
  }),
  dialog: css({
    display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'center',
    // maxWidth: '380px',
    maxHeight: '90vh',
    // width: '70vw',
    // minHeight: '70vh',
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
    // <Dialog
    //   aria-label={ariaLabel}
    //   isOpen={openModal !== 'none'}
    //   css={styles.dialog}
    //   onDismiss={() => setOpenModal('none')}
    // >
    //   {/* <GenericContainer additionalStyle={styles.container}> */}
    //     <GameProfile modalGame={openModal} />
    //   {/* </GenericContainer> */}
    // </Dialog>
    <DialogOverlay
      aria-label={ariaLabel}
      isOpen={openModal !== 'none'}
      onDismiss={() => setOpenModal('none')}
      css={styles.dialogOverlay}
    >
      <DialogContent css={styles.dialog}>
        {/* <GenericContainer additionalStyle={styles.container}> */}
        <GameProfile modalGame={openModal} />
        {/* </GenericContainer> */}
      </DialogContent>
    </DialogOverlay>
  );
};

export default GameProfileModal;
