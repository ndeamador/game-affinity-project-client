/** @jsxImportSource @emotion/react */
import { Game } from '../types';
import { Link } from 'react-router-dom';
// import { CgGames } from 'react-icons/cg';
import AddGameToLibraryButton from './AddToLibraryButton';
import PlatformIcons from './PlatformIcons';
import ReleaseDeveloperRow from '../components/ReleaseDeveloperRow';
import CoverDiv from './CoverDiv';

import { useEffect } from 'react';
import useLazyCurrentUser from '../hooks/useLazyCurrentUser';
import AverageRatingDiv from './AverageRatingDiv';

const GameListItem = ({ game, ranked }: { game: Game; ranked?: boolean }) => {
  // const { currentUser } = useAuthContext();
  const {
    getCurrentUser,
    currentUser,
    loading,
    error: getUserError,
  } = useLazyCurrentUser();
  useEffect(() => {
    getCurrentUser();

    // }, [findGames]);
  }, [getCurrentUser]);

  // // Setting image resolution from url: https://api-docs.igdb.com/#images
  // const imageSize = 'thumb';
  // const imageLink = `//images.igdb.com/igdb/image/upload/t_${imageSize}/${game.cover?.image_id}.jpg`;

  return (
    <Link
      to={`/games/${game.id}`}
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
          borderRadius: 'var(--border-radius)',
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
        {/* <div
          className='ImageDiv'
          css={{ width: '90px', height: 'auto', maxwidth: '90px' }}
        >
          {game.cover ? (
            <img src={imageLink} css={{ width: '100%', borderRadius: borderRadius: 'var(--border-radius)',
 }} />
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
        </div> */}
        {ranked && game.average_rating && (
          <AverageRatingDiv rating={game.average_rating} />
        )}
        <CoverDiv game={game} />

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

          {/* <div className='dateDevRow' css={{
            display: 'flex',
            flexDirection: 'row',
            '> *': {
              margin: '0',
            },
          }}>
            {game.first_release_date && (
              <p css={{ margin: 0 }}>
                {convertMilisecondsToDate(game.first_release_date).year}
              </p>
            )}

            {game.first_release_date && game.involved_companies && <p css={{padding: '0 5px'}}>-</p>}

            {game.involved_companies &&
              game.involved_companies.map((involvedCompany) => {
                if (involvedCompany.developer)
                  return <p key={involvedCompany.id}>{involvedCompany.company.name}</p>;
              })}
          </div> */}

          {/* The game && shouldn't be necessary, but I'm getting a `state update on unmounted component` warning. */}
          <ReleaseDeveloperRow game={game} />

          <PlatformIcons platforms={game.platforms} />
        </div>
        {currentUser && <AddGameToLibraryButton gameId={game.id} />}
      </div>
    </Link>
  );
};

export default GameListItem;
