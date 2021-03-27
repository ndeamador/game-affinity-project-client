import React, { useEffect, useState } from 'react';

import { useLazyQuery } from '@apollo/client';
import { FIND_GAMES } from '../graphql/queries';
import GameList from './GameList';
import SearchBar from './SearchBar';
import { useDebounce } from 'use-debounce';

const GameSearchDropList = () => {
  const [games, setGames] = useState([]);
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query, 250); //https://www.npmjs.com/package/use-debounce
  const [findGames] = useLazyQuery(FIND_GAMES, {
    onCompleted(result) {
      console.log(result);
      setGames(result.findGames);
    },
    onError: (err) => {
      console.log(err.message);
    },
  });

  const handleGameQueryChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    if (query === '') {
      setGames([]); // Prevents the results from the last query to appear in a new one.
      return;
    }
    findGames({ variables: { name: debouncedQuery } });
  }, [debouncedQuery]);

  return (
    <>
      <SearchBar
        handleQueryChange={handleGameQueryChange}
        placeholderText='Find a game...'
      />
      {query ? <GameList games={games} /> : null}
    </>
  );
};

export default GameSearchDropList;
