import { css } from '@emotion/react';

const styles = {
  container: css({
    padding: '15px',
    // alignItems:'flex-start',
    minWidth: '500px',
    minHeight: '200px',
  }),
  // coverDiv: css({
  //   borderRadius: 'var(--border-radius)',
  //   width: '264px',
  //   maxWidth: '264px',
  //   flexShrink: 0,
  // }),
  coverImage: css({
    borderRadius: 'var(--border-radius)',
    width: '100%',
  }),
  gameInfoDiv: css({
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: '20px',
    '> *': {
      margin: '0',
      marginBottom: '10px',
    },
  }),
  gameHeader: css({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '15px',
  }),
  title: css({
    lineHeight: 1,
    marginBottom: '10px',
  }),
  gameSummary: css({
    overflowY: 'auto',
  }),
};

export default styles;