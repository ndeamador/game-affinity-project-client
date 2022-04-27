import { useContext } from 'react';
import { SquidParticleBaseProps, WindowSize } from '../../types';
import { Canvas2dContext } from './AnimatedCanvas';

const ConnectingLines = ({
  particlesArray,
  windowSize
}: {
  particlesArray: SquidParticleBaseProps[];
  windowSize: WindowSize
}) => {
  const canvas = useContext(Canvas2dContext);
  if (!canvas) return null;

  // Connecting lines
  for (let a = 0; a < particlesArray.length; a++) {
    for (let b = 0; b < particlesArray.length; b++) {
      const distance =
        (particlesArray[a].x - particlesArray[b].x) *
          (particlesArray[a].x - particlesArray[b].x) +
        (particlesArray[a].y - particlesArray[b].y - particlesArray[b].y);
      if (distance < (windowSize.width / 7) * (windowSize.height / 7)) {
        canvas.strokeStyle = 'rgba(140, 85, 31, 1)';
        canvas.lineWidth = 1;
        canvas.beginPath();
        canvas.moveTo(particlesArray[a].x, particlesArray[a].y);
        canvas.lineTo(particlesArray[b].x, particlesArray[b].y);
        canvas.stroke();
      }
    }
  }
  return null;
};

export default ConnectingLines;
