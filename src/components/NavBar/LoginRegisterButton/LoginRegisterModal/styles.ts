import { css } from '@emotion/react';

const styles = {
  dialogOverlay: css({
    backdropFilter: 'blur(10px)',
    background: 'rgba(0, 0, 0, 0.3)',
  }),
  dialogContent: css({
    backgroundColor: 'transparent',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '380px',
    padding: 0,
    marginTop: '15vh',
    ':click': {
      transition: 'transform 0.3s',
      transitionDuration: '0.3s',
      transitionTimingFunction: 'ease',
      transitionProperty: 'all',
    },
  }),
  genericContainer: css({
    flexDirection: 'column',
    padding: '30px',
    width: '100%',
  }),
  closeButtonDiv: css({
    alignSelf: 'flex-end',
  }),
  modalInnerContainer: css({
    padding: '40px 0 30px 0',
  }),
  title: css({
    margin: '0 0 20px 0',
  }),
};

export default styles;