import { useEffect, useRef, useState } from 'react';
import { nanoid } from 'nanoid'; // Id generator to avoid using .map index as keys, which is an antipattern.
import AnimatedCanvas from './AnimatedCanvas';
import SquidParticle from './SquidParticle';
import getRandomParticles from '../../utils/getRandomParticles';
import useWindowSize from '../../hooks/useWindowSize';
import { SquidParticleBaseProps } from '../../types';
import ConnectingLines from './ConnectingLines';

const Background = () => {
  const windowSize = useWindowSize();
  const [mouseRadius, setMouseRadius] = useState(0);
  const [particlesArray, setParticlesArray] = useState<
    SquidParticleBaseProps[]
  >([]);

  useEffect(() => {
    setMouseRadius((windowSize.height / 80) * (windowSize.width / 80));
    setParticlesArray(getRandomParticles(windowSize));
  }, [windowSize]);

  return (
    // <AnimatedCanvas>
    //   {getRandomParticles(windowSize).map((particle) => (
    //     <SquidParticle key={nanoid()} windowSize={windowSize} mouseRadius={mouseRadius} {...particle} />
    //   ))}
    // </AnimatedCanvas>
    <AnimatedCanvas>
      {particlesArray.map((particle) => (
        <SquidParticle
          key={nanoid()}
          windowSize={windowSize}
          mouseRadius={mouseRadius}
          {...particle}
        />
      ))}
      {/* <ConnectingLines
        particlesArray={particlesArray}
        windowSize={windowSize}
      /> */}
    </AnimatedCanvas>
  );
};

export default Background;
