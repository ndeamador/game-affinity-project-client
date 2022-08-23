import { useState } from 'react';
import { DraggableLocation } from 'react-beautiful-dnd';
import { RATINGS } from '../constants';
import { GameInUserLibrary, Rating, User } from '../types';
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

  const reorderState = (destination: DraggableLocation,
    source: DraggableLocation,
    draggableId: string) => {
    const initialRating = determineNewRank(source.droppableId);
    const newRating = determineNewRank(destination.droppableId);

    if (initialRating == newRating) {
      const reorderedColumn = [...orderedColumns[initialRating]];
      reorderedColumn.splice(source.index, 1);
      reorderedColumn.splice(destination.index, 0, parseInt(draggableId));

      setOrderedColums((state) =>
        state.map((column, i) => (i == newRating ? reorderedColumn : column))
      );
    } else {
      const startColumn = [...orderedColumns[initialRating]];
      const endColumn = [...orderedColumns[newRating]];

      startColumn.splice(source.index, 1);
      endColumn.splice(destination.index, 0, parseInt(draggableId));

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

  const updateFromRater = (igdb_game_id: number, newRating: Rating, currentUser: User) => {
    console.log(igdb_game_id, newRating);
    console.log(orderedColumns);
    // console.log(currentUser.gamesInLibrary);
    const currentRating = currentUser.gamesInLibrary.find(game => game.igdb_game_id == igdb_game_id)?.rating as Rating;
    console.log('old and new ratins', currentRating, newRating);
    // console.log('current column', orderedColumns[currentRating]);

    const initialColumn = [...orderedColumns[currentRating]];
    const positionInColumn = initialColumn.findIndex(gameId => gameId == igdb_game_id);
    console.log('original column & position', initialColumn, positionInColumn);
    initialColumn.splice(positionInColumn, 1);
    console.log('original after trim:', initialColumn);
    // const trimmedInitialColumn = [...initialColumn.splice(positionInColumn, 1)];
    // const trimmedInitialColumn = [...initialColumn.splice(positionInColumn, 1)];

    const updatedNewColumn = [...orderedColumns[newRating], igdb_game_id]
    console.log('or target vs updated target: ', orderedColumns[newRating], updatedNewColumn);

    console.log('before: ', orderedColumns, currentRating, newRating);
    console.log(initialColumn, );
    setOrderedColums((state) =>
      // state.map((column, i) =>
      //   i == currentRating
      //     ? trimmedInitialColumn
      //     : i == newRating
      //       ? updatedNewColumn
      //       : column
      // )
      state.map((column, i) =>
      {
        console.log(i, column, i == currentRating, i == newRating);
        return i == currentRating
        ? initialColumn
        : i == newRating
          ? updatedNewColumn
          : column}
    )
    );
    console.log('after: ', orderedColumns);

    // console.log(orderedColumns.find(igdb_game_id));
    return true;
  }

  return { orderedColumns, setOrderedColums, reorderState, updateFromRater } /* as const */;
}

export default useBoardState;