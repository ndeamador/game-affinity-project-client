/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import Tooltip from '@reach/tooltip';
import { FaSearch } from 'react-icons/fa';
import { Input, Spinner } from './styledComponentsLibrary';

const formStyle = css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
});

const inputStyle = css({
  width: '100%',
  maxWidth: '800px',
  minwidth: '600px',
});

const SearchBar = ({
  handleChange,
  loading,
}: {
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  loading: boolean;
}) => {
  return (
    <form onSubmit={(event) => event.preventDefault()} css={formStyle}>
      <Input
        id='search'
        name='search'
        placeholder='Find a video game...'
        type='text'
        onChange={handleChange}
        css={inputStyle}
      />
      <Tooltip label='Search Games'>
        <label htmlFor='search'>
          <button
            type='submit'
            css={{
              border: '0',
              position: 'relative',
              marginLeft: '-35px',
              background: 'transparent',
            }}
          >
            {loading ? <Spinner /> : <FaSearch aria-label='search' />}
          </button>
        </label>
      </Tooltip>
    </form>
  );
};

export default SearchBar;
