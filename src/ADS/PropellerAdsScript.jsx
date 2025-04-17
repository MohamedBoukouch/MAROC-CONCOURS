import { useEffect } from 'react';

const PropellerAdsScript = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.setAttribute('data-cfasync', 'false');
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://example-url.js'; // Replace with your PropellerAds script URL
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Cleanup on unmount
    };
  }, []);

  return null; // No UI
};

export default PropellerAdsScript;
