/** @jsxImportSource @emotion/react */

import { useLazyQuery } from '@apollo/client';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import FullPageSpinner from '../components/FullPageSpinner';
import { FIND_GAMES } from '../graphql/queries';
import DragoDropBoard from '../components/DragDropBoard';
import useLazyCurrentUser from '../hooks/useLazyCurrentUser';
import { GameInUserLibrary } from '../types';

const Library = () => {
  const {
    getCurrentUser,
    currentUser,
    loading: loadingUser,
    error: getUserError,
  } = useLazyCurrentUser();

  useEffect(() => {
    // console.log('useeffect1');
    (async () => await getCurrentUser())();
    // findGames();
  }, []);

  useEffect(() => {
    // console.log('useeffect2, currentUser?', currentUser ? true : false);
    if (currentUser) findGames();
  }, [currentUser?.email]);

  // useEffect(() => {
  //   console.log('useeffect1');
  //   (async () => {
  //     await getCurrentUser();
  //     if (currentUser) findGames();
  //   })();
  //   // findGames();
  // }, []);

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

  // console.log(
  //   'Library || loadinguser:',
  //   loadingUser,
  //   '- loadingGames:',
  //   loadingGames,
  //   '- Library.CurrentUser:',
  //   currentUser ? currentUser.email : currentUser,
  //   '- gameresponse:',
  //   gamesResponse?.findGames[0]
  // );

  if (getUserError) return <div>{getUserError.message}</div>;
  else if (findGamesError) return <div>{findGamesError.message}</div>;
  // if (loadingUser || !currentUser || loadingGames) return <FullPageSpinner />;
  else if (
    loadingUser ||
    loadingGames ||
    !currentUser ||
    (currentUser && !gamesResponse)
  ) {
    return <FullPageSpinner />;
  }

  // if (!gamesResponse) {
  //   console.log(
  //     '!gameresponse, loadingGames?',
  //     loadingGames,
  //     'gameResponse:',
  //     gamesResponse?.findGames[0]
  //   );
  //   return <FullPageSpinner />;
  // }

  const games = gamesResponse?.findGames;

  if (gameIdsInLibrary.length === 0) {
    return (
      <div>
        <div>Your library is empty.</div>
        <Link to={'/home'}>Click here to find games!</Link>
      </div>
    );
  }

  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'row',
        // alignItems: 'center',
        // justifyContent: 'flex-start',
        width: '80vw',
        // height: '100vh',
      }}
    >
      {/* <GameList games={games} /> */}
      <DragoDropBoard games={games} user={currentUser} />
    </div>
  );
};

export default Library;
