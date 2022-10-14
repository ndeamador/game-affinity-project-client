import { css } from '@emotion/react';

const styles = {
  container: css({
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    lineHeight: 1.2,
    marginBottom: '6px',
    '> *': {
      margin: '0',
    },
  }),
  separator: css({ padding: '0 5px' }),
};

export default styles;