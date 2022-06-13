/** @jsxImportSource @emotion/react */
import { Game } from '../types';
import { CgGames } from 'react-icons/cg';
import { css } from '@emotion/react';
import { useState } from 'react';
import { Spinner } from './styledComponentsLibrary';

const styles = {
  mainContainer: css({
    display: 'flex',
    width: 'var(--cover-width)',
    height: 'var(--cover-width)',
    flexShrink: 0,
  }),
  image: css({
    height: '100%',
    borderRadius: 'var(--border-radius)',
  }),
  genericBox: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'var(--cover-width)',
    height: 'var(--cover-width)',
    border: 'solid 2px var(--inner-border-color)',
    borderRadius: 'var(--border-radius)',
    padding: '8px',
  }),
  genericIcon: css({
    width: '100%',
    height: 'auto',
    // width: 'var(--cover-width)',
    // height: 'var(--cover-width)',
  }),
  spinner: css({ width: '50%', height: '50%' }),
};

const CoverDiv = ({ game }: { game: Game }) => {
  const [loaded, setLoaded] = useState(false);

  // Setting image resolution from url: https://api-docs.igdb.com/#images
  const imageSize = 'thumb';
  const imageLink = `//images.igdb.com/igdb/image/upload/t_${imageSize}/${game.cover?.image_id}.jpg`;

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
          <img
            src={imageLink}
            css={styles.image}
            onLoad={(event: any) => {
              console.log('load: ', event);
              setLoaded(true);
            }}
          />
          {!loaded && (
            <div css={styles.genericBox}>
              <Spinner css={styles.spinner} />
            </div>
          )}
        </>
      ) : (
        <div css={styles.genericBox}>
          <CgGames css={styles.genericIcon} />
        </div>
      )}
    </div>
  );
};

export default CoverDiv;
