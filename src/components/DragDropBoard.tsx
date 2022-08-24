/** @jsxImportSource @emotion/react */

import { Game, GameInUserLibrary, Rating, User } from '../types';
import { DragDropContext, OnDragEndResponder } from 'react-beautiful-dnd';
import DragDropColumn from './DragDropColumn';
import GenericContainer from './GenericContainer';
import { css } from '@emotion/react';
import { createContext, useState } from 'react';
import { RATINGS } from '../constants';
import useUpdateRating from '../hooks/useUpdateRating';
import useBoardState from '../hooks/useBoardState';

const styles = {
  container: css({
    flexDirection: 'column',
    padding: '15px',
  }),
  dndColumnsDiv: css({
    display: 'flex',
    flexDirection: 'row',
    columnGap: '15px',
    justifyContent: 'center',
  }),
  textDiv: css({
    marginBottom: '15px',
  }),
};

const DragoDropBoard = ({ games, user }: { games: Game[]; user: User }) => {
  // Remember that using the mapped object's indexes for the key property is an anti-pattern, use unique id instead
  // https://robinpokorny.medium.com/index-as-a-key-is-an-anti-pattern-e0349aece318

  console.log('DragDropBoard ----------------------------------');
  const [updateRating] = useUpdateRating();
  // const [orderedColumns, setOrderedColums, reorderState] = useBoardState(user);
  const { orderedColumns, setOrderedColums, reorderState, updateFromRater } =
    useBoardState(user);

  // const getIdsInColumn = (
  //   rating: Rating,
  //   gamesInUserLibrary: GameInUserLibrary[]
  // ) => {
  //   return gamesInUserLibrary
  //     .filter((game) => game.rating == rating)
  //     .map((game) => game.igdb_game_id);
  // };

  // const [orderedColumns, setOrderedColums] = useState<number[][]>([
  //   getIdsInColumn(RATINGS.unranked.value, user.gamesInLibrary),
  //   getIdsInColumn(RATINGS.thumbsDown.value, user.gamesInLibrary),
  //   getIdsInColumn(RATINGS.thumbsUp.value, user.gamesInLibrary),
  //   getIdsInColumn(RATINGS.great.value, user.gamesInLibrary),
  //   getIdsInColumn(RATINGS.legendary.value, user.gamesInLibrary),
  // ]);

  const [columnNames, _setColumnNames] = useState(
    Object.values(RATINGS).map((rating) => rating.title)
  );

  const handleDragEnd: OnDragEndResponder = ({
    destination,
    source,
    draggableId,
  }) => {
    // Do nothing if the item is dropped outside of a "droppable" object:
    if (!destination) {
      return;
    }

    // Do nothing if the user has droppped the draggable item in its original location:
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Just a check to please Typescript (we could use a non-null assertion operator below (result.destination!.index) but we have set a tsconfig rule against it: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator)
    if (destination?.index === undefined) {
      console.log('DnD destination index missing.');
      return;
    }

    // If the location has changed, reorder the source data:

    // const determineNewRank = (destinationId: string): Rating => {
    //   switch (destinationId) {
    //     case RATINGS.unranked.title:
    //       return RATINGS.unranked.value;
    //     case RATINGS.thumbsDown.title:
    //       return RATINGS.thumbsDown.value;
    //     case RATINGS.thumbsUp.title:
    //       return RATINGS.thumbsUp.value;
    //     case RATINGS.great.title:
    //       return RATINGS.great.value;
    //     case RATINGS.legendary.title:
    //       return RATINGS.legendary.value;

    //     default:
    //       throw new Error('Invalid d&d destinationId');
    //   }
    // };

    try {
      // const initialRating = determineNewRank(source.droppableId);
      // const newRating = determineNewRank(destination.droppableId);
      console.log('dest sour:', source, destination);

      // // Update local state columns.
      // if (initialRating == newRating) {
      //   const reorderedColumn = [...orderedColumns[initialRating]];
      //   reorderedColumn.splice(source.index, 1);
      //   reorderedColumn.splice(destination.index, 0, parseInt(draggableId));

      //   setOrderedColums((state) =>
      //     state.map((column, i) => (i == newRating ? reorderedColumn : column))
      //   );
      // } else {
      //   const startColumn = [...orderedColumns[initialRating]];
      //   const endColumn = [...orderedColumns[newRating]];

      //   startColumn.splice(source.index, 1);
      //   endColumn.splice(destination.index, 0, parseInt(draggableId));

      //   setOrderedColums((state) =>
      //     state.map((column, i) =>
      //       i == initialRating
      //         ? startColumn
      //         : i == newRating
      //         ? endColumn
      //         : column
      //     )
      //   );
      // }
      const newRating = reorderState(destination, source, draggableId);

      const gameToUpdate = user.gamesInLibrary.find(
        (game) => game.igdb_game_id === parseInt(draggableId)
      );

      updateRating({
        variables: {
          igdb_game_id: gameToUpdate?.igdb_game_id,
          rating: newRating,
          // subrating: destination.index,
        },
        optimisticResponse: {
          updateRating: {
            ...gameToUpdate,
            rating: newRating,
            // subrating: destination.index,
            isOptimistic: true,
          },
        },
      });
    } catch (err) {
      console.log(`Error updating the cache after updateRating query: ${err}`);
    }
  };

  const populate = (gameIds: number[], games: Game[]) => {
    return gameIds.map(
      (gameId) => games.find((game) => parseInt(game.id) == gameId) as Game
    );
    // return games.filter((game) => gameIds.includes(parseInt(game.id))); // filter does not preserve id order, which causes issues when reordering.
  };

  return games.length > 0 ? (
    <BoardStateContext.Provider value={{ updateFromRater }}>
      <GenericContainer additionalStyle={styles.container}>
        <div css={styles.textDiv}>
          <p>
            You can drag and drop games with your mouse or using TAB to navigate
            games, SPACE to select them and the ARROW KEYS to move them.
          </p>
        </div>
        <DragDropContext onDragEnd={handleDragEnd}>
          <div css={styles.dndColumnsDiv}>
            {orderedColumns.map((column, i) => {
              return (
                <DragDropColumn
                  games={populate(column, games)}
                  title={columnNames[i]}
                  key={columnNames[i]}
                />
              );
            })}
          </div>
        </DragDropContext>
      </GenericContainer>
    </BoardStateContext.Provider>
  ) : (
    <div>No games found</div>
  );
};

export default DragoDropBoard;

export interface BoardStateContext {
  updateFromRater: (
    igdb_game_id: number,
    newRating: Rating | null,
    currentUser: User
  ) => boolean;
}
export const BoardStateContext = createContext<BoardStateContext | undefined>(
  undefined
);
