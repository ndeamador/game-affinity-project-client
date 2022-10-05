import { AnimatedParticleBaseProps, WindowSize } from '../types';
import { getRandomDirectionCoeficient } from './misc';

const getRandomParticles = (
  windowSize: WindowSize
): AnimatedParticleBaseProps[] => {
  const particlesArray: AnimatedParticleBaseProps[] = [];
  const particleMultiplier = 3;
  const numberOfParticles = particleMultiplier * (windowSize.height * windowSize.width) / 100000
  const minSpeed = 0.1;
  const maxSpeed = 0.4;
  const sizeMultiplier = 0.9; // used as radius for canvas.arc(). Unit not pixels.
  const sizeVariation = 5 // 5

  for (let i = 0; i < numberOfParticles; i++) {
    const size = sizeMultiplier * (Math.random() * sizeVariation + 1); // random number between 1 and sizeVariation.
    // particle position set random number between 0 and canvas width/height with particle size defining a buffer around the canvas to avoid particles getting stuck in the edge.
    const x = Math.floor(Math.random() * (innerWidth - size * 2 - size * 2) + size * 2);
    const y = Math.floor(Math.random() * (innerHeight - size * 2 - size * 2) - size * 2);
    // particle movement speed and direction (how many pixels particle moves each frame).
    const directionX = getRandomDirectionCoeficient(minSpeed, maxSpeed);
    const directionY = getRandomDirectionCoeficient(minSpeed, maxSpeed);
    const color = '#8C5524';
    particlesArray.push({ x, y, directionX, directionY, size, color });
  }
  return particlesArray;
};

export default getRandomParticles;