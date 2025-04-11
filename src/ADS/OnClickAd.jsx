import { useEffect } from 'react';

const OnClickAd = () => {
  useEffect(() => {
    // Load Monetag OnClick script
    const script = document.createElement('script');
    script.innerHTML = `
      (function() {
        var script = document.createElement('script');
        script.src = "https://monetag.com/onclick/antiadblock?tag=YOUR_TAG_ID";
        script.async = true;
        document.head.appendChild(script);
      })();
    `;
    document.head.appendChild(script);

    return () => {
      // Cleanup if needed
    };
  }, []);

  return null; // This ad type doesn't render visible elements
};

export default OnClickAd;