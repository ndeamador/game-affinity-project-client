import { MutationResult, MutationTuple, useMutation } from '@apollo/client';
import { ADD_TO_LIBRARY } from '../graphql/mutations';
import { CURRENT_USER } from '../graphql/queries';
import { MeResponse } from '../types';



// const useAddToLibrary = ({ gameId }: { gameId: number | string }) => {
const useAddToLibrary = () => {

  // let parsedGameId: number;
  // typeof gameId === 'string' ? parsedGameId = parseInt(gameId) : parsedGameId = gameId;


  return useMutation(ADD_TO_LIBRARY, {
    // variables: { gameId: parsedGameId },

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
}

export default useAddToLibrary;