import { css } from '@emotion/react';

const styles = {
  container: css({
    padding: '15px',
    minWidth: '500px',
    minHeight: '200px',
  }),
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
    paddingRight: '8px',
  }),
};

export default styles;