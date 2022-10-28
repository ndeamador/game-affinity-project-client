/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { FIND_GAMES } from 'graphql/queries';
import GameList from 'components/shared/GameList';
import { useDebounce } from 'use-debounce';
import GenericContainer from 'components/shared/GenericContainer';
import useClickedOutOfElement from 'hooks/useClickedOutOfElement';
import SearchBar from './SearchBar';
import styles from './index.styles';
import ErrorMessage from 'components/shared/ErrorMessage';

const Home = () => {
  const [games, setGames] = useState([]);
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query, 250, { leading: true }); // https://www.npmjs.com/package/use-debounce
  const [findGames, { loading, error }] = useLazyQuery(FIND_GAMES, {
    fetchPolicy: 'cache-first',
    onCompleted: (result) => {
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
    if (debouncedQuery) {
      findGames({ variables: { name: debouncedQuery } });
    }
  }, [debouncedQuery]);

  return (
    <div id='Home page div' css={styles.mainDiv} ref={ref}>
      <GenericContainer additionalStyle={styles.containerStyle}>
        <SearchBar setQuery={setQuery} loading={loading} />
        {error ? (
          <ErrorMessage variant='stacked' css={styles.error}>
            Something went wrong. Failed to fetch games.
          </ErrorMessage>
        ) : debouncedQuery && !loading ? (
          <GameList games={games} />
        ) : null}
      </GenericContainer>
    </div>
  );
};

export default Home;
