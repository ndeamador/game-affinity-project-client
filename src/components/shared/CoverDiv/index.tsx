/** @jsxImportSource @emotion/react */
import { Game } from '../../../types';
import { CgGames } from 'react-icons/cg';
import { css } from '@emotion/react';
import { useState } from 'react';
import { Spinner } from '../styledComponentsLibrary';
import styles from './styles';

const CoverDiv = ({
  game,
  showSpinner = true,
  big = false,
}: {
  game: Game;
  showSpinner?: boolean;
  big?: boolean;
}) => {
  const [loaded, setLoaded] = useState(false);

  // Setting image resolution from url: https://api-docs.igdb.com/#images
  const imageSize = big ? 'cover_big' : 'thumb';
  const imageLink = `//images.igdb.com/igdb/image/upload/t_${imageSize}/${game.cover?.image_id}.jpg`;

  // Not necessary, but a workaround for loading spinner lingering a bit too long after image loads.
  const dynamicStyles = {
    displayOnLoad: css({
      display: loaded ? 'block' : 'none',
    }),
    bigSize: css({
      // height: 'var(--cover-height-big)',
      // width: 'var(--cover-width-big)',
      maxWidth: 'var(--cover-width-big)',
      borderRadius: 'var(--border-radius)',
      flexShrink: 0,
      aspectRatio: 'unset',
    }),
    genericBoxBig: css({
      aspectRatio: 'unset',
      height: 'var(--cover-height-big)',
      width: 'var(--cover-width-big)',
    }),
  };

  return (
    // Workaround to prevent image flickering when dragging in My Library.
    <div css={[!big ? styles.mainContainer : dynamicStyles.bigSize]}>
      {game.cover ? (
        showSpinner ? (
          <>
            {!loaded && (
              <div
                css={[styles.genericBox, big && dynamicStyles.genericBoxBig]}
              >
                <Spinner css={styles.spinner} />
              </div>
            )}
            <img
              src={imageLink}
              css={[styles.image, dynamicStyles.displayOnLoad]}
              onLoad={() => {
                if (!loaded) setLoaded(true);
              }}
            />
          </>
        ) : (
          <img src={imageLink} css={styles.image} />
        )
      ) : (
        <div css={[styles.mainContainer, styles.genericBox]}>
          <CgGames css={styles.genericIcon} />
        </div>
      )}
    </div>

    // <div css={styles.mainContainer}>
    //   {game.cover ? (
    //     <img src={imageLink} css={styles.image} onLoad={(event: any) => {console.log('load: ', event); setLoaded(true)}} />
    //   ) : (
    //     <CgGames css={styles.genericIcon} />
    //   )}
    // </div>

    // <div css={[styles.mainContainer]}>
    //   {game.cover ? (
    //     <>
    //       {!loaded && (
    //         <div css={[styles.genericBox]}>
    //           <Spinner css={styles.spinner} />
    //         </div>
    //       )}
    //       <img
    //         src={imageLink}
    //         css={[styles.image, dynamicStyles.displayOnLoad]}
    //         onLoad={() => {
    //           if (!loaded) setLoaded(true);
    //         }}
    //       />
    //     </>
    //   ) : (
    //     <div css={styles.genericBox}>
    //       <CgGames css={styles.genericIcon} />
    //     </div>
    //   )}
    // </div>

    // <div css={[styles.mainContainer]}>
    //   <img src={imageLink} css={styles.image} />
    // </div>
  );
};

export default CoverDiv;
