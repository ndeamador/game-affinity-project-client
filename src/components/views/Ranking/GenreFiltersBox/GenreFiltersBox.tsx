/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { Button } from '../../../shared/styledComponentsLibrary';

const style = css({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  padding: 'var(--border-radius)',
  // marginBottom: 'var(--border-radius)',
  // rowGap: '15px',
  gap: 'var(--border-radius)',
  '> .selected': {
    backgroundColor: 'var(--filter-button-hover-active)',
  },
});

const GenreFiltersBox = ({
  genreFilter,
  setGenreFilter,
  genres,
  displayOtherFilter,
}: {
  genreFilter: string;
  setGenreFilter: React.Dispatch<React.SetStateAction<string>>;
  genres: string[];
  displayOtherFilter: boolean;
}) => {
  return (
    <div css={style}>
      <Button
        onClick={() => setGenreFilter('All')}
        variant={'filter'}
        className={genreFilter == 'All' ? 'selected' : ''}
      >
        All genres
      </Button>
      {genres.map((genre) => (
        <Button
          key={genre}
          onClick={() => setGenreFilter(genre)}
          variant={'filter'}
          className={genre == genreFilter ? 'selected' : ''}
        >
          {genre}
        </Button>
      ))}
      {displayOtherFilter && (
        <Button
          onClick={() => setGenreFilter('Other')}
          variant={'filter'}
          className={genreFilter == 'Other' ? 'selected' : ''}
        >
          Other
        </Button>
      )}
    </div>
  );
};

export default GenreFiltersBox;
