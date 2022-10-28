/** @jsxImportSource @emotion/react */

import styled from '@emotion/styled/macro'; // macro so that elements appear named in the dom

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

const Button = styled.button(
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

export default Button;
