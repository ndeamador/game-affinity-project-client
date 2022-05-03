import { createContext, useEffect, useRef, useState } from 'react';
import useMousePosition from '../../hooks/useMousePosition';
import useWindowSize from '../../hooks/useWindowSize';
import { MousePositionProps } from '../../types';

const AnimatedCanvas = ({ children }: { children?: React.ReactNode }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [renderingContext, setRenderingContext] =
    useState<CanvasRenderingContext2D | null>(null);
  const [frameCount, setFrameCount] = useState(0);
  const windowSize = useWindowSize();

  // Initialize Canvas
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const canvas2DContext = canvas.getContext('2d');
    setRenderingContext(canvas2DContext);

    // Set canvas "resolution"
    // https://stackoverflow.com/questions/4938346/canvas-width-and-height-in-html5
    canvas.width = windowSize.width;
    canvas.height = windowSize.height;
  }, [windowSize]);

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
    renderingContext.clearRect(0, 0, windowSize.width, windowSize.height);
  }

  const mousePosition = useMousePosition();

  return (
    <Canvas2dContext.Provider value={renderingContext}>
      <FrameContext.Provider value={frameCount}>
        <MousePositionContext.Provider value={mousePosition}>
          <canvas id='background' ref={canvasRef}>
            {children}
          </canvas>
        </MousePositionContext.Provider>
      </FrameContext.Provider>
    </Canvas2dContext.Provider>
  );
};

export default AnimatedCanvas;

export const FrameContext = createContext<number>(0);
export const MousePositionContext = createContext<MousePositionProps>({
  x: null,
  y: null,
});
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
