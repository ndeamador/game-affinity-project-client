/** @jsxImportSource @emotion/react */

import Tooltip from '@reach/tooltip';
import {
  ChangeEventHandler,
  KeyboardEventHandler,
  useContext,
  useEffect,
  useRef,
} from 'react';
import { FaSearch } from 'react-icons/fa';
import { BounceBoxesContext } from 'components/App';
import useWindowSize from 'hooks/useWindowSize';
import styles from './SearchBar.styles';
import { Input } from 'components/shared/Input';
import { Spinner } from 'components/shared/Spinner';

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
  }, [windowSize]);

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
      <form
        onSubmit={(event) => event.preventDefault()}
        css={styles.form}
        ref={searchBarRef}
      >
        <Input
          id='search'
          name='search'
          placeholder='Find a video game...'
          type='text'
          spellCheck='false'
          onChange={handleInputChange}
          onKeyDown={handleEnter}
          css={styles.input}
        />
        <Tooltip label='Search Games'>
          <label htmlFor='search'>
            <button type='submit' css={styles.button}>
              {loading ? <Spinner /> : <FaSearch aria-label='search' />}
            </button>
          </label>
        </Tooltip>
      </form>
    </>
  );
};

export default SearchBar;
