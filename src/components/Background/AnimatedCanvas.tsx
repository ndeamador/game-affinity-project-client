import { createContext, useEffect, useRef, useState } from 'react';
import useWindowSize from '../../hooks/useWindowSize';
import { MousePositionProps } from '../../types';



const AnimatedCanvas = ({ children }: { children?: React.ReactNode }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [renderingContext, setRenderingContext] =
    useState<CanvasRenderingContext2D | null>(null);
  const [mousePosition, setMousePosition] = useState<MousePositionProps>({ x: null, y: null });
  const [frameCount, setFrameCount] = useState(0);
  const windowSize = useWindowSize();

  // Initialize Canvas
  useEffect(() => {
    if (!canvasRef.current) return;
    const current = canvasRef.current;
    const canvas2DContext = current.getContext('2d');
    setRenderingContext(canvas2DContext);

    // Set canvas "resolution"
    // https://stackoverflow.com/questions/4938346/canvas-width-and-height-in-html5
    current.width = windowSize.width;
    current.height = windowSize.height;
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

  useEffect(() => {
    window.addEventListener('mousemove', (event) => {
      setMousePosition({ x: event.x, y: event.y });
    });
  }, [setMousePosition]);

  useEffect(() => {
    window.addEventListener('mouseout', () => {
      setMousePosition({ x: null, y: null });
    });
  }, [setMousePosition]);

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
export const MousePositionContext = createContext<MousePositionProps>({ x: null, y: null });
export const Canvas2dContext = createContext<CanvasRenderingContext2D | null>(
  null
);

// check that ref resets if component unmounts (declaring ref out of component)
export const useAnimation = <T, >({
  initialValue,
  updaterFunction,
}: {
  initialValue: T;
  updaterFunction: (initialValue: T) => T;
}) => {
  const animationRef = useRef(initialValue);
  animationRef.current = updaterFunction(animationRef.current);
  return animationRef.current;
};
