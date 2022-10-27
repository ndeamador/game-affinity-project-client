/** @jsxImportSource @emotion/react */

import AnimatedCanvas from './AnimatedCanvas';
import Composition from './Composition';
import useWindowSize from 'hooks/useWindowSize';
import useMousePosition from 'hooks/useMousePosition';
import CssBlobs from './CssBlobs';
import styles from './index.styles';
import { BounceBoxState } from 'types';

const Background = ({ bounceBoxes }: { bounceBoxes: BounceBoxState }) => {
  const windowSize = useWindowSize();

  const mousePosition = useMousePosition();

  return (
    <div css={styles.backgroundContainer}>
      <CssBlobs />
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
    </div>
  );
};

export default Background;
