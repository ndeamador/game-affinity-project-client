import { css } from '@emotion/react';

const styles = {
  backgroundContainer: css({
    position: 'fixed',
    top: 0,
    left: 0,
    display: 'flex',
    filter: 'blur(var(--overlay-blur))',
    zIndex: -1,
    width: '100%',
    height: '100%',
    backgroundColor: 'var(--background)',
    '> canvas': {
      position: 'absolute',
      top: 0,
      left: 0,
    },
  })
};

export default styles;