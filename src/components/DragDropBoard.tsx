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
import GameProfileModal from './GameProfileModal';

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

const DragoDropBoard = ({
  games,
  user,
/*   setOpenModal,
 */}: {
  games: Game[];
  user: User;
/*   setOpenModal: React.Dispatch<React.SetStateAction<string>>;
 */}) => {
  // Remember that using the mapped object's indexes for the key property is an anti-pattern, use unique id instead
  // https://robinpokorny.medium.com/index-as-a-key-is-an-anti-pattern-e0349aece318

  console.log('DragDropBoard ----------------------------------');
  const [updateRating] = useUpdateRating();
  // const [orderedColumns, setOrderedColums, reorderBoardStateWithDnDData] = useBoardState(user);
  const {
    orderedColumns,
    setOrderedColums,
    reorderBoardStateWithDnDData,
    updateBoardStateWithId,
  } = useBoardState(user);

  const [openModal, setOpenModal] = useState<string>('none');

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

    try {
      // const initialRating = determineNewRank(source.droppableId);
      // const newRating = determineNewRank(destination.droppableId);

      const newRating = reorderBoardStateWithDnDData(
        destination,
        source,
        draggableId
      );

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
    <BoardStateContext.Provider
      value={{ updateBoardStateWithId, setOpenModal }}
    >
      <>
        <GenericContainer additionalStyle={styles.container}>
          <div css={styles.textDiv}>
            <p>
              You can drag and drop games with your mouse or using TAB to
              navigate games, SPACE to select them and the ARROW KEYS to move
              them.
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
        <GameProfileModal openModal={openModal} setOpenModal={setOpenModal} currentUser={user}/>
      </>
    </BoardStateContext.Provider>
  ) : (
    <div>No games found</div>
  );
};

export default DragoDropBoard;

export interface BoardStateContext {
  updateBoardStateWithId: (
    igdb_game_id: number,
    newRating: Rating | null,
    currentUser: User
  ) => void;
  setOpenModal: React.Dispatch<React.SetStateAction<string>>;
}
export const BoardStateContext = createContext<BoardStateContext | undefined>(
  undefined
);
