import React, { useState, useEffect } from "react";
import concoursList from "../data/concours.json";

const ConcoursPage = () => {
  // ===== CONFIGURATION ===== //
  const isTestMode = false; // ← Change this to false for production
  const AD_ZONE_ID = "141852";
  const AD_DELAY = 2000; // 2 seconds delay for ads

  // ===== STATE ===== //
  // Search filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNiveau, setSelectedNiveau] = useState("");
  const [selectedChoix, setSelectedChoix] = useState("");
  const [selectedDomaine, setSelectedDomaine] = useState("");
  
  // Ad handling
  const [showAdModal, setShowAdModal] = useState(false);
  const [currentPdfUrl, setCurrentPdfUrl] = useState(null);

  // ===== AD SYSTEM INITIALIZATION ===== //
  useEffect(() => {
    if (isTestMode) {
      console.log("🔧 TEST MODE ACTIVE - Ads will be simulated");
      return;
    }

    // Production ad loading
    const script = document.createElement("script");
    script.src = "https://kulroakonsu.net/88/tag.min.js";
    script.setAttribute("data-zone", AD_ZONE_ID);
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    
    script.onload = () => console.log("✅ Ad script loaded");
    script.onerror = () => console.warn("❌ Ad script failed to load");
    
    document.body.appendChild(script);

    return () => {
      const adScript = document.querySelector('script[src*="kulroakonsu.net"]');
      if (adScript) document.body.removeChild(adScript);
    };
  }, [isTestMode]);

  // ===== HELPER FUNCTIONS ===== //
  const filterConcours = (concours) => {
    const matchesSearch = searchQuery === "" ||
      Object.values(concours).some(val => 
        String(val).toLowerCase().includes(searchQuery.toLowerCase())
      );
    
    const matchesFilters = 
      (selectedNiveau === "" || concours.niveau === selectedNiveau) &&
      (selectedChoix === "" || concours.choix === selectedChoix) &&
      (selectedDomaine === "" || concours.domaine === selectedDomaine);

    return matchesSearch && matchesFilters;
  };

  const openPdf = (url) => {
    const newWindow = window.open("", "_blank");
    newWindow ? newWindow.location.href = url : window.location.href = url;
  };

  // ===== EVENT HANDLERS ===== //
  const handleShowConcours = (url) => {
    setCurrentPdfUrl(url);
    setShowAdModal(true);

    if (isTestMode) {
      console.log(`🧪 TEST: Showing ad for ${url}`);
      setTimeout(() => {
        console.log("⏱️ TEST: Ad delay completed - opening PDF");
        openPdf(url);
        setShowAdModal(false);
      }, AD_DELAY);
    } else {
      // Production behavior - real ads will handle this
      setTimeout(() => {
        openPdf(url);
        setShowAdModal(false);
      }, AD_DELAY);
    }
  };

  const handleSkipAd = () => {
    if (currentPdfUrl) openPdf(currentPdfUrl);
    setShowAdModal(false);
  };

  // ===== RENDER ===== //
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Ad Modal */}
      {showAdModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">
              {isTestMode ? "[TEST] " : ""}Publicité Sponsorisée
            </h2>
            <p className="text-gray-700 mb-4">
              {isTestMode
                ? "Simulation de publicité (2 secondes)"
                : "Cette publicité soutient notre plateforme gratuite"}
            </p>
            <div className="flex justify-between mt-6">
              <button
                onClick={handleSkipAd}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
              >
                Passer
              </button>
              <button
                onClick={() => openPdf(currentPdfUrl)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                Voir maintenant
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="text-center mb-6">
        <h1 className="text-4xl font-extrabold text-blue-700">Concours</h1>
        <p className="text-gray-600 mt-2 text-lg">
          Trouvez les meilleures opportunités
        </p>
        {isTestMode && (
          <div className="mt-4 p-2 bg-yellow-100 text-yellow-800 rounded-md">
            Mode Test Activé - Les pubs sont simulées
          </div>
        )}
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Rechercher..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-3 w-full md:w-1/3 border rounded-lg shadow-sm focus:ring-blue-300"
        />
        
        {["niveau", "choix", "domaine"].map((filter) => (
          <select
            key={filter}
            value={eval(`selected${filter.charAt(0).toUpperCase() + filter.slice(1)}`)}
            onChange={(e) => eval(`setSelected${filter.charAt(0).toUpperCase() + filter.slice(1)}(e.target.value)`)}
            className="p-3 border rounded-lg bg-white shadow-sm focus:ring-blue-300"
          >
            <option value="">Tous les {filter}s</option>
            {[...new Set(concoursList.map(c => c[filter]))].map((val) => (
              <option key={val} value={val}>{val}</option>
            ))}
          </select>
        ))}
      </div>

      {/* Concours List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {concoursList.filter(filterConcours).length === 0 ? (
          <p className="text-center text-lg text-gray-500 col-span-full">
            Aucun concours trouvé
          </p>
        ) : (
          concoursList.filter(filterConcours).map((concours) => (
            <div
              key={concours.id}
              className={`p-6 rounded-xl shadow-lg border-2 transition-all ${
                concours.isAvailable
                  ? "bg-green-50 border-green-500 hover:shadow-xl"
                  : "bg-gray-100 border-gray-400"
              }`}
            >
              <h2 className="font-semibold text-2xl text-blue-700">
                {concours.title}
              </h2>
              <div className="text-sm space-y-1 mt-2 text-gray-700">
                {["date", "niveau", "choix", "domaine"].map((field) => (
                  <p key={field}>
                    {field.charAt(0).toUpperCase() + field.slice(1)}:{" "}
                    <span className="font-semibold">{concours[field]}</span>
                  </p>
                ))}
              </div>
              
              <button
                onClick={() => handleShowConcours(concours.pdfUrl)}
                disabled={!concours.isAvailable}
                className={`mt-4 w-full px-5 py-2.5 text-lg font-semibold rounded-lg transition-all ${
                  concours.isAvailable
                    ? "bg-green-500 text-white hover:bg-green-600"
                    : "bg-gray-400 text-gray-200 cursor-not-allowed"
                }`}
              >
                {concours.isAvailable ? "Voir les détails" : "Non disponible"}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ConcoursPage;