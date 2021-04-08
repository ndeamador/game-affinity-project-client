/** @jsxImportSource @emotion/react */
import { Game } from '../types';
import { Link } from 'react-router-dom';
import { CgGames } from 'react-icons/cg';
import AddGameToLibraryButton from './AddToLibraryButton';
import useLazyCurrentUser from '../hooks/useLazyCurrentUser';
import { useEffect } from 'react';

const GameListItem = ({ game }: { game: Game }) => {
  const [getCurrentUser, { data }] = useLazyCurrentUser();
  const userLoggedIn = data?.me;

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);
  console.log('gamelist user: ', userLoggedIn);

  // Setting image resolution from url: https://api-docs.igdb.com/#images
  const imageSize = 'thumb';
  const imageLink = `//images.igdb.com/igdb/image/upload/t_${imageSize}/${game.cover?.image_id}.jpg`;

  return (
    // <div css={{ display: 'flex', flexDirection: 'row' }}>
    <Link
      to={`/game/${game.id}`}
      key={game.id}
      css={{ textDecoration: 'none' }}
    >
      <div
        css={{
          display: 'flex',
          alignItems: 'stretch',
          margin: '0',
          color: 'black',
          padding: '10px',
          borderRadius: '8px',
          boxSizing: 'border-box',
          transitionDuration: '0.2s',
          transitionProperty: 'background-color, box-shadow',
          ':hover': {
            // outline: '1px solid lightgrey',
            // border: '1px solid lightgrey',
            boxShadow: '0 0 0 1px lightgrey',
            backgroundColor: 'ghostwhite',
            transitionDuration: '0s',
            transitionProperty: 'background-color, box-shadow',
          },
        }}
      >
        <div
          className='ImageDiv'
          css={{ width: '90px', height: 'auto', maxwidth: '90px' }}
        >
          {game.cover ? (
            <img src={imageLink} css={{ width: '100%', borderRadius: '8px' }} />
          ) : (
            <CgGames
              css={{
                width: '100%',
                height: 'auto',
                border: 'solid 2px lightgrey',
                borderRadius: '8px',
                padding: '8px',
                boxSizing: 'border-box',
              }}
            />
          )}
        </div>
        <div
          css={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            paddingLeft: '20px',
            width: '100%',
          }}
        >
          <h3 css={{ margin: 0 }}>{game.name}</h3>
          {game.firstReleaseDate && <p>{game.firstReleaseDate}</p>}
        </div>
        {userLoggedIn && <AddGameToLibraryButton gameId={game.id} />}
      </div>
    </Link>
    // </div>
  );
};

export default GameListItem;
