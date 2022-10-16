import { css } from '@emotion/react';

const styles = {
  linkStyle: css({
    marginLeft: '10px',
  }),
  tooltipStyle: css({
    zIndex: 200,
  }),
  buttonStyle: css({
    display: 'flex',
    minHeight: '40px',
    minWidth: '40px',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover': {
      color: 'black',
    },
  }),
  iconDivStyle: css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  }),
  iconStyle: css({
    width: '68%',
    height: 'auto',
  }),
};

export default styles;