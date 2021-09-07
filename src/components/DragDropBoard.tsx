/** @jsxImportSource @emotion/react */

import { Game, MeResponse, Rating, User } from '../types';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import DragDropColumn from './DragDropColumn';
import { useState } from 'react';
import { UPDATE_RATING } from '../graphql/mutations';
import { CURRENT_USER, FIND_GAMES } from '../graphql/queries';
import { useMutation } from '@apollo/client';

const DragoDropBoard = ({ games, user }: { games: Game[]; user: User }) => {
  // Remember that using the mapped object's indexes for the key property is an anti-pattern, use unique id instead
  // https://robinpokorny.medium.com/index-as-a-key-is-an-anti-pattern-e0349aece318

  console.log('GAMES:', games);
  console.log('USER:', user);
  // console.log('find:', user.gamesInLibrary.find(game => game.rating === 3));

  // const [gamesInColumn, setGamesInColumn] = useState(games);

  // console.log('gamesInColumn', gamesInColumn);
  // // Example 'result" object:
  // const result = {
  //   draggableId: 'task-1',
  //   type: 'TYPE',
  //   reason: 'DROP',
  //   source: {
  //     droppableId: 'column-1',
  //     index: 0,
  //   },
  //   destination: {
  //     droppableId: 'column-1',
  //     index: 1,
  //   }
  // }

  const [updateRating] = useMutation(UPDATE_RATING, {
    refetchQueries: [{ query: CURRENT_USER }],
  });


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

    // // If the location has changed, reorder the source data:
    // const updatedColumn = Array.from(gamesInColumn);
    // // the splice method returns the removed item in a new array, we destructure it for convenience:
    // const [removed] = updatedColumn.splice(result.source.index, 1);
    // updatedColumn.splice(result.destination.index, 0, removed);

    // // Update React's state:
    // setGamesInColumn(updatedColumn);



    // If the location has changed, reorder the source data:
    console.log('aqui - destination: ', destination, ' - source: ', source);

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

    console.log('draggableid:', draggableId);
    // console.log('find game', user.gamesInLibrary.find(game => game.rating === determineNewRank(destination.droppableId)));
    console.log('newrating:', determineNewRank(destination.droppableId));
    console.log(determineNewRank(destination.droppableId), typeof(determineNewRank(destination.droppableId)));

    updateRating({
      variables: {
        gameId: parseInt(draggableId),
        rating: determineNewRank(destination.droppableId),
      },
    });
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
