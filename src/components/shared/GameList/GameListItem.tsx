/** @jsxImportSource @emotion/react */

import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import styles from './GameListItem.styles';
import { Game } from '../../../types';
import useLazyCurrentUser from '../../../hooks/useLazyCurrentUser';
import AverageRatingDiv from './AverageRatingDiv';
import CoverDiv from '../CoverDiv';
import ReleaseDeveloperRow from '../ReleaseDeveloperRow';
import PlatformIcons from '../PlatformIcons';
import AddGameToLibraryButton from '../AddToLibraryButton';

const GameListItem = ({ game, ranked }: { game: Game; ranked?: boolean }) => {
  const { getCurrentUser, currentUser } = useLazyCurrentUser();
  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  return (
    <Link to={`/games/${game.id}`} key={game.id} css={styles.link}>
      <div css={styles.mainContainer}>
        {ranked && game.average_rating && (
          <AverageRatingDiv rating={game.average_rating} />
        )}

        <CoverDiv game={game} />

        <div css={styles.gameInfoContainer}>
          <h3 css={styles.title}>{game.name}</h3>
          <ReleaseDeveloperRow game={game} />
          <PlatformIcons platforms={game.platforms} />
        </div>

        {currentUser && (
          <AddGameToLibraryButton gameId={game.id} currentUser={currentUser} />
        )}
      </div>
    </Link>
  );
};

export default GameListItem;
