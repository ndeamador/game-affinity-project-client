/** @jsxImportSource @emotion/react */

import TooltipButton from '../components/TooltipButton';
import { FaPlusCircle, FaTimes } from 'react-icons/fa';
import { GameInUserLibrary } from '../types';
import useAddToLibrary from '../hooks/useAddToLibrary';
import useRemoveFromLibrary from '../hooks/useRemoveFromLibrary';
import useLazyCurrentUser from '../hooks/useLazyCurrentUser';
import { useEffect } from 'react';

const AddToLibraryButton = ({ gameId }: { gameId: string | number }) => {
  const parsedGameId = typeof gameId === 'string' ? parseInt(gameId) : gameId;
  // const { currentUser } = useAuthContext();
  // const {currentUser} = useCurrentUser();
  const { getCurrentUser, currentUser, loading, error:getUserError } = useLazyCurrentUser();
  useEffect(() => {
    getCurrentUser();

  // }, [findGames]);
  }, [getCurrentUser]);

  if (loading) return <TooltipButton isLoading={true} label='Loading...' onClick={()=> {return false;}}/>

  const library = currentUser?.gamesInLibrary;

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
