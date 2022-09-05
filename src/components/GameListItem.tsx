/** @jsxImportSource @emotion/react */
import { Game } from '../types';
import { Link } from 'react-router-dom';
import AddGameToLibraryButton from './AddToLibraryButton';
import PlatformIcons from './PlatformIcons';
import ReleaseDeveloperRow from '../components/ReleaseDeveloperRow';
import CoverDiv from './CoverDiv';

import { useEffect } from 'react';
import useLazyCurrentUser from '../hooks/useLazyCurrentUser';
import AverageRatingDiv from './AverageRatingDiv';
import { css } from '@emotion/react';

const styles = {
  mainContainer: css({
    display: 'flex',
    padding: '5px 0px',
    margin: '0',
    borderRadius: 'var(--border-radius)',
    boxSizing: 'border-box',
    transitionDuration: '0.2s',
    transitionProperty: 'background-color, box-shadow',
    border: '1px solid transparent', // here just so that the hover border does not move the element
    alignItems: 'start', // not necessary, but forces flexbox to respect CoverDiv 1/1 aspect ratio
    ':hover': {
      // boxShadow: '0 0 0 1px lightgrey',
      // backgroundColor: 'ghostwhite',
      // transitionDuration: '1s',
      // transitionProperty: 'background-color, background, box-shadow, border-image',
      // borderTop: '1px solid black',
      // borderBottom: '1px solid black',
      background:
        'linear-gradient(to right, transparent, var(--inner-content-background-color-hover) 20%, transparent)',
      borderImage:
        'linear-gradient(160deg, transparent 25%, grey, transparent 75%)',
      borderImageSlice: 1,
    },
  }),

  gameInfoContainer: css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingLeft: '20px',
    // width: '100%',
    flexGrow: 1,
  }),

  link: css({
    textDecoration: 'none',
    color: 'var(--color-text)',
  }),
  title: css({
    margin: 0,
  }),
};

const GameListItem = ({ game, ranked }: { game: Game; ranked?: boolean }) => {
  const {
    getCurrentUser,
    currentUser,
    loading,
    error: getUserError,
  } = useLazyCurrentUser();
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

        {currentUser && <AddGameToLibraryButton gameId={game.id} currentUser={currentUser}/>}
      </div>
    </Link>
  );
};

export default GameListItem;
