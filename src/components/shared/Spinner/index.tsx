/** @jsxImportSource @emotion/react */

import styled from '@emotion/styled/macro'; // macro so that elements appear named in the dom
import { keyframes } from '@emotion/react';
import { ImSpinner2 } from 'react-icons/im'; // svg library

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
