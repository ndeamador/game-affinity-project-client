import { Game } from '../types';
import GameListItem from './GameListItem';

const GameList = ({ games, ranked }: { games: Game[]; ranked?: boolean }) => {
  // Remember that using the mapped object's indexes for the key property is an anti-pattern, use unique id instead
  // https://robinpokorny.medium.com/index-as-a-key-is-an-anti-pattern-e0349aece318

  return (
    <div>
      {games.length > 0 ? (
        games.map((game) => (
          <GameListItem key={game.id} game={game} ranked={ranked} />
        ))
      ) : (
        <div>No games found</div>
      )}
    </div>
  );
};

export default GameList;
