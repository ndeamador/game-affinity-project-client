import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { FIND_GAMES } from '../graphql/queries';

const GameProfile = () => {
  const { gameId } = useParams<{ gameId: string }>();
  console.log('GAMEID: ', gameId, typeof gameId);

  const { loading, data } = useQuery(FIND_GAMES, {
    variables: { id: parseInt(gameId) },
    fetchPolicy: 'cache-first',
  });

  if (loading) return <p>loading...</p>;

  const game = data?.findGames[0];

  return (
    <div>
      <div>
        <h3>{game.name}</h3>
        <p>{game.summary}</p>
      </div>
    </div>
  );
};

export default GameProfile;
