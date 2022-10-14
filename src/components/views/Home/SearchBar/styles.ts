import { css } from '@emotion/react';

const styles = {
  form: css({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    // marginTop: 'var(--searchbar-margin-top)',
  }),
  input: css({
    width: '100%',
    maxWidth: '800px',
    minwidth: '600px',
    backgroundColor: 'transparent',
    '&:focus': {
      outline: 'none',
    },
    // '&:active': {
    //   outline: 'none',
    //   backgroundColor: 'white',
    // },
  }),
  button: css({
    border: '0',
    // position: 'relative',
    marginLeft: '-42px',
    background: 'transparent',
  }),
}

export default styles;