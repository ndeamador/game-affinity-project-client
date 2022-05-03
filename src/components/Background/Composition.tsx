import { nanoid } from 'nanoid';
import { useContext, useEffect, useRef, useState } from 'react';
import { BounceBoxesContext } from '../../App';
import useWindowSize from '../../hooks/useWindowSize';
import { AnimatedParticleBaseProps } from '../../types';
import getRandomParticles from '../../utils/getRandomParticles';
import { FrameContext } from './AnimatedCanvas';
import AnimatedParticle from './AnimatedParticle';
import ConnectingLines from './ConnectingLines';

const Composition = () => {
  const windowSize = useWindowSize();
  const [mouseRadius, setMouseRadius] = useState(0);
  const bounceContext = useContext(BounceBoxesContext);
  const particlesArrayRef = useRef<AnimatedParticleBaseProps[]>();
  useContext(FrameContext); // only present to force re-render after each frame clears the canvas.

  useEffect(() => {
    setMouseRadius((windowSize.height / 120) * (windowSize.width / 120));
    particlesArrayRef.current = getRandomParticles(windowSize);
  }, [windowSize]);

  const updateParticle = (
    index: number,
    initialParticle: AnimatedParticleBaseProps
  ) => {
    if (particlesArrayRef.current) {
      particlesArrayRef.current[index] = initialParticle;
    }
  };

  console.log('mouseradius:', mouseRadius);

  return (
    <>
      <ConnectingLines
        particlesArray={particlesArrayRef.current}
        windowSize={windowSize}
      />
      {particlesArrayRef.current &&
        particlesArrayRef.current?.map((particle, i) => (
          <AnimatedParticle
            key={nanoid()}
            windowSize={windowSize}
            mouseRadius={mouseRadius}
            bounceElement={bounceContext.bounceBoxes.searchBar}
            index={i}
            onNewFrame={updateParticle}
            {...particle}
          />
        ))}
    </>
  );
};

export default Composition;