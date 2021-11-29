/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { Input } from './styledComponentsLibrary';

const style = css({
  width: '100%',
  maxWidth: '800px',
  minwidth: '600px',
});

const SearchBar = ({
  handleChange,
}: {
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
}) => {
  return (
    <Input
      id='search'
      name='search'
      placeholder='Find a game...'
      type='text'
      onChange={handleChange}
      css={style}
    />
  );
};

export default SearchBar;
