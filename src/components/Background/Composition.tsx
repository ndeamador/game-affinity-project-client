import { useEffect, useRef } from 'react';
import { AnimatedParticleBaseProps, CompositionProps } from 'types';
import getRandomParticles from 'utils/getRandomParticles';
import AnimatedParticles from './canvasAnimations/AnimatedParticles';
import ConnectingLines from './canvasAnimations/ConnectingLines';

const Composition = (props: CompositionProps) => {
  const particlesArrayRef = useRef<AnimatedParticleBaseProps[]>();

  useEffect(() => {
    // setMouseRadius((windowSize.height / 120) * (windowSize.width / 120));
    particlesArrayRef.current = getRandomParticles(props.windowSize);
  }, [props.windowSize]);

  const updateParticle = (
    index: number,
    initialParticle: AnimatedParticleBaseProps
  ) => {
    if (particlesArrayRef.current) {
      particlesArrayRef.current[index] = initialParticle;
    }
  };

  return (
    <>
      <AnimatedParticles
        windowSize={props.windowSize}
        // mouseRadius={mouseRadius}
        bounceElements={props.bounceBoxes}
        updateParticle={updateParticle}
        mouse={props.mousePosition}
        renderingContext={props.renderingContext}
        particlesArray={particlesArrayRef.current}
      />
      <ConnectingLines
        particlesArray={particlesArrayRef.current}
        stickyElements={props.bounceBoxes}
        renderingContext={props.renderingContext}
      />
    </>
  );
};

export default Composition;
