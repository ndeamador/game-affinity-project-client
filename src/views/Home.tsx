/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState } from 'react';

import { useLazyQuery } from '@apollo/client';
import { FIND_GAMES } from '../graphql/queries';
import GameList from '../components/GameList';
import { useDebounce } from 'use-debounce';

import { css } from '@emotion/react';
import SearchBar from '../components/SearchBar';
import GenericContainer from '../components/GenericContainer';
import useClickedOutOfElement from '../hooks/useClickedOutOfElement';

const style = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  maxWidth: 'var(--searchbar-max-width)',
  marginTop: 'var(--searchbar-margin-top)',
});

const containerStyle = css({
  flexDirection: 'column',
});

const Home = () => {
  const [games, setGames] = useState([]);
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query, 250, { leading: true }); // https://www.npmjs.com/package/use-debounce
  const [findGames, { loading, error }] = useLazyQuery(FIND_GAMES, {
    fetchPolicy: 'cache-first',
    onCompleted: (result) => {
      console.log('Home found games: ', result);
      setGames(result.findGames);
    },
    onError: (err) => {
      console.log(err.message);
    },
  });

  // Reset query to collapse results when clicking outside the element.
  const ref = useRef<HTMLDivElement>(null);
  const [clickedOutside] = useClickedOutOfElement(ref);
  useEffect(() => {
    if (clickedOutside) {
      setQuery('');
    }
  }, [clickedOutside]);

  useEffect(() => {
    // if (query === '') {
    //   setGames([]); // Prevents the results from the last query to appear in a new one.
    //   return;
    // }
    if (debouncedQuery) {
      findGames({ variables: { name: debouncedQuery } });
    }
  }, [debouncedQuery]);

  return (
    <div id='Home page div' css={style} ref={ref}>
      <GenericContainer additionalStyle={containerStyle}>
        <SearchBar setQuery={setQuery} loading={loading} />
        {error ? (
          <div>Something went wrong.</div>
        ) : debouncedQuery && !loading ? (
          <GameList games={games} />
        ) : null}
        {/* {query && !loading ? <GameList games={games} /> : null} */}
      </GenericContainer>
    </div>
  );
};

export default Home;
