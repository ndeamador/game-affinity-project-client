import { AnimatedParticleBaseProps, ConnectingLinesProps, Point, RectWithBoundingPoints } from 'types';

const ConnectingLines = ({
  particlesArray,
  stickyElements,
  renderingContext: canvas,
}: ConnectingLinesProps) => {

  if (!canvas || !particlesArray) return null;

  for (let a = 0; a < particlesArray.length; a++) {
    if (stickyElements) {
      Object.values(stickyElements).forEach(element => linkWithDOMComponent(element, particlesArray[a], canvas))
    }
    for (let b = 0; b < particlesArray.length; b++) {
      linkWithEachOther(particlesArray[a], particlesArray[b], 85, canvas)
    }
  }
  return null;
};

export default ConnectingLines;


const greyShadow = 255;


const getColorString = (r: number, g: number, b: number, opacity: number) => {
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

const calculateDistance = (pointA: Point, pointB: Point) => {
  // Math.floor is not necessary but it might improve performance. https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas
  return Math.floor(Math.sqrt(
    (pointA.x - pointB.x) ** 2 +
    (pointA.y - pointB.y) ** 2
  ))
  // could use hypot instead of sqrt, but it's more precise and therefore slower.
  // return Math.floor(Math.hypot((pointA.x - pointB.x), (pointA.y - pointB.y)))
}

const getSlope = (pointA: Point, pointB: Point): number => {
  return (pointB.y - pointA.y) / (pointB.x - pointA.x);
}

const connectWithLine = (pointA: Point, pointB: Point, style: string, lineWidth: number, canvas: CanvasRenderingContext2D) => {
  canvas.strokeStyle = style;
  canvas.lineWidth = lineWidth;
  canvas.beginPath();
  canvas.moveTo(pointA.x, pointA.y);
  canvas.lineTo(pointB.x, pointB.y);
  canvas.stroke();
}

const linkWithEachOther = (pointA: AnimatedParticleBaseProps, pointB: AnimatedParticleBaseProps, maxDistance: number, canvas: CanvasRenderingContext2D) => {

  // Avoid the calculation is the particle is obviously far (only for performance)
  if (Math.abs(pointA.x - pointB.x) > maxDistance || Math.abs(pointA.y - pointB.y) > maxDistance) return;

  const distance = calculateDistance(pointA, pointB)

  if (distance < maxDistance) {
    const opacity = 1 - distance / maxDistance;
    const style = getColorString(greyShadow, greyShadow, greyShadow, opacity);
    connectWithLine(pointA, pointB, style, 4, canvas)
  }
}

const linkWithDOMComponent = (box: RectWithBoundingPoints, particle: AnimatedParticleBaseProps, canvas: CanvasRenderingContext2D) => {
  if (box.boundingPoints && box.width && box.height) {
    const boxField = 250;

    // limit the area to calculate particle distances to improve performance
    if (particle.x > box.left - boxField && particle.x < box.right + boxField && particle.y > box.top - boxField && particle.y < box.bottom + boxField) {

      const getPointFromCoordinate = (xOrY: 'x' | 'y', providedCoord: number, referencePoint: Point, slope: number) => {
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
        const style = getColorString(greyShadow, greyShadow, greyShadow, opacity);
        connectWithLine(particle, getPointFromCoordinate('y', box.top, particle, getSlope(particle, box.boundingPoints.bottom)), style, 6, canvas);
      }
      // if the particle is below the two diagonals
      else if (particle.y > box.bottom &&
        particle.y > getPointFromCoordinate('x', particle.x, box.boundingPoints.top, -slopeVertical).y
        && particle.y > getPointFromCoordinate('x', particle.x, box.boundingPoints.top, +slopeVertical).y
      ) {
        const opacity = 1 - (calculateDistance(particle, box.boundingPoints.top) * 100) / boxField / boxField;
        const style = getColorString(greyShadow, greyShadow, greyShadow, opacity);
        connectWithLine(particle, getPointFromCoordinate('y', box.bottom, particle, getSlope(particle, box.boundingPoints.top)), style, 6, canvas);

      }
      // if the particle is to the left of the two diagonals
      else if (particle.x < box.left &&
        particle.x < getPointFromCoordinate('y', particle.y, box.boundingPoints.right, -slopeHorizontal).x
        && particle.x < getPointFromCoordinate('y', particle.y, box.boundingPoints.right, slopeHorizontal).x
      ) {
        const opacity = 1 - (calculateDistance(particle, box.boundingPoints.right) * 100) / boxField / boxField;
        const style = getColorString(greyShadow, greyShadow, greyShadow, opacity);
        connectWithLine(particle, getPointFromCoordinate('x', box.left, particle, getSlope(particle, box.boundingPoints.right)), style, 6, canvas);
      }
      // if the particle is to the right of the two diagonals
      else if (particle.x > box.right &&
        particle.x > getPointFromCoordinate('y', particle.y, box.boundingPoints.left, -slopeHorizontal).x
        && particle.x > getPointFromCoordinate('y', particle.y, box.boundingPoints.left, slopeHorizontal).x
      ) {
        const opacity = 1 - (calculateDistance(particle, box.boundingPoints.left) * 100) / boxField / boxField;
        const style = getColorString(greyShadow, greyShadow, greyShadow, opacity);
        connectWithLine(particle, getPointFromCoordinate('x', box.right, particle, getSlope(particle, box.boundingPoints.left)), style, 6, canvas);
      }
    }
  }
}