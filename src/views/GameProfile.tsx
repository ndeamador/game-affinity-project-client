/** @jsxImportSource @emotion/react */
import { useParams } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { FIND_GAMES } from '../graphql/queries';
import loadingTravolta from '../assets/notFound-264x374.gif';
import FullPageSpinner from '../components/FullPageSpinner';
import AddToLibraryButton from '../components/AddToLibraryButton';
import PlatformIcons from '../components/PlatformIcons';
import ReleaseDeveoperRow from '../components/ReleaseDeveloperRow';
import Rater from '../components/Rater';
import { useEffect } from 'react';
import useLazyCurrentUser from '../hooks/useLazyCurrentUser';

const GameProfile = ({ modalGame }: { modalGame?: string }) => {
  const {
    getCurrentUser,
    currentUser,
    loading: userLoading,
    error: getUserError,
  } = useLazyCurrentUser();

  useEffect(() => {
    (async () => await getCurrentUser())(); // Worked fine without async but gave an unmounted update error when used as modal in Library.
  }, [getCurrentUser]);
  if (getUserError) {
    return <div>Test error: {getUserError.message}</div>;
  }
  console.log(
    '----GameProfile: ',
    currentUser?.email,
    currentUser?.gamesInLibrary
  );

  const { gameId } = useParams<{ gameId: string }>();
  let parsedGameId = parseInt(gameId);

  if (modalGame) parsedGameId = parseInt(modalGame);

  const [findGames, { data, loading, error }] = useLazyQuery(FIND_GAMES, {
    variables: { id: parsedGameId },
  });

  useEffect(() => {
    findGames();
  }, [findGames]);

  if (loading) return <FullPageSpinner />;
  if (!data || data.findGames.length === 0) return <div>Game not found.</div>;
  if (error) {
    throw new Error(error.message);
    // return <Redirect to='/' />;
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

        {/* {currentUser && <Rater gameId={parsedGameId} />} */}
        {currentUser && (
          <Rater gameId={parsedGameId} currentUser={currentUser} />
        )}
      </div>

      {currentUser && <AddToLibraryButton gameId={parsedGameId} />}
    </div>
  );
};

export default GameProfile;
