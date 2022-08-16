/** @jsxImportSource @emotion/react */

import { Game, GameInUserLibrary, MeResponse, Rating, User } from '../types';
import {
  DragDropContext,
  DropResult,
  OnDragEndResponder,
} from 'react-beautiful-dnd';
import DragDropColumn from './DragDropColumn';
import { UPDATE_RATING } from '../graphql/mutations';
import { CURRENT_USER } from '../graphql/queries';
import { useMutation } from '@apollo/client';
import GenericContainer from './GenericContainer';
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { count } from 'console';
import { RATINGS } from '../constants';

const styles = {
  container: css({
    flexDirection: 'column',
    padding: '15px',
  }),
  allDnDContainersIncUnranked: css({
    display: 'flex',
    flexDirection: 'column',
  }),
  dndColumnsDiv: css(
    {
      display: 'flex',
      flexDirection: 'row',
      columnGap: '15px',
    }
    // {
    //   display: 'grid',
    //   gridAutoFlow: 'column',
    //   gridAutoColumns: '1fr',
    // }
  ),
  textDiv: css({
    marginBottom: '15px',
  }),
};

const DragoDropBoard = ({ games, user }: { games: Game[]; user: User }) => {
  // Remember that using the mapped object's indexes for the key property is an anti-pattern, use unique id instead
  // https://robinpokorny.medium.com/index-as-a-key-is-an-anti-pattern-e0349aece318

  console.log('DragDropBoard ----------------------------------');
  const [updateRating] = useMutation(UPDATE_RATING);

  const getIdsInColumn = (
    rating: Rating,
    gamesInUserLibrary: GameInUserLibrary[]
  ) => {
    return gamesInUserLibrary
      .filter((game) => game.rating == rating)
      .map((game) => game.igdb_game_id);
  };

  // console.log('getids61:', getIdsInColumn(RATINGS.thumbsDown.value, user.gamesInLibrary));

  const [orderedColumns, setOrderedColums] = useState<number[][]>([
    getIdsInColumn(RATINGS.unranked.value, user.gamesInLibrary),
    getIdsInColumn(RATINGS.thumbsDown.value, user.gamesInLibrary),
    getIdsInColumn(RATINGS.thumbsUp.value, user.gamesInLibrary),
    getIdsInColumn(RATINGS.great.value, user.gamesInLibrary),
    getIdsInColumn(RATINGS.legendary.value, user.gamesInLibrary),
  ]);

  const columnNames = Object.values(RATINGS).map((rating) => rating.title);

  // useEffect(() => {
  //   setOrderedColums([
  //     {
  //       title: 'unranked',
  //       gameIds: getIdsInColumn(RATINGS.unranked, user.gamesInLibrary),
  //     },
  //     {
  //       title: 'thumbs-down',
  //       gameIds: getIdsInColumn(RATINGS.thumbsDown, user.gamesInLibrary),
  //     },
  //     {
  //       title: 'thumbs-up',
  //       gameIds: getIdsInColumn(RATINGS.thumbsUp, user.gamesInLibrary),
  //     },
  //     {
  //       title: 'great',
  //       gameIds: getIdsInColumn(RATINGS.great, user.gamesInLibrary),
  //     },
  //     {
  //       title: 'legendary',
  //       gameIds: getIdsInColumn(RATINGS.legendary, user.gamesInLibrary),
  //     },
  //   ]);
  // }, []);

  // const handleDragEnd = (result: DropResult) => {
  const handleDragEnd: OnDragEndResponder = ({
    destination,
    source,
    draggableId,
  }) => {
    // (method) onDragEnd(result: DropResult, provided: ResponderProvided): void

    // const { destination, source, draggableId } = result;

    // console.log(
    //   '1 destination, source, draggableid: ',
    //   destination,
    //   source,
    //   draggableId
    // );

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
    if (destination?.index === undefined) {
      console.log('DnD destination index missing.');
      return;
    }

    // If the location has changed, reorder the source data:
    const determineNewRank = (destinationId: string): Rating => {
      switch (destinationId) {
        case RATINGS.unranked.title:
          return RATINGS.unranked.value;
        case RATINGS.thumbsDown.title:
          return RATINGS.thumbsDown.value;
        case RATINGS.thumbsUp.title:
          return RATINGS.thumbsUp.value;
        case RATINGS.great.title:
          return RATINGS.great.value;
        case RATINGS.legendary.title:
          return RATINGS.legendary.value;

        // case 'deleteBox':
        //   console.log('delete');
        //   return null;
        default:
          throw new Error('Invalid d&d destinationId');
      }
    };

    try {
      const initialRating = determineNewRank(source.droppableId);
      const newRating = determineNewRank(destination.droppableId);

      // console.log('orderedColumns', orderedColumns[initialRating]);

      if (initialRating == newRating) {
        const reorderedColumn = [...orderedColumns[initialRating]];
        console.log('columna antes', reorderedColumn, source.index, destination.index, draggableId);
        reorderedColumn.splice(source.index, 1);
        reorderedColumn.splice(destination.index, 0, parseInt(draggableId));
        console.log('columna después', reorderedColumn);

        // orderedColumns.map((column, i) => console.log(i == newRating, i, column));
        // orderedColumns.map((column, i) => console.log(i == newRating, i, i == newRating ? reorderedColumn : column));

        // console.log('resultado:', orderedColumns.map((column, i) => i == newRating ? reorderedColumn : column));
        setOrderedColums((state) =>
          state.map((column, i) => i == newRating ? reorderedColumn : column)
        );
      } else {
        const startColumn = [...orderedColumns[initialRating]];
        const endColumn = [...orderedColumns[newRating]];
        console.log(
          'clones before: ',
          initialRating,
          newRating,
          startColumn,
          endColumn
        );

        startColumn.splice(source.index, 1);
        endColumn.splice(destination.index, 0, parseInt(draggableId));
        console.log('clones after: ', startColumn, endColumn);

        setOrderedColums((state) =>
          state.map((column, i) =>
            i == initialRating
              ? startColumn
              : i == newRating
              ? endColumn
              : column
          )
        );
      }

      const gameToUpdate = user.gamesInLibrary.find(
        (game) => game.igdb_game_id === parseInt(draggableId)
      );

      console.log('2 gametoupdate', gameToUpdate);

      updateRating({
        variables: {
          igdb_game_id: gameToUpdate?.igdb_game_id,
          rating: newRating,
          // subrating: destination.index,
        },
        optimisticResponse: {
          updateRating: {
            ...gameToUpdate,
            rating: newRating,
            // subrating: destination.index,
            isOptimistic: true,
          },
        },
        update: (store, response) => {
          // console.log('Updating rating...');
          // console.log('updaterating response: ', response);
          // console.log('draggable id:', draggableId, typeof draggableId);
          const dataInStore: MeResponse | null = store.readQuery({
            query: CURRENT_USER,
          });

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
                  gamesInLibrary: dataInStore?.me.gamesInLibrary.map((game) =>
                    game.igdb_game_id !== parseInt(draggableId)
                      ? game
                      : response.data.updateRating
                  ),
                },
              },
            });
          }
        },
      });
    } catch (err) {
      console.log(`Error updating the cache after updateRating query: ${err}`);
    }
  };

  // const filterByColumn = (games: Game[], column: Rating): Game[] => {
  //   return games.filter((game) =>
  //     user.gamesInLibrary
  //       .filter((userGame) => userGame.rating == column)
  //       .map((filteredGame) => filteredGame.igdb_game_id)
  //       .includes(parseInt(game.id))
  //   );
  // };

  // const Columns: { title: string; rankValue: Rating }[] = [
  //   {
  //     title: 'unranked',
  //     rankValue: null,
  //   },
  //   {
  //     title: 'thumbs-down',
  //     rankValue: 0,
  //   },
  //   {
  //     title: 'thumbs-up',
  //     rankValue: 1,
  //   },
  //   {
  //     title: 'great',
  //     rankValue: 2,
  //   },
  //   {
  //     title: 'legendary',
  //     rankValue: 3,
  //   },
  // ];

  const populate = (gameIds: number[], games: Game[]) => {
    return gameIds.map(gameId => games.find(game => parseInt(game.id) == gameId) as Game)
    // return games.filter((game) => gameIds.includes(parseInt(game.id))); // filter does not preserve id order, which causes issues when reordering.
  };

  return games.length > 0 ? (
    <GenericContainer additionalStyle={styles.container}>
      <div css={styles.textDiv}>
        <p>
          You can drag and drop games with your mouse or using TAB to navigate
          games, SPACE to select them and the ARROW KEYS to move them.
        </p>
      </div>

      {/* <div className='DragDropContextContainer' css={{ display: 'flex', alignContent: 'center' }}> */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div css={styles.allDnDContainersIncUnranked}>
          <div css={styles.dndColumnsDiv}>
            {/* {Columns.map((column) => { */}
            {orderedColumns.map((column, i) => {
              return (
                <DragDropColumn
                  // games={filterByColumn(games, column.rankValue)}
                  // games={appendStuff(
                  //   filterStuff(user, column.rankValue),
                  //   games
                  // )}
                  games={populate(column, games)}
                  // title={column.title}
                  // key={column.title}

                  title={columnNames[i]}
                  key={columnNames[i]}
                  // droppableDirection='vertical'
                />
              );
            })}
          </div>
          {/* <DragDropDeleteBox key='dragDropDeleteBox' /> */}
        </div>
      </DragDropContext>
      {/* </div> */}
    </GenericContainer>
  ) : (
    <div>No games found</div>
  );
};

export default DragoDropBoard;
