/** @jsxImportSource @emotion/react */

import { useLazyQuery, useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import FullPageSpinner from '../components/FullPageSpinner';
import GameList from '../components/GameList';
import { GET_LIBRARY } from '../graphql/queries';

const Library = () => {
  console.log('inlib');
  // I use useLazyQuery+useEffect to prevent a React Strict Mode warning related to async callbacks on unmountd components.
  // https://github.com/apollographql/apollo-client/issues/6209
  const [
    getLibrary,
    { data: libraryResponse, loading: libraryLoading },
  ] = useLazyQuery(GET_LIBRARY);

  // execute query on component mount
  useEffect(() => {
    getLibrary();
  }, [getLibrary]);

  // const { data: libraryResponse, loading: libraryLoading } = useQuery(
  //   GET_LIBRARY
  // );

  if (libraryLoading) return <FullPageSpinner />;

  console.log('response:', libraryResponse);
  const games = libraryResponse?.getLibrary;

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
