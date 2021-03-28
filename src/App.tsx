import React from 'react';

import '@reach/dialog/styles.css';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import GameProfile from './views/GameProfile';
import NavBar from './components/NavBar';
import GameSearchDropList from './components/GameSearchDropList';

function App() {

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

          <NavBar/>
        </div>

        <Switch>
          <Route path={'/game/:gameId'}>
            <GameProfile />
          </Route>

          <Route path='/'>
            <GameSearchDropList />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
