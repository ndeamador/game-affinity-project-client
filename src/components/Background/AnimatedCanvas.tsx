import React, { useEffect, useRef, useState } from 'react';
import { AnimatedCanvasRenderingContext } from '../../types';

const AnimatedCanvas = ({
  children,
  dimensions,
}: {
  children?: React.ReactNode;
  dimensions: { width: number; height: number };
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [renderingContext, setRenderingContext] =
    useState<AnimatedCanvasRenderingContext>(null);
  const [frameCount, setFrameCount] = useState(0);

  // Initialize Canvas
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;

    // Set canvas "resolution"
    // https://stackoverflow.com/questions/4938346/canvas-width-and-height-in-html5
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;
    const canvas2DContext = canvas.getContext('2d');
    setRenderingContext(canvas2DContext);
  }, [dimensions]);

  // make component and context re-render at every frame
  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      setFrameCount(frameCount + 1);
    });

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [frameCount, setFrameCount]);

  // clear canvas with each render to erase previous frame
  if (renderingContext !== null) {
    renderingContext.clearRect(0, 0, dimensions.width, dimensions.height);
  }

  return (
    <canvas ref={canvasRef}>
      {/* Cloning element to pass props to children without having to use Context */}
      {React.cloneElement(children as React.ReactElement, {
        renderingContext: renderingContext,
        frameCount: frameCount,
      })}
    </canvas>
  );
};

export default AnimatedCanvas;
