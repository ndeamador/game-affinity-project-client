import { RATINGS } from '../constants';
import { useState } from 'react';
import { DraggableLocation } from 'react-beautiful-dnd';
import { GameInUserLibrary, Rating, User } from 'types';
import useLazyCurrentUser from './useLazyCurrentUser';


const useBoardState = (user: User) => {
  // const {
  //   getCurrentUser,
  //   currentUser,
  //   loading: loadingUser,
  //   error: getUserError,
  // } = useLazyCurrentUser();

  const getIdsInColumn = (
    rating: Rating,
    gamesInUserLibrary: GameInUserLibrary[]
  ) => {
    return gamesInUserLibrary
      .filter((game) => game.rating == rating)
      .map((game) => game.igdb_game_id);
  };

  const [orderedColumns, setOrderedColums] = useState<number[][]>([
    getIdsInColumn(RATINGS.unranked.value, user.gamesInLibrary),
    getIdsInColumn(RATINGS.thumbsDown.value, user.gamesInLibrary),
    getIdsInColumn(RATINGS.thumbsUp.value, user.gamesInLibrary),
    getIdsInColumn(RATINGS.great.value, user.gamesInLibrary),
    getIdsInColumn(RATINGS.legendary.value, user.gamesInLibrary),
  ]);

  const determineNewRank = (destinationId: string): Rating => {
    switch (destinationId) {
      case RATINGS.unranked.title:
        return RATINGS.unranked.value;
      case RATINGS.thumbsDown.title:
        return RATINGS.thumbsDown.value;
      case RATINGS.thumbsUp.title:
        return RATINGS.thumbsUp.value;
      case RATINGS.great.title:
        return RATINGS.great.value;
      case RATINGS.legendary.title:
        return RATINGS.legendary.value;

      default:
        throw new Error('Invalid d&d destinationId');
    }
  };

  const reorderBoardStateWithDnDData = (destination: DraggableLocation,
    source: DraggableLocation,
    draggableId: string) => {
    const initialRating = determineNewRank(source.droppableId);
    const newRating = determineNewRank(destination.droppableId);
    const parsedId = parseInt(draggableId);

    if (initialRating == newRating) {
      const reorderedColumn = [...orderedColumns[initialRating]];
      reorderedColumn.splice(source.index, 1);
      reorderedColumn.splice(destination.index, 0, parsedId);

      setOrderedColums((state) =>
        state.map((column, i) => (i == newRating ? reorderedColumn : column))
      );

    } else {
      const startColumn = [...orderedColumns[initialRating]];
      const endColumn = [...orderedColumns[newRating]];

      startColumn.splice(source.index, 1);
      endColumn.splice(destination.index, 0, parsedId);

      setOrderedColums((state) =>
        state.map((column, i) =>
          i == initialRating
            ? startColumn
            : i == newRating
              ? endColumn
              : column
        )
      );
    }

    return newRating;
  }

  // This method is meant to be used with the rater radio selector and is not useable to swap items within the same column.
  const updateBoardStateWithId = (igdb_game_id: number, newRating: Rating | null, currentUser: User) => {
    const currentRating = currentUser.gamesInLibrary.find(game => game.igdb_game_id == igdb_game_id)?.rating as Rating;

    if (newRating) {
      if (newRating != currentRating) {
        console.log('distintos', orderedColumns);
        setOrderedColums((state) =>
          state.map((column, i) => {
            return i == currentRating
              ? column.filter(gameId => gameId != igdb_game_id)
              : i == newRating
                ? column.concat(igdb_game_id)
                : column
          }
          ));
      }
      else {
        // Temp: if for some reason the current rating and the new rating are the same, do nothing. Should not be triggered.
        console.log('same!!');
        return;
      }


    }
    else {
      // if null is provided as new rating, delete the game from the Board.
      setOrderedColums((state) => {
        // const initialColumn = [...orderedColumns[currentRating]];
        // const positionInColumn = initialColumn.findIndex(gameId => gameId == igdb_game_id);
        // initialColumn.splice(positionInColumn, 1);
        // const filteredColumn = initialColumn.filter(gameId => gameId != igdb_game_id)

        return state.map((column, i) => {

          return i == currentRating
            // ? filteredColumn
            ? column.filter(gameId => gameId != igdb_game_id)
            // ? initialColumn.splice(positionInColumn, 1)
            // ? initialColumn.filter(gameId => gameId != igdb_game_id)
            : column
        }
        )
      });
    }

    return

  }

  return { orderedColumns, setOrderedColums, reorderBoardStateWithDnDData, updateBoardStateWithId } /* as const */;
}

export default useBoardState;