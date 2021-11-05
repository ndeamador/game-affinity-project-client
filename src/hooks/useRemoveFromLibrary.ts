import { useMutation } from '@apollo/client';
import { REMOVE_FROM_LIBRARY } from '../graphql/mutations';
import { CURRENT_USER } from '../graphql/queries';


const useRemoveFromLibrary = () => {

  return useMutation(
    REMOVE_FROM_LIBRARY,
    {
      update: (store, response) => {
        console.log('-----------delete response: ', response.data);

        const dataInStore = store.readQuery({
          query: CURRENT_USER,
        });
        console.log('rem store before: ', dataInStore);

        if (response.data.removeGameFromLibrary) {
          try {
            console.log('in', response.data.removeGameFromLibrary ? response.data.removeGameFromLibrary : false);
            const normalizedId = store.identify({ id: response.data.removeGameFromLibrary, __typename: 'GameInUserLibrary' })
            const test = store.evict({ id: normalizedId });
            console.log('normalizedId', normalizedId, test);
            // Evicting an object often makes other cached objects unreachable.
            // Because of this, you should call cache.gc after evicting one or more objects from the cache.
            store.gc();

          } catch (err) {
            console.log(
              `Error updating the cache after removeGameFromLibrary query: ${err}`
            );
          }
        } else {
          console.log(`Game to remove from library not found in database.`);
        }

        const dataafter = store.readQuery({
          query: CURRENT_USER,
        });
        console.log('rem store after: ', dataafter);

      },
      onError: (err) => console.log(`Error removing game from library: ${err}`),
    }
  );
}

export default useRemoveFromLibrary;