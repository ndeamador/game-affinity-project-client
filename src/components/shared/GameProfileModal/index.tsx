/** @jsxImportSource @emotion/react */

import { DialogContent, DialogOverlay } from '@reach/dialog';
import GameProfile from '../../views/GameProfile';
import { User } from '../../../types';
import styles from './styles';

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
