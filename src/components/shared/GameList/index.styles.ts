import { css, keyframes } from '@emotion/react';

export const animations = {
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

const styles = {
  mainContainer: css({
    display: 'flex',
    flexDirection: 'column',
    padding: '5px 10px',
    borderRadius: '0 0 var(--border-radius) var(--border-radius)',
    borderTop: '1px solid black',
    borderImage: 'linear-gradient(to right, transparent, grey, transparent)',
    borderImageSlice: 1,
  })
};

export default styles;