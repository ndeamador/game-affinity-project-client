/** @jsxImportSource @emotion/react */

import AnimatedCanvas from './AnimatedCanvas/AnimatedCanvas';
import Composition from './Composition/Composition';
import { css } from '@emotion/react';
import useWindowSize from '../../hooks/useWindowSize';
import useMousePosition from '../../hooks/useMousePosition';
import CssBlobs from './CssBlobs/CssBlobs';
import { Profiler } from 'react';

const Background = ({ bounceBoxes }: { bounceBoxes: any }) => {
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
    filter: 'blur(var(--overlay-blur))',
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
      {/* <Profiler id='test' onRender={logTimes}> */}
        <AnimatedCanvas
          dimensions={{
            width: windowSize.scrollWidth,
            height: windowSize.scrollHeight,
          }}
        >
          <Composition
            windowSize={windowSize}
            mousePosition={mousePosition}
            bounceBoxes={bounceBoxes}
          />
        </AnimatedCanvas>
      {/* </Profiler> */}
    </div>
  );
};

export default Background;

const logTimes = (
  id: any,
  phase: any,
  actualTime: any,
  baseTime: any,
  startTime: any,
  commitTime: any
) => {
  // console.log(`${id}'s ${phase} phase:`);
  // console.log(`Actual time: ${Math.floor(actualTime)}`);
  console.log(`Base time: ${Math.floor(baseTime)}`);
  // console.log(`Start time: ${startTime}`);
  // console.log(`Commit time: ${commitTime}`);
};
