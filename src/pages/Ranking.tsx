/** @jsxImportSource @emotion/react */

import { useQuery } from '@apollo/client';
import FullPageSpinner from '../components/FullPageSpinner';
import GameList from '../components/GameList';
import { GET_RANKING } from '../graphql/queries';

const Ranking = () => {
  const { data, loading: loadingGames, error } = useQuery(GET_RANKING);
  if (error) {console.log(error.message);}

  if (loadingGames) return <FullPageSpinner />;
  if (!data) return <div>No games are rated yet.</div>;
  console.log('data:', data);

  return <GameList games={data.getRankedGames} ranked />;
};

export default Ranking;
