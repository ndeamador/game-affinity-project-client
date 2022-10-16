import { css } from '@emotion/react';

const styles = {
  button: css({
    '&:hover, :focus': {
      color: 'var(--color-indigo)',
    },
  }),
  errorStyle: css({
    color: 'var(--color-danger)',
  }),
  altHighlightStyle: css({
    '&:hover,:focus': {
      color: 'var(--color-danger)',
    },
  }),
  loadingStyle: css({
    color: 'var(--color-gray80)',
    '&:hover, :focus': {
      color: 'var(--color-gray80)',
    },
  }),
  iconDivStyle: css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }),
}

export default styles;