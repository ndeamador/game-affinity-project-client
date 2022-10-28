/** @jsxImportSource @emotion/react */

import styled from '@emotion/styled/macro'; // macro so that elements appear named in the dom

// CIRCLE BUTTON
const transparentTopRightVariant = {
  backgroundColor: 'transparent',
  // Leave empty space bottom and left to increase clicking area when button is on the top right corner.
  justifyContent: 'flex-end',
  alignItems: 'flex-start',
  '&:hover': {
    backgroundColor: 'transparent',
  },
};

export const CircleButton = styled.button(
  {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2px',
    minWidth: '30px',
    minHeight: '30px',
    outlineStyle: 'none',
    fontSize: '15px',
    cursor: 'pointer',
    boxSizing: 'border-box', // padding and border are included in the element's total width and height
    borderRadius: '9999px',
    borderStyle: 'none',
    color: 'var(--color-text)',
    backgroundColor: 'var(--regular-button-background-color)',
    transition: 'background-color 0.04s ease-in',
    '&:first-of-type div > *': {
      transition: 'transform 0.025s ease-in',
    },
    '&:hover': {
      backgroundColor: 'var(--regular-button-background-color-hover)',
      transition: 'background-color 0.02s ease-in',
      '&:first-of-type div > *': {
        transform: 'scale(1.15)',
        transition: 'transform 0.025s ease-in',
      },
    },
  },
  ({ transparentTopRight = false }: { transparentTopRight?: boolean }) =>
    transparentTopRight && transparentTopRightVariant // variant comes from props.variant, the props passed to the button, defaulted to regular.
);
