/** @jsxImportSource @emotion/react */

import Button from 'components/shared/Button';
import styles from './GenreFiltersBox.styles';

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
    <div css={styles.container}>
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
