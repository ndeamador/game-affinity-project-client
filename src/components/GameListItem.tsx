import React from 'react';
import { Game } from '../types';
import placeholderIcon from '../zzz_temp/placeholder.png';

const GameListItem = ({ game }: { game: Game }) => {
  return (
    <div key={game.id} style={{ display: 'flex', margin: 10 }}>
      <div>
        <img src={placeholderIcon} width='25' />
      </div>
      <div>
        <h3 style={{ margin: 0 }}>{game.name}</h3>
        {/* <p>{game.summary}</p> */}
      </div>
    </div>
  );
};

export default GameListItem;
