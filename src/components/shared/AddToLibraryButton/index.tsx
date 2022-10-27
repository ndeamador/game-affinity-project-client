/** @jsxImportSource @emotion/react */

import TooltipButton from 'components/shared/TooltipButton';
import { FaPlusCircle, FaRegTrashAlt } from 'react-icons/fa';
import useAddToLibrary from 'hooks/useAddToLibrary';
import useRemoveFromLibrary from 'hooks/useRemoveFromLibrary';
import findGameInLibrary from 'utils/findGameInLibrary';
import { User } from 'types';

const AddToLibraryButton = ({
  currentUser,
  gameId,
}: {
  currentUser: User;
  gameId: string | number;
}) => {
  const parsedGameId = typeof gameId === 'string' ? parseInt(gameId) : gameId;

  const gameInLibrary = currentUser
    ? findGameInLibrary({
        gameId: parsedGameId,
        user: currentUser,
      })
    : undefined;

  const [addGameToLibrary, { loading: addingToLibrary }] = useAddToLibrary();

  const [removeGameFromLibrary, { loading: deletingGame }] =
    useRemoveFromLibrary();

  return (
    <div>
      {gameInLibrary ? (
        <TooltipButton
          label='Remove from library'
          onClick={() => {
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
        />
      )}
    </div>
  );
};

export default AddToLibraryButton;
