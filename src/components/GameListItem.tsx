/** @jsxImportSource @emotion/react */
import { Game } from '../types';
import placeholderIcon from '../zzz_temp/placeholder.png';
import { Link } from 'react-router-dom';

const GameListItem = ({ game }: { game: Game }) => {
  const handleClick = () => {
    console.log('clicked', game.id);
  };

  return (
    <Link
      to={`/game/${game.id}`}
      key={game.id}
      onClick={handleClick}
      css={{ textDecoration: 'none' }}
    >
      <div
        css={{
          display: 'flex',
          alignItems: 'center',
          margin: '10px 0px',
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
        <div>
          <img src={placeholderIcon} width='25' />
        </div>
        <h3 css={{ margin: 0 }}>{game.name}</h3>
      </div>
    </Link>
  );
};

export default GameListItem;
