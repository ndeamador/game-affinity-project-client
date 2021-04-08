/** @jsxImportSource @emotion/react */
import { Game } from '../types';
import { Link } from 'react-router-dom';
import { CgGames } from 'react-icons/cg';
import AddGameToLibraryButton from './AddToLibraryButton';
import useLazyCurrentUser from '../hooks/useLazyCurrentUser';
import { useEffect } from 'react';
import { convertMilisecondsToDate } from '../utils/misc';
import PlatformIconSelector from './PlatformIconSelector';

const GameListItem = ({ game }: { game: Game }) => {
  const [getCurrentUser, { data }] = useLazyCurrentUser();
  const userLoggedIn = data?.me;

  console.log('game:', game);

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  // Setting image resolution from url: https://api-docs.igdb.com/#images
  const imageSize = 'thumb';
  const imageLink = `//images.igdb.com/igdb/image/upload/t_${imageSize}/${game.cover?.image_id}.jpg`;

  return (
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
          {game.first_release_date && (
            <p css={{ margin: 0 }}>
              {convertMilisecondsToDate(game.first_release_date).year}
            </p>
          )}
          <div>
            {userLoggedIn && (
              <PlatformIconSelector platforms={game.platforms} />
            )}
          </div>
        </div>
        {userLoggedIn && <AddGameToLibraryButton gameId={game.id} />}
      </div>
    </Link>
  );
};

export default GameListItem;
