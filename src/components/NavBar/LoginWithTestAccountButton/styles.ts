import { css, keyframes } from '@emotion/react';

const animations = {
  borderGlow: keyframes`
  to {
    background-position: 200% center;
  }
  `,
};

const styles = {
  animatedBorder: css({
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 'var(--border-radius)',
    background: 'var(--animated-border-gradient)',
    backgroundSize: '200% auto', // https://codersblock.com/blog/gradient-animation-trick/
    animation: `${animations.borderGlow} 2s linear infinite`,
    '&:hover': {
      background: 'var(--animated-border-gradient-hover)',
      animation: `${animations.borderGlow} 2s linear infinite`,
      backgroundSize: '200% auto',
    },
  }),
  button: css({
    backgroundColor: 'var(--button-gradient-border-color-1)',
    margin: '2px',
  }),
};

export default styles;