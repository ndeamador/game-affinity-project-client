/** @jsxImportSource @emotion/react */
import { Game } from '../types';
import { CgGames } from 'react-icons/cg';

const CoverDiv = ({ game }: { game: Game }) => {
  // Setting image resolution from url: https://api-docs.igdb.com/#images
  const imageSize = 'thumb';
  const imageLink = `//images.igdb.com/igdb/image/upload/t_${imageSize}/${game.cover?.image_id}.jpg`;

  return (
    <div
      className='ImageDiv'
      css={{ /* width: '90px',  */height: '100%', maxwidth: '90px' }}
    >
      {game.cover ? (
        <img src={imageLink} css={{ height: '100%', borderRadius: '8px' }} />
      ) : (
        <CgGames
          css={{
            // width: '100%',
            // height: 'auto',
            width: 'auto',
            height: '100%',
            border: 'solid 2px lightgrey',
            borderRadius: 'var(--border-radius)',
            padding: '8px',
            boxSizing: 'border-box',
            margin: '0px',
          }}
        />
      )}
    </div>
  );
};

export default CoverDiv;
