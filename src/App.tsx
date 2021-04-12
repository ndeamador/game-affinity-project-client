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

import AuthContext from './context/AuthContext';

function App() {
  const {
    authenticatedUser: currentUser,
    loading: loadingUser,
  } = useCurrentUser();
  console.log('app user: ', currentUser, ' - loadingUser: ', loadingUser);

  const contextProps = { currentUser };

  return (
    <AuthContext.Provider value={contextProps}>
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

            {/* <Route path={'/library'}>
            {currentUser ? (
              <Library />
            ) : loadingUser ? (
              <FullPageSpinner />
            ) : (
              <Redirect to='/' />
            )}
          </Route> */}

            {/* <Route path={'/library'}>
            <Library />
            {!currentUser && <Redirect to='/' />}
          </Route> */}

            <Route path={'/library'}>
              {!currentUser ? (
                <Redirect to='/' />
              ) : loadingUser ? (
                <FullPageSpinner />
              ) : (
                <Library />
              )}
            </Route>

            <Route path='/'>
              <Home />
            </Route>
          </Switch>
        </Router>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
