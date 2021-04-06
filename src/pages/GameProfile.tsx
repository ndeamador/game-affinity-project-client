/** @jsxImportSource @emotion/react */
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { FIND_GAMES } from '../graphql/queries';
import loadingTravolta from '../assets/notFound-264x374.gif';
import { User } from '../types';
import FullPageSpinner from '../components/FullPageSpinner';
import AddToLibraryButton from '../components/AddToLibraryButton';

const GameProfile = ({ userLoggedIn }: { userLoggedIn?: User }) => {
  const { gameId } = useParams<{ gameId: string }>();

  const { loading, data, error } = useQuery(FIND_GAMES, {
    variables: { id: parseInt(gameId) },
    fetchPolicy: 'cache-first',
    onError: (err) => console.log('Failed to find games: ', err),
  });

  if (loading) return <FullPageSpinner />;
  if (error) return <h3>{error.message}</h3>;

  const game = data?.findGames[0];

  // Setting image resolution from url: https://api-docs.igdb.com/#images
  const imageSize = 'cover_big';
  const imageLink = game.cover?.id
    ? `//images.igdb.com/igdb/image/upload/t_${imageSize}/${game.cover?.image_id}.jpg`
    : loadingTravolta;

  return (
    <div
      css={{
        display: 'flex',
      }}
    >
      <div
        css={{
          width: '264px',
          maxWidth: '264px',
          flexShrink: 0,
        }}
      >
        <img
          src={imageLink}
          css={{
            width: '100%',
          }}
        ></img>
      </div>

      <div>
        <h3>{game.name}</h3>
        <p>{game.summary}</p>
      </div>

      {userLoggedIn && <AddToLibraryButton gameId={gameId} />}
    </div>
  );
};

export default GameProfile;
