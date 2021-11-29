/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';

import { useLazyQuery } from '@apollo/client';
import { FIND_GAMES } from '../graphql/queries';
import GameList from '../components/GameList';
import { useDebounce } from 'use-debounce';
import { Tooltip } from '@reach/tooltip';
import { Spinner } from '../components/styledComponentsLibrary';
import { FaSearch } from 'react-icons/fa';
import { css } from '@emotion/react';
import SearchBar from '../components/SearchBar';

const style = css({
  display: 'flex',
  flexDirection: 'column',
  // justifyContent: 'center',
  alignItems: 'stretch',
  marginTop: '15vh',
  maxWidth: 'var(--searchbar-max-width)',
});

// const formStyle = css({
//   display: 'flex',
//   flexDirection: 'row',
//   alignItems: 'center',
//   justifyContent: 'center',
//   width: '100%',
// });

const Home = () => {
  const [games, setGames] = useState([]);
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query, 250); //https://www.npmjs.com/package/use-debounce
  const [findGames, { loading, error }] = useLazyQuery(FIND_GAMES, {
    onCompleted: (result) => {
      console.log('Home found games: ', result);
      setGames(result.findGames);
    },
    onError: (err) => {
      console.log(err.message);
    },
  });
  const handleGameQueryChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    if (query === '') {
      setGames([]); // Prevents the results from the last query to appear in a new one.
      return;
    }
    findGames({ variables: { name: debouncedQuery } });
  }, [debouncedQuery]);

  return (
    <div id='Home page div' css={style}>
      {/* <form onSubmit={(event) => event.preventDefault()} css={formStyle}>
        <SearchBar handleChange={handleGameQueryChange} />

        <Tooltip label='Search Games'>
          <label htmlFor='search'>
            <button
              type='submit'
              css={{
                border: '0',
                position: 'relative',
                marginLeft: '-35px',
                background: 'transparent',
              }}
            >
              {loading ? <Spinner /> : <FaSearch aria-label='search' />}
            </button>
          </label>
        </Tooltip>
      </form> */}
      <SearchBar handleChange={handleGameQueryChange} loading={loading} />

      {error ? (
        <div>Something went wrong.</div>
      ) : query && !loading ? (
        <GameList games={games} />
      ) : null}
      {/* {query && !loading ? <GameList games={games} /> : null} */}
    </div>
  );
};

export default Home;
