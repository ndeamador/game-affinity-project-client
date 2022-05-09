import { FC, useContext } from 'react';
import { AnimatedParticleProps } from '../../types';
import {
  Canvas2dContext,
  FrameContext,
  MousePositionContext,
} from './AnimatedCanvas';

const AnimatedParticle: FC<AnimatedParticleProps> = (props) => {
  const canvas = useContext(Canvas2dContext);
  const mouse = useContext(MousePositionContext);
  useContext(FrameContext); // only present to force that the particle re-renders after each frame clears the canvas.

  const getNextFrameParticle = (
    initialParticle: AnimatedParticleProps
  ): AnimatedParticleProps => {
    const particle = {
      ...initialParticle,
    };

    // const reverseParticleDirection = () => {
    //   particle.directionX = -particle.directionX;
    //   particle.directionY = -particle.directionY;
    // };

    // check if particle is still within canvas and reverse direction if at the limit
    if (particle.x > props.windowSize.width || particle.x < 0) {
      particle.directionX = -particle.directionX;
    }
    if (particle.y > props.windowSize.height || particle.y < 0) {
      particle.directionY = -particle.directionY;
    }

    if (mouse.x && mouse.y && props.mouseRadius) {
      // collision detection (mouse position / particle position)
      // https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
      const diffX = mouse.x - particle.x;
      const diffY = mouse.y - particle.y;
      // check if distance between particle centre and mouse position is smaller than specificed mouse collision radius.
      const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

      if (distance < props.mouseRadius + particle.size) {
        // push the particle to the opposite side of the mouse pointer
        if (
          mouse.x < particle.x &&
          particle.x < props.windowSize.width - particle.size * 10
        ) {
          particle.x += 10;
          particle.directionX = -particle.directionX
        }
        // but not beyond the canvas size (size * 10 is a buffer area around the edge)
        if (mouse.x > particle.x && particle.x > particle.size * 10) {
          particle.x -= 10;
        }
        if (
          mouse.y < particle.y &&
          particle.y < props.windowSize.height - particle.size * 10
        ) {
          particle.y += 10;
          particle.directionY = -particle.directionY

        }
        if (mouse.y > particle.y && particle.y > particle.size * 10) {
          particle.y -= 10;
        }
      }


    }

    // // Interaction with bouncing element
    // if (props.bounceElement) {
    //   const box = props.bounceElement;
    //   // Check if particle colides with box
    //   if (
    //     particle.x <= box.x + box.width && // right edge
    //     particle.x + particle.size >= box.x && // left edge
    //     particle.y <= box.y + box.height && // bottom edge
    //     particle.y + particle.size >= box.y // top edge
    //   ) {
    //     // Bounce from box (angle depends on side touched)
    //     if (
    //       particle.x - particle.directionX > box.x + box.width || // right edge
    //       particle.x + particle.size - particle.directionX < box.x // left edge
    //     ) {
    //       particle.directionX = -particle.directionX;
    //     } else {
    //       particle.directionY = -particle.directionY;
    //     }
    //   }
    // }

    // regular movement
    particle.x += particle.directionX;
    particle.y += particle.directionY;

    return particle;
  };

  const currentFrameParticle = { ...props };
  const nextFrameParticle = getNextFrameParticle(currentFrameParticle);
  props.onNewFrame(props.index, nextFrameParticle);


  // Drawing logic
  if (canvas !== null) {
    canvas.beginPath();
    // ctx.arc(x, y, radius, startAngle, endAngle [, counterclockwise]);
    canvas.arc(
      currentFrameParticle.x,
      currentFrameParticle.y,
      currentFrameParticle.size,
      0,
      Math.PI * 2,
      false
    );
    canvas.fillStyle = '#8C5523';
    canvas.fill();
  }

  // return null to prevent 'Component cannot be used as a JSX component' TypeScript error.
  return null;
};

export default AnimatedParticle;
