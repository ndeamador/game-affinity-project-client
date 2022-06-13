import { useEffect, useState } from 'react';

const useClickedOutOfElement = (ref: React.RefObject<HTMLElement>) => {
  const [clickedOutOfElement, setClickedOutOfElement] = useState(false);

  const handleClickOutside = (e: any) => {
    // e.target returns the html element that has been clicked.
    if (ref.current && !ref.current.contains(e.target)) {
      setClickedOutOfElement(true);
    }
    else {
      setClickedOutOfElement(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  });

  return [clickedOutOfElement] as const;
}

export default useClickedOutOfElement;