/** @jsxImportSource @emotion/react */

import { DragDropContext, OnDragEndResponder } from 'react-beautiful-dnd';
import { createContext, useState } from 'react';
import useUpdateRating from 'hooks/useUpdateRating';
import useBoardState from 'hooks/useBoardState';
import GenericContainer from 'components/shared/GenericContainer';
import DragDropColumn from './DragDropColumn';
import GameProfileModal from 'components/shared/GameProfileModal';
import { Game, Rating, User } from 'types';
import styles from './DragDropBoard.styles';
import { RATINGS } from '../../../constants';

const DragoDropBoard = ({ games, user }: { games: Game[]; user: User }) => {
  // Remember that using the mapped object's indexes for the key property is an anti-pattern, use unique id instead
  // https://robinpokorny.medium.com/index-as-a-key-is-an-anti-pattern-e0349aece318

  const [updateRating] = useUpdateRating();
  const {
    orderedColumns,
    reorderBoardStateWithDnDData,
    updateBoardStateWithId,
  } = useBoardState(user);

  const [openModal, setOpenModal] = useState<string>('none');

  const [columnNames] = useState(
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
    // Populating with reduce instead of map is a workaround to filter out gameIds in library for which a fetched IGDB game cannot be found
    // This can happen if the number of games fetched from IGDB is manually limitted/
    return gameIds.reduce((acc, currentGameId) => {
      const foundGame = games.find(
        (game) => parseInt(game.id) == currentGameId
      );
      return foundGame ? acc.concat(foundGame) : acc;
    }, [] as Game[]);

    // Mapping gameIds causes errors if no match is found in the array 'games' as it includes "undefined" when there is no matching game
    // (for instance, if there are more gameIds than games returned by IGDB -max request-)
    // return gameIds.map(
    //   (gameId) => games.find((game) => parseInt(game.id) == gameId) as Game
    // );

    // return games.filter((game) => gameIds.includes(parseInt(game.id))); // causes issues when reordering as the order of "games" and not "gameIds" is taken into account.
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
        <GameProfileModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          currentUser={user}
        />
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
