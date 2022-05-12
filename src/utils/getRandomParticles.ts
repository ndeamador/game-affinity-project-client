import { AnimatedParticleBaseProps, WindowSize } from '../types';

const getRandomParticles = (
  windowSize: WindowSize
): AnimatedParticleBaseProps[] => {
  const particlesArray: AnimatedParticleBaseProps[] = [];
  const particleMultiplier = 10;
  const numberOfParticles = particleMultiplier * (windowSize.height * windowSize.width) / 100000
  // const numberOfParticles = 50;
  const speedMultiplier = 5; //3 0.3
  const sizeMultiplier = 1; // used as radius for canvas.arc(). Unit not pixels.
  const sizeVariation = 3 // 5


  for (let i = 0; i < numberOfParticles; i++) {
    const size = sizeMultiplier * (Math.random() * sizeVariation + 1); // random number between 1 and sizeVariation.
    // particle position set random number between 0 and canvas width/height with particle size defining a buffer around the canvas to avoid particles getting stuck in the edge.
    const x = Math.random() * (innerWidth - size * 2 - size * 2) + size * 2;
    const y = Math.random() * (innerHeight - size * 2 - size * 2) - size * 2;
    // particle movement speed and direction (how many pixels particle moves each frame). Random number between speedMultiplier/2 & - speedMultiplier/2
    const directionX = Math.random() * speedMultiplier - speedMultiplier/2;
    const directionY = Math.random() * speedMultiplier - speedMultiplier/2;
    const color = '#8C5524';

    particlesArray.push({ x, y, directionX, directionY, size, color });
  }
  return particlesArray;
};

export default getRandomParticles;