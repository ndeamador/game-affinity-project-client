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
  50% { opacity: var(--blob-half-animation-opacity)}
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
    // filter: 'blur(10px)', // bit too much impact on performance
    // backdropFilter: 'blur(10px)', // bit too much impact on performance
    // overflow: 'clip',
    overflow: 'hidden',
    zIndex: -3,
  }),
  overlay: css({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'var(--background-overlay)',
    zIndex: 1,
  }),
  centerBlob: css({
    width: '60vw',
    height: '35vh',
    minWidth: '1000px',
    minHeight: '250px',
    margin: 'auto',
    backgroundImage:
      'linear-gradient(120deg, var(--blob-center-1) 0%, var(--blob-center-2) 100%)',
    animation: `${animations.blob} 20s linear infinite`,
    marginTop: 'var(--searchbar-margin-top)',
    // filter: 'blur(var(--blob-center-blur))', // bit too much impact on performance
    opacity: 'var(--blob-center-opacity)',
  }),
  bigBlob: css({
    position: 'absolute',
    left: '-50vw',
    top: '10vh',
    width: '90vw' /* 110vw */,
    height: '90vw' /* 110vw */,
    backgroundImage:
      'linear-gradient(120deg, var(--blob-big-1) 0%, var(--blob-big-2) 100%)',
    opacity: 'var(--blob-big-opacity)',
    animation: `${animations.blob} 30s linear infinite, ${animations.rotate} 30s linear infinite`,
    // filter: 'blur(var(--blob-big-blur))', // bit too much impact on performance
    zIndex: -1,
  }),
  bottomRightCornerBlob: css({
    position: 'absolute',
    left: '65vw',
    top: '55vh',
    width: '50vw' /* 110vw */,
    height: '50vw' /* 110vw */,
    backgroundImage:
      'linear-gradient(120deg, var(--blob-bottom-right-corner) 0%, var(--blob-big-2) 100%)',
    opacity: 'var(--blob-bottom-right-corner-opacity)',
    animation: `${animations.blob} 30s linear infinite, ${animations.rotate} 30s linear infinite`,
    // filter: 'blur(var(--blob-big-blur))', // bit too much impact on performance
    zIndex: -1,
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
    opacity: 'var(--blob-background-opacity)',
    zIndex: -2,
  }),
};

const CssBlobs = () => {
  return (
    <div css={styles.container}>
      <div id='blobsOverlay' css={styles.overlay} />
      <div id='centerBlob' css={styles.centerBlob} />
      <div id='bigBlog' css={styles.bigBlob} />
      <div id='bottomRightCornerBlob' css={styles.bottomRightCornerBlob} />
      <div id='backgroundBlob' css={styles.backgroundBlob} />
    </div>
  );
};

export default CssBlobs;
