import { css } from '@emotion/react';

const styles = {
  mainDiv: css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    maxWidth: 'var(--searchbar-max-width)',
    marginTop: 'var(--searchbar-margin-top)',
  }),
  containerStyle: css({
    flexDirection: 'column',
  }),
  error: css({
    padding: '15px 20px 20px 20px',
  }),
};

export default styles;