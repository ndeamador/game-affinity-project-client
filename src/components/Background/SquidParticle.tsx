import { FC, Props, useContext } from 'react';
import { SquidParticleProps } from '../../types';
import { Canvas2dContext, FrameContext, useAnimation } from './AnimatedCanvas';

// const SquidParticle = ({
//   // context,
//   x,
//   y,
//   directionX,
//   directionY,
//   size,
//   color,
// }: // frameId
// {
//   // context: any;
//   x?: any;
//   y?: any;
//   directionX?: any;
//   directionY?: any;
//   size?: any;
//   color?: any;
//   // frameId?: any;
// }) => {

const SquidParticle: FC<SquidParticleProps> = (
  props
  // { x, y, directionX, directionY, size, color }
) => {
  const canvasContext = useContext(Canvas2dContext);
  useContext(FrameContext); // only present to force that the particle re-renders after each frame clears the canvas.

  // TEMP, DELETE
  const canvas = { width: window.innerWidth, height: window.innerHeight };

  const updateParticle = (initialParticle: SquidParticleProps) => {
    const updatedParticle = {
      ...initialParticle,
    };

    // check if particle is still within canvas and reverse direction if at the limit
    if (updatedParticle.x > canvas.width || updatedParticle.x < 0) {
      updatedParticle.directionX = -updatedParticle.directionX;
    }
    if (updatedParticle.y > canvas.height || updatedParticle.y < 0) {
      // console.log('checking canvas height', canvas.height ,'particle y:', updatedParticle.y);
      updatedParticle.directionY = -updatedParticle.directionY;
      // console.log('afterupdate:', updated.particle.y);
    }

    // regular movement (not colliding with mouse, edges)
    updatedParticle.x += updatedParticle.directionX;
    updatedParticle.y += updatedParticle.directionY;

    return updatedParticle;
  };

  const updatedParticle = useAnimation({
    initialValue: { ...props },
    // updaterFunction: updateParticle(),
    updaterFunction: (initialParticle: SquidParticleProps) =>
      updateParticle(initialParticle),
  });

  // const updatedParticle = useAnimation({
  //   initialValue: directionX,
  //   // updaterFunction: updateParticle(),
  //   updaterFunction: (direction: any) => direction + 10,
  // });

  // Draw particle in canvas
  if (canvasContext !== null) {
    canvasContext.beginPath();
    // ctx.arc(x, y, radius, startAngle, endAngle [, counterclockwise]);
    // canvasContext.arc(x, y, size, 0, Math.PI * 2, false);
    canvasContext.arc(
      updatedParticle.x,
      updatedParticle.y,
      updatedParticle.size,
      0,
      Math.PI * 2,
      false
    );

    canvasContext.fillStyle = '#8C5523';
    canvasContext.fill();
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
