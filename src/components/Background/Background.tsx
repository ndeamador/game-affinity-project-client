/** @jsxImportSource @emotion/react */

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

  const testDivRef = useRef<HTMLDivElement | null>(null);
  const bounceContext = useContext(BounceBoxesContext);


  return (
    // <AnimatedCanvas>
    //   {getRandomParticles(windowSize).map((particle) => (
    //     <SquidParticle key={nanoid()} windowSize={windowSize} mouseRadius={mouseRadius} {...particle} />
    //   ))}
    // </AnimatedCanvas>
    <>
      {/* <div
        id='testdiv'
        css={{
          margin: 'auto',
          width: '210px',
          height: '200px',
          backgroundColor: 'rgb(255, 99, 71, 0.5)',
        }}
        ref={testDivRef}
      ></div> */}
      <AnimatedCanvas>
        {particlesArray.map((particle) => (
          <SquidParticle
            key={nanoid()}
            windowSize={windowSize}
            mouseRadius={mouseRadius}
            // bounceElement={testDivRef}
            // bounceElement={testDivRef.current?.getBoundingClientRect()}
            bounceElement={bounceContext.bounceBoxes.searchBar}
            {...particle}
          />
        ))}

      </AnimatedCanvas>
    </>
  );
};

export default Background;
