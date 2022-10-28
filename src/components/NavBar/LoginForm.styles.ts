import { css } from '@emotion/react';

const styles = {
  form: css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    '> .inputErrorDiv': {
      margin: '0 0 10px 0',
      width: '100%',
      minWidth: '250px',
    },
  }),
  input: css({
    backgroundColor: 'var(--inner-content-background-color)',
  }),
  submitButtonAndServerErrorDiv: css({
    alignSelf: 'flex-start',
  }),
  submitButton: css({
    height: '40px',
    minWidth: '75px',
  }),
  notification: css({
    marginLeft: '20px',
  }),
};

export default styles;