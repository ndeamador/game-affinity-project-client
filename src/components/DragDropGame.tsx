/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Game } from '../types';
import CoverDiv from './CoverDiv';
import DraggablePortalHandler from './DraggablePortalHandler';
import GameProfileModal from './GameProfileModal';

const draggableStyle = css({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  height: '4rem',
  padding: '5px',
  border: 'solid 1px var(--color-gray20)',
  borderRadius: 'var(--border-radius)',
  backgroundColor: 'var(--color-base)',
  marginBottom: '5px',
  transition: 'background-color 0.18s',
  '&:hover': {
    transition: 'none',
    backgroundColor: 'var(--color-gray10)',
  },
});

const isDraggingStyle = css({
  boxShadow: '4px 4px 15px 1px rgba(0, 0, 0, 0.2)', // h-offset, v-offset, blur, spread, color
});

const textDivStyle = css({
  display: 'flex',
  alignItems: 'flex-start',
  wordWrap: 'break-word',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  width: '100%',
});

const textStyle = css({
  margin: '0 5px',
  textOverflow: 'ellipsis',
});

// <Draggable/> Requires at least draggableId and index
// 'provided.draggableProps' need to be applied to the comopnent that we want to move around.
// 'provided.dragHandleProps' need to be applied to the part of the component that we want to use to drag the component (in this case is the whole component so we apply it to the component itself, but we might want a smaller part to be used to move the whole component).

const DragDropGame = ({ game, index }: { game: Game; index: number }) => {
  // We can style the element during a drag using the snapshot argument
  // Don't change dimensions of draggable and droppable during a drag

  const [openModal, setOpenModal] = useState<string>('none');

  return (
    <Draggable draggableId={game.id} index={index}>
      {(provided, snapshot) => (
        <DraggablePortalHandler snapshot={snapshot}>
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick={() => setOpenModal(game.id)}
            css={[draggableStyle, snapshot.isDragging && !snapshot.isDropAnimating && isDraggingStyle]}
          >
            <CoverDiv game={game} showSpinner={false} />
            <div css={textDivStyle}>
              <p css={textStyle}>{game.name}</p>
            </div>
            <GameProfileModal
              openModal={openModal}
              setOpenModal={setOpenModal}
            />
          </div>
        </DraggablePortalHandler>
      )}
    </Draggable>
  );
};

// export default React.memo(DragDropGame);
export default DragDropGame;
