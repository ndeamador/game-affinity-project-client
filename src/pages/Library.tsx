/** @jsxImportSource @emotion/react */

import { useQuery } from '@apollo/client';
import FullPageSpinner from '../components/FullPageSpinner';
import GameList from '../components/GameList';
import { GET_LIBRARY, FIND_GAMES } from '../graphql/queries';

const Library = () => {
  // const { data: libraryResponse, loading: libraryLoading } = useQuery(GET_LIBRARY);
  // console.log('Inside library.', libraryResponse);


  // const { loading, data, error } = useQuery(FIND_GAMES, {
  //   variables: { id: parseInt(gameId), maxResults: 30 },
  //   fetchPolicy: 'cache-first',
  // });

  // if (libraryLoading) return <FullPageSpinner />;

  // return <GameList games={libraryResponse.getLibrary} />;
  return <div>in library</div>
};

export default Library;
