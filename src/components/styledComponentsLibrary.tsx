/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled/macro'; // /macro so that elements appear named in the dom
import { keyframes } from '@emotion/react';
// import * as mediaQueries from '../styles/media-queries';
// import { Dialog } from '@reach/dialog';
import { ImSpinner2 } from 'react-icons/im'; // svg library
import { ApolloError } from '@apollo/client';

// BUTTON
interface ButtonProps {
  variant?: 'primary' | 'regular';
}

const buttonVariants = {
  primary: {
    background: 'var(--color-indigo)',
    color: 'var(--color-base)',
  },
  regular: {
    background: 'var(--color-gray)',
    color: 'var(--color-text)',
  },
};

export const Button = styled.button(
  {
    padding: '13px 18px',
    border: '0',
    lineHeight: '1',
    borderRadius: 'var(--border-radius)',
    margin: '0',
    boxSizing: 'border-box',
    '&:hover': {
      backgroundColor: 'var(--color-indigoLighten80)',
      transitionDuration: '0.2s',
      transitionProperty: 'background-color',
    },
  },
  // we can add as many other properties, and they will append to the ones before. Functions can be used
  ({ variant = 'regular' }: ButtonProps) => buttonVariants[variant] // variant comes from props.variant, the props passed to the button, defaulted to regular.
);

// CIRCLE BUTTON
export const CircleButton = styled.button({
  minWidth: '40px',
  minHeight: '40px',
  margin: '0px 5px',
  height: '40px',
  outlineStyle: 'none',
  fontSize: '15px',
  cursor: 'pointer',
  boxSizing: 'border-box', // padding and border are included in the element's total width and height
  borderRadius: '9999px',
  borderStyle: 'none',
  color: 'var(--color-text)',
  backgroundColor: 'var(--color-base)',
  transitionDuration: '0.2s',
  transitionProperty: 'background-color',
  '&:hover': {
    backgroundColor: 'var(--color-gray)',
    transitionDuration: '0.2s',
    transitionProperty: 'background-color',
  },
});

// INPUT

export const Input = styled.input({
  borderRadius: 'var(--border-radius)',
  border: '0px',
  // background: 'ghostwhite',
  padding: '15px 20px',
  width: '100%',
  boxSizing: 'border-box',
});

// FORM CONTAINER

// export const FormContainer = styled.div({
//   display: 'flex',
//   flexDirection: 'column',
// })

// REACH MODAL
// type Props = {
//   className?: string;
//   as?: React.ElementType | keyof JSX.IntrinsicElements;
// };

// <Dialog/>

// export const Modal = styled(Dialog)({
//   maxWidth: '450px',
//   borderRadius: '3px',
//   paddingBottom: '3.5em',
//   boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.2)',
//   margin: '20vh auto',
//   '@media (max-width: 991px)': {
//     width: '100%',
//     margin: '10vh auto',
//   },
// });

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
export const ErrorNotification = styled.div(
  {
    color: 'var(--color-danger)',
    margin: 0,
    paddingTop: '2px',
    position: 'absolute',
    fontSize: '85%',
    textAlign: 'center',
  },
  ({ variant }: { variant: 'inline' | 'stacked' }) => ({
    display: variant === 'inline' ? 'inline' : 'block',
  })
);
