/** @jsxImportSource @emotion/react */

import { useLazyQuery } from '@apollo/client';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import FullPageSpinner from '../components/FullPageSpinner';
import GameList from '../components/GameList';
import { FIND_GAMES } from '../graphql/queries';
import { User } from '../types';

const Library = ({ userLoggedIn }: { userLoggedIn?: User }) => {
  // I use useLazyQuery+useEffect to prevent a React Strict Mode warning related to async callbacks on unmountd components.
  // https://github.com/apollographql/apollo-client/issues/6209

  // const [
  //   getLibrary,
  //   { data: libraryResponse, loading: libraryLoading },
  // ] = useLazyQuery(GET_LIBRARY);

  // // execute query on component mount
  // useEffect(() => {
  //   getLibrary();
  // }, [getLibrary]);

  const gameIdsInLibrary = userLoggedIn?.gamesInLibrary.map(
    (game) => game.igdb_game_id
  );

  const [
    findGames,
    { data: gamesResponse, loading: loadingGames, error },
  ] = useLazyQuery(FIND_GAMES, {
    variables: {
      id: gameIdsInLibrary,
    },
  });

  // execute query on component mount
  useEffect(() => {
    findGames();
  }, [findGames]);

  // const { data: gamesResponse, loading: libraryLoading } = useQuery(
  //   GET_LIBRARY
  // );

  if (loadingGames) return <FullPageSpinner />;
  if (error) return <div>Failed to connect to the server.</div>;

  const games = gamesResponse?.findGames;

  if (!games) {
    return (
      <div>
        <div>Your library is empty.</div>
        <Link to={'/home'}>Click here to find games!</Link>
      </div>
    );
  }

  return <GameList games={games} />;
};

export default Library;
