import { useEffect, useState } from 'react';

const useClickedOutOfElement = (ref: React.RefObject<HTMLElement>) => {
  const [clickedOutOfElement, setClickedOutOfElement] = useState(false);

  const handleClickOutside = ({ target }: MouseEvent) => {
    if (ref.current && target instanceof HTMLElement && !ref.current.contains(target)) {
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