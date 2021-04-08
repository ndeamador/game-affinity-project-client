/** @jsxImportSource @emotion/react */
import { useLazyQuery, useMutation } from '@apollo/client';
import { CURRENT_USER } from '../graphql/queries';
import TooltipButton from '../components/TooltipButton';
import { FaPlusCircle, FaTimes } from 'react-icons/fa';
import { ADD_TO_LIBRARY, REMOVE_FROM_LIBRARY } from '../graphql/mutations';
import { GameInUserLibrary, MeResponse } from '../types';
import { useEffect } from 'react';
import useAddToLibrary from '../hooks/useAddToLibrary';
import useRemoveFromLibrary from '../hooks/useRemoveFromLibrary';
import useLazyCurrentUser from '../hooks/useLazyCurrentUser';

const AddToLibraryButton = ({ gameId }: { gameId: string }) => {
  const parsedGameId = parseInt(gameId);

  const [
    getCurrentUser,
    { data: currentUser, loading: loadingLibrary },
  ] = useLazyCurrentUser();

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
  ] = useAddToLibrary();

  const [
    removeGameFromLibrary,
    { loading: deletingGame },
  ] = useRemoveFromLibrary({ gameId: parsedGameId });
  // const [
  //   addGameToLibrary,
  //   { loading: addingToLibrary, error: libraryError },
  // ] = useMutation(ADD_TO_LIBRARY, {
  //   variables: { gameId: parsedGameId },
  //   // refetchQueries: [{ query: GET_LIBRARY_IDS }],
  //   // awaitRefetchQueries: true,

  //   // I use update instead of refetchQueries for optimization.
  //   // This way we can manually update the cache instead of refetching the query.
  //   update: (store, response) => {
  //     try {
  //       const dataInStore: MeResponse | null = store.readQuery({
  //         query: CURRENT_USER,
  //       });

  //       store.writeQuery({
  //         query: CURRENT_USER,
  //         data: {
  //           ...dataInStore,
  //           me: {
  //             ...dataInStore?.me,
  //             gamesInLibrary: dataInStore
  //               ? [
  //                   ...dataInStore.me.gamesInLibrary,
  //                   response.data.addGameToLibrary,
  //                 ]
  //               : [response.data.addGameToLibrary],
  //           },
  //         },
  //       });
  //     } catch (err) {
  //       console.log(
  //         `Error updating the cache after addGameToLibrary query: ${err}`
  //       );
  //     }
  //   },
  //   onError: (err) => console.log(`Error adding game to library: ${err}`),
  // });

  // const [removeGameFromLibrary, { loading: deletingGame }] = useMutation(
  //   REMOVE_FROM_LIBRARY,
  //   {
  //     variables: { igdb_game_id: parsedGameId },
  //     update: (store, response) => {
  //       if (response.data.removeGameFromLibrary) {
  //         try {
  //           const dataInStore: MeResponse | null = store.readQuery({
  //             query: CURRENT_USER,
  //           });

  //           store.writeQuery({
  //             query: CURRENT_USER,
  //             data: {
  //               ...dataInStore,
  //               me: {
  //                 ...dataInStore?.me,
  //                 gamesInLibrary: dataInStore?.me.gamesInLibrary.filter(
  //                   (game) => game.igdb_game_id !== parsedGameId
  //                 ),
  //               },
  //             },
  //           });
  //         } catch (err) {
  //           console.log(
  //             `Error updating the cache after removeGameFromLibrary query: ${err}`
  //           );
  //         }
  //       } else {
  //         console.log(`Game to remove from library not found in database.`);
  //       }
  //     },
  //     onError: (err) => console.log(`Error removing game from library: ${err}`),
  //   }
  // );

  const handleAddClick = () => {
    // event.stopPropagation();
    // event.preventDefault();
    addGameToLibrary({ variables: { gameId: parsedGameId } });
  };

  return (
    <div>
      {isGameInLibrary ? (
        <TooltipButton
          label='Remove from library'
          onClick={() => removeGameFromLibrary()}
          icon={<FaTimes />}
          isLoading={loadingLibrary || deletingGame}
        />
      ) : (
        <TooltipButton
          label='Add to library'
          onClick={handleAddClick}
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
