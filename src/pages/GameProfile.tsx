/** @jsxImportSource @emotion/react */
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { FIND_GAMES } from '../graphql/queries';
import loadingTravolta from '../assets/notFound-264x374.gif';
import { User } from '../types';
import FullPageSpinner from '../components/FullPageSpinner';
import AddToLibraryButton from '../components/AddToLibraryButton';
import PlatformIcons from '../components/PlatformIcons';
import ReleaseDeveoperRow from '../components/ReleaseDeveloperRow';

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
        className='coverDiv'
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

      <div
        className='gameInfoDiv'
        css={{
          display: 'flex',
          flexDirection: 'column',
          paddingLeft: '20px',
          '> *': {
            margin: '0',
            paddingBottom: '15px',
          },
        }}
      >
        <h2>{game.name}</h2>
        <ReleaseDeveoperRow game={game} />
        <PlatformIcons platforms={game.platforms} />
        <p css={{ paddingTop: '10px', paddingBottom: 0 }}>{game.summary}</p>
      </div>

      {userLoggedIn && <AddToLibraryButton gameId={gameId} />}
    </div>
  );
};

export default GameProfile;
