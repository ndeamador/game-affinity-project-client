import { css } from '@emotion/react';

const styles = {
  container: css({
    display: 'flex',
    backgroundColor: 'var(--item-list-background)',
    borderRadius: 'var(--border-radius)',
    backdropFilter: 'blur(12px)',
  })
};

export default styles;