/** @jsxImportSource @emotion/react */
import { useParams } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { FIND_GAMES } from '../../../graphql/queries';
import FullPageSpinner from '../../shared/FullPageSpinner';
import AddToLibraryButton from '../../shared/AddToLibraryButton';
import PlatformIcons from '../../shared/PlatformIcons';
import ReleaseDeveoperRow from '../../shared/ReleaseDeveloperRow';
import Rater from './Rater';
import { useEffect } from 'react';
import GenericContainer from '../../shared/GenericContainer';
import { User } from '../../../types';
import Notification from '../../shared/Notification';
import CoverDiv from '../../shared/CoverDiv';
import styles from './styles';

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
