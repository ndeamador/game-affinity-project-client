/** @jsxImportSource @emotion/react */

import { css, keyframes } from '@emotion/react';

const animations = {
  blob: keyframes`
  0%,
  100% { border-radius: 33% 67% 70% 30% / 30% 30% 70% 70%; }
  20% { border-radius: 37% 63% 51% 49% / 37% 65% 35% 63%; }
  40% { border-radius: 36% 64% 64% 36% / 64% 48% 52% 36%; }
  60% { border-radius: 37% 63% 51% 49% / 30% 30% 70% 70%; }
  80% { border-radius: 40% 60% 42% 58% / 41% 51% 49% 59%; }
  50% { opacity: .5}
`,

  rotate: keyframes`
  100% { transform: rotate(1turn); }
`,
};

const styles = {
  container: css({
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    // filter: 'blur(10px)',
    // backdropFilter: 'blur(10px)',
    // overflow: 'clip',
    overflow: 'hidden',
    zIndex: -2,
  }),
  overlay: css({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'white',
    zIndex: 1,
    opacity: 0.5,
  }),
  centerBlob: css({
    width: '60vw',
    height: '35vh',
    minWidth: '1000px',
    minHeight: '250px',
    margin: 'auto',
    backgroundImage:
      'linear-gradient(120deg, var(--blob-center-1) 0%, var(--blob-center-2) 100%)',
    animation: `${animations.blob} 25s linear infinite`,
    marginTop: 'var(--searchbar-margin-top)',
  }),
  bigBlob: css({
    position: 'absolute',
    left: '-50vw',
    top: '10vh',
    width: '110vw',
    height: '110vw',
    backgroundImage:
      'linear-gradient(120deg, var(--blob-big-1) 0%, var(--blob-big-2) 100%)',
    opacity: 0.8,
    animation: `${animations.blob} 30s linear infinite, ${animations.rotate} 50s linear infinite`,
    filter: 'blur(50px)',
  }),
  backgroundBlob: css({
    position: 'absolute',
    width: 'max(150vw, 150vh)',
    height: 'max(150vw, 150vh)',
    margin: 'min(-50vw, -50vh)', // here to allow the rotating background image to be larger than the viewport
    backgroundImage:
      'linear-gradient(120deg, var(--blob-background-1) 0%, var(--blob-background-2) 100%)',
    overflow: 'overlay',
    animation: `${animations.rotate} 10s linear infinite`,
    opacity: 1,
  }),
};

const CssBlobs = ({
  dimensions,
}: {
  dimensions: { width: number; height: number };
}) => {
  // manually forced canvas size to adapt to scrollsize and not windowsize to prevent canvas to be cut when the scrollbar appears.
  const adaptableSize = {
    width: dimensions.width,
    height: dimensions.height,
  };

  return (
    <div css={{ ...styles.container, ...adaptableSize }}>
      <div css={{ ...styles.overlay, ...adaptableSize }} />
      <div css={styles.backgroundBlob} />
      <div css={styles.centerBlob} />
      <div css={styles.bigBlob} />
    </div>
  );
};

export default CssBlobs;