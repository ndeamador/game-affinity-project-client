import { Game } from '../types';
import placeholderIcon from '../zzz_temp/placeholder.png';
import { Link } from 'react-router-dom';

const GameListItem = ({ game }: { game: Game }) => {
  const handleClick = () => {
    console.log('clicked', game.id);
  };

  return (
      <Link to={`/game/${game.id}`} key={game.id} onClick={handleClick}>
        <div style={{ display: 'flex', margin: 10 }}>
          <div>
            <img src={placeholderIcon} width='25' />
          </div>
          <div>
            <h3 style={{ margin: 0 }}>{game.name}</h3>
          </div>
        </div>
      </Link>
  );
};

export default GameListItem;
