/** @jsxImportSource @emotion/react */
import { useHistory } from 'react-router-dom';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { CURRENT_USER, GET_LIBRARY_IDS } from '../graphql/queries';
import TooltipButton from '../components/TooltipButton';
import { FaPlusCircle, FaTimes } from 'react-icons/fa';
import { ADD_TO_LIBRARY, REMOVE_FROM_LIBRARY } from '../graphql/mutations';
import {
  GameInUserLibrary,
  libraryIdsResponse,
  MeResponse,
  User,
} from '../types';
import { useEffect } from 'react';

const AddToLibraryButton = ({ gameId }: { gameId: string }) => {
  const parsedGameId = parseInt(gameId);

  const [
    getCurrentUser,
    { data: currentUser, loading: loadingLibrary },
  ] = useLazyQuery(CURRENT_USER, {
    onError: (err) => console.log(err),
  });

  // execute query on component mount
  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  const library = currentUser?.me.gamesInLibrary;

  const isGameInLibrary: boolean = library?.find(
    (game: GameInUserLibrary) => game.igdb_game_id === parsedGameId
  )
    ? true
    : false;

  console.log('library: ', isGameInLibrary, library);

  const [
    addGameToLibrary,
    { loading: addingToLibrary, error: libraryError },
  ] = useMutation(ADD_TO_LIBRARY, {
    variables: { gameId: parsedGameId },
    // refetchQueries: [{ query: GET_LIBRARY_IDS }],
    // awaitRefetchQueries: true,

    // I use update instead of refetchQueries for optimization.
    // This way we can manually update the cache instead of refetching the query.
    update: (store, response) => {
      try {
        const dataInStore: MeResponse | null = store.readQuery({
          query: CURRENT_USER,
        });

        store.writeQuery({
          query: CURRENT_USER,
          data: {
            ...dataInStore,
            me: {
              ...dataInStore?.me,
              gamesInLibrary: dataInStore
                ? [
                    ...dataInStore.me.gamesInLibrary,
                    response.data.addGameToLibrary,
                  ]
                : [response.data.addGameToLibrary],
            },
          },
        });
      } catch (err) {
        console.log(
          `Error updating the cache after addGameToLibrary query: ${err}`
        );
      }
    },
    onError: (err) => console.log(`Error adding game to library: ${err}`),
  });

  const [removeGameFromLibrary, { loading: deletingGame }] = useMutation(
    REMOVE_FROM_LIBRARY,
    {
      variables: { igdb_game_id: parsedGameId },
      update: (store, response) => {
        if (response.data.removeGameFromLibrary) {
          try {
            const dataInStore: MeResponse | null = store.readQuery({
              query: CURRENT_USER,
            });

            console.log('store', dataInStore);
            console.log('response', response.data.removeGameFromLibrary);
            console.log(
              'rem gamesinlib store:',
              dataInStore?.me.gamesInLibrary
            );
            console.log(
              'map:',
              dataInStore?.me.gamesInLibrary.filter(
                (game) => game.igdb_game_id !== parsedGameId
              )
            );

            store.writeQuery({
              query: CURRENT_USER,
              data: {
                ...dataInStore,
                me: {
                  ...dataInStore?.me,
                  gamesInLibrary: dataInStore?.me.gamesInLibrary.filter(
                    (game) => game.igdb_game_id !== parsedGameId
                  ),
                },
              },
            });
          } catch (err) {
            console.log(
              `Error updating the cache after removeGameFromLibrary query: ${err}`
            );
          }
        } else {
          console.log(`Game to remove from library not found in database.`);
        }
      },
      onError: (err) => console.log(`Error removing game from library: ${err}`),
    }
  );

  return (
    <div>
      {isGameInLibrary ? (
        // <TooltipButton
        //   label='In library'
        //   onClick={() => history.push('/library')}
        //   icon={<FaBook />}
        //   isLoading={false}
        // />
        <TooltipButton
          label='Remove from library'
          onClick={() => removeGameFromLibrary()}
          icon={<FaTimes />}
          isLoading={loadingLibrary || deletingGame}
        />
      ) : (
        <TooltipButton
          label='Add to library'
          onClick={addGameToLibrary}
          icon={<FaPlusCircle />}
          isLoading={addingToLibrary}
          isError={libraryError ? true : false}
          errorMessage={libraryError?.message}
        />
      )}
    </div>
  );
};

export default AddToLibraryButton;
