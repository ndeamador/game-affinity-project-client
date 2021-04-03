/** @jsxImportSource @emotion/react */

import { Spinner } from './styledComponentsLibrary';

const FullPageSpinner = () => {
  return (
    <div css={{ width: '10%', marginTop: '30vh' }}>
      <Spinner css={{ height: '100%', width: '100%' }} />
    </div>
  );
};

export default FullPageSpinner;
