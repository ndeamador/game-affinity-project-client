import { css } from '@emotion/react';

const styles = {
  container: css({
    margin: '0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '15vh',
    width: '15vh',
    alignSelf: 'center',
    justifySelf: 'center',
    marginTop: '20vh',
  }),
  spinner: css({
    width: '100%',
    height: '100%'
  })
}

export default styles;