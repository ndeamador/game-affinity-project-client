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

import GameProfile from './components/views/GameProfile';
import NavBar from './components/NavBar';
import Home from './components/views/Home';
import Library from './components/views/Library';

import useCurrentUser from './hooks/useCurrentUser';
import Ranking from './components/views/Ranking';
import { css } from '@emotion/react';
import Background from './components/Background';
import { createContext, useState } from 'react';
import { BounceBoxUseStateContext } from './types';
import useBounceBoxes from './hooks/useBounceBoxes';
import { useQuery } from '@apollo/client';
import { GET_RANKING } from './graphql/queries';

const bodyStyle = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  width: '100vw',
  height: '100vh',
  // '& > *': {
  //   width: '80vw',
  //   maxWidth: '1200px',
  // }
});

const contentStyle = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '80vw',
  maxWidth: '1200px',
  paddingTop: 'calc(5vh + var(--navbar-height))',
  '& > *': {
    width: '100%',
  },
});

function App() {
  const { currentUser, loading: loadingUser } = useCurrentUser();
  const { bounceBoxes, storeBounceBox } = useBounceBoxes();
  useQuery(GET_RANKING, { fetchPolicy: 'cache-first' });

  return (
    <BounceBoxesContext.Provider value={{ bounceBoxes, storeBounceBox }}>
      <div className='App' css={bodyStyle}>
        <Background bounceBoxes={bounceBoxes} />

        <Router>
          <NavBar />
          <div className='AppContentContainer' css={contentStyle}>
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
