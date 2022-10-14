/** @jsxImportSource @emotion/react */

import styles from './styles';

const CssBlobs = () => {
  return (
    <div css={styles.container}>
      <div id='blobsOverlay' css={styles.overlay} />
      <div id='centerBlob' css={styles.centerBlob} />
      <div id='bigBlog' css={styles.bigBlob} />
      <div id='bottomRightCornerBlob' css={styles.bottomRightCornerBlob} />
      <div id='backgroundBlob' css={styles.backgroundBlob} />
    </div>
  );
};

export default CssBlobs;
