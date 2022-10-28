import { useMutation } from '@apollo/client';
import { REMOVE_FROM_LIBRARY } from 'graphql/mutations';


const useRemoveFromLibrary = () => {

  return useMutation(REMOVE_FROM_LIBRARY, {

    update: (store, response) => {
      if (response.data.removeGameFromLibrary) {
        try {
          const normalizedId = store.identify({ id: response.data.removeGameFromLibrary, __typename: 'GameInUserLibrary' })
          store.evict({ id: normalizedId });

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
    },
    onError: (err) => console.log(`Error removing game from library: ${err}`),
  }
  );
}

export default useRemoveFromLibrary;