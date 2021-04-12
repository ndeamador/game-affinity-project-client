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
import Rater from '../components/Rater';
import { Redirect } from 'react-router-dom';
import useAuthContext from '../hooks/useAuthContext';

const GameProfile = () => {
  const authContext = useAuthContext();
  const currentUser = authContext?.currentUser;
  const { gameId } = useParams<{ gameId: string }>();
  const parsedGameId = parseInt(gameId);

  const { loading, data, error } = useQuery(FIND_GAMES, {
    variables: { id: parsedGameId },
    fetchPolicy: 'cache-first',
    onError: (err) => {
      console.log('Failed to find games: ', err);
      <Redirect to='/' />;
    },
  });

  console.log('DENTRO: ', loading, error, error ? 'hay error' : 'nada');
  if (loading) return <FullPageSpinner />;
  console.log('middle');
  if (error || data.findGames.length === 0) {
    return <Redirect to='/' />;
  }

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

        {currentUser && <Rater gameId={parsedGameId} />}
      </div>

      {currentUser && <AddToLibraryButton gameId={parsedGameId} />}
    </div>
  );
};

export default GameProfile;
