/** @jsxImportSource @emotion/react */

import AnimatedCanvas from './AnimatedCanvas';
import Composition from './Composition';
import { css } from '@emotion/react';
import useWindowSize from '../../hooks/useWindowSize';
import useMousePosition from '../../hooks/useMousePosition';

const Background = () => {
  const windowSize = useWindowSize();

  const style = css({
    // minWidth: `${windowSize.scrollWidth}px`,
    // minHeight: `${windowSize.scrollHeight}px`,
    position: 'absolute',
    top: 0,
    left: 0,

    zIndex: -1,
    // overflowY:'auto',
  });
  console.log('in background');

  const mousePosition = useMousePosition();

  return (
      <div css={style}>
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