import { css } from '@emotion/react';

const styles = {
  mainContainer: css({
    display: 'flex',
    flexBasis: '3.3rem',
    maxWidth: 'var(--cover-width-thumb)',
    aspectRatio: '1/1',
    flexGrow: 1,
    flexShrink: 0,
  }),
  image: css({
    height: '100%',
    borderRadius: 'var(--border-radius)',
    objectFit: 'contain',
  }),
  genericBox: css({
    display: 'flex',
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
    height: '100%',
  }),
  spinner: css({
    width: '50%',
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  }),


  mainContainerBig: css({
    maxWidth: 'var(--cover-width-big)',
    borderRadius: 'var(--border-radius)',
    flexShrink: 0,
    aspectRatio: 'unset',
    alignSelf: 'flex-start',
  }),
  genericBoxBig: css({
    aspectRatio: 'unset',
    height: 'var(--cover-height-big)',
    width: 'var(--cover-width-big)',
  }),
};

export default styles;