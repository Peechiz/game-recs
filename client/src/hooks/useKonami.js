import React, { useEffect, useState } from 'react';

const useKonami = (history) => {
  const [keyCache, setKeyCache] = useState([]);

  const downHandler = ({ key }) => {
    setKeyCache(prev => prev.concat(key).slice(-11));
  }

  useEffect(() => {
    (async () => {
      if (keyCache.length > 10 && keyCache[keyCache.length - 1] === 'Enter') {
        const { code } = await (await fetch('/api/k', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(keyCache)
        })).json()
        if (code === 64) {
          history.push('/login')
        }
      }
    })()
  }, [keyCache])

  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('keydown', downHandler);
    };
  }, []);
}

export default useKonami
