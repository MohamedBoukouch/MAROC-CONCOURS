import { useEffect } from "react";

const AdComponent = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//pl26356678.profitableratecpm.com/ab/e0/9f/abe09fd533b4e041d41ecffbc30266f2.js";
    script.type = "text/javascript";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null; // Pas besoin d'afficher quoi que ce soit
};

export default AdComponent;
