import { useEffect, useRef, useState } from 'react';
import { nanoid } from 'nanoid'; // Id generator to avoid using .map index as keys, which is an antipattern.
import AnimatedCanvas from './AnimatedCanvas';
import SquidParticle from './SquidParticle';
import getRandomParticles from '../../utils/getRandomParticles';

const Background = () => {
  // const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });


  console.log('background: ', window.innerHeight, window.innerWidth);

  return (
    <AnimatedCanvas>
      {getRandomParticles(window.innerWidth, window.innerHeight).map(
        (particle) => (
          <SquidParticle
            key={nanoid()}
            {...particle}
          />
        )
      )}
    </AnimatedCanvas>
  );
};

export default Background;

// import { useEffect, useRef, useState } from 'react';
// import { nanoid } from 'nanoid'; // Id generator to avoid using .map index as keys, which is an antipattern.
// import SquidParticle from './SquidParticle';
// import { SquidParticleProps } from '../../types';
// import getRandomParticles from '../../utils/getRandomParticles';

// const Background = () => {
//   // Access the canvas DOM node
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);

//   const [renderingContext, setRenderingContext] = useState<
//     CanvasRenderingContext2D | null | undefined
//   >(null);
//   const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [mouseRadius, setMouseRadius] = useState(0);
//   const [frameCount, setFrameCount] = useState(0);
//   const [currentParticles, setCurrentParticles] = useState<
//     SquidParticleProps[]
//   >([]);
//   // const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

//   // console.log('window inner:', window.innerWidth, window.innerHeight);
//   // window.addEventListener('resize', () => {
//   //   setWindowSize({width: window.innerWidth, height: window.innerHeight});
//   //   /* console.log('size:' , window.innerWidth, window.innerHeight) */
//   // });

//   // Initialize Canvas
//   useEffect(
//     () => {
//       // console.log('resizeinner:', windowSize);

//       if (!canvasRef.current) return;
//       const current = canvasRef.current;
//       const canvas2DContext = current.getContext('2d');
//       // const context = canvasRef.current?.getContext('2d');
//       // if (!context) return;

//       // Set canvas "resolution"
//       // https://stackoverflow.com/questions/4938346/canvas-width-and-height-in-html5
//       current.width = window.innerWidth;
//       current.height = window.innerHeight;

//       setRenderingContext(canvas2DContext);
//       setCanvasSize({
//         width: current.width,
//         height: current.height,
//       });
//       setMouseRadius((current.height / 80) * (current.width / 80));
//       setCurrentParticles(
//         getRandomParticles(canvasSize.width, canvasSize.height)
//       );
//     },
//     [
//       /* windowSize */
//       // change so that it gets called when resizing the window
//     ]
//   );

//   // make component and context re-render at every frame
//   useEffect(() => {
//     const frameId = requestAnimationFrame(() => {
//       setFrameCount(frameCount + 1);
//     });
//     // for (let i = 0; i < currentParticles.length; i++) {
//     //   currentParticles[i];
//     // }
//     return () => {
//       cancelAnimationFrame(frameId);
//     };
//   }, [/* frameCount, */ setFrameCount]);

//   // clear canvas with each render to erase previous frame
//   if (renderingContext !== null) {
//     // console.log('here: ', renderingContext);
//     renderingContext?.clearRect(0, 0, window.innerWidth, window.innerHeight);
//   }

//   // useEffect(() => {
//   //   window.addEventListener('mousemove', (event) => {
//   //     setMousePosition({x: event.x, y: event.y})
//   //   })
//   // }, [setMousePosition])
//   // console.log('mousepos:', mousePosition.x, mousePosition.y);

//   console.log('framecount: ', frameCount);
//   console.log('CURRENTPART: ', currentParticles);

//   return (
//     <canvas id='background' ref={canvasRef}>
//       {/* {getRandomParticles(canvasSize.width, canvasSize.height).map((particle) => ( */}
//         {currentParticles.map((particle) => (
//         <SquidParticle
//           context={renderingContext}
//           key={nanoid()}
//           // frameId={frameCount}
//           {...particle}
//         />
//       ))}
//     </canvas>
//   );
// };

// export default Background;
