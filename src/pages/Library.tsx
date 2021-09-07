/** @jsxImportSource @emotion/react */

import { useLazyQuery } from '@apollo/client';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import FullPageSpinner from '../components/FullPageSpinner';
import { FIND_GAMES } from '../graphql/queries';
import { useAuthContext } from '../context/AuthContext';
import DragoDropBoard from '../components/DragDropBoard';

const Library = () => {
  const { currentUser } = useAuthContext();
  console.log('USER: ', currentUser);

  const gameIdsInLibrary = currentUser?.gamesInLibrary.map(
    (game) => game.igdb_game_id
  );

  if (gameIdsInLibrary.length === 0) return <div>Your library is empty!</div>;

  const [findGames, { data: gamesResponse, loading: loadingGames, error }] =
    useLazyQuery(FIND_GAMES, {
      variables: {
        id: gameIdsInLibrary,
        maxResults: 30,
      },
      fetchPolicy: 'cache-and-network',
    });

  // execute query on component mount
  useEffect(() => {
    findGames();
  }, [findGames]);
  // }, []);


  // const { data: gamesResponse, loading: libraryLoading } = useQuery(
  //   GET_LIBRARY
  // );

  if (loadingGames) return <FullPageSpinner />;
  if (error) return <div>{error.message}</div>;

  const games = gamesResponse?.findGames;
  console.log('GAMES: ', games);

  if (!loadingGames && !games) {
    return (
      <div>
        <div>Your library is empty.</div>
        <Link to={'/home'}>Click here to find games!</Link>
      </div>
    );
  }

  return (
    <div css={{
      display: 'flex',
      flexDirection: 'row',
      // alignItems: 'center',
      // justifyContent: 'flex-start',
      width: '80vw',
      // height: '100vh',
    }}>
      {/* <GameList games={games} /> */}
      <DragoDropBoard games={games} user={currentUser} />

    </div>
  );
};

export default Library;
