/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { Droppable } from 'react-beautiful-dnd';
import { Game } from '../types';
import DragDropInnerGameList from './DragDropInnerGameList';
import { RATINGS } from '../constants';

// import GameListItem from './GameListItem';

const styles = {
  container: css({
    display: 'flex',
    flexDirection: 'column',
    minHeight: '130px',
    height: '100%',
    backgroundColor: 'var(--inner-content-background-color)',
    padding: '5px',
    borderRadius: 'var(--border-radius)',
    flex: '1 0 0',
  }),
  droppableGameColumnContainer: css({
    display: 'flex',
    // gap: '5px', // causes glitch with react-beautiful-dnd, replaced with margin-bottom on droppable.
    maxWidth: '800px',
    flex: '1 0 0', // grow 1 (~ height: 100%) is important so that draggables can be dropped along the entire droppable box height.
    flexWrap: 'wrap',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  }),
};

// 'provided.innerRef' is used to supply the DOM node of the component to beautiful-dnd
// 'provided.placeholder' is a React element used to increase the available space during a drag. Needs to be a child of the component designated as droppable.

const DragDropColumn = ({
  games,
  title,
}: // droppableDirection,
{
  games: Game[];
  title: string;
  // droppableDirection: 'vertical' | 'horizontal';
}) => {
  // const dynamicStyle = css({
  //   flexDirection: droppableDirection === 'vertical' ? 'column' : 'row',
  //   justifyContent:
  //     droppableDirection === 'vertical' ? 'flex-start' : 'space-evenly',
  // });

  const DynamicContainerStyle = css({
    backgroundColor: 'transparent',
    border: '2px solid var(--filter-button-border-color)',
  });

  return (
    <div css={[styles.container, title == RATINGS.unranked.title && DynamicContainerStyle]}>
      <h3>{title}</h3>
      <Droppable droppableId={title} direction={'vertical'}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            css={[styles.droppableGameColumnContainer /* dynamicStyle */]}
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
