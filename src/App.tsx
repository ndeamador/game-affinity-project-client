/** @jsxImportSource @emotion/react */
import '@reach/dialog/styles.css';
import '@reach/tooltip/styles.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import GameProfile from './pages/GameProfile';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Library from './pages/Library';
import useCurrentUser from './hooks/useCurrentUser';
import FullPageSpinner from './components/FullPageSpinner';
import { useLazyQuery } from '@apollo/client';
import { FIND_GAMES } from './graphql/queries';

function App() {
  const {
    authenticatedUser: userLoggedIn,
    loading: loadingUser,
  } = useCurrentUser();
  console.log('app user: ', userLoggedIn, ' - loadingUser: ', loadingUser);

  const [findGames, { data: games, loading: loadingGames }] = useLazyQuery(
    FIND_GAMES
  );

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
        <NavBar userLoggedIn={userLoggedIn} />

        <Switch>
          <Route path={'/game/:gameId'}>
            <GameProfile userLoggedIn={userLoggedIn} />
          </Route>

          {/* <Route path={'/library'}>
            {userLoggedIn ? (
              <Library />
            ) : loadingUser ? (
              <FullPageSpinner />
            ) : (
              <Redirect to='/' />
            )}
          </Route> */}

          {/* <Route path={'/library'}>
            <Library />
            {!userLoggedIn && <Redirect to='/' />}
          </Route> */}


          <Route path={'/library'}>
            {!userLoggedIn ? (
              <Redirect to='/' />
            ) : loadingUser ? (
              <FullPageSpinner />
            ) : (
              <Library userLoggedIn={userLoggedIn}/>
            )}
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
