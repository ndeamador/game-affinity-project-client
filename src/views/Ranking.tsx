/** @jsxImportSource @emotion/react */

import { useQuery } from '@apollo/client';
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import GenreFiltersBox from '../components/GenreFiltersBox';
import FullPageSpinner from '../components/FullPageSpinner';
import GameList from '../components/GameList';
import GenericContainer from '../components/GenericContainer';
import { GET_RANKING } from '../graphql/queries';
import { Game } from '../types';
import Notification from '../components/Notification';

const containerStyle = css({
  display: 'flex',
  flexDirection: 'column',
});

const Ranking = () => {
  const { data, loading: loadingGames, error } = useQuery(GET_RANKING);
  const [genreFilter, setGenreFilter] = useState('All');
  const [displayOtherFilter, setDisplayOtherFilter] = useState(false);

  useEffect(() => {
    if (data?.getRankedGames?.find((game: Game) => game.genres == null))
      setDisplayOtherFilter(true);
  }, [data]);

  if (error)
    return <Notification>Something went wrong: {error?.message}</Notification>;

  if (loadingGames) return <FullPageSpinner />;
  if (!data || !data.getRankedGames)
    return <Notification>No games are rated yet.</Notification>;

  const genres: string[] = [
    ...new Set<string>( // Set is just to isolate unique values.
      data.getRankedGames
        .map(
          (game: Game) =>
            game.genres ? game.genres?.map((genre) => genre.name) : [] // workaround to filter games with no genre.
        )
        .reduce((acc: string[], current: string[]) => {
          acc.push(...current);
          return acc;
        }, [])
    ),
  ];

  const gamesToDisplay =
    genreFilter === 'All'
      ? data.getRankedGames
      : genreFilter === 'Other'
      ? data.getRankedGames.filter((game: Game) => game.genres == null)
      : data.getRankedGames.filter(
          (game: Game) =>
            game.genres &&
            game.genres.findIndex((genre) => genre.name === genreFilter) !== -1
        );

  return (
    <GenericContainer additionalStyle={containerStyle}>
      <GenreFiltersBox
        genreFilter={genreFilter}
        setGenreFilter={setGenreFilter}
        genres={genres}
        displayOtherFilter={displayOtherFilter}
      />
      <GameList games={gamesToDisplay} ranked />
    </GenericContainer>
  );
};

export default Ranking;
