/** @jsxImportSource @emotion/react */

import { keyframes } from '@emotion/react';

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
  container: {
    // position: 'absolute',
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
  },
  overlay: {
    width: '100vw',
    height: '100vh',
    // filter: 'blur(10px)',
    backgroundColor: 'white',
    zIndex: 1,
    opacity: 0.5,
  },
  sharedBlobStyle: {
    // filter: 'blur(30px)',
    // animation: `${blob} 25s linear infinite`,
    // backgroundImage: 'linear-gradient(120deg, #3eefff 0%, #b300ff 100%)',
    /* border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%, */
    // width: '60vw',
    // height: '40vh',
    /* animation: blob 25s linear infinite, */
    /* transform-style: preserve-3d, */
    /* outline: 1px solid transparent, */
    /* opacity: 0.3; */
  },

  centerBlob: {
    width: '60vw',
    height: '35vh',
    minWidth: '1000px',
    minHeight: '250px',
    margin: 'auto',
    backgroundImage:
      'linear-gradient(120deg, var(--blob-center-1) 0%, var(--blob-center-2) 100%)',
    animation: `${animations.blob} 25s linear infinite`,
    marginTop: 'var(--searchbar-margin-top)',


  },

  bigBlob: {
    // position: 'absolute',
    // left: '-500px',
    // top: '-400px',
    width: '110vw',
    height: '110vw',
    backgroundImage:
      'linear-gradient(120deg, var(--blob-big-1) 0%, var(--blob-big-2) 100%)',
    opacity: 0.8,
    animation: `${animations.blob} 30s linear infinite, ${animations.rotate} 50s linear infinite`,
    filter: 'blur(50px)',
  },
  backgroundBlob: {
    width: 'max(150vw, 150vh)',
    height: 'max(150vw, 150vh)',
    margin: 'min(-50vw, -50vh)', // here to allow the rotating background image to be larger than the viewport
    // width: '10000px',
    // height: '30vh',
    backgroundImage:
      'linear-gradient(120deg, var(--blob-background-1) 0%, var(--blob-background-2) 100%)',
    // border: '10px solid black',
    overflow: 'overlay',
    animation: `${animations.rotate} 10s linear infinite`,
    opacity: 1,
    // backgroundPosition: 'top left',
  },
};

const CssBlobs = () => {
  return (
    <div css={{ position: 'absolute', top: 0, left: 0, ...styles.container }}>
      <div css={{ position: 'absolute', top: 0, left: 0, ...styles.overlay}} />
      <div css={{ position: 'absolute', ...styles.backgroundBlob }} />
      <div css={{ ...styles.centerBlob, ...styles.sharedBlobStyle }} />
      <div
        css={{
          position: 'absolute',
          left: '-50vw',
          top: '10vh',
          ...styles.bigBlob,
          ...styles.sharedBlobStyle,
        }}
      />
    </div>
  );
};

export default CssBlobs;

// const blob = keyframes`
// //   0%,
// //   100% { border-radius: 33% 67% 70% 30% / 30% 30% 70% 70%; }
// //   20% { border-radius: 37% 63% 51% 49% / 37% 65% 35% 63%; }
// //   40% { border-radius: 36% 64% 64% 36% / 64% 48% 52% 36%; }
// //   60% { border-radius: 37% 63% 51% 49% / 30% 30% 70% 70%; }
// //   80% { border-radius: 40% 60% 42% 58% / 41% 51% 49% 59%; }
// //   50% { opacity: .2}
// // `;

// const rotate = keyframes`
//   100% { transform: rotate(1turn); }
// `;

// const sharedBlobStyle = {
//   zIndex: -2,
//   // animation: `${blob} 25s linear infinite`,
//   // backgroundImage: 'linear-gradient(120deg, #3eefff 0%, #b300ff 100%)',
//   /* border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%, */
//   // width: '60vw',
//   // height: '40vh',
//   /* animation: blob 25s linear infinite, */
//   /* transform-style: preserve-3d, */
//   /* outline: 1px solid transparent, */
//   /* filter: blur(30px); */
//   /* opacity: 0.3; */
// };

// const centerBlob = {
//   width: '60vw',
//   height: '40vh',
//   minWidth: '1000px',
//   margin: 'auto',
//   backgroundImage: 'linear-gradient(120deg, #3eefff 0%, #b300ff 100%)',
//   animation: `${blob} 25s linear infinite`,
// };

// const bigBlob = {
//   // position: 'absolute',
//   // left: '-500px',
//   // top: '-400px',
//   width: '130vw',
//   height: '130vw',
//   backgroundImage: 'linear-gradient(120deg, #443eff 0%, #3eff4e 100%)',
//   opacity: 0.5,
//   animation: `${blob} 25s linear infinite, ${rotate} 5s linear infinite`,
// };
