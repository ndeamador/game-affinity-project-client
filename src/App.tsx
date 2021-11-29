/** @jsxImportSource @emotion/react */
import 'normalize.css';
import '@reach/dialog/styles.css';
import '@reach/tooltip/styles.css';
import './styles/global.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import GameProfile from './views/GameProfile';
import NavBar from './components/NavBar';
import Home from './views/Home';
import Library from './views/Library';

import useCurrentUser from './hooks/useCurrentUser';
import Ranking from './views/Ranking';
import { css } from '@emotion/react';

const style = css({
  // display: 'flex',
  // flexDirection: 'column',
  // alignItems: 'center',
  // justifyContent: 'flex-start',
  width: '100vw',
  height: '100vh',
});

function App() {
  const { currentUser, loading: loadingUser } = useCurrentUser();
  console.log('----App: ', currentUser?.email, currentUser?.gamesInLibrary);

  return (
    <div className='App' css={style}>
      <Router>
        <NavBar />

        <Switch>
          <Route path={'/games/:gameId'}>
            <GameProfile />
          </Route>

          <Route path={'/ranking'}>
            <Ranking />
          </Route>

          <Route path={'/library'}>
            {!loadingUser && !currentUser ? <Redirect to='/' /> : <Library />}
          </Route>

          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
