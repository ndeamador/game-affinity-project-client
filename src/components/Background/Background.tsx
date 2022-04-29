import { useContext, useEffect, useRef, useState } from 'react';
import { nanoid } from 'nanoid'; // Id generator to avoid using .map index as keys, which is an antipattern.
import AnimatedCanvas from './AnimatedCanvas';
import SquidParticle from './SquidParticle';
import getRandomParticles from '../../utils/getRandomParticles';
import useWindowSize from '../../hooks/useWindowSize';
import { SquidParticleBaseProps } from '../../types';
import { BounceBoxesContext } from '../../App';

const Background = () => {
  const windowSize = useWindowSize();
  const [mouseRadius, setMouseRadius] = useState(0);
  const [particlesArray, setParticlesArray] = useState<
    SquidParticleBaseProps[]
  >([]);

  useEffect(() => {
    setMouseRadius((windowSize.height / 120) * (windowSize.width / 120));
    setParticlesArray(getRandomParticles(windowSize));
  }, [windowSize]);

  const particlesArrayRef = useRef<SquidParticleBaseProps[]>();

  // if (particlesArray && particlesArray.c)
  particlesArrayRef.current = particlesArray;

  const bounceContext = useContext(BounceBoxesContext);

  return (
    <AnimatedCanvas>
      {particlesArray.map((particle) => (
        <SquidParticle
          key={nanoid()}
          windowSize={windowSize}
          mouseRadius={mouseRadius}
          bounceElement={bounceContext.bounceBoxes.searchBar}
          {...particle}
        />
      ))}
    </AnimatedCanvas>
  );
};

export default Background;
