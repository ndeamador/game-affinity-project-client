/** @jsxImportSource @emotion/react */

import { useLazyQuery } from '@apollo/client';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import FullPageSpinner from 'components/shared/FullPageSpinner';
import { FIND_GAMES } from 'graphql/queries';
import { GameInUserLibrary, User } from 'types';
import Notification from 'components/shared/Notification';
import styles from './index.styles';
import DragoDropBoard from './DragDropBoard';

const Library = ({ currentUser }: { currentUser: User }) => {
  const gameIdsInLibrary = currentUser?.gamesInLibrary.map(
    (game: GameInUserLibrary) => game.igdb_game_id
  );

  const [
    findGames,
    { data: gamesResponse, loading: loadingGames, error: findGamesError },
  ] = useLazyQuery(FIND_GAMES, {
    variables: {
      id: gameIdsInLibrary,
      maxResults: 100,
    },
    fetchPolicy: 'cache-first', // with cache-and-network we get a loading spinner every time an item is rearranged.
  });

  useEffect(() => {
    if (currentUser && gameIdsInLibrary?.length != 0) findGames();
  }, [currentUser?.email]);

  if (findGamesError)
    return (
      <Notification>
        {`Failed to find user's games: ${findGamesError.message}`}
      </Notification>
    );
  else if (loadingGames || (gameIdsInLibrary?.length != 0 && !gamesResponse)) {
    return <FullPageSpinner />;
  }

  return (
    <div css={styles.mainContainer}>
      {gameIdsInLibrary.length === 0 ? (
        <Notification additionalStyle={styles.notification}>
          <p>Your library is empty.</p>
          <Link to={'/home'}>Click here to find games!</Link>
        </Notification>
      ) : (
        <DragoDropBoard games={gamesResponse.findGames} user={currentUser} />
      )}
    </div>
  );
};

export default Library;
