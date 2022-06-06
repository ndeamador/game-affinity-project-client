/** @jsxImportSource @emotion/react */

import { css, keyframes } from '@emotion/react';
import { Game } from '../types';
import GameListItem from './GameListItem';

const animations = {
  dropDown: keyframes`
  0% {
    transform: scaleY(0)
  }
  80% {
    transform: scaleY(1.1)
  }
  100% {
    transform: scaleY(1)
  }
`,
};

// const style = css({
//   display: 'flex',
//   flexDirection: 'column',
//   gap: '5px',
//   padding: '10px',
//   backgroundColor: 'var(--item-list-background)',
//   borderRadius: '0 0 var(--border-radius) var(--border-radius)',
//   animation: `${animations.dropDown} 300ms ease-in-out forwards`,
//   transformOrigin: 'top center',
// });

const GameList = ({ games, ranked }: { games: Game[]; ranked?: boolean }) => {
  const style = css({
    display: 'flex',
    flexDirection: 'column',
    gap: '7px',
    // padding: '15px 10px 10px 10px',
    padding: '10px',
    // backgroundColor: 'var(--item-list-background)',
    borderRadius: '0 0 var(--border-radius) var(--border-radius)',
    animation: ranked
      ? ''
      : `${animations.dropDown} 300ms ease-in-out forwards`,
    transformOrigin: 'top center',
    borderTop: ranked ? '' : '1px solid black',
    borderImage: 'linear-gradient(to right, transparent, grey, transparent)',
    borderImageSlice: 1,
  });

  // Remember that using the mapped object's indexes for the key property is an anti-pattern, use unique id instead
  // https://robinpokorny.medium.com/index-as-a-key-is-an-anti-pattern-e0349aece318

  return (
    <div css={style}>
      {games.length > 0 ? (
        games.map((game) => (
          <GameListItem key={game.id} game={game} ranked={ranked} />
        ))
      ) : (
        <div>No games found</div>
      )}
    </div>
  );
};

export default GameList;
