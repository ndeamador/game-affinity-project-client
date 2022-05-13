/** @jsxImportSource @emotion/react */

import { createContext, useEffect, useRef, useState } from 'react';

const AnimatedCanvas = ({
  children,
  dimensions,
}: {
  children?: React.ReactNode;
  dimensions: { width: number; height: number };
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [renderingContext, setRenderingContext] =
    useState<CanvasRenderingContext2D | null>(null);
  const [frameCount, setFrameCount] = useState(0);

  // manually forced canvas size to adapt to scrollsize and not windowsize to prevent canvas to be cut when the scrollbar appears.
  const style = {
    // height: '100%',
    // width: '100%',
    width: dimensions.width,
    height: dimensions.height,
    // minWidth: dimensions.width,
    // minHeight: dimensions.height,
  };

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
    <Canvas2dContext.Provider value={renderingContext}>
      <FrameContext.Provider value={frameCount}>
        <canvas ref={canvasRef} css={style}>
          {children}
        </canvas>
      </FrameContext.Provider>
    </Canvas2dContext.Provider>
  );
};

export default AnimatedCanvas;

export const FrameContext = createContext<number>(0);
export const Canvas2dContext = createContext<CanvasRenderingContext2D | null>(
  null
);

// // Only useable for animated elements that don't depend on others.
// export const useAnimation = <T,>({
//   initialValue,
//   updaterFunction,
// }: {
//   initialValue: T;
//   updaterFunction: (initialValue: T) => T;
// }) => {
//   const animationRef = useRef(initialValue);
//   animationRef.current = updaterFunction(animationRef.current);
//   return animationRef.current;
// };
