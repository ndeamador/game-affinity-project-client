/** @jsxImportSource @emotion/react */

import { css, keyframes } from '@emotion/react';
import { Game } from '../../../types';
import GameListItem from './GameListItem/GameListItem';

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
  rotateDown: keyframes`
  0% {
    transform: rotateX(-90deg)
  }
  100% {
    transform: rotateX(0deg)
  }
  `,
  rotateDownWithBounce: keyframes`
  0% {
    transform: rotateX(-90deg)
  }
  70% {
    transform: rotateX(20deg)
  }
  100% {
    transform: rotateX(0deg)
  }
  `,
};

const style = css({
  display: 'flex',
  flexDirection: 'column',
  // gap: '7px',
  padding: '5px 10px',
  // backgroundColor: 'var(--item-list-background)',
  borderRadius: '0 0 var(--border-radius) var(--border-radius)',
  borderTop: '1px solid black',
  borderImage: 'linear-gradient(to right, transparent, grey, transparent)',
  borderImageSlice: 1,
});

const GameList = ({ games, ranked }: { games: Game[]; ranked?: boolean }) => {
  const dynamicStyles = {
    dropDown: css({
      animation: ranked
        ? ''
        : `${animations.rotateDownWithBounce} 330ms ease-out forwards`,
      transformOrigin: 'top center',
    }),
  };

  // Remember that using the mapped object's indexes for the key property is an anti-pattern, use unique id instead
  // https://robinpokorny.medium.com/index-as-a-key-is-an-anti-pattern-e0349aece318

  return (
    <div css={[style, dynamicStyles.dropDown]}>
      {games.length > 0 ? (
        games.map((game) => {
          // if (game.cover) {
            return <GameListItem key={game.id} game={game} ranked={ranked} />;
          // }
        })
      ) : (
        <div>No games found</div>
      )}
    </div>
  );
};

export default GameList;
