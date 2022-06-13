/** @jsxImportSource @emotion/react */

import { css, keyframes } from '@emotion/react';
import { useRef } from 'react';
import useClickedOutOfElement from '../hooks/useClickedOutOfElement';
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
  gap: '7px',
  padding: '10px',
  // backgroundColor: 'var(--item-list-background)',
  borderRadius: '0 0 var(--border-radius) var(--border-radius)',
  borderTop: '1px solid black',
  borderImage: 'linear-gradient(to right, transparent, grey, transparent)',
  borderImageSlice: 1,
});

// const createDropDownKeyframes = (
//   ref: React.MutableRefObject<HTMLElement | null>
// ) => {
//   // https://developer.chrome.com/blog/performant-expand-and-collapse/
//   const { width: expandedWidth, height: expandedHeight } =
//     getBoundingPoints(ref);
//   const ease = (v: number, pow = 4) => {
//     return 1 - Math.pow(1 - v, pow);
//   };

//   console.log('kf dimensions:', expandedHeight, expandedWidth);

//   let animation = '';
//   // let inverseAnimation = '';

//   for (let step = 0; step <= 100; step++) {
//     // Remap the step value to an eased one.
//     const easedStep = ease(step / 100);

//     // Calculate the scale of the element.
//     // const xScale = expandedWidth + (1 - expandedWidth) * easedStep;
//     const xScale = 1;
//     const yScale = expandedHeight + (1 - expandedHeight) * easedStep;

//     animation += `${step}% {
//       transform: scale(${xScale}, ${yScale});
//     }`;

//     // return `
//     // @keyframes menuAnimation {
//     //   ${animation}
//     // }
//     // `

//     return keyframes`${animation}`;
//   }
// };

const GameList = ({ games, ranked }: { games: Game[]; ranked?: boolean }) => {
  // Collapse when clicking outside the element.
  const ref = useRef<HTMLDivElement>(null);
  const [clickedOutside, handleClickInside] = useClickedOutOfElement(ref);

  const dynamicStyles = {
    dropDown: css({
      animation: ranked
        ? ''
        : `${animations.rotateDownWithBounce} 330ms ease-out forwards`,
      transformOrigin: 'top center',
    }),
    collapsible: css({
      overflow: 'hidden',
      display: clickedOutside ? 'none' : 'flex',
      // maxHeight: clickedOutside ? 0 : '999vh',
      // transition: 'max-height 700ms ease-in',
      // padding: clickedOutside ? '0 10px' : '10px',
      // transition: 'padding 300ms ease-out',
      // transition: 'max-height 2300ms ease-out',
      // animation: `${createDropDownKeyframes(ref)} 0.2s linear`, // the animation is already eased in createDropDownKeyframes()
    }),
  };

  // Remember that using the mapped object's indexes for the key property is an anti-pattern, use unique id instead
  // https://robinpokorny.medium.com/index-as-a-key-is-an-anti-pattern-e0349aece318

  return (
    <div
      css={[
        style,
        dynamicStyles.dropDown,
        !ranked && dynamicStyles.collapsible,
      ]}
      ref={ref}
      onClick={() => handleClickInside}
    >
      {games.length > 0 ? (
        games.map((game) => (
          <GameListItem key={game.id} game={game} ranked={ranked} />
        ))
      ) : (
        <div>No games found</div>
      )}
    </div>

    // <div css={style}>
    //   {games.length > 0 ? (
    //     games.map((game) => (
    //       <GameListItem key={game.id} game={game} ranked={ranked} />
    //     ))
    //   ) : (
    //     <div>No games found</div>
    //   )}
    // </div>
  );
};

export default GameList;
