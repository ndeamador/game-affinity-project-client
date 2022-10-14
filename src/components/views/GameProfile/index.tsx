/** @jsxImportSource @emotion/react */
import { useParams } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { FIND_GAMES } from '../../../graphql/queries';
import loadingTravolta from '../assets/notFound-264x374.gif';
import FullPageSpinner from '../../shared/FullPageSpinner';
import AddToLibraryButton from '../../shared/AddToLibraryButton';
import PlatformIcons from '../../shared/PlatformIcons';
import ReleaseDeveoperRow from '../../shared/ReleaseDeveloperRow';
import Rater from './Rater';
import { useEffect } from 'react';
import useLazyCurrentUser from '../../../hooks/useLazyCurrentUser';
import GenericContainer from '../../shared/GenericContainer';
import { css } from '@emotion/react';
import { User } from '../../../types';
import Notification from '../../shared/Notification';
import CoverDiv from '../../shared/CoverDiv';

const styles = {
  container: css({
    padding: '15px',
    // alignItems:'flex-start',
    minWidth: '500px',
    minHeight: '200px',
  }),
  // coverDiv: css({
  //   borderRadius: 'var(--border-radius)',
  //   width: '264px',
  //   maxWidth: '264px',
  //   flexShrink: 0,
  // }),
  coverImage: css({
    borderRadius: 'var(--border-radius)',
    width: '100%',
  }),
  gameInfoDiv: css({
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: '20px',
    '> *': {
      margin: '0',
      marginBottom: '10px',
    },
  }),
  gameHeader: css({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '15px',
  }),
  title: css({
    lineHeight: 1,
    marginBottom: '10px',
  }),
  gameSummary: css({
    overflowY: 'auto',
  }),
};

const GameProfile = ({
  currentUser,
  modalGame,
}: {
  currentUser: User;
  modalGame?: string;
}) => {
  // const {
  //   getCurrentUser,
  //   currentUser,
  //   loading: userLoading,
  //   error: getUserError,
  // } = useLazyCurrentUser();

  // useEffect(() => {
  //   (async () => await getCurrentUser())(); // Worked fine without async but gave an unmounted update error when used as modal in Library.
  // }, [getCurrentUser]);
  // if (getUserError) {
  //   return <div>Test error: {getUserError.message}</div>;
  // }

  const { gameId } = useParams<{ gameId: string }>();
  let parsedGameId = parseInt(gameId);

  if (modalGame) parsedGameId = parseInt(modalGame);

  const [findGames, { data, loading, error }] = useLazyQuery(FIND_GAMES, {
    fetchPolicy: 'cache-first',
    variables: { id: parsedGameId },
  });

  useEffect(
    () => {
      findGames();
    },
    [
      /* findGames */
    ]
  );

  if (loading) return <FullPageSpinner />;
  if (!data || data.findGames.length === 0)
    return <Notification>Game not found.</Notification>;
  if (error) {
    return (
      <Notification>Something went wrong. Failed to load game.</Notification>
    );
    // throw new Error(error.message);
    // return <Redirect to='/' />;
  }

  const game = data?.findGames[0];

  // Setting image resolution from url: https://api-docs.igdb.com/#images
  // const imageSize = 'cover_big';
  // const imageLink = game.cover?.id
  //   ? `//images.igdb.com/igdb/image/upload/t_${imageSize}/${game.cover?.image_id}.jpg`
  //   : loadingTravolta;

  return (
    <GenericContainer additionalStyle={styles.container}>
      {/* <div css={styles.coverDiv}>
        <img src={imageLink} css={styles.coverImage}></img>
      </div> */}
      <CoverDiv game={game} showSpinner big />

      <div css={styles.gameInfoDiv}>
        <div css={styles.gameHeader}>
          <div>
            <h2 css={styles.title}>{game.name}</h2>
            <ReleaseDeveoperRow game={game} />
            <PlatformIcons platforms={game.platforms} />
          </div>
          {currentUser && (
            <AddToLibraryButton
              gameId={parsedGameId}
              currentUser={currentUser}
            />
          )}
        </div>

        {currentUser && (
          <Rater gameId={parsedGameId} currentUser={currentUser} />
        )}

        <p css={styles.gameSummary}>{game.summary}</p>
      </div>
    </GenericContainer>
  );
};

export default GameProfile;
