/** @jsxImportSource @emotion/react */

import TooltipButton from '../components/TooltipButton';
import { FaPlusCircle, FaTimes } from 'react-icons/fa';
import { GameInUserLibrary } from '../types';
import { useEffect } from 'react';
import useAddToLibrary from '../hooks/useAddToLibrary';
import useRemoveFromLibrary from '../hooks/useRemoveFromLibrary';
import { useAuthContext } from '../context/AuthContext';

const AddToLibraryButton = ({ gameId }: { gameId: string | number }) => {
  const parsedGameId = typeof gameId === 'string' ? parseInt(gameId) : gameId;
  const { currentUser } = useAuthContext();

  const library = currentUser.gamesInLibrary;

  const isGameInLibrary: boolean = library?.find(
    (game: GameInUserLibrary) => game.igdb_game_id === parsedGameId
  )
    ? true
    : false;

  const [
    addGameToLibrary,
    { loading: addingToLibrary, error: libraryError },
  ] = useAddToLibrary();

  const [
    removeGameFromLibrary,
    { loading: deletingGame },
  ] = useRemoveFromLibrary({ gameId: parsedGameId });

  return (
    <div>
      {isGameInLibrary ? (
        <TooltipButton
          label='Remove from library'
          onClick={() => removeGameFromLibrary()}
          icon={<FaTimes />}
          isLoading={deletingGame}
          highlight='red'
        />
      ) : (
        <TooltipButton
          label='Add to library'
          onClick={() =>
            addGameToLibrary({ variables: { gameId: parsedGameId } })
          }
          icon={<FaPlusCircle />}
          isLoading={addingToLibrary}
          isError={libraryError ? true : false}
          errorMessage={libraryError?.message}
          highlight='blue'
        />
      )}
    </div>
  );
};

export default AddToLibraryButton;
