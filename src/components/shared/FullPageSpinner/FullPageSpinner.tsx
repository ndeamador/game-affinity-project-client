/** @jsxImportSource @emotion/react */

import { Spinner } from '../styledComponentsLibrary';

const FullPageSpinner = () => {
  return (
    <div
      id='here'
      css={{
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
      }}
    >
      <Spinner css={{ width: '100%', height: '100%', }} />
    </div>
  );
};

export default FullPageSpinner;
