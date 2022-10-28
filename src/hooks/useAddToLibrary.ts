import { useMutation } from '@apollo/client';
import { ADD_TO_LIBRARY } from 'graphql/mutations';
import { CURRENT_USER } from 'graphql/queries';
import { MeResponse } from 'types';


const useAddToLibrary = () => {

  return useMutation(ADD_TO_LIBRARY, {
    update: (store, response) => {
      try {
        if (response.data.addGameToLibrary) {
          // without specifiying the data type we cannot use the spread operator later (Spread types may only be created from object types.ts(2698))
          const dataInStore: MeResponse | null = store.readQuery({
            query: CURRENT_USER,
          });

          // We need to check that there is data because we cannot spread null.
          if (dataInStore) {
            store.writeQuery({
              query: CURRENT_USER,
              data: {
                ...dataInStore,
                me: {
                  ...dataInStore.me,
                  gamesInLibrary: [
                    ...dataInStore.me.gamesInLibrary.filter(game => game.id !== '-1'), // remove previous optimistic response
                    response.data.addGameToLibrary
                  ]
                }
              }
            });
          }
        }
      } catch (err) {
        console.log(
          `Error updating the cache after addGameToLibrary query: ${err}`
        );
      }
    },
    onError: (err) => console.log(`Error adding game to library: ${err}`)
  });
}

export default useAddToLibrary;