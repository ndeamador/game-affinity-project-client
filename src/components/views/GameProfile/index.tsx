/** @jsxImportSource @emotion/react */
import { useParams } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { useEffect } from 'react';
import { FIND_GAMES } from 'graphql/queries';
import FullPageSpinner from 'components/shared/FullPageSpinner';
import AddToLibraryButton from 'components/shared/AddToLibraryButton';
import PlatformIcons from 'components/shared/PlatformIcons';
import ReleaseDeveoperRow from 'components/shared/ReleaseDeveloperRow';
import GenericContainer from 'components/shared/GenericContainer';
import Notification from 'components/shared/Notification';
import CoverDiv from 'components/shared/CoverDiv';
import Rater from './Rater';
import styles from './index.styles';
import { User } from 'types';

const GameProfile = ({
  currentUser,
  modalGame,
}: {
  currentUser: User;
  modalGame?: string;
}) => {
  const { gameId } = useParams<{ gameId: string }>();
  let parsedGameId = parseInt(gameId);

  if (modalGame) parsedGameId = parseInt(modalGame);

  const [findGames, { data, loading, error }] = useLazyQuery(FIND_GAMES, {
    fetchPolicy: 'cache-first',
    variables: { id: parsedGameId },
  });

  useEffect(() => {
    findGames();
  }, []);

  if (loading) return <FullPageSpinner />;
  if (!data || data.findGames.length === 0)
    return <Notification>Game not found.</Notification>;
  if (error) {
    return (
      <Notification>Something went wrong. Failed to load game.</Notification>
    );
  }

  const game = data?.findGames[0];

  return (
    <GenericContainer additionalStyle={styles.container}>
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
