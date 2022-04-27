import { SquidParticleBaseProps, WindowSize } from '../types';

const getRandomParticles = (
  // canvasHeight: number,
  // canvasWidth: number
  windowSize: WindowSize
): SquidParticleBaseProps[] => {
  const particlesArray: SquidParticleBaseProps[] = [];
  // const numberOfParticles = (canvasHeight * canvasWidth) / 9000;
  const numberOfParticles = (windowSize.height * windowSize.width) / 9000;


  for (let i = 0; i < numberOfParticles; i++) {
    const size = Math.random() * 5 + 1; // random number between 1 and 5
    // particle position set random number between 0 and canvas width/height with particle size defining a buffer around the canvas to avoid particles getting stuck in the edge.
    const x = Math.random() * (innerWidth - size * 2 - size * 2) + size * 2;
    const y = Math.random() * (innerHeight - size * 2 - size * 2) - size * 2;
    // particle movement speed and direction (how many pixels particle moves each frame). Random number between -2.5 & +2.5
    const directionX = Math.random() * 5 - 2.5;
    const directionY = Math.random() * 5 - 2.5;
    const color = '#8C5524';

    particlesArray.push({ x, y, directionX, directionY, size, color });
  }
  return particlesArray;
};

export default getRandomParticles;