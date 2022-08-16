/** @jsxImportSource @emotion/react */
import { Game } from '../types';
import { CgGames } from 'react-icons/cg';
import { css } from '@emotion/react';
import React, { useState } from 'react';
import { Spinner } from './styledComponentsLibrary';

const styles = {
  mainContainer: css({
    display: 'flex',
    maxWidth: 'var(--cover-width)',
    maxHeight: 'var(--cover-width)',
    aspectRatio: '1/1',
    flexGrow: 1,
  }),
  image: css({
    height: '100%',
    borderRadius: 'var(--border-radius)',
  }),
  genericBox: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // width: '100%',
    border: 'solid 2px var(--inner-border-color)',
    borderRadius: 'var(--border-radius)',
    padding: '8px',
    aspectRatio: '1/1',
  }),
  genericIcon: css({
    width: '100%',
    // height: 'auto',
    height: '100%',
  }),
  spinner: css({ width: '50%', height: '50%' }),
};

const CoverDiv = ({ game }: { game: Game }) => {
  const [loaded, setLoaded] = useState(false);

  // Setting image resolution from url: https://api-docs.igdb.com/#images
  const imageSize = 'thumb';
  const imageLink = `//images.igdb.com/igdb/image/upload/t_${imageSize}/${game.cover?.image_id}.jpg`;

  // Not necessary, but a workaround for loading spinner lingering a bit too long after image loads.
  const dynamicStyles = {
    displayOnLoad: css({
      display: loaded ? 'block' : 'none',
    }),
  };

  return (
    // <div css={styles.mainContainer}>
    //   {game.cover ? (
    //     <img src={imageLink} css={styles.image} onLoad={(event: any) => {console.log('load: ', event); setLoaded(true)}} />
    //   ) : (
    //     <CgGames css={styles.genericIcon} />
    //   )}
    // </div>

    <div css={[styles.mainContainer]}>
      {game.cover ? (
        <>
          {!loaded && (
            <div css={[styles.genericBox]}>
              <Spinner css={styles.spinner} />
            </div>
          )}
          <img
            src={imageLink}
            css={[styles.image, dynamicStyles.displayOnLoad]}
            onLoad={() => setLoaded(true)}
          />
        </>
      ) : (
        <div css={styles.genericBox}>
          <CgGames css={styles.genericIcon} />
        </div>
      )}
    </div>

    // <div css={[styles.mainContainer]}>
    //   <img src={imageLink} css={styles.image} />
    // </div>
  );
};

export default React.memo(CoverDiv);
// export default CoverDiv;
