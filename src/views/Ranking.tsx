/** @jsxImportSource @emotion/react */

import { useQuery } from '@apollo/client';
import { css } from '@emotion/react';
import { useState } from 'react';
import GenreFiltersBox from '../components/GenreFiltersBox';
import FullPageSpinner from '../components/FullPageSpinner';
import GameList from '../components/GameList';
import GenericContainer from '../components/GenericContainer';
import { ErrorNotification } from '../components/styledComponentsLibrary';
import { GET_RANKING } from '../graphql/queries';
import { Game } from '../types';

const containerStyle = css({
  display: 'flex',
  flexDirection: 'column',
  // justifyContent: 'center',
});

const Ranking = () => {
  const { data, loading: loadingGames, error } = useQuery(GET_RANKING);
  const [genreFilter, setGenreFilter] = useState('All');
  if (error)
    return (
      <ErrorNotification variant='inline'>
        Something went wrong: {error.message}
      </ErrorNotification>
    );

  if (loadingGames) return <FullPageSpinner />;
  if (!data)
    return (
      <ErrorNotification variant='inline'>
        No games are rated yet.
      </ErrorNotification>
    );

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
    // <div css={containerStyle}>
      <GenericContainer additionalStyle={containerStyle}>
        <GenreFiltersBox genreFilter={genreFilter} setGenreFilter={setGenreFilter} genres={genres}/>
        <GameList games={gamesToDisplay} ranked />
      </GenericContainer>
    // </div>
  );
};

export default Ranking;
