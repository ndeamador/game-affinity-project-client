import React from 'react';

const SearchBar = ({
  handleQueryChange,
  placeholderText,
  id,
}: {
  handleQueryChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholderText?: string;
  id?: string;
}) => {
  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <input
        id={id}
        name='search'
        placeholder={placeholderText}
        type='text'
        onChange={handleQueryChange}
      />
    </form>
  );
};

export default SearchBar;
