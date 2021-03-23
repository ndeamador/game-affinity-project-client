import React, { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';

import { useLazyQuery } from '@apollo/client';
import { FIND_GAMES } from './queries';

import GameList from './components/GameList';

function App() {
  const [findGames, result] = useLazyQuery(FIND_GAMES);
  const [games, setGames] = useState([]);
  const [query, setQuery] = useState('');

  const searchGames = (name: string) => {
    findGames({ variables: { name } });
  };

  useEffect(() => {
    if (result.data) {
      setGames(result.data.findGames);
    }
  }, [result]);

  console.log('useState games:', games);

  // Temp search logic
  const handleGameQueryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    if (query !== '') {
      searchGames(query);
    }
  }, [query]);

  return (
    <div className='App'>
      <SearchBar
        handleQueryChange={handleGameQueryChange}
        placeholderText='Find a game...'
      />
      {query ? <GameList games={games} /> : null}
    </div>
  );
}

export default App;
