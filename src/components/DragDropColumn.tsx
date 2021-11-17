/** @jsxImportSource @emotion/react */

import { Droppable } from 'react-beautiful-dnd';
import { Game } from '../types';
import DragDropGame from './DragDropGame';
import DragDropInnerGameList from './DragDropInnerGameList';
// import GameListItem from './GameListItem';

// 'provided.innerRef' is used to supply the DOM node of the component to beautiful-dnd
// 'provided.placeholder' is a React element used to increase the available space during a drag. Needs to be a child of the component designated as droppable.

const DragDropColumn = ({
  games,
  title,
  droppableDirection,
}: {
  games: Game[];
  title: string;
  droppableDirection: 'vertical' | 'horizontal';
}) => {
  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '130px',
        height: '100%',
        backgroundColor: 'ghostwhite',
        padding: '5px',
        borderRadius: '5px',
        flex: '1 0 0',
        // border: 'solid 1px black',
      }}
    >
      <h3>{title}</h3>
      <Droppable droppableId={title} direction={droppableDirection}>
        {(provided) => (
          <div
            className='DroppableGameColumnContainer'
            ref={provided.innerRef}
            {...provided.droppableProps}
            css={{
              display: 'flex',
              flexDirection:
                droppableDirection === 'vertical' ? 'column' : 'row',
              maxWidth: '800px',
              flex: '1 0 0', // grow 1 (~ height: 100%) is important so that draggables can be dropped along the entire droppable box height.
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent:
                droppableDirection === 'vertical'
                  ? 'flex-start'
                  : 'space-evenly',
            }}
          >
            <DragDropInnerGameList games={games} />
            {/* {games.map((game, index) => (
              <DragDropGame key={game.id} game={game} index={index} />
            ))} */}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default DragDropColumn;
