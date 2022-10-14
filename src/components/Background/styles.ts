import { css } from '@emotion/react';

const styles = {
  backgroundContainer: css({
    // minWidth: `${windowSize.scrollWidth}px`,
    // minHeight: `${windowSize.scrollHeight}px`,
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    display: 'flex',
    filter: 'blur(var(--overlay-blur))',
    zIndex: -1,
    width: '100%',
    height: '100%',
    // overflowY:'auto',
    backgroundColor: 'var(--background)',
    '> canvas': {
      position: 'absolute',
      top: 0,
      left: 0,
      // backgroundColor: 'red',
    },
    // objectFit: 'cover',
  })
};

export default styles;