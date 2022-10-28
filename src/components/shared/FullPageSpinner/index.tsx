/** @jsxImportSource @emotion/react */

import { Spinner } from 'components/shared/Spinner';
import styles from './styles';

const FullPageSpinner = () => {
  return (
    <div css={styles.container}>
      <Spinner css={styles.spinner} />
    </div>
  );
};

export default FullPageSpinner;
