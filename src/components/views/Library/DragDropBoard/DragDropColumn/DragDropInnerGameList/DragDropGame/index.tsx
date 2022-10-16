/** @jsxImportSource @emotion/react */

import { useContext } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Game } from '../../../../../../../types';
import CoverDiv from '../../../../../../shared/CoverDiv';
import { BoardStateContext } from '../../..';
import DraggablePortalHandler from './DraggablePortalHandler';
import styles from './styles';

// <Draggable/> Requires at least draggableId and index
// 'provided.draggableProps' need to be applied to the comopnent that we want to move around.
// 'provided.dragHandleProps' need to be applied to the part of the component that we want to use to drag the component (in this case is the whole component so we apply it to the component itself, but we might want a smaller part to be used to move the whole component).

const DragDropGame = ({ game, index }: { game: Game; index: number }) => {
  // We can style the element during a drag using the snapshot argument
  // Don't change dimensions of draggable and droppable during a drag

  const boardContext = useContext(BoardStateContext);

  return (
    <Draggable draggableId={game.id} index={index}>
      {(provided, snapshot) => (
        <DraggablePortalHandler snapshot={snapshot}>
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick={() => boardContext?.setOpenModal(game.id)}
            css={[
              styles.draggable,
              snapshot.isDragging &&
                !snapshot.isDropAnimating &&
                styles.isDragging,
            ]}
          >
            <CoverDiv game={game} showSpinner={false} />
            <div css={styles.textDiv}>
              <p css={styles.text}>{game.name}</p>
            </div>
          </div>
        </DraggablePortalHandler>
      )}
    </Draggable>
  );
};

export default DragDropGame;
