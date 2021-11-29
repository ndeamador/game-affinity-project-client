/** @jsxImportSource @emotion/react */

import { useQuery } from '@apollo/client';
import { css } from '@emotion/react';
import { useState } from 'react';
import FullPageSpinner from '../components/FullPageSpinner';
import GameList from '../components/GameList';
import { GET_RANKING } from '../graphql/queries';
import { Game } from '../types';

const style = css({
  display: 'flex',
  flexDirection: 'column',
});

const Ranking = () => {
  const { data, loading: loadingGames, error } = useQuery(GET_RANKING);
  const [genreFilter, setGenreFilter] = useState('All');
  if (error) return <div>Something went wrong: ${error.message}</div>;

  if (loadingGames) return <FullPageSpinner />;
  if (!data) return <div>No games are rated yet.</div>;


  const genres: string[] = [
    ...new Set<string>( // Set is just to isolate unique values.
      data.getRankedGames
        .map((game: Game) => game.genres.map((genre) => genre.name))
        .reduce((acc: string[], current: string[]) => {
          acc.push(...current);
          return acc;
        }, [])
    ),
  ];

  const gamesToDisplay =
    genreFilter === 'All'
      ? data.getRankedGames
      : data.getRankedGames.filter(
          (game: Game) =>
            game.genres.findIndex((genre) => genre.name === genreFilter) !== -1
        );

  return (
    <div css={style}>
      <div>
        <button onClick={() => setGenreFilter('All')}>All genres</button>
        {genres.map((genre) => (
          <button key={genre} onClick={() => setGenreFilter(genre)}>
            {genre}
          </button>
        ))}
      </div>
      <GameList games={gamesToDisplay} ranked />
    </div>
  );
};

export default Ranking;
