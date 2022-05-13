/** @jsxImportSource @emotion/react */

import AnimatedCanvas from './AnimatedCanvas';
import Composition from './Composition';
import { css } from '@emotion/react';
import useWindowSize from '../../hooks/useWindowSize';

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

  return (
    <div css={style}>
      <AnimatedCanvas
        dimensions={{
          width: windowSize.scrollWidth,
          height: windowSize.scrollHeight,
        }}
      >
        <Composition windowSize={windowSize} />
      </AnimatedCanvas>
    </div>
  );
};

export default Background;
