/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import Tooltip from '@reach/tooltip';
import {
  ChangeEventHandler,
  EventHandler,
  KeyboardEvent,
  KeyboardEventHandler,
  useContext,
  useEffect,
  useRef,
} from 'react';
import { FaSearch } from 'react-icons/fa';
import { BounceBoxesContext } from '../../../../App';
import useWindowSize from '../../../../hooks/useWindowSize';
import { Input, Spinner } from '../../../shared/styledComponentsLibrary';

const formStyle = css({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  // marginTop: 'var(--searchbar-margin-top)',
});

const inputStyle = css({
  width: '100%',
  maxWidth: '800px',
  minwidth: '600px',
  backgroundColor: 'transparent',
  '&:focus': {
    outline: 'none',
  },
  // '&:active': {
  //   outline: 'none',
  //   backgroundColor: 'white',
  // },
});

const buttonStyle = css({
  border: '0',
  // position: 'relative',
  marginLeft: '-42px',
  background: 'transparent',
});

const SearchBar = ({
  setQuery,
  loading,
}: {
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
}) => {
  const bounceContext = useContext(BounceBoxesContext);
  const searchBarRef = useRef<HTMLFormElement | null>(null);
  const windowSize = useWindowSize();

  // Refresh component size stored in context on windows resize (to align component with background animation)
  useEffect(() => {
    bounceContext.storeBounceBox('searchBar', searchBarRef);
    // bounceContext.storeBounceBox('testBox', test);
  }, [windowSize]);

  // DELETE
  // const test = useRef<HTMLDivElement | null>(null);

  const handleEnter: KeyboardEventHandler<HTMLInputElement> = (event) => {
    const eventTarget = event.target as HTMLInputElement;
    if (event.key == 'Enter') {
      setQuery(eventTarget.value);
    }
  };

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setQuery(event.target.value);
  };

  return (
    <>
      {/* <div
        ref={test}
        style={{
          // position: 'absolute',
          top: 500,
          left: 300,
          color: 'black',
          width: 300,
          height: 400,
          backgroundColor: 'rgba(140, 85, 31, 0.1)',
          // margin: 100,
          // paddingBottom: 50,
        }}
      ></div> */}

      <form
        onSubmit={(event) => event.preventDefault()}
        css={formStyle}
        ref={searchBarRef}
      >
        <Input
          id='search'
          name='search'
          placeholder='Find a video game...'
          type='text'
          spellCheck='false'
          // onChange={handleChange}
          // onKeyDown={handleEnter}
          // onChange={(e) => handleChange(e.target)}
          // onKeyDown={(e) => handleChange(e.target)}
          onChange={handleInputChange}
          onKeyDown={handleEnter}
          css={inputStyle}
        />
        <Tooltip label='Search Games'>
          <label htmlFor='search'>
            <button type='submit' css={buttonStyle}>
              {loading ? <Spinner /> : <FaSearch aria-label='search' />}
            </button>
          </label>
        </Tooltip>
      </form>
    </>
  );
};

export default SearchBar;
