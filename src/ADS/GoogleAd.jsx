import { useEffect } from "react";

const AdComponent = () => {
  useEffect(() => {
    // Create the script tag dynamically
    const script = document.createElement("script");
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5650916439063125";
    script.async = true;
    script.crossOrigin = "anonymous";
    document.body.appendChild(script);

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error", e);
    }
  }, []);

  return (
    <ins className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-5650916439063125"
      data-ad-slot="8224782401"
      data-ad-format="auto"
      data-full-width-responsive="true"></ins>
  );
};

export default AdComponent;
