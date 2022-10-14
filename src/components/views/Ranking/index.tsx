/** @jsxImportSource @emotion/react */

import { useQuery } from '@apollo/client';
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import GenreFiltersBox from './GenreFiltersBox';
import FullPageSpinner from '../../shared/FullPageSpinner';
import GameList from '../../shared/GameList';
import GenericContainer from '../../shared/GenericContainer';
import { GET_RANKING } from '../../../graphql/queries';
import { Game } from '../../../types';
import Notification from '../../shared/Notification';
import { Link } from 'react-router-dom';

const styles = {
  containerStyle: css({
    display: 'flex',
    flexDirection: 'column',
  }),
  noRatingsNotification: css({
    flexDirection: 'column',
  }),
};

const Ranking = () => {
  const {
    data,
    loading: loadingGames,
    error,
  } = useQuery(GET_RANKING, { fetchPolicy: 'cache-first' });
  const [genreFilter, setGenreFilter] = useState('All');
  const [displayOtherFilter, setDisplayOtherFilter] = useState(false);

  useEffect(() => {
    if (data?.getRankedGames?.find((game: Game) => game.genres == null))
      setDisplayOtherFilter(true);
  }, [data]);

  if (error)
    return <Notification>Something went wrong: {error?.message}</Notification>;

  if (loadingGames) return <FullPageSpinner />;
  if (!data || !data.getRankedGames || data.getRankedGames.length == 0)
    return (
      <Notification additionalStyle={styles.noRatingsNotification}>
        <p>No one has rated any games yet!</p>
        <Link to={'/home'}>Click here to find games and start rating!</Link>
      </Notification>
    );

  console.log('data:', data);

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

  // The ranking already comes sorted from the backend, but this is useful in case the client's cache is manually updated optimistically.
  const sortedGamesToDisplay = [...gamesToDisplay].sort((a: Game, b: Game) =>
    a.average_rating && b.average_rating
      ? a.average_rating > b.average_rating
        ? -1
        : 1
      : 0
  );

  return (
    <GenericContainer additionalStyle={styles.containerStyle}>
      <GenreFiltersBox
        genreFilter={genreFilter}
        setGenreFilter={setGenreFilter}
        genres={genres}
        displayOtherFilter={displayOtherFilter}
      />
      <GameList games={sortedGamesToDisplay} ranked />
    </GenericContainer>
  );
};

export default Ranking;
