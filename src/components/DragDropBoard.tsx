/** @jsxImportSource @emotion/react */

import { Game, MeResponse, Rating, User } from '../types';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import DragDropColumn from './DragDropColumn';
import { UPDATE_RATING } from '../graphql/mutations';
import { CURRENT_USER } from '../graphql/queries';
import { useMutation } from '@apollo/client';
import GenericContainer from './GenericContainer';
import { css } from '@emotion/react';

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
        // case 'deleteBox':
        //   console.log('delete');
        //   return null;
        default:
          throw new Error('Invalid d&d destinationId');
      }
    };

    try {
      const gameToUpdate = user.gamesInLibrary.find(
        (game) => game.igdb_game_id === parseInt(draggableId)
      );
      console.log('gametoupdate', gameToUpdate);
      const newRating = determineNewRank(destination.droppableId);
      console.log(
        'gameId:',
        parseInt(draggableId),
        '- rating: ',
        newRating,
        '- game: ',
        gameToUpdate
      );

      updateRating({
        variables: {
          igdb_game_id: gameToUpdate?.igdb_game_id,
          rating: newRating,
        },
        optimisticResponse: {
          updateRating: {
            ...gameToUpdate,
            rating: newRating,
            isOptimistic: true,
          },
        },
        update: (store, response) => {
          console.log('Updating rating...');
          console.log('updaterating response: ', response);
          console.log('draggable id:', draggableId, typeof draggableId);
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

  const filterByColumn = (games: Game[], column: Rating): Game[] => {
    return games.filter((game) =>
      user.gamesInLibrary
        .filter((userGame) => userGame.rating == column)
        .map((filteredGame) => filteredGame.igdb_game_id)
        .includes(parseInt(game.id))
    );
  };

  const Columns: { title: string; rankValue: Rating }[] = [
    {
      title: 'unranked',
      rankValue: null,
    },
    {
      title: 'thumbs-down',
      rankValue: 0,
    },
    {
      title: 'thumbs-up',
      rankValue: 1,
    },
    {
      title: 'great',
      rankValue: 2,
    },
    {
      title: 'legendary',
      rankValue: 3,
    },
  ];

  return games.length > 0 ? (
    <GenericContainer additionalStyle={styles.container}>
      <div css={styles.textDiv}>
        <p>
          You can drag and drop games with your mouse or using TAB to navigate
          games, SPACE to select them and the ARROW KEYS to move them.
        </p>
      </div>

      {/* <div className='DragDropContextContainer' css={{ display: 'flex', alignContent: 'center' }}> */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div css={styles.allDnDContainersIncUnranked}>
          <div css={styles.dndColumnsDiv}>
            {Columns.map((column) => {
              return (
                <DragDropColumn
                  games={filterByColumn(games, column.rankValue)}
                  title={column.title}
                  key={column.title}
                  droppableDirection='vertical'
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
