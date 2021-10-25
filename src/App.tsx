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

import GameProfile from './pages/GameProfile';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Library from './pages/Library';

// import { useAuthContext } from './context/AuthContext';
import useCurrentUser from './hooks/useCurrentUser';
import FullPageSpinner from './components/FullPageSpinner';

function App() {

  const {currentUser, loading:loadingUser} = useCurrentUser();
  console.log('App || loading:', loadingUser, '- App.CurrentUser:', currentUser);
  if(!loadingUser && !currentUser) console.log( 'APP.BOOM!');

  return (
    <div
      className='App'
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // justifyContent: 'flex-start',
        width: '100vw',
        height: '100vh',
      }}
    >
      <Router>
        <NavBar />

        <Switch>
          <Route path={'/games/:gameId'}>
            <GameProfile />
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
