import React, { useEffect, useState } from 'react';

import { useLazyQuery } from '@apollo/client';
import { FIND_GAMES } from './graphql/queries';

import '@reach/dialog/styles.css';

import GameList from './components/GameList';
import SearchBar from './components/SearchBar';
import GameProfile from './views/GameProfile';
import NavBar from './components/NavBar';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import { useDebounce } from 'use-debounce';

function App() {
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

  const padding = {
    padding: 5,
  };

  return (
    <div className='App'>
      <Router>
        <div style={{ display: 'flex' }}>
          <Link style={padding} to='/'>
            home
          </Link>
          <Link style={padding} to='/placeholder'>
            notes
          </Link>

          <NavBar />
        </div>

        <Switch>
          <Route path='/placeholder'>{/* <placeholder /> */}</Route>

          <Route path={'/game/:gameId'}>
            <GameProfile />
          </Route>

          <Route path='/'>
            <SearchBar
              handleQueryChange={handleGameQueryChange}
              placeholderText='Find a game...'
            />
            {query ? <GameList games={games} /> : null}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
