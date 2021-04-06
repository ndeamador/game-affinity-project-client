/** @jsxImportSource @emotion/react */

import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import FullPageSpinner from '../components/FullPageSpinner';
import GameList from '../components/GameList';
import { GET_LIBRARY } from '../graphql/queries';

const Library = () => {
  console.log('inlib');
  const { data: libraryResponse, loading: libraryLoading } = useQuery(
    GET_LIBRARY
  );

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
