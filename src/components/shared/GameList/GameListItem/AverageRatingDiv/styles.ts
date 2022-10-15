import { css } from '@emotion/react';

const styles = {
  container: css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1.4rem',
    fontWeight: 'bold',
    color: 'white',
    width: 'calc(var(--cover-width-thumb) - 25px)',
    height: 'var(--cover-width-thumb)',
    borderRadius: 'var(--border-radius)',
    marginRight: '10px',
    alignContent: 'stretch',
  })
};

export default styles;