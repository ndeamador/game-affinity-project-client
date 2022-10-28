/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { Droppable } from 'react-beautiful-dnd';
import { RATINGS } from '../../../constants';
import { Game } from 'types';
import styles from './DragDropColumn.styles';
import DragDropInnerGameList from './DragDropInnerGameList';

// 'provided.innerRef' is used to supply the DOM node of the component to beautiful-dnd
// 'provided.placeholder' is a React element used to increase the available space during a drag. Needs to be a child of the component designated as droppable.

const DragDropColumn = ({ games, title }: { games: Game[]; title: string }) => {
  const DynamicContainerStyle = css({
    backgroundColor: 'transparent',
    border: '2px solid var(--filter-button-border-color)',
  });

  return (
    <div
      css={[
        styles.container,
        title == RATINGS.unranked.title && DynamicContainerStyle,
      ]}
    >
      <h3 css={styles.title}>{title}</h3>
      <Droppable droppableId={title} direction={'vertical'}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            css={[styles.droppableGameColumnContainer]}
          >
            <DragDropInnerGameList games={games} />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default DragDropColumn;
