import { css } from '@emotion/react';

const styles = {
  dialogOverlay: css({
    backdropFilter: 'blur(10px)',
    background: 'rgba(0, 0, 0, 0.4)',
  }),
  dialogContent: css({
    display: 'flex',
    maxHeight: '90vh',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    minWidth: '400px',
    ':click': {
      transition: 'transform 0.3s',
      transitionDuration: '0.3s',
      transitionTimingFunction: 'ease',
      transitionProperty: 'all',
    },
  }),
  container: css({
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  }),
};

export default styles;