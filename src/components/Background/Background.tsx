/** @jsxImportSource @emotion/react */

import AnimatedCanvas from './AnimatedCanvas';
import Composition from './Composition';
import { css } from '@emotion/react';
import useWindowSize from '../../hooks/useWindowSize';
import useMousePosition from '../../hooks/useMousePosition';
import CssBlobs from './CssBlobs';

const Background = () => {
  const windowSize = useWindowSize();

  const style = css({
    // minWidth: `${windowSize.scrollWidth}px`,
    // minHeight: `${windowSize.scrollHeight}px`,
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    display: 'flex',
    filter: 'blur(1.5px)',
    zIndex: -1,
    width: '100%',
    height: '100%',
    // overflowY:'auto',
    backgroundColor: 'var(--background)',
    '> canvas': {
      position: 'absolute',
      top: 0,
      left: 0,
      // backgroundColor: 'red',
    },
    // objectFit: 'cover',
  });

  const mousePosition = useMousePosition();

  return (
    <div css={style}>
      <CssBlobs />
      <AnimatedCanvas
        dimensions={{
          width: windowSize.scrollWidth,
          height: windowSize.scrollHeight,
        }}
      >
        <Composition windowSize={windowSize} mousePosition={mousePosition} />
      </AnimatedCanvas>
    </div>
  );
};

export default Background;
