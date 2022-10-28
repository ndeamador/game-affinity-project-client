import { useEffect, useState } from 'react';
import { WindowSize } from 'types';


const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<WindowSize>({ width: 0, height: 0, scrollWidth: 0, scrollHeight: 0 });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
        scrollWidth: document.body.scrollWidth,
        scrollHeight: document.body.scrollHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

export default useWindowSize;