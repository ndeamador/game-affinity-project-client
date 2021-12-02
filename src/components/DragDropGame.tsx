/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Game } from '../types';
import CoverDiv from './CoverDiv';
import GameProfileModal from './GameProfileModal';

const draggableStyle = css({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  // maxWidth: '270px',
  height: '4rem',
  padding: '5px',
  marginBottom: '5px',
  border: 'solid 1px var(--color-gray20)',
  borderRadius: 'var(--border-radius)',
  backgroundColor: 'var(--color-base)',
  // transition: `transform .15s, background-color .5s, transform 0.2s`,
  // boxShadow: snapshot.isDragging
  //   ?
  //   : '2px 2px 4px 0px (--color-gray20)',
  '&:hover': {
    backgroundColor: 'var(--color-gray10)',
    transform: 'rotate(1.6deg) scale(1.07)',
    // transform: 'rotate(1.1deg)',
    // transform: 'scale(1.05)',
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
  // textOverflow: 'ellipsis',
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
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={() => setOpenModal(game.id)}
          css={[draggableStyle, snapshot.isDragging && isDraggingStyle]}
        >
          <CoverDiv game={game} />
          <div css={textDivStyle}>
            <p css={textStyle}>{game.name}</p>
          </div>
          <GameProfileModal openModal={openModal} setOpenModal={setOpenModal} />
        </div>
      )}
    </Draggable>
  );
};

// export default React.memo(DragDropGame);
export default DragDropGame;
