import { useEffect, useState } from 'react';

const useClickedOutOfElement = (ref: React.RefObject<HTMLElement>) => {
  const [clickedOutOfElement, setClickedOutOfElement] = useState(false);

  const handleClickOutside = (e: any) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setClickedOutOfElement(true);
    }
  };
  const handleClickInside = () => setClickedOutOfElement(false);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  });

  return [clickedOutOfElement, () => handleClickInside()];
}

export default useClickedOutOfElement;