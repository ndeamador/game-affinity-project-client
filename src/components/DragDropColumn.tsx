/** @jsxImportSource @emotion/react */

import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Game } from '../types';
import GameListItem from './GameListItem';

// <Draggable/> Requires at least draggableId and index
// 'provided.draggableProps' need to be applied to the comopnent that we want to move around.
// 'provided.dragHandleProps' need to be applied to the part of the component that we want to use to drag the component (in this case is the whole component so we apply it to the component itself, but we might want a smaller part to be used to move the whole component).
const DragDropGame = ({ game, index }: { game: Game; index: number }) => {
  return (
    <Draggable draggableId={game.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          css={{
            padding: '5px',
            border: 'solid 1px black',
            borderRadius: '8px',
            marginBottom: '5px',
            backgroundColor: 'white',
          }}
        >
          {game.name}
        </div>
      )}
    </Draggable>
  );
};

// 'provided.innerRef' is used to supply the DOM node of the component to beautiful-dnd
// 'provided.placeholder' is a React element used to increase the available space during a drag. Needs to be a child of the component designated as droppable.

const DragDropColumn = ({ games, title }: { games: Game[]; title: string }) => {
  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        margin: '0 15px',
        flexGrow: 1,
        minHeight: '100px',
      }}
    >
      <h3>{title}</h3>
      <Droppable droppableId={title}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {games.map((game, index) => (
              <DragDropGame key={game.id} game={game} index={index} />
              // <GameListItem key={game.id} game={game}/>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default DragDropColumn;
