import { FC, useContext } from 'react';
import { SquidParticleProps } from '../../types';
import {
  Canvas2dContext,
  FrameContext,
  MousePositionContext,
  useAnimation,
} from './AnimatedCanvas';

const SquidParticle: FC<SquidParticleProps> = (props) => {
  const canvas = useContext(Canvas2dContext);
  const mouse = useContext(MousePositionContext);
  useContext(FrameContext); // only present to force that the particle re-renders after each frame clears the canvas.

  const getNextFrameParticle = (initialParticle: SquidParticleProps): SquidParticleProps => {
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

    if (mouse.x && mouse.y) {
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
          // particle.directionY = -particle.directionY;
          // particle.directionX = -particle.directionX;
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
          // particle.directionY = -particle.directionY;
          // particle.directionX = -particle.directionX;
        }
        if (mouse.y > particle.y && particle.y > particle.size * 10) {
          particle.y -= 10;
        }
      }
    }

    // Interaction with bouncing element
    if (props.bounceElement) {
      const box = props.bounceElement;
      const boxCenter = {
        x: props.bounceElement.x + props.bounceElement.width / 2,
        y: props.bounceElement.y + props.bounceElement.height / 2,
      };
      const distanceToCenter = Math.sqrt(
        (particle.x - boxCenter.x) ** 2 + (particle.y - boxCenter.y) ** 2
      );
      const boxField = 160;

      // Check if particle colides with box
      if (
        particle.x <= box.x + box.width && // right edge
        particle.x + particle.size >= box.x && // left edge
        particle.y <= box.y + box.height && // bottom edge
        particle.y + particle.size >= box.y // top edge
      ) {
        // Bounce from box (angle depends on side touched)
        if (
          particle.x - particle.directionX > box.x + box.width || // right edge
          particle.x + particle.size - particle.directionX < box.x // left edge
        ) {
          particle.directionX = -particle.directionX;
        } else {
          particle.directionY = -particle.directionY;
        }
      }

      // Connect nearby particles with lines
      if (
        // particle.x <= box.x + box.width + boxField && // right edge
        // particle.x + particle.size + boxField >= box.x && // left edge
        // particle.y <= box.y + box.height + boxField && // bottom edge
        // particle.y + particle.size + boxField >= box.y // top edge
        distanceToCenter <
        (Math.max(box.width, box.height) * 1.4142135) / 2 + boxField // A cheaper way estimating the maximum diagonal avoiding an expensive sqrt()
      ) {
        const opacity = 1 - (distanceToCenter * 100) / boxField / boxField;

        if (canvas != null) {
          canvas.strokeStyle = 'rgba(140, 85, 31, ' + opacity + ')';
          canvas.lineWidth = 1;
          canvas.beginPath();
          canvas.moveTo(particle.x, particle.y);
          canvas.lineTo(boxCenter.x, boxCenter.y);
          canvas.stroke();
        }
      }
    }

    // regular movement
    particle.x += particle.directionX;
    particle.y += particle.directionY;

    return particle;
  };

  const particle = useAnimation({
    initialValue: { ...props },
    updaterFunction: (initialParticle: SquidParticleProps): SquidParticleProps =>
      getNextFrameParticle(initialParticle),
  }) as SquidParticleProps;

  // Draw particle in canvas
  if (canvas !== null) {
    canvas.beginPath();
    // ctx.arc(x, y, radius, startAngle, endAngle [, counterclockwise]);
    canvas.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2, false);
    canvas.fillStyle = '#8C5523';
    canvas.fill();
  }

  // return null to prevent 'Component cannot be used as a JSX component' TypeScript error.
  return null;
};

export default SquidParticle;
