import { useMutation } from '@apollo/client';
import { UPDATE_RATING } from 'graphql/mutations';
import { CURRENT_USER } from 'graphql/queries';
import { MeResponse } from 'types';


const useUpdateRating = () => {

  return useMutation(UPDATE_RATING, {
    update: (store, response) => {
      try {
        if (response.data?.updateRating) {

          // without specifiying the data type we cannot use the spread operator later (Spread types may only be created from object types.ts(2698))
          const dataInStore: MeResponse | null = store.readQuery({
            query: CURRENT_USER,
          });

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

        // const after: MeResponse | null = store.readQuery({
        //   query: CURRENT_USER,
        // });
        // console.log('store after update: ', after?.me.gamesInLibrary);

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