/** @jsxImportSource @emotion/react */

import { useLazyQuery } from '@apollo/client';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import FullPageSpinner from '../components/FullPageSpinner';
import { FIND_GAMES } from '../graphql/queries';
import DragoDropBoard from '../components/DragDropBoard';
import useLazyCurrentUser from '../hooks/useLazyCurrentUser';
import { GameInUserLibrary } from '../types';
import { css } from '@emotion/react';

const style = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});

const Library = () => {
  const {
    getCurrentUser,
    currentUser,
    loading: loadingUser,
    error: getUserError,
  } = useLazyCurrentUser();
  console.log('================= Library: ');

  useEffect(() => {
    // console.log('useeffect1');
    (async () => await getCurrentUser())();
    // findGames();
  }, []);

  const gameIdsInLibrary = currentUser?.gamesInLibrary.map(
    (game: GameInUserLibrary) => game.igdb_game_id
  );

  const [
    findGames,
    { data: gamesResponse, loading: loadingGames, error: findGamesError },
  ] = useLazyQuery(FIND_GAMES, {
    variables: {
      id: gameIdsInLibrary,
      maxResults: 30,
    },
    fetchPolicy: 'cache-first', // with cache-and-network we get a loading spinner every time an item is rearranged.
  });

  useEffect(() => {
    // console.log('useeffect2, currentUser?', currentUser ? true : false);
    console.log(
      'currentuser: ',
      currentUser ? true : false,
      'ids: ',
      gameIdsInLibrary,
      gameIdsInLibrary?.length == 0 ? true : false
    );
    if (currentUser && gameIdsInLibrary?.length != 0) findGames();
  }, [currentUser?.email]);

  // useEffect(() => {
  //   console.log('useeffect1');
  //   (async () => {
  //     await getCurrentUser();
  //     if (currentUser) findGames();
  //   })();
  //   // findGames();
  // }, []);

  if (getUserError)
    return (
      <div>{`Failed to get user information: ${getUserError.message}`}</div>
    );
  else if (findGamesError)
    return (
      <div>{`Failed to find user's games: ${findGamesError.message}`}</div>
    );
  // if (loadingUser || !currentUser || loadingGames) return <FullPageSpinner />;
  else if (
    loadingUser ||
    loadingGames ||
    !currentUser ||
    (currentUser && gameIdsInLibrary?.length != 0 && !gamesResponse)
  ) {
    return <FullPageSpinner />;
  }

  // console.log('userids: ', gameIdsInLibrary);
  // console.log('response: ', gamesResponse.findGames)

  // const games = gamesResponse?.findGames;

  // if (gameIdsInLibrary.length === 0) {
  //   return (
  //     <div>
  //       <div>Your library is empty.</div>
  //       <Link to={'/home'}>Click here to find games!</Link>
  //     </div>
  //   );
  // }

  return (
    <div css={style}>
      {gameIdsInLibrary.length === 0 ? (
        <div>
          <div>Your library is empty.</div>
          <Link to={'/home'}>Click here to find games!</Link>
        </div>
      ) : (
        // <DragoDropBoard games={games} user={currentUser} />
        <DragoDropBoard games={gamesResponse.findGames} user={currentUser} />
      )}
    </div>
  );
};

export default Library;
