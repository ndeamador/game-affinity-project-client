import { css, keyframes } from '@emotion/react';

const animations = {
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
  borderGlow: keyframes`
  to {
    background-position: 200% center;
  }
  `,
};

const styles = {
  myLibraryButton: css({
    transformOrigin: 'top center',
    background: 'var(--animated-text-gradient)',
    animation: `${animations.rotateDownWithBounce} 330ms ease-out forwards, ${animations.borderGlow} 3.5s linear infinite`,
    backgroundClip: 'text',
    backgroundSize: '400% auto', // https://codersblock.com/blog/gradient-animation-trick/
    color: 'transparent',
    '&:hover': {
      background: 'none',
    },
  }),
  outerNavBar: css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 'var(--navbar-height)',
    padding: '0px 50px',
    position: 'fixed',
    top: '0px',
    backdropFilter: 'saturate(180%) blur(5px)',
    backgroundColor: 'var(--navbar-background)',
    zIndex: 100,
  }),
  innerNavBar: css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  }),
  navLinkGroup: css({
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    justifyContent: 'space-between',
    gap: '10px',
  }),
  navLink: css({
    fontSize: '1.15em',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '5px 10px',
    minWidth: 'var(--min-nav-item-width)',
    height: '100%',
    borderRadius: 'var(--border-radius)',
    textDecoration: 'none',

    // The following three properties replace color above, they are only neede so that all buttons appear with the same font weight.
    // The 'backgrond-clip: text' needed for myLibraryButton's text background animation makes text look thinner.
    color: 'transparent',
    backgroundClip: 'text',
    backgroundColor: 'var(--navbar-link-text-color)',
    '&:hover': {
      textFillColor: 'initial',
      color: 'var(--navbar-link-text-color-hover)',
      background: 'none',
    },
  }),
  userStrip: css({
    padding: '5px 10px',
    color: 'var(--navbar-user-text-color)'
  }),
  navLinkActive: {
    color: 'var(--navbar-link-text-color-active)',
    background: 'none',
  },
};

export default styles;