/** @jsxImportSource @emotion/react */

import { Game, MeResponse, Rating, User } from '../types';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import DragDropColumn from './DragDropColumn';
import { UPDATE_RATING } from '../graphql/mutations';
import { CURRENT_USER } from '../graphql/queries';
import { useMutation } from '@apollo/client';

const DragoDropBoard = ({ games, user }: { games: Game[]; user: User }) => {
  // Remember that using the mapped object's indexes for the key property is an anti-pattern, use unique id instead
  // https://robinpokorny.medium.com/index-as-a-key-is-an-anti-pattern-e0349aece318

  const [updateRating] = useMutation(UPDATE_RATING);


  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    // Do nothing if the item is dropped outside of a "droppable" object:
    if (!destination) {
      return;
    }

    // Do nothing if the user has droppped the draggable item in its original location:
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Just a check to please Typescript (we could use a non-null assertion operator below (result.destination!.index) but we have set a tsconfig rule against it: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator)
    if (result.destination?.index === undefined) {
      console.log('DnD destination index missing.');
      return;
    }

    // If the location has changed, reorder the source data:
    const determineNewRank = (destinationId: string): Rating => {
      switch (destinationId) {
        case 'thumbs-down':
          return 0;
        case 'thumbs-up':
          return 1;
        case 'great':
          return 2;
        case 'legendary':
          return 3;
        case 'unranked':
          return null;
        default:
          throw new Error('Invalid d&d destinationId');
      }
    }

    try {
      const gameToUpdate = user.gamesInLibrary.find(game => game.igdb_game_id === parseInt(draggableId));
      const newRating = determineNewRank(destination.droppableId);
      console.log('gameId:', parseInt(draggableId), '- rating: ', newRating, '- game: ', gameToUpdate);

      updateRating({
        variables: {
          gameId: gameToUpdate?.igdb_game_id,
          rating: newRating,
        },
        optimisticResponse:  {
          updateRating: {
            ...gameToUpdate,
            rating: newRating,
            isOptimistic: true
          }
        },
        update: (store, response) => {
          console.log('Updating rating...');
          const dataInStore: MeResponse | null = store.readQuery({ query: CURRENT_USER })

          if (response.data?.updateRating) {
            store.writeQuery({
              query: CURRENT_USER,
              data: {
                ...dataInStore,
                me: {
                  ...dataInStore?.me,

                  // // If using the server response that does not return the updated object, the client's cache must be updated manually:
                  // gamesInLibrary: dataInStore?.me.gamesInLibrary.map(game => game.igdb_game_id !== parseInt(draggableId) ? game : { ...game, rating: determineNewRank(destination.droppableId)})

                  // If the server returns the updated object:
                  gamesInLibrary: dataInStore?.me.gamesInLibrary.map(game => game.igdb_game_id !== parseInt(draggableId) ? game : response.data.updateRating)
                }
              }
            })
          }
        }
      });

    } catch (err) {
      console.log(
        `Error updating the cache after updateRating query: ${err}`
      );
    }
  };


  const filterByColumn = (games: Game[], column: Rating ): Game[] => {
    return games.filter(game => user.gamesInLibrary.filter(userGame => userGame.rating == column).map(filteredGame => filteredGame.igdb_game_id).includes(parseInt(game.id)));
  }

  return (
    <>
      {games.length > 0 ? (
        <div>
          <p>
            You can drag and drop games with your mouse or using TAB to navigate
            games, SPACE to select them and the ARROW KEYS to move them.
          </p>
          <div css={{ display: 'flex' }}>
            <DragDropContext onDragEnd={onDragEnd}>
              <div css={{display: 'flex', flexDirection: 'column'}}>
                <div css={{display: 'flex', flexDirection: 'row'}}>
                  <DragDropColumn games={ filterByColumn(games,0) } title='thumbs-down' key={'thumbs-down'} />
                  <DragDropColumn games={ filterByColumn(games,1) } title='thumbs-up' key={'thumbs-up'} />
                  <DragDropColumn games={ filterByColumn(games,2) } title='great' key={'great'}/>
                  <DragDropColumn games={ filterByColumn(games,3) } title='legendary'key={'legendary'} />
                </div>
                <DragDropColumn games={filterByColumn(games,null) } title='unranked' key={'unranked'} />
              </div>
            </DragDropContext>
          </div>
        </div>
      ) : (
        <div>No games found</div>
      )}
    </>
  );
};

export default DragoDropBoard;
