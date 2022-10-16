/** @jsxImportSource @emotion/react */

import styled from '@emotion/styled/macro'; // macro so that elements appear named in the dom
import { keyframes } from '@emotion/react';
import { ImSpinner2 } from 'react-icons/im'; // svg library
import { ApolloError } from '@apollo/client';

// BUTTON
interface ButtonProps {
  variant?: 'primary' | 'regular' | 'filter';
}

const buttonVariants = {
  primary: {
    background: 'var(--color-indigo)',
    color: 'var(--color-base)',
  },
  regular: {
    backgroundColor: 'var(--regular-button-background-color)',
    color: 'var(--color-text)',
  },
  filter: {
    padding: '8px 8px',
    backgroundColor: 'transparent',
    border: '1px solid var(--filter-button-border-color)',
    fontSize: '15px',
    transition: 'background-color 0.6s ease-out',
    '&:hover': {
      backgroundColor: 'var(--filter-button-hover-active)',
      transition: 'background-color 0.12s ease-out',
    },
  },
};

export const Button = styled.button(
  {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '13px 18px',
    border: '0',
    lineHeight: '1',
    borderRadius: 'var(--border-radius)',
    margin: '0',
    boxSizing: 'border-box',
    '&:hover': {
      backgroundColor: 'var(--regular-button-background-color-hover)',
      transitionDuration: '0.2s',
      transitionProperty: 'background-color',
    },
  },
  // we can add as many other properties, and they will append to the ones before. Functions can be used
  ({ variant = 'regular' }: ButtonProps) => buttonVariants[variant] // variant comes from props.variant, the props passed to the button, defaulted to regular.
);

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

// INPUT
export const Input = styled.input({
  borderRadius: 'var(--border-radius)',
  border: '0px',
  padding: '15px 20px',
  width: '100%',
  boxSizing: 'border-box',
});

// SPINNER
const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});
export const Spinner = styled(ImSpinner2)({
  animation: `${spin} 1s linear infinite`,
});
Spinner.defaultProps = {
  'aria-label': 'loading',
};

// FULL PAGE ERROR
export const FullPageError = ({
  error,
}: {
  error: ApolloError | undefined;
}) => {
  return (
    <div
      role='alert'
      css={{
        color: 'var(--color-danger)',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <p>Something went wrong. Try refreshing the app.</p>
      <pre>{error?.message}</pre>
    </div>
  );
};

// ERROR MESSAGE
export const ErrorMessage = styled.div(
  {
    color: 'var(--color-danger-dark)',
    margin: 0,
    paddingTop: '2px',
    fontSize: '85%',
    fontWeight: 'bold',
    textAlign: 'left',
    wordWrap: 'break-word',
  },
  ({ variant }: { variant: 'inline' | 'stacked' }) => ({
    display: variant === 'inline' ? 'inline' : 'block',
  })
);