import { useContext } from 'react';
import { AnimatedParticleBaseProps, ConnectingLinesProps, Point, RectWithBoundingPoints } from '../../types';
import { Canvas2dContext } from './AnimatedCanvas';

const ConnectingLines = ({
  particlesArray,
  stickyElements
}: ConnectingLinesProps) => {
  const canvas = useContext(Canvas2dContext);

  if (!canvas || !particlesArray) return null;

  // const connectWithLine = (pointA: Point, pointB: Point, opacity: number, color: string) => {
  //   canvas.strokeStyle = 'rgba(140, 85, 31, ' + opacity + ')';
  //   canvas.lineWidth = 1;
  //   canvas.beginPath();
  //   canvas.moveTo(pointA.x, pointA.y);
  //   canvas.lineTo(pointB.x, pointB.y);
  //   canvas.stroke();
  // }

  const connectWithLine = (pointA: Point, pointB: Point, style: string) => {
    canvas.strokeStyle = style;
    canvas.lineWidth = 1;
    canvas.beginPath();
    canvas.moveTo(pointA.x, pointA.y);
    canvas.lineTo(pointB.x, pointB.y);
    canvas.stroke();
  }

  const getColorString = (r: number, g: number, b: number, opacity: number) => {
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  const calculateDistance = (pointA: Point, pointB: Point) => {
    return Math.sqrt(
      (pointA.x - pointB.x) ** 2 +
      (pointA.y - pointB.y) ** 2
    )
  }

  const linkWithDOMComponent = (box: RectWithBoundingPoints, particle: AnimatedParticleBaseProps) => {
    if (box.boundingPoints && box.width && box.height) {
      // const distanceToCenter = calculateDistance(particle, box.boundingPoints.center);
      const boxField = 220;
      // const opacity = 1 - (distanceToCenter * 100) / boxField / boxField;

      // if (
      //   distanceToCenter <
      //   (Math.max(box.width, box.height) * 1.4142135) / 2 + boxField // A cheaper way estimating the maximum diagonal avoiding an expensive sqrt()
      // ) {
      //   const opacity = 1 - (distanceToCenter * 100) / boxField / boxField;
      //   const style = getColorString(140, 85, 31, opacity);
      //   connectWithLine(particle, box.boundingPoints.center, style);
      // }


      // limit the area to calculate particle distances to improve performance
      if (particle.x > box.left - boxField && particle.x < box.right + boxField && particle.y > box.top - boxField && particle.y < box.bottom + boxField) {

        // Divide box in sectors

        const getPointFromCoordinate = (xOrY: 'x' | 'y', providedCoord: number, referencePoint: Point, slope: number) => {
          // y = slope * x + b
          const b = referencePoint.y - slope * referencePoint.x;
          let pointInLine = { x: 0, y: 0 };
          if (xOrY == 'x') {
            pointInLine = { x: providedCoord, y: slope * providedCoord + b };
          }
          else if (xOrY == 'y') {
            pointInLine = { x: (providedCoord - b) / slope, y: providedCoord };
          }
          return pointInLine;
        }

        const getSlope = (pointA: Point, pointB: Point): number => {
          return (pointB.y - pointA.y) / (pointB.x - pointA.x);
        }

        // const getIntersection = (point1, slope1, point2, slope2) => {
        //   // y = x * slope1 + b
        //   // y = x * slope2 + c
        //   // x * slope1 + b =  x * slope2 + c
        //   // x * slope1 - x * slope2 = c - b
        //   // x * (slope1 - slope2) = c - b
        //   // x = (c - b) / (slope1 - slope2)

        //   const b = point1.y / (point1.x * slope1);
        //   const c = point2.y / (point2.x * slope2);
        //   const x = (c - b) / (slope1 - slope2);
        //   const y = x * slope1 + b;

        //   return { x: x, y: y };
        // }

        // Lines between bounding points and opposite box corners
        const slopeVertical = getSlope(box.boundingPoints.bottom, { x: box.right, y: box.top });
        const slopeHorizontal = getSlope(box.boundingPoints.left, { x: box.right, y: box.top });

        // Auxiliary lines just for development
        // const drawAuxiliaryLine = (pointA: Point, pointB: Point, style: string) => {
        //   canvas.strokeStyle = style
        //   canvas.lineWidth = 1;
        //   canvas.beginPath();
        //   canvas.moveTo(pointA.x, pointA.y);
        //   canvas.lineTo(pointB.x, pointB.y);
        //   canvas.stroke();
        // }
        // drawAuxiliaryLine(box.boundingPoints.bottom, { x: box.right, y: box.top }, getColorString(0, 255, 255, 0.5));
        // drawAuxiliaryLine(box.boundingPoints.bottom, { x: box.left, y: box.top }, getColorString(0, 255, 255, 0.5));
        // drawAuxiliaryLine(box.boundingPoints.top, { x: box.right, y: box.bottom }, getColorString(255, 0, 0, 0.5));
        // drawAuxiliaryLine(box.boundingPoints.top, { x: box.left, y: box.bottom }, getColorString(255, 0, 0, 0.5));
        // drawAuxiliaryLine(box.boundingPoints.right, { x: box.left, y: box.top }, getColorString(0, 255, 0, 0.5));
        // drawAuxiliaryLine(box.boundingPoints.right, { x: box.left, y: box.bottom }, getColorString(0, 255, 0, 0.5));
        // drawAuxiliaryLine(box.boundingPoints.left, { x: box.right, y: box.top }, getColorString(255, 0, 255, 0.5));
        // drawAuxiliaryLine(box.boundingPoints.left, { x: box.right, y: box.bottom }, getColorString(255, 0, 255, 0.5));



        // the checks to particle position relative to box borders is added to reduce unnecessary calculations
        // if the particle is above the two diagonals
        if (particle.y < box.top &&
          particle.y < getPointFromCoordinate('x', particle.x, box.boundingPoints.bottom, slopeVertical).y
          && particle.y < getPointFromCoordinate('x', particle.x, box.boundingPoints.bottom, -slopeVertical).y
        ) {
          const opacity = 1 - (calculateDistance(particle, box.boundingPoints.bottom) * 100) / boxField / boxField;
          const style = getColorString(0, 255, 255, opacity);
          // particle.color = getColorString(0, 255, 255, 0.5)
          // connectWithLine(particle, box.boundingPoints.bottom, style);
          connectWithLine(particle, getPointFromCoordinate('y', box.top, particle, getSlope(particle, box.boundingPoints.bottom)), style);
        }
        // if the particle is below the two diagonals
        else if (particle.y > box.bottom &&
          particle.y > getPointFromCoordinate('x', particle.x, box.boundingPoints.top, -slopeVertical).y
          && particle.y > getPointFromCoordinate('x', particle.x, box.boundingPoints.top, +slopeVertical).y
        ) {
          const opacity = 1 - (calculateDistance(particle, box.boundingPoints.top) * 100) / boxField / boxField;
          const style = getColorString(255, 0, 0, opacity);
          // connectWithLine(particle, box.boundingPoints.top, style);
          connectWithLine(particle, getPointFromCoordinate('y', box.bottom, particle, getSlope(particle, box.boundingPoints.top)), style);
        }
        // if the particle is to the left of the two diagonals
        else if (particle.x < box.left &&
          particle.x < getPointFromCoordinate('y', particle.y, box.boundingPoints.right, -slopeHorizontal).x
          && particle.x < getPointFromCoordinate('y', particle.y, box.boundingPoints.right, slopeHorizontal).x
        ) {
          const opacity = 1 - (calculateDistance(particle, box.boundingPoints.right) * 100) / boxField / boxField;
          const style = getColorString(0, 255, 0, opacity);
          // connectWithLine(particle, box.boundingPoints.right, style);
          connectWithLine(particle, getPointFromCoordinate('x', box.left, particle, getSlope(particle, box.boundingPoints.right)), style);
        }
        // if the particle is to the right of the two diagonals
        else if (particle.x > box.right &&
          particle.x > getPointFromCoordinate('y', particle.y, box.boundingPoints.left, -slopeHorizontal).x
          && particle.x > getPointFromCoordinate('y', particle.y, box.boundingPoints.left, slopeHorizontal).x
        ) {
          const opacity = 1 - (calculateDistance(particle, box.boundingPoints.left) * 100) / boxField / boxField;
          const style = getColorString(255, 0, 255, opacity);
          // connectWithLine(particle, box.boundingPoints.left, style);
          connectWithLine(particle, getPointFromCoordinate('x', box.right, particle, getSlope(particle, box.boundingPoints.left)), style);
        }
        // else {
        //   const style = getColorString(0, 0, 0, 1);
        //   connectWithLine(particle, box.boundingPoints.center, style);
        // }

        // if the particle is both above the two diagonals and about the top of the box
        // if (particle.y < yInLine1 && particle.y < yInLine2 && particle.y < box.top) {
        //   const style = getColorString(0, 255, 255, 0.04);
        //   connectWithLine(particle, box.boundingPoints.bottom, style);
        // }
        // // if the particle is both below the two diagonals and below the bottom of the box
        // else if (particle.y > yInLine1 && particle.y > yInLine2 && particle.y > box.bottom) {
        //   const style = getColorString(0, 0, 255, 0.04);
        //   connectWithLine(particle, box.boundingPoints.top, style);
        // }
        // // if the particle is both to the left of the two diagonals and to the left of the left side of the box
        // else if (particle.x < xInLine1 && particle.x < xInLine2 && particle.x < box.left) {
        //   const style = getColorString(0, 255, 0, 0.04);
        //   connectWithLine(particle, box.boundingPoints.right, style);
        // }
        // // if the particle is both to the right of the two diagonals and to the right of the right side of the box
        // else if (particle.x > xInLine1 && particle.x > xInLine2 && particle.x > box.right) {
        //   const style = getColorString(255, 0, 255, 0.04);
        //   connectWithLine(particle, box.boundingPoints.left, style);
        // }

        // else {
        //   const style = getColorString(255, 0, 0, 1);
        //   connectWithLine(particle, box.boundingPoints.center, style);
        // }
      }
    }
  }

  // const linkWithEachOther = (pointA: Point, pointB: Point) => {
  const linkWithEachOther = (pointA: AnimatedParticleBaseProps, pointB: AnimatedParticleBaseProps) => {

    const distance = calculateDistance(pointA, pointB)
    const maxDistance = 85;

    if (distance < maxDistance) {
      const opacity = 1 - distance / maxDistance;
      const style = getColorString(140, 85, 31, opacity);
      connectWithLine(pointA, pointB, style)
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



