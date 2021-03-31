/** @jsxImportSource @emotion/react */
import '@reach/dialog/styles.css';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import GameProfile from './pages/GameProfile';
import NavBar from './components/NavBar';
import GameSearchDropList from './components/GameSearchDropList';

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

          <Route path='/'>

            <GameSearchDropList />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
