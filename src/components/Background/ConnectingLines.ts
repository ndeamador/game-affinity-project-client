import { props } from 'cypress/types/bluebird';
import { useContext } from 'react';
import { ConnectingLinesProps, Point } from '../../types';
import { Canvas2dContext } from './AnimatedCanvas';

const ConnectingLines = ({
  particlesArray,
  stickyElement
}: ConnectingLinesProps) => {
  const canvas = useContext(Canvas2dContext);
  if (!canvas || !particlesArray) return null;

  const connectWithLine = (pointA: Point, pointB: Point, opacity: number) => {
    canvas.strokeStyle = 'rgba(140, 85, 31, ' + opacity + ')';
    canvas.lineWidth = 1;
    canvas.beginPath();
    canvas.moveTo(pointA.x, pointA.y);
    canvas.lineTo(pointB.x, pointB.y);
    canvas.stroke();
  }

  const calculateDistance = (pointA: Point, pointB: Point) => {
    return Math.sqrt(
      (pointA.x - pointB.x) ** 2 +
      (pointA.y - pointB.y) ** 2
    )
  }

  const linkWithDOMComponent = (bounceElement: DOMRect | undefined, particle: Point) => {
    if (bounceElement) {
      const box = bounceElement;
      const boxCenter = {
        x: bounceElement.x + bounceElement.width / 2,
        y: bounceElement.y + bounceElement.height / 2,
      };
      const distanceToCenter = calculateDistance(particle, boxCenter);
      const boxField = 160;
      if (
        distanceToCenter <
        (Math.max(box.width, box.height) * 1.4142135) / 2 + boxField // A cheaper way estimating the maximum diagonal avoiding an expensive sqrt()
      ) {
        const opacity = 1 - (distanceToCenter * 100) / boxField / boxField;
        connectWithLine(particle, boxCenter, opacity);
      }
    }
  }

  const linkWithEachOther = (pointA: Point, pointB: Point) => {
    const distance = calculateDistance(pointA, pointB)
    if (distance < 75) {
      connectWithLine(pointA, pointB, 0.1)
    }
  }



  for (let a = 0; a < particlesArray.length; a++) {
    linkWithDOMComponent(stickyElement, particlesArray[a]);

    for (let b = 0; b < particlesArray.length; b++) {
      linkWithEachOther(particlesArray[a], particlesArray[b])
    }
  }
  return null;
};

export default ConnectingLines;



