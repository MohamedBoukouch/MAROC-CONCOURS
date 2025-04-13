import React, { useState, useEffect } from "react";
import concoursList from "../data/concours.json";

const ConcoursPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNiveau, setSelectedNiveau] = useState("");
  const [selectedChoix, setSelectedChoix] = useState("");
  const [selectedDomaine, setSelectedDomaine] = useState("");
  const [showAd, setShowAd] = useState(false);
  const [pendingPdfUrl, setPendingPdfUrl] = useState(null);

  // Inject popup ad script when needed
  useEffect(() => {
    if (showAd) {
      const script = document.createElement("script");
      script.src = "//pl26356678.profitableratecpm.com/ab/e0/9f/abe09fd533b4e041d41ecffbc30266f2.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, [showAd]);

  // Inject Tera native banner ad on page load
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//pl26356691.profitableratecpm.com/68ecf70c6ea397a9db59041e78d94972/invoke.js";
    script.async = true;
    document.getElementById("ad-container")?.appendChild(script);
  }, []);

  const filteredConcours = concoursList.filter((concours) => {
    return (
      (searchQuery === "" ||
        concours.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        concours.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
        concours.niveau.toLowerCase().includes(searchQuery.toLowerCase()) ||
        concours.choix.toLowerCase().includes(searchQuery.toLowerCase()) ||
        concours.domaine.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedNiveau === "" || concours.niveau === selectedNiveau) &&
      (selectedChoix === "" || concours.choix === selectedChoix) &&
      (selectedDomaine === "" || concours.domaine === selectedDomaine)
    );
  });

  const handleVoirDetails = (url) => {
    setPendingPdfUrl(url);
    setShowAd(true);
    window.open("https://pl26356678.profitableratecpm.com/ab/e0/9f/abe09fd533b4e041d41ecffbc30266f2", "_blank");
  };

  const handleOpenPdf = () => {
    if (pendingPdfUrl) {
      window.open(pendingPdfUrl, "_blank");
      setShowAd(false);
      setPendingPdfUrl(null);
    }
  };

  const handleAdClose = () => {
    setShowAd(false);
  };

  const handleNiveauChange = (e) => {
    setSelectedNiveau(e.target.value);
    setSelectedChoix("");
    setSelectedDomaine("");
  };

  const handleChoixChange = (e) => {
    setSelectedChoix(e.target.value);
    setSelectedNiveau("");
    setSelectedDomaine("");
  };

  const handleDomaineChange = (e) => {
    setSelectedDomaine(e.target.value);
    setSelectedNiveau("");
    setSelectedChoix("");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="text-center mb-6">
        
      {/* Tera Native Banner Ad */}
      {/* <div id="ad-container" className="my-6 text-center">
        <div id="container-68ecf70c6ea397a9db59041e78d94972"></div>
      </div> */}
        
        <h1 className="text-4xl font-extrabold text-blue-700">Concours</h1>
        <p className="text-gray-600 mt-2 text-lg">
          Trouvez les meilleures opportunités pour votre avenir
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Rechercher un concours..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-3 w-full md:w-1/3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300"
        />
        <select
          value={selectedNiveau}
          onChange={handleNiveauChange}
          className="p-3 border rounded-lg bg-white shadow-sm focus:ring focus:ring-blue-300"
        >
          <option value="">Tous les niveaux</option>
          <option value="Bac+2">Bac +2</option>
          <option value="Bac+3">Bac +3</option>
        </select>
        <select
          value={selectedChoix}
          onChange={handleChoixChange}
          className="p-3 border rounded-lg bg-white shadow-sm focus:ring focus:ring-blue-300"
        >
          <option value="">Tous les diplômes</option>
          <option value="licence">Licence</option>
          <option value="Cycle">Cycle</option>
          <option value="Master">Master</option>
        </select>
        <select
          value={selectedDomaine}
          onChange={handleDomaineChange}
          className="p-3 border rounded-lg bg-white shadow-sm focus:ring focus:ring-blue-300"
        >
          <option value="">Tous les domaines</option>
          <option value="informatique">Informatique</option>
          <option value="industrielle">Industrielle</option>
          <option value="economie">Économie</option>
          <option value="informatique & industriel">informatique & industriel</option>
          <option value="Génie électrique">Génie électrique</option>
          <option value="Génie électrique & Génie mécanique">Génie électrique & Génie mécanique</option>
          <option value="Informatique Industrielle & Systèmes Electriques & Mécanique">
            Informatique Industrielle & Systèmes Electriques & Mécanique
          </option>
        </select>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredConcours.length === 0 ? (
          <p className="text-center text-lg text-gray-500">
            Aucun concours trouvé
          </p>
        ) : (
          filteredConcours.map((concours) => (
            <div
              key={concours.id}
              className={`p-6 rounded-xl shadow-lg border-2 transition-all duration-300 ${
                concours.isAvailable
                  ? "bg-green-50 border-green-500 hover:shadow-xl"
                  : "bg-gray-100 border-gray-400"
              }`}
            >
              <h2 className="font-semibold text-2xl text-blue-700">
                {concours.title}
              </h2>
              <p className="text-sm text-gray-500 mt-1">{concours.date}</p>
              <p className="text-sm text-gray-700">
                Niveau :{" "}
                <span className="font-semibold">{concours.niveau}</span>
              </p>
              <p className="text-sm text-gray-700">
                Diplôme :{" "}
                <span className="font-semibold">{concours.choix}</span>
              </p>
              <p className="text-sm text-gray-700">
                Domaine :{" "}
                <span className="font-semibold">{concours.domaine}</span>
              </p>

              <button
                onClick={() => handleVoirDetails(concours.pdfUrl)}
                className={`mt-4 w-full px-5 py-2.5 text-lg font-semibold rounded-lg transition-all duration-200 ${
                  concours.isAvailable
                    ? "bg-green-500 text-white hover:bg-green-600"
                    : "bg-gray-400 text-gray-200 cursor-not-allowed"
                }`}
                disabled={!concours.isAvailable}
              >
                {concours.isAvailable ? "Voir les détails" : "Non disponible"}
              </button>
            </div>
          ))
        )}
      </div>

      {showAd && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">
              Publicité Sponsorisée
            </h2>
            <p className="text-gray-700 mb-4">
              Cette publicité est un petit soutien pour nous. Merci de la
              regarder afin de contribuer à nos efforts !
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={handleAdClose}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
              >
                Annuler
              </button>
              <button
                onClick={handleOpenPdf}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                Continuer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConcoursPage;
