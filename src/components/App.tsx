/** @jsxImportSource @emotion/react */
import 'normalize.css';
import '@reach/dialog/styles.css';
import '@reach/tooltip/styles.css';
import '../styles/global.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import GameProfile from './views/GameProfile';
import NavBar from './NavBar';
import Home from './views/Home';
import Library from './views/Library';

import useCurrentUser from '../hooks/useCurrentUser';
import Ranking from './views/Ranking';
import Background from './Background';
import { createContext } from 'react';
import { BounceBoxUseStateContext } from '../types';
import useBounceBoxes from '../hooks/useBounceBoxes';
import { useQuery } from '@apollo/client';
import { GET_RANKING } from '../graphql/queries';
import styles from './App.styles';

function App() {
  const { currentUser, loading: loadingUser } = useCurrentUser();
  const { bounceBoxes, storeBounceBox } = useBounceBoxes();
  useQuery(GET_RANKING, { fetchPolicy: 'cache-first' });

  return (
    <BounceBoxesContext.Provider value={{ bounceBoxes, storeBounceBox }}>
      <div className='App' css={styles.bodyStyle}>
        <Background bounceBoxes={bounceBoxes} />

        <Router>
          <NavBar />
          <div className='AppContentContainer' css={styles.contentStyle}>
            <Switch>
              <Route path={'/games/:gameId'}>
                <GameProfile currentUser={currentUser} />
              </Route>

              <Route path={'/ranking'}>
                <Ranking />
              </Route>

              <Route path={'/library'}>
                {!loadingUser && !currentUser ? (
                  <Redirect to='/' />
                ) : (
                  <Library currentUser={currentUser} />
                )}
              </Route>

              <Route path='/'>
                <Home />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    </BounceBoxesContext.Provider>
  );
}

export default App;

export const BounceBoxesContext = createContext<BounceBoxUseStateContext>({
  bounceBoxes: undefined,
  storeBounceBox: () => undefined,
});
