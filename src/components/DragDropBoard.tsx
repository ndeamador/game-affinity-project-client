import { Game } from '../types';
import GameListItem from './GameListItem';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import DragDropColumn from './DragDropColumn';
import { useState } from 'react';

const DragoDropBoard = ({ games }: { games: Game[] }) => {
  // Remember that using the mapped object's indexes for the key property is an anti-pattern, use unique id instead
  // https://robinpokorny.medium.com/index-as-a-key-is-an-anti-pattern-e0349aece318

  // console.log('GAMES:', games);
  const [gamesInColumn, setGamesInColumn] = useState(games);

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

  const onDragEnd = (result: DropResult) => {
    // console.log('result', result);
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
    const updatedGameList = Array.from(gamesInColumn);
    console.log('list:', gamesInColumn);
    // the splice method returns the removed item in a new array, we destructure it for convenience:
    const [removed] = updatedGameList.splice(result.source.index, 1);
    console.log('test:', removed);
    console.log(result.destination);
    updatedGameList.splice(result.destination.index, 0, removed);

    // Update React's state:
    setGamesInColumn(updatedGameList);
  };

  return (
    <>
      {games.length > 0 ? (
        <div>
          <p>
            You can drag and drop games with your mouse or using TAB to navigate
            games, SPACE to select them and the ARROW KEYS to move them.
          </p>
          <DragDropContext onDragEnd={onDragEnd}>
            <DragDropColumn games={gamesInColumn} title='thumbs-down' />
            {/* <DragDropColumn games={gamesInColumn} title='thumbs-up' />
          <DragDropColumn games={gamesInColumn} title='great' />
          <DragDropColumn games={gamesInColumn} title='legendary' /> */}
          </DragDropContext>
        </div>
      ) : (
        <div>No games found</div>
      )}
    </>
  );
};

export default DragoDropBoard;
