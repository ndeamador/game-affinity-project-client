import { useMutation } from '@apollo/client';
import { UPDATE_RATING } from '../graphql/mutations';
import { CURRENT_USER } from '../graphql/queries';
import { MeResponse } from '../types';



// const useAddToLibrary = ({ gameId }: { gameId: number | string }) => {
const useUpdateRating = () => {

  // let parsedGameId: number;
  // typeof gameId === 'string' ? parsedGameId = parseInt(gameId) : parsedGameId = gameId;


  return useMutation(UPDATE_RATING, {
    //   refetchQueries: [{ query: CURRENT_USER }],

    // I use update instead of refetchQueries for optimization.
    // This way we can manually update the cache instead of refetching the query.
    update: (store, response) => {
      console.log('useupdate response: ', response.data);
      try {
        // without specifiying the data type we cannot use the spread operator later (Spread types may only be created from object types.ts(2698))

        // store.writeQuery({
        //   query: CURRENT_USER,
        //   data: {
        //     ...dataInStore,
        //     me: {
        //       ...dataInStore?.me,
        //       gamesInLibrary: dataInStore
        //         ? [
        //           ...dataInStore.me.gamesInLibrary,
        //           response.data?.addGameToLibrary,
        //         ]
        //         : [response.data?.addGameToLibrary],
        //     },
        //   },
        // });


        if (response.data?.updateRating) {
          console.log('in');

          const dataInStore: MeResponse | null = store.readQuery({
            query: CURRENT_USER,
          });

          console.log('databefore: ', dataInStore?.me.gamesInLibrary);
          console.log('test:', dataInStore?.me.gamesInLibrary.map((game) =>
            game.igdb_game_id !== response.data.updateRating.igdb_game_id
              ? game
              : response.data.updateRating
          ));

          store.writeQuery({
            query: CURRENT_USER,
            data: {
              ...dataInStore,
              me: {
                ...dataInStore?.me,

                // // If using the server response that does not return the updated object, the client's cache must be updated manually:
                // gamesInLibrary: dataInStore?.me.gamesInLibrary.map(game => game.igdb_game_id !== parseInt(draggableId) ? game : { ...game, rating: determineNewRank(destination.droppableId)})

                // If the server returns the updated object:
                gamesInLibrary: dataInStore?.me.gamesInLibrary.map((game) =>
                  game.igdb_game_id !== response.data.updateRating.igdb_game_id
                    ? game
                    : response.data.updateRating
                ),
              },
            },
          });

        }

        const after: MeResponse | null = store.readQuery({
          query: CURRENT_USER,
        });

        console.log('store after update: ', after?.me.gamesInLibrary);

      } catch (err) {
        console.log(
          `Error updating the cache after updateRating mutation: ${err}`
        );
      }
    },
    onError: (err) => console.log(`Error updating rating: ${err}`),
  });
}

export default useUpdateRating;