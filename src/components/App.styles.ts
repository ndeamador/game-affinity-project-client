import { css } from '@emotion/react';


const styles = {
  bodyStyle: css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100vw',
    height: '100vh',
  }),
  contentStyle: css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '80vw',
    maxWidth: '1200px',
    paddingTop: 'calc(5vh + var(--navbar-height))',
    '& > *': {
      width: '100%',
    },
  }),
}

export default styles;