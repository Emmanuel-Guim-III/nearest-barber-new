import { debounce } from 'lodash';
import { useEffect, useState } from 'react';

export const useBreakpoint = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 1024;

  useEffect(() => {
    const listener = debounce(() => {
      setWidth(window.innerWidth);
    }, 75);
    window.addEventListener('resize', listener);
    return () => {
      window.removeEventListener('resize', listener);
    };
  }, []);

  return { isMobile: width < breakpoint };
};
