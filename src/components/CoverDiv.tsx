/** @jsxImportSource @emotion/react */
import { Game } from '../types';
import { CgGames } from 'react-icons/cg';
import { css } from '@emotion/react';

const containerStyle = css({
  display: 'flex',
  maxwidth: 'var(--cover-width)',
  flexShrink: 0,
});

const imageStyle = css({
  height: '100%',
  borderRadius: 'var(--border-radius)',
});

const genericIconStyle = css({
  // width: 'auto',
  // maxwidth: 'var(--cover-width)',
  // minWidth: 'var(--cover-width)',
  width: 'var(--cover-width)',
  height: 'var(--cover-width)',
  // height: '100%',
  border: 'solid 2px var(--color-gray20)',
  borderRadius: 'var(--border-radius)',
  padding: '8px',
});

const CoverDiv = ({ game }: { game: Game }) => {
  // Setting image resolution from url: https://api-docs.igdb.com/#images
  const imageSize = 'thumb';
  const imageLink = `//images.igdb.com/igdb/image/upload/t_${imageSize}/${game.cover?.image_id}.jpg`;

  return (
    <div css={containerStyle}>
      {game.cover ? (
        <img src={imageLink} css={imageStyle} />
      ) : (
        <CgGames css={genericIconStyle} />
      )}
    </div>
  );
};

export default CoverDiv;
