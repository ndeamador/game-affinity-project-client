import { useContext } from 'react';
import { ConnectingLinesProps, Point, RectWithBoundingPoints } from '../../types';
import { Canvas2dContext } from './AnimatedCanvas';

const ConnectingLines = ({
  particlesArray,
  stickyElements
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

  const linkWithDOMComponent = (bounceElement: RectWithBoundingPoints, particle: Point) => {
    if (bounceElement.boundingPoints && bounceElement.width && bounceElement.height) {
      const distanceToCenter = calculateDistance(particle, bounceElement.boundingPoints.center);
      const boxField = 160;
      if (
        distanceToCenter <
        (Math.max(bounceElement.width, bounceElement.height) * 1.4142135) / 2 + boxField // A cheaper way estimating the maximum diagonal avoiding an expensive sqrt()
      ) {
        const opacity = 1 - (distanceToCenter * 100) / boxField / boxField;
        connectWithLine(particle, bounceElement.boundingPoints.center, opacity);
      }
    }
  }

  const linkWithEachOther = (pointA: Point, pointB: Point) => {
    const distance = calculateDistance(pointA, pointB)
    const maxDistance = 85;

    if (distance < maxDistance) {
      const opacity = 1 - distance / maxDistance;
      connectWithLine(pointA, pointB, opacity)
    }
  }

  for (let a = 0; a < particlesArray.length; a++) {
    if (stickyElements) {
      Object.values(stickyElements).forEach(element => linkWithDOMComponent(element, particlesArray[a]))
    }

    for (let b = 0; b < particlesArray.length; b++) {
      linkWithEachOther(particlesArray[a], particlesArray[b])
    }
  }
  return null;
};

export default ConnectingLines;



