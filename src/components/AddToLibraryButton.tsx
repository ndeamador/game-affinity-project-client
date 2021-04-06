/** @jsxImportSource @emotion/react */
import { useHistory } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { GET_LIBRARY_IDS } from '../graphql/queries';
import TooltipButton from '../components/TooltipButton';
import { FaPlusCircle, FaBook } from 'react-icons/fa';
import { ADD_TO_LIBRARY } from '../graphql/mutations';
import { GameInUserLibrary, libraryIdsResponse } from '../types';

const AddToLibraryButton = ({ gameId }: { gameId: string }) => {
  const history = useHistory();

  const { data: library } = useQuery(GET_LIBRARY_IDS, {
    onError: (err) => console.log(err),
  });

  const isGameInLibrary: boolean = library?.getLibraryIds.find(
    (game: GameInUserLibrary) => game.igdb_game_id === parseInt(gameId)
  )
    ? true
    : false;

  const [
    addGameToLibrary,
    { loading: addingToLibrary, error: libraryError },
  ] = useMutation(ADD_TO_LIBRARY, {
    variables: { gameId: parseInt(gameId) },
    // refetchQueries: [{ query: GET_LIBRARY_IDS }],
    // awaitRefetchQueries: true,

    // I use update instead of refetchQueries for optimization.
    // This way we can manually update the cache instead of refetching the query.
    update: (store, response) => {
      try {
        const dataInStore: libraryIdsResponse | null = store.readQuery({
          query: GET_LIBRARY_IDS,
        });

        store.writeQuery({
          query: GET_LIBRARY_IDS,
          data: {
            ...dataInStore,
            getLibraryIds: dataInStore
              ? [...dataInStore.getLibraryIds, response.data.addGameToLibrary]
              : [response.data.addGameToLibrary],
          },
        });
      } catch (err) {
        console.log(`Error updating the cache after addGameToLibrary query: ${err}`);
      }
    },
    onError: (err) => console.log(`Error adding game to library: ${err}`)
  });

  return (
    <div>
      {isGameInLibrary ? (
        <TooltipButton
          label='In library'
          onClick={() => history.push('/library')}
          icon={<FaBook />}
          isLoading={false}
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
