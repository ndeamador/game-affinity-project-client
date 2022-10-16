/** @jsxImportSource @emotion/react */

import { Spinner } from '../styledComponentsLibrary';
import styles from './styles';

const FullPageSpinner = () => {
  return (
    <div id='here' css={styles.container}>
      <Spinner css={styles.spinner} />
    </div>
  );
};

export default FullPageSpinner;