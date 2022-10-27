/** @jsxImportSource @emotion/react */

import AnimatedCanvas from './AnimatedCanvas';
import Composition from './Composition';
import useWindowSize from '../../hooks/useWindowSize';
import useMousePosition from '../../hooks/useMousePosition';
import CssBlobs from './CssBlobs';
import { Profiler } from 'react';
import styles from './index.styles';
import { BounceBoxState } from '../../types';

const Background = ({ bounceBoxes }: { bounceBoxes: BounceBoxState }) => {
  const windowSize = useWindowSize();

  const mousePosition = useMousePosition();

  return (
    <div css={styles.backgroundContainer}>
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
          renderingContext={null}
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
