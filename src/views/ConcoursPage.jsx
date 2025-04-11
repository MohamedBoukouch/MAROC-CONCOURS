import React, { useState, useEffect } from "react";
import concoursList from "../data/concours.json";

const ConcoursPage = () => {
  // Configuration from Vite environment variables
  const isTestMode = false; // Set to false for production
  const AD_ZONE_ID = import.meta.env.VITE_AD_ZONE_ID;
  const AD_DELAY = parseInt(import.meta.env.VITE_AD_DELAY, 10); // convert to number
  const AD_SCRIPT_URL = import.meta.env.VITE_AD_SCRIPT_URL;

  // State
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({ 
    niveau: "", 
    choix: "", 
    domaine: "" 
  });
  const [showAdModal, setShowAdModal] = useState(false);
  const [currentConcours, setCurrentConcours] = useState(null);
  const [adCountdown, setAdCountdown] = useState(AD_DELAY / 1000);
  const [visitedConcours, setVisitedConcours] = useState(new Set());

  // Initialize ad script
  useEffect(() => {
    if (!isTestMode) {
      const script = document.createElement("script");
      script.src = AD_SCRIPT_URL;
      script.setAttribute("data-zone", AD_ZONE_ID);
      script.async = true;
      script.setAttribute("data-cfasync", "false");
      script.onerror = () => window._villtxg?.();
      script.onload = () => window._vqwzz?.();
      document.body.appendChild(script);
      
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [isTestMode, AD_SCRIPT_URL, AD_ZONE_ID]);

  // Handle ad countdown
  useEffect(() => {
    let timer;
    if (showAdModal && adCountdown > 0) {
      timer = setTimeout(() => {
        setAdCountdown(prev => prev - 1);
      }, 1000);
    } else if (showAdModal && adCountdown === 0) {
      handleAdRedirect();
    }
    
    return () => clearTimeout(timer);
  }, [showAdModal, adCountdown]);

  const handleConcoursClick = (concours) => {
    // First open the PDF immediately
    window.open(concours.pdfUrl, "_blank");
    
    if (visitedConcours.has(concours.id)) {
      // If already visited, don't show ad
      return;
    }

    // Show ad modal and start countdown
    setCurrentConcours(concours);
    setAdCountdown(AD_DELAY / 1000);
    setShowAdModal(true);
    setVisitedConcours(prev => new Set(prev).add(concours.id));
  };

  const handleAdRedirect = () => {
    // Trigger the ad redirect function
    window._villtxg?.();
    setShowAdModal(false);
  };

  const handleSkipAd = () => {
    setShowAdModal(false);
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };

  // Filter concours based on search and filters
  const filteredConcours = concoursList.filter(concours => {
    const matchesSearch = searchQuery === "" ||
      Object.values(concours).some(val => 
        String(val).toLowerCase().includes(searchQuery.toLowerCase())
      );
    
    const matchesFilters = Object.entries(filters).every(
      ([key, value]) => value === "" || concours[key] === value
    );

    return matchesSearch && matchesFilters;
  });

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
              Merci d'avoir consulté le concours. Vous serez redirigé vers
              notre sponsor dans {adCountdown} secondes...
            </p>
            <div className="flex justify-between mt-6">
              <button
                onClick={handleSkipAd}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
              >
                Passer la publicité
              </button>
              <button
                onClick={handleAdRedirect}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                Voir la publicité maintenant
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

        {Object.keys(filters).map((filter) => (
          <select
            key={filter}
            value={filters[filter]}
            onChange={(e) => handleFilterChange(filter, e.target.value)}
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
        {filteredConcours.length === 0 ? (
          <p className="text-center text-lg text-gray-500 col-span-full">
            Aucun concours trouvé
          </p>
        ) : (
          filteredConcours.map((concours) => (
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
                onClick={() => handleConcoursClick(concours)}
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
