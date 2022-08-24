/** @jsxImportSource @emotion/react */

import TooltipButton from '../components/TooltipButton';
import { FaPlusCircle, FaRegTrashAlt } from 'react-icons/fa';
import useAddToLibrary from '../hooks/useAddToLibrary';
import useRemoveFromLibrary from '../hooks/useRemoveFromLibrary';
import useLazyCurrentUser from '../hooks/useLazyCurrentUser';
import { useContext, useEffect } from 'react';
import findGameInLibrary from '../utils/findGameInLibrary';
import { BoardStateContext } from './DragDropBoard';

const AddToLibraryButton = ({ gameId }: { gameId: string | number }) => {
  const parsedGameId = typeof gameId === 'string' ? parseInt(gameId) : gameId;

  const {
    getCurrentUser,
    currentUser,
    loading,
    error: getUserError,
  } = useLazyCurrentUser();

  useEffect(() => {
    getCurrentUser();
  }, []);

  if (loading) {
    return (
      <TooltipButton
        isLoading={true}
        label='Loading...'
        onClick={() => {
          return false;
        }}
      />
    );
  }

  const gameInLibrary = currentUser
    ? findGameInLibrary({
        gameId: parsedGameId,
        user: currentUser,
      })
    : undefined;

  const [addGameToLibrary, { loading: addingToLibrary, error: libraryError }] =
    useAddToLibrary();

  const [removeGameFromLibrary, { loading: deletingGame }] =
    useRemoveFromLibrary();

  const boardState = useContext(BoardStateContext);

  return (
    <div>
      {gameInLibrary ? (
        <TooltipButton
          label='Remove from library'
          onClick={() => {
            if (boardState)
              boardState.updateBoardStateWithId(parsedGameId, null, currentUser);
            removeGameFromLibrary({
              variables: { igdb_game_id: parsedGameId },
              optimisticResponse: {
                removeGameFromLibrary: gameInLibrary.id,
                isOptimistic: true,
              },
            });
          }}
          icon={<FaRegTrashAlt />}
          isLoading={deletingGame}
          altColor
        />
      ) : (
        <TooltipButton
          label='Add to library'
          onClick={() =>
            addGameToLibrary({
              variables: { gameId: parsedGameId, rating: 0 },

              optimisticResponse: {
                isOptimistic: true,
                addGameToLibrary: {
                  __typename: 'GameInUserLibrary',
                  id: '-1', // dummy value (will be updated with the server generated id)
                  igdb_game_id: parsedGameId,
                  rating: 0,
                  subrating: null,
                },
              },
            })
          }
          icon={<FaPlusCircle />}
          isLoading={addingToLibrary}
          isError={getUserError || libraryError ? true : false}
          errorMessage={
            getUserError ? getUserError.message : libraryError?.message
          }
        />
      )}
    </div>
  );
};

export default AddToLibraryButton;
