import React, { useEffect } from 'react';

const AdComponent = () => {
  useEffect(() => {
    // Push ad placement IDs to Ezoic's `showAds` function
    ezstandalone.cmd.push(function() {
      ezstandalone.showAds(101, 102, 103); // Replace with actual ad IDs
    });
  }, []);

  return (
    <div>
      <div id="ezoic-pub-ad-placeholder-101"></div>
      <div id="ezoic-pub-ad-placeholder-102"></div>
      <div id="ezoic-pub-ad-placeholder-103"></div>
    </div>
  );
};

export default AdComponent;
