import { css } from '@emotion/react';

const styles = {
  mainContainer: css({
    display: 'flex',
    flexBasis: '3.3rem',
    maxWidth: 'var(--cover-width-thumb)',
    // maxHeight: 'var(--cover-width-thumb)',
    aspectRatio: '1/1',
    flexGrow: 1,
    flexShrink: 0,
  }),
  image: css({
    height: '100%',
    borderRadius: 'var(--border-radius)',
  }),
  genericBox: css({
    display: 'flex',
    // width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'solid 2px var(--inner-border-color)',
    borderRadius: 'var(--border-radius)',
    padding: '8px',
    width: 'var(--cover-width-thumb)',
    aspectRatio: '1/1',
  }),
  genericIcon: css({
    width: '100%',
    // height: 'auto',
    height: '100%',
  }),
  spinner: css({
    width: '50%',
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  }),
};

export default styles;