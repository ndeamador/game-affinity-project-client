const GenreFiltersBox = ({
  setGenreFilter,
  genres,
}: {
  setGenreFilter: React.Dispatch<React.SetStateAction<string>>;
  genres: string[];
}) => {
  return (
    <div>
      <button onClick={() => setGenreFilter('All')}>All genres</button>
      {genres.map((genre) => (
        <button key={genre} onClick={() => setGenreFilter(genre)}>
          {genre}
        </button>
      ))}
    </div>
  );
};

export default GenreFiltersBox;
