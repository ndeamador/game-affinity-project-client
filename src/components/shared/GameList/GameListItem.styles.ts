import { css } from '@emotion/react';

const styles = {
  mainContainer: css({
    display: 'flex',
    padding: '5px 0px',
    margin: '0',
    borderRadius: 'var(--border-radius)',
    boxSizing: 'border-box',
    transitionDuration: '0.2s',
    transitionProperty: 'background-color, box-shadow',
    border: '1px solid transparent', // here just so that the hover border does not move the element
    alignItems: 'start', // not necessary, but forces flexbox to respect CoverDiv 1/1 aspect ratio
    ':hover': {
      background:
        'linear-gradient(to right, transparent, var(--inner-content-background-color-hover) 20%, transparent)',
      borderImage:
        'linear-gradient(160deg, transparent 25%, grey, transparent 75%)',
      borderImageSlice: 1,
    },
  }),
  gameInfoContainer: css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingLeft: '20px',
    flexGrow: 1,
  }),
  link: css({
    textDecoration: 'none',
    color: 'var(--color-text)',
  }),
  title: css({
    margin: 0,
  }),
};

export default styles;