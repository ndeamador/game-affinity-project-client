/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import Tooltip from '@reach/tooltip';
import { useContext, useEffect, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import { BounceBoxesContext } from '../App';
import useWindowSize from '../hooks/useWindowSize';
import getDOMRect from '../utils/getDOMRect';
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
  const bounceContext = useContext(BounceBoxesContext);
  const searchBarRef = useRef<HTMLFormElement | null>(null);
  const windowSize = useWindowSize();

  // Refresh component size stored in context on windows resize (to align component with background animation)
  useEffect(() => {
    bounceContext?.setBounceBoxes({...bounceContext?.bounceBoxes, searchBar: getDOMRect(searchBarRef)})
  }, [windowSize])

  return (
    <form onSubmit={(event) => event.preventDefault()} css={formStyle} ref={searchBarRef}>
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
