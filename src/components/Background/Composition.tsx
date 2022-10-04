import { nanoid } from 'nanoid';
import { Profiler, useContext, useEffect, useRef, useState } from 'react';
import { BounceBoxesContext } from '../../App';
import {
  AnimatedParticleBaseProps,
  MousePositionProps,
  WindowSize,
} from '../../types';
import getRandomParticles from '../../utils/getRandomParticles';
import AnimatedCanvas from './AnimatedCanvas';
// import { FrameContext } from './AnimatedCanvas';
import AnimatedParticle from './AnimatedParticle';
import AnimatedParticles from './AnimatedParticles';
import ConnectingLines from './ConnectingLines';

// const Composition = ({
//   windowSize,
//   mousePosition,
// }: {
//   windowSize: WindowSize;
//   mousePosition: MousePositionProps;
// }) => {
const Composition = (props: any) => {
  // const [mouseRadius, setMouseRadius] = useState(0);
  // const bounceContext = useContext(BounceBoxesContext);
  const particlesArrayRef = useRef<AnimatedParticleBaseProps[]>();
  // useContext(FrameContext); // only present to force re-render after each frame clears the canvas.

  // console.log('props:', renderingContext);
  // const windowSize: WindowSize = props.windowSize;
  // const mousePosition: MousePositionProps = props.mousePosition;
  // const renderingContext = props.renderingContext;
  // const frameCount = props.frameCount;
  // const bounceBoxes = props.bounceBoxes;

  useEffect(() => {
    // setMouseRadius((windowSize.height / 120) * (windowSize.width / 120));
    particlesArrayRef.current = getRandomParticles(props.windowSize);
  }, [props.windowSize]);

  const updateParticle = (
    index: number,
    initialParticle: AnimatedParticleBaseProps
  ) => {
    if (particlesArrayRef.current) {
      particlesArrayRef.current[index] = initialParticle;
    }
  };

  // console.log('check', particlesArrayRef.current);

  return (
    <>
      {/* {particlesArrayRef.current &&
        particlesArrayRef.current?.map((particle, i) => (
          <AnimatedParticle
            key={nanoid()}
            windowSize={props.windowSize}
            // mouseRadius={mouseRadius}
            // bounceElements={bounceContext.bounceBoxes}
            bounceElements={props.bounceBoxes}
            index={i}
            onNewFrame={updateParticle}
            mouse={props.mousePosition}
            renderingContext={props.renderingContext}
            {...particle}
          />
        ))} */}

      {/* <Profiler id='test' onRender={logTimes}> */}
        <AnimatedParticles
          // key={nanoid()}
          windowSize={props.windowSize}
          // mouseRadius={mouseRadius}
          // bounceElements={bounceContext.bounceBoxes}
          bounceElements={props.bounceBoxes}
          updateParticle={updateParticle}
          mouse={props.mousePosition}
          renderingContext={props.renderingContext}
          particlesArray={particlesArrayRef.current}
        />

        <ConnectingLines
          particlesArray={particlesArrayRef.current}
          // stickyElements={bounceContext.bounceBoxes}
          stickyElements={props.bounceBoxes}
          renderingContext={props.renderingContext}
        />
      {/* </Profiler> */}
    </>
  );

  // return (
  //   <>
  //     {/* {particlesArrayRef.current &&
  //       particlesArrayRef.current?.map((particle, i) => (
  //         <AnimatedParticle
  //           key={nanoid()}
  //           windowSize={props.windowSize}
  //           // mouseRadius={mouseRadius}
  //           // bounceElements={bounceContext.bounceBoxes}
  //           bounceElements={props.bounceBoxes}
  //           index={i}
  //           onNewFrame={updateParticle}
  //           mouse={props.mousePosition}
  //           renderingContext={props.renderingContext}
  //           {...particle}
  //         />
  //       ))} */}
  //     <AnimatedCanvas
  //       dimensions={{
  //         width: props.windowSize.scrollWidth,
  //         height: props.windowSize.scrollHeight,
  //       }}
  //     >
  //       <AnimatedParticles
  //         // key={nanoid()}
  //         windowSize={props.windowSize}
  //         // mouseRadius={mouseRadius}
  //         // bounceElements={bounceContext.bounceBoxes}
  //         bounceElements={props.bounceBoxes}
  //         updateParticle={updateParticle}
  //         mouse={props.mousePosition}
  //         renderingContext={props.renderingContext}
  //         particlesArray={particlesArrayRef.current}
  //       />
  //     </AnimatedCanvas>

  //     {/* <Profiler id='test' onRender={logTimes}> */}
  //       <AnimatedCanvas
  //         dimensions={{
  //           width: props.windowSize.scrollWidth,
  //           height: props.windowSize.scrollHeight,
  //         }}
  //       >
  //         <ConnectingLines
  //           particlesArray={particlesArrayRef.current}
  //           // stickyElements={bounceContext.bounceBoxes}
  //           stickyElements={props.bounceBoxes}
  //           renderingContext={props.renderingContext}
  //         />
  //       </AnimatedCanvas>
  //     {/* </Profiler> */}
  //   </>
  // );
};

export default Composition;

const logTimes = (
  id: any,
  phase: any,
  actualTime: any,
  baseTime: any,
  startTime: any,
  commitTime: any
) => {
  // console.log(`${id}'s ${phase} phase:`);
  // console.log(`Actual time: ${Math.floor(actualTime)}`);
  console.log(`Base time: ${Math.floor(baseTime)}`);
  // console.log(`Start time: ${startTime}`);
  // console.log(`Commit time: ${commitTime}`);
};
