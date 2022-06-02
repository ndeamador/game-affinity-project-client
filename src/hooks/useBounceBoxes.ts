import { useState } from 'react';
import { BounceBoxKey, BounceBoxState, DeconstructedDOMRect, RectWithBoundingPoints } from '../types';

const useBounceBoxes = () => {
  const [bounceBoxes, setBounceBoxes] = useState<BounceBoxState>({
    searchBar: {
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      width: 0,
      height: 0
    }
    // , testBox: {
    //   top: 0,
    //   left: 0,
    //   bottom: 0,
    //   right: 0,
    //   width: 0,
    //   height: 0
    // }
  });

  const storeBounceBox = (propName: BounceBoxKey, ref: React.MutableRefObject<HTMLElement | null>) => {

    // the state needs to be set with a callback. Otherwise, if called several times in a row, the closure will use the same inital state for all calls.
    // https://typeofnan.dev/why-you-cant-setstate-multiple-times-in-a-row/

    setBounceBoxes(bounceBoxes => ({
      ...bounceBoxes,
      [propName]: {
        ...getBoundingPoints(ref)
      }
    }))

    // setBounceBoxes({
    //   ...bounceBoxes,
    //   [propName]: {
    //     ...getBoundingPoints(ref)
    //   }
    // })
  }

  // console.log('state: ', bounceBoxes);

  return { bounceBoxes, storeBounceBox };
}

export default useBounceBoxes;


export const getBoundingPoints = (ref: React.MutableRefObject<HTMLElement | null>): RectWithBoundingPoints => {

  const rect = getDOMRect(ref);

  const width = rect.right - rect.left;
  const height = rect.bottom - rect.top;
  let expandedRect: RectWithBoundingPoints = {
    ...rect,
    width,
    height
  };


  // Note y coordinates might be counterintuitive. y = 0 is on the top of the screen.
  const center = {
    x: rect.left + width / 2,
    y: rect.top + height / 2,
  };

  const longestSide = Math.max(width, height);

  const boundingPoints = {
    center: center,
    top: {
      x: center.x,
      // y: center.y - height / 2
      y: center.y - longestSide / 2

    },
    bottom: {
      x: center.x,
      // y: center.y + height / 2
      y: center.y + longestSide / 2
    },
    left: {
      // x: center.x - width / 2,
      x: center.x - longestSide / 2,
      y: center.y
    },
    right: {
      // x: rect.right + width / 2,
      x: center.x + longestSide / 2,
      y: center.y
    }
  }

  expandedRect = {
    ...expandedRect,
    width: width,
    height: height,
    boundingPoints: {
      ...boundingPoints
    }
  }

  return expandedRect;
}



export const getDOMRect = (ref: React.MutableRefObject<HTMLElement | null>): DeconstructedDOMRect => {

  // Due to compatibility problems, it is safest to rely on only properties left, top, right, and bottom.

  // Properties in the returned DOMRect object are not own properties. Object.keys() will fail.
  // Moreover, and unexpectedly, the ES2015 and newer features such as Object.assign() and object rest/spread will fail to copy returned properties.
  // https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect

  //https://stackoverflow.com/questions/39417566/how-best-to-convert-a-clientrect-domrect-into-a-plain-object

  let processedDOMRect: DeconstructedDOMRect = { top: 0, left: 0, bottom: 0, right: 0 };
  if (ref.current) {
    const { top, left, bottom, right }: DeconstructedDOMRect = ref.current.getBoundingClientRect();

    processedDOMRect = {
      top,
      left,
      bottom,
      right
    }
  }

  return processedDOMRect;
}