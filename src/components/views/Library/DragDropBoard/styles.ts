import { css } from '@emotion/react';

const styles = {
  container: css({
    flexDirection: 'column',
    padding: '15px',
  }),
  dndColumnsDiv: css({
    display: 'flex',
    flexDirection: 'row',
    columnGap: '15px',
    justifyContent: 'center',
  }),
  textDiv: css({
    marginBottom: '15px',
  }),
};

export default styles;