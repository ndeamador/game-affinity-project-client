import { FC } from 'react';
import {
  AnimatedParticleBaseProps,
  AnimatedParticlesProps,
  BounceBoxState,
  RectWithBoundingPoints,
  WindowSize,
} from '../../../../types';

const AnimatedParticles: FC<AnimatedParticlesProps> = (props) => {
  // const canvas = useContext(Canvas2dContext);
  // useContext(FrameContext); // only present to force that the particle re-renders after each frame clears the canvas.
  const canvas = props.renderingContext;

  const defaultColor = '#ffffff'; /* '#8C5523' */

  // using for...of instead of forEach to avoid an unnecessary typecheck before updateParticle()
  if (canvas && canvas !== null && props.particlesArray) {
    for (const [i, currentFrameParticle] of props.particlesArray.entries()) {
      const nextFrameParticle = getNextFrameParticle(
        currentFrameParticle,
        props.windowSize,
        defaultColor,
        props.bounceElements
      );

      updateParticle(i, nextFrameParticle, props.particlesArray);

      // Draw dot
      canvas.beginPath();
      canvas.arc(
        currentFrameParticle.x,
        currentFrameParticle.y,
        // Math.floor(currentFrameParticle.x),
        // Math.floor(currentFrameParticle.y),
        currentFrameParticle.size,
        0,
        Math.PI * 2,
        false
      );
      canvas.fillStyle = defaultColor;
      canvas.fill();
    }
  }

  // return null to prevent 'Component cannot be used as a JSX component' TypeScript error.
  return null;
};

export default AnimatedParticles;

const updateParticle = (
  index: number,
  initialParticle: AnimatedParticleBaseProps,
  particlesArray: AnimatedParticleBaseProps[]
) => {
  particlesArray[index] = initialParticle;
};

const bounceFromBox = (
  box: RectWithBoundingPoints,
  particle: AnimatedParticleBaseProps,
  color: string
) => {
  if (
    particle.x >= box.left - particle.directionX / 2 - particle.size && // left edge
    particle.x <= box.right - particle.directionX / 2 + particle.size && // right edge
    particle.y >= box.top - particle.directionY / 2 - particle.size && // top edge
    particle.y <= box.bottom - particle.directionY / 2 + particle.size // bottom edge
  ) {
    // Bounce from box (bounce angle depends on side touched)
    if (
      (particle.directionX > 0 &&
        particle.x - particle.directionX / 2 - particle.size <= box.left) ||
      (particle.directionX < 0 &&
        particle.x - particle.directionX / 2 + particle.size >= box.right)
    ) {
      particle.directionX = -particle.directionX;
    } else if (
      (particle.directionY > 0 &&
        particle.y - particle.directionY / 2 - particle.size <= box.top) ||
      (particle.directionY < 0 &&
        particle.y - particle.directionY / 2 + particle.size >= box.bottom)
    ) {
      particle.directionY = -particle.directionY;
    }
    // else {
    //   particle.directionX = -particle.directionX;
    //   particle.directionY = -particle.directionY;
    // }
  }

  return [particle, color] as const;
};

const getNextFrameParticle = (
  initialParticle: AnimatedParticleBaseProps,
  windowSize: WindowSize,
  color: string,
  bounceElements?: BounceBoxState
): AnimatedParticleBaseProps => {
  let particle = {
    ...initialParticle,
  };

  // check if particle is still within canvas and reverse direction if at the limit
  if (particle.x > windowSize.scrollWidth /* width */ || particle.x < 0) {
    particle.directionX = -particle.directionX;
  }
  if (particle.y > windowSize.scrollHeight /* height */ || particle.y < 0) {
    particle.directionY = -particle.directionY;
  }

  // // Interact with mouse
  // if (mouse.x && mouse.y && props.mouseRadius) {
  //   // collision detection (mouse position / particle position)
  //   // https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
  //   const diffX = mouse.x - particle.x;
  //   const diffY = mouse.y - particle.y;
  //   // check if distance between particle centre and mouse position is smaller than specificed mouse collision radius.
  //   const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

  //   if (distance < props.mouseRadius + particle.size) {
  //     // push the particle to the opposite side of the mouse pointer
  //     if (
  //       mouse.x < particle.x &&
  //       particle.x < windowSize.width - particle.size * 10
  //     ) {
  //       particle.x += 10;
  //       particle.directionX = -particle.directionX;
  //     }
  //     // but not beyond the canvas size (size * 10 is a buffer area around the edge)
  //     if (mouse.x > particle.x && particle.x > particle.size * 10) {
  //       particle.x -= 10;
  //     }
  //     if (
  //       mouse.y < particle.y &&
  //       particle.y < windowSize.height - particle.size * 10
  //     ) {
  //       particle.y += 10;
  //       particle.directionY = -particle.directionY;
  //     }
  //     if (mouse.y > particle.y && particle.y > particle.size * 10) {
  //       particle.y -= 10;
  //     }
  //   }
  // }

  // Interaction with bouncing element
  if (bounceElements) {
    // const bounceFromBox = (box:RectWithBoundingPoints) => {
    //     if (
    //       particle.x >= box.left - particle.directionX / 2 - particle.size && // left edge
    //       particle.x <= box.right - particle.directionX / 2 + particle.size && // right edge
    //       particle.y >= box.top - particle.directionY / 2 - particle.size && // top edge
    //       particle.y <= box.bottom - particle.directionY / 2 + particle.size // bottom edge
    //     ) {

    //       // Bounce from box (bounce angle depends on side touched)
    //       if (
    //         (particle.directionX > 0 && (particle.x - particle.directionX / 2 - particle.size <= box.left)) ||
    //         (particle.directionX < 0 && (particle.x - particle.directionX / 2 + particle.size >= box.right))
    //       ) {
    //         particle.directionX = -particle.directionX;
    //         particleColor = 'yellow';
    //       } else if (
    //         (particle.directionY > 0 && (particle.y - particle.directionY / 2 - particle.size <= box.top)) ||
    //         (particle.directionY < 0 && (particle.y - particle.directionY / 2 + particle.size >= box.bottom))
    //       ) {
    //         particleColor = 'blue';
    //         particle.directionY = -particle.directionY;
    //       }
    //       // else {
    //       //   particle.directionX = -particle.directionX;
    //       //   particle.directionY = -particle.directionY;
    //       // }
    //     }
    // }

    Object.values(bounceElements).forEach((box) => {
      // bounceFromBox(box);
      [particle, color] = bounceFromBox(box, particle, color);
    });
  }

  // regular movement
  particle.x += particle.directionX;
  particle.y += particle.directionY;

  return particle;
};
