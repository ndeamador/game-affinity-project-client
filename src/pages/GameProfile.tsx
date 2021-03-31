/** @jsxImportSource @emotion/react */
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { FIND_GAMES } from '../graphql/queries';
import loadingTravolta from '../assets/notFound-264x374.gif';

const GameProfile = () => {
  const { gameId } = useParams<{ gameId: string }>();

  const { loading, data } = useQuery(FIND_GAMES, {
    variables: { id: parseInt(gameId) },
    fetchPolicy: 'cache-first',
  });

  if (loading) return <p>loading...</p>;

  const game = data?.findGames[0];

  console.log(game);

  // Setting image resolution from url: https://api-docs.igdb.com/#images
  const imageSize = 'cover_big';
  const imageLink = game.cover?.id ? `//images.igdb.com/igdb/image/upload/t_${imageSize}/${game.cover?.image_id}.jpg` : loadingTravolta;

  return (
    <div css={{
      display: 'flex',
    }}>
      <div css={{
        width: '264px',
        maxWidth: '264px',
        flexShrink: 0,
      }}>
        <img src={imageLink}
        css={{
          width: '100%',
        }}></img>
      </div>
      <div>
        <h3>{game.name}</h3>
        <p>{game.summary}</p>
      </div>
    </div>
  );
};

export default GameProfile;
