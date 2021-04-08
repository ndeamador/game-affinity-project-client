import { useMutation } from '@apollo/client';
import { REMOVE_FROM_LIBRARY } from '../graphql/mutations';
import { CURRENT_USER } from '../graphql/queries';
import { MeResponse } from '../types';


const useRemoveFromLibrary = ({ gameId }: { gameId: number | string }) => {
  // const useRemoveFromLibrary = () => {

  let parsedGameId: number;
  typeof gameId === 'string' ? parsedGameId = parseInt(gameId) : parsedGameId = gameId;

  return useMutation(
    REMOVE_FROM_LIBRARY,
    {
      variables: { igdb_game_id: parsedGameId },
      update: (store, response) => {

        if (response.data.removeGameFromLibrary) {
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
}

export default useRemoveFromLibrary;