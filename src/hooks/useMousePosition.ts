import { useEffect, useRef } from 'react';
import { MousePositionProps } from '../types';

const useMousePosition = () => {
  // Done with useRef instead of useState (useState was causing additional re-renders on mouse move that accelerated the animations and choked performance).
  const mousePosition = useRef<MousePositionProps>({ x: null, y: null });

  useEffect(() => {
    window.addEventListener('mousemove', (event) => {
      mousePosition.current = { x: event.x, y: event.y };
    });
  });

  useEffect(() => {
    window.addEventListener('mouseout', () => {
      mousePosition.current = { x: null, y: null };
    });
  });

  return mousePosition.current;
}

export default useMousePosition;