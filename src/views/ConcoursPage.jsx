import React, { useState, useEffect } from "react";
import concoursList from "../data/concours.json";

const ConcoursPage = () => {
  // Configuration from Vite environment variables
  const AD_ZONE_ID = import.meta.env.VITE_AD_ZONE_ID;
  const AD_DELAY = parseInt(import.meta.env.VITE_AD_DELAY) || 5000;
  const AD_SCRIPT_URL = import.meta.env.VITE_AD_SCRIPT_URL;

  // State management
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({ 
    niveau: "", 
    choix: "", 
    domaine: "" 
  });
  const [currentConcours, setCurrentConcours] = useState(null);
  const [clickCounts, setClickCounts] = useState({}); // Track click count for each concours

  // Initialize ad script (but now it will be used conditionally based on click)
  useEffect(() => {
    if (!AD_SCRIPT_URL || !AD_ZONE_ID) {
      console.error("Missing ad configuration");
      return;
    }

    const script = document.createElement("script");
    script.src = AD_SCRIPT_URL.startsWith('//') 
      ? `https:${AD_SCRIPT_URL}` 
      : AD_SCRIPT_URL;
    script.setAttribute("data-zone", AD_ZONE_ID);
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.onerror = () => window._villtxg?.();
    script.onload = () => window._vqwzz?.();
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [AD_SCRIPT_URL, AD_ZONE_ID]);

  const handleConcoursClick = (concours) => {
    if (!concours.isAvailable) return;

    // Update click count for concours
    setClickCounts(prev => {
      const newCount = (prev[concours.id] || 0) + 1;
      return { ...prev, [concours.id]: newCount };
    });

    // If clicked third time, show the content and redirect
    if ((clickCounts[concours.id] || 0) >= 2) {
      setCurrentConcours(concours);
      // Redirect to the concours content
      window.open(concours.pdfUrl, "_blank");
    }
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };

  // Filter concours based on search and filters
  const filteredConcours = concoursList.filter(concours => {
    const matchesSearch = searchQuery === "" ||
      Object.values(concours).some(val => 
        val && String(val).toLowerCase().includes(searchQuery.toLowerCase())
      );
    
    const matchesFilters = Object.entries(filters).every(
      ([key, value]) => value === "" || concours[key] === value
    );

    return matchesSearch && matchesFilters;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Page Header */}
      <div className="text-center mb-6">
        <h1 className="text-4xl font-extrabold text-blue-700">Concours</h1>
        <p className="text-gray-600 mt-2 text-lg">
          Trouvez les meilleures opportunités
        </p>
      </div>

      {/* Search and Filters Section */}
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
            {[...new Set(concoursList.map(c => c[filter]).filter(Boolean))].map((val) => (
              <option key={val} value={val}>{val}</option>
            ))}
          </select>
        ))}
      </div>

      {/* Concours List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredConcours.length === 0 ? (
          <p className="text-center text-lg text-gray-500 col-span-full py-10">
            Aucun concours trouvé
          </p>
        ) : (
          filteredConcours.map((concours) => (
            <div
              key={concours.id}
              className={`p-6 rounded-xl shadow-lg border-2 transition-all ${concours.isAvailable
                ? "bg-green-50 border-green-500 hover:shadow-xl"
                : "bg-gray-100 border-gray-400"
              }`}
            >
              <h2 className="font-semibold text-2xl text-blue-700 mb-2">
                {concours.title || "Sans titre"}
              </h2>
              <div className="text-sm space-y-1 text-gray-700">
                {["date", "niveau", "choix", "domaine"].map((field) => (
                  <p key={field}>
                    {field.charAt(0).toUpperCase() + field.slice(1)}:{" "}
                    <span className="font-semibold">{concours[field] || "Non spécifié"}</span>
                  </p>
                ))}
              </div>
              
              <button
                onClick={() => handleConcoursClick(concours)}
                disabled={!concours.isAvailable}
                className={`mt-4 w-full px-5 py-2.5 text-lg font-semibold rounded-lg transition-all ${concours.isAvailable
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
