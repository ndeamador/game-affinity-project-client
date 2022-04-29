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
import Background from './components/Background/Background';
import { createContext, useState } from 'react';
import { BounceBoxUseStateContext } from './types';

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
  paddingTop: 'calc(50px + var(--navbar-height))',
  '& > *': {
    width: '100%',
  },
});

function App() {
  const { currentUser, loading: loadingUser } = useCurrentUser();
  // console.log('----App: ', currentUser?.email, currentUser?.gamesInLibrary);

  // Context for elements with wich the animated background reacts.
  const [bounceBoxes, setBounceBoxes] = useState<{
    searchBar: DOMRect | undefined;
  }>({ searchBar: undefined });

  return (
    <BounceBoxesContext.Provider value={{ bounceBoxes, setBounceBoxes }}>
      <div className='App' css={bodyStyle}>
        <Background />

        <Router>
          <NavBar />
          <div className='AppContentContainer' css={contentStyle}>
            <Switch>
              <Route path={'/games/:gameId'}>
                <GameProfile />
              </Route>

              <Route path={'/ranking'}>
                <Ranking />
              </Route>

              <Route path={'/library'}>
                {!loadingUser && !currentUser ? (
                  <Redirect to='/' />
                ) : (
                  <Library />
                )}
              </Route>

              <Route path='/'>
                <Home />
              </Route>
            </Switch>
          </div>
          {/* <Switch>
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
        </Switch> */}
        </Router>
      </div>
    </BounceBoxesContext.Provider>
  );
}

export default App;

export const BounceBoxesContext = createContext<BounceBoxUseStateContext>({
  bounceBoxes: { searchBar: undefined },
  setBounceBoxes: () => undefined,
});
