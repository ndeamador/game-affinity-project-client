/** @jsxImportSource @emotion/react */

import styled from '@emotion/styled/macro'; // macro so that elements appear named in the dom

// ERROR MESSAGE
const ErrorMessage = styled.div(
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

export default ErrorMessage;
