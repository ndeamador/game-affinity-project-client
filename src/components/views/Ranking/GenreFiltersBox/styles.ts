import { css } from '@emotion/react';

const styles = {
  container: css({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 'var(--border-radius)',
    gap: 'var(--border-radius)',
    '> .selected': {
      backgroundColor: 'var(--filter-button-hover-active)',
    },
  })
};

export default styles;