import React, { useEffect, useState } from 'react';

import { useLazyQuery } from '@apollo/client';
import { FIND_GAMES } from './graphql/queries';

import '@reach/dialog/styles.css';
import { Dialog } from '@reach/dialog';

import GameList from './components/GameList';
import SearchBar from './components/SearchBar';
import LoginForm from './components/LoginForm';

function App() {
  const [games, setGames] = useState([]);
  const [query, setQuery] = useState('');
  const [findGames] = useLazyQuery(FIND_GAMES, {
    onCompleted(result) {
      console.log(result);
      setGames(result.findGames);
    },
  });

  // MODALS
  const [openModal, setOpenModal] = useState('none');

  // GAME SEARCH
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
    findGames({ variables: { name: query } });
  }, [query]);

  // REGISTER AND LOGIN
  const login = () => {
    console.log('login');
  };

  const register = () => {
    console.log('register');
  };

  return (
    <div className='App'>
      <div style={{ display: 'flex' }}>
        <h3>TEMP NAV</h3>
        <div>
          <button onClick={() => setOpenModal('login')}>Login</button>
        </div>
        <div>
          <button onClick={() => setOpenModal('register')}>Register</button>
        </div>
        <Dialog aria-label='Login form' isOpen={openModal === 'login'}>
          <div>
            <button onClick={() => setOpenModal('none')}>Close</button>
          </div>
          <h3>Login</h3>
          <LoginForm onSubmit={login} buttonLabel='Login' />
        </Dialog>
        <Dialog
          aria-label='Registration form'
          isOpen={openModal === 'register'}
        >
          <div>
            <button onClick={() => setOpenModal('none')}>Close</button>
          </div>
          <h3>Register</h3>
          <LoginForm onSubmit={register} buttonLabel='Register' />
        </Dialog>
      </div>

      <SearchBar
        handleQueryChange={handleGameQueryChange}
        placeholderText='Find a game...'
      />
      {query ? <GameList games={games} /> : null}
    </div>
  );
}

export default App;
