import { css } from '@emotion/react';

const styles = {
  mainContainer: css({
    display: 'flex',
    paddingBottom: '0px',
    justifySelf: 'flex-end',
    flexDirection: 'column',
  }),
  iconsContainer: css({
    display: 'inline-flex',
    backgroundColor: 'var(--inner-content-background-color)',
    padding: '10px 10px 10px 8px',
    borderRadius: 'var(--border-radius)',
    width: '25%',
    minWidth: '150px',
    alignSelf: 'flex-start',
    justifyContent: 'space-around',
    '.rating-icon': {
      padding: '0',
      height: '20px',
      width: '20px',
      stroke: 'grey',
      strokeWidth: '30',
      transition: 'all .2s ease-in-out',
      ':hover': {
        transform: 'scale(1.35)',
        transition: 'all .1s ease-in-out',
        strokeWidth: '25',
        stroke: 'whitesmoke',
      },
    },
  }),
  label: css({
    cursor: 'pointer',
    color: 'lightgrey',
  }),
  radioInput: (i: number, elementClassName: string, iconColors: string[]) => {
    return css({
      // These are to hide the radio inputs.
      // https://www.w3schools.com/cssref/pr_pos_clip.asp
      clip: 'rect(0 0 0 0)',
      overflow: 'hidden',
      position: 'absolute',
      // the following values are just to make the hidden input not interfere
      height: '1px',
      margin: '0px',
      width: '1px',
      // & css nesting operator.
      // + css adyacent sibling selector.
      // [] are needed here to use template literals.
      [`.${elementClassName} &:checked + label`]: {
        color: iconColors[i],
        '.rating-icon': {
          '@keyframes bump': {
            '0%': {
              transform: 'scale(1)',
            },
            '30%': {
              transform: 'scale(1.7)',
            },
            '70%': {
              transform: 'scale(1.35)',
            },
            '100%': {
              transform: 'scale(1.5)',
            },
          },
          '@keyframes up': {
            '0%': {
              transform: 'translate(0, 0)',
            },
            '30%': {
              transform: `translate(0, -5px)`,
            },
            '100%': {
              transform: 'translate(0, 0), scale(1.4)',
            },
          },
          '@keyframes down': {
            '0%': {
              transform: 'translate(0, 0)',
            },
            '30%': {
              transform: `translate(0, 5px)`,
            },
            '100%': {
              transform: 'translate(0, 0), scale(1.4)',
            },
          },
          animation: `.3s linear ${i > 1 ? 'bump' : i > 0 ? 'up' : 'down'}`,
          transform: 'scale(1.5)',
          strokeWidth: '25',
          stroke: 'whitesmoke',
        },
      },
    });
  },
};

export default styles;