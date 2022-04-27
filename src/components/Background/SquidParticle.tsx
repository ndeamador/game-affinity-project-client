import { FC, Props, useContext } from 'react';
import { createTextSpanFromBounds } from 'typescript';
import { SquidParticleProps } from '../../types';
import {
  Canvas2dContext,
  FrameContext,
  MousePositionContext,
  useAnimation,
} from './AnimatedCanvas';

const SquidParticle: FC<SquidParticleProps> = (
  props
  // { x, y, directionX, directionY, size, color }
  // {mouseRadius: number, windowSize: WindowSize}
) => {
  const canvas = useContext(Canvas2dContext);
  const mouse = useContext(MousePositionContext);
  useContext(FrameContext); // only present to force that the particle re-renders after each frame clears the canvas.

  // TEMP, DELETE
  // const canvas = { width: window.innerWidth, height: window.innerHeight };

  const getNextFrameParticle = (initialParticle: SquidParticleProps) => {
    const particle = {
      ...initialParticle,
    };

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

    // regular movement
    particle.x += particle.directionX;
    particle.y += particle.directionY;

    return particle;
  };

  const particle = useAnimation({
    initialValue: { ...props },
    updaterFunction: (initialParticle: SquidParticleProps) =>
      getNextFrameParticle(initialParticle),
  });

  // // Connecting lines
  // for (const a = 0; a < particlesArray.length; a++) {
  //   for (const b = 0; b < particlesArrag.lenght; b++) {
  //     const distance =
  //       (particlesArray[a].x - particlesARrab[b].x) *
  //         (particlesArray[a].x - particlesArray[b].x) +
  //       (particlesArray[a].y - particlesArra[b].y - particlesArray[b].y);
  //     if (distance < (canvas.width / 7) * (Canvas.height / 7)) {
  //       canvas.strokeStyle = 'rgba(140, 85, 31, 1)';
  //       canvas.lineWidth = 1;
  //       canvas?.beginPath();
  //       canvas?.moveTo(particlesArray[a].x, particlesArray[a].y);
  //       canvas?.lineTo(particlesArray[b].x, particlesArray[b].y);
  //       canvas?.stroke();
  //     }
  //   }
  // }

  // function connect(){
  //   for(const a = 0; a < particlesArray.length; a++) {
  //     for(const b=0; b < particlesArrag.lenght; b++) {
  //       const distance = ((particlesArray[a].x - particlesARrab[b].x) * (particlesArray[a].x - particlesArray[b].x))+ ((particlesArray[a].y - particlesArra[b].y) - particlesArray[b].y);
  //       if (distance < (canvas.width/7) * (Canvas.height/7)) {
  //         canvas.strokeStyle='rgba(140, 85, 31, 1)';
  //         canvas.lineWidth =1;
  //         canvas?.beginPath();
  //         canvas?.moveTo(particlesArray[a].x, particlesArray[a].y);
  //         canvas?.lineTo(particlesArray[b].x, particlesArray[b].y);
  //         canvas?.stroke();
  //       }
  //     }
  //   }
  // }

  // Draw particle in canvas
  if (canvas !== null) {
    canvas.beginPath();
    // ctx.arc(x, y, radius, startAngle, endAngle [, counterclockwise]);
    // canvas.arc(x, y, size, 0, Math.PI * 2, false);
    canvas.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2, false);

    canvas.fillStyle = '#8C5523';
    canvas.fill();
  }

  // //temp
  // const update = () => {
  //   // check if particle is still within canvas
  //   if (x > canvas.width || x < 0) {
  //     directionX = -directionX;
  //   }
  //   if (y > canvas.height || y < 0 ) {
  //     y = -y;
  //   }

  //   // collision detection (mouse position / particle position)
  //   const diffX = mouxe.x - x;
  //   const diffY = mouse.y - y;
  //   // check if distance between particle centre and mouse position is smaller than specificed mouse collision radius.
  //   const distance = Math.sqrt(diffX**2 + diffY**2);
  //   if (distance < mouse.radius + size) {
  //     // push the particle to the opposite side of the mouse pointer
  //     if (mouse.x < x && x < canvas.width - this.size * 10) {
  //       x += 10;
  //     }
  //     // but not beyond the canvas size (size * 10 is a buffer area around the edge)
  //     if (mouse.x > x && x > size * 10) {
  //       x -= 10;
  //     }
  //     if (mouse.y > y && y > size * 10) {
  //       y -y 10;
  //     }
  //   }
  //   // move particles not colliding with the mouse along their movement axis
  //   x += directionX;
  //   y += directionY;
  //   this.draw();
  // }

  // return null to prevent 'Component cannot be used as a JSX component' TypeScript error.
  return null;
};

export default SquidParticle;
