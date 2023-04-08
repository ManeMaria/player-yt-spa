import { useEffect, useState } from 'react';

export const useIdentifyInstagramBrowser = () => {
  const [isInstagramBrowser, setIsInstagramBrowser] = useState(false);
  const isClintSide = typeof window !== 'undefined';

  useEffect(() => {
    if (isClintSide) {
      setIsInstagramBrowser(!!navigator?.userAgent?.match(/instagram/i));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isInstagramBrowser };
};
