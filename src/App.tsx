/** @jsxImportSource @emotion/react */
import '@reach/dialog/styles.css';
import '@reach/tooltip/styles.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import GameProfile from './pages/GameProfile';
import NavBar from './components/NavBar';
import GameSearchDropList from './components/GameSearchDropList';
import Library from './pages/Library';

function App() {
  return (
    <div
      className='App'
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // justifyContent: 'flex-start',
        width: '100%',
        height: '100vh',
      }}
    >
      <Router>
        <NavBar />

        <Switch>
          <Route path={'/game/:gameId'}>
            <GameProfile />
          </Route>

          <Route path={'/library'}>
            <Library />
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
