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

const mainContainerStyle = css({
  display: 'flex',
  // alignItems: 'stretch',
  margin: '0',
  // padding: '10px',
  // marginTop: '10px',
  borderRadius: 'var(--border-radius)',
  boxSizing: 'border-box',
  transitionDuration: '0.2s',
  transitionProperty: 'background-color, box-shadow',
  ':hover': {
    // outline: '1px solid lightgrey',
    // border: '1px solid lightgrey',
    boxShadow: '0 0 0 1px lightgrey',
    backgroundColor: 'ghostwhite',
    transitionDuration: '0s',
    transitionProperty: 'background-color, box-shadow',
  },
});

const gameInfoContainerStyle = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  paddingLeft: '20px',
  // width: '100%',
  flexGrow: 1,
});

const linkStyle = css({
  textDecoration: 'none',
  color: 'var(--color-text)',
});

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
    <Link to={`/games/${game.id}`} key={game.id} css={linkStyle}>
      <div css={mainContainerStyle}>
        {ranked && game.average_rating && (
          <AverageRatingDiv rating={game.average_rating} />
        )}

        <CoverDiv game={game} />

        <div css={gameInfoContainerStyle}>
          <h3 css={{ margin: 0 }}>{game.name}</h3>
          <ReleaseDeveloperRow game={game} />
          <PlatformIcons platforms={game.platforms} />
        </div>

        {currentUser && <AddGameToLibraryButton gameId={game.id} />}
      </div>
    </Link>
  );
};

export default GameListItem;
