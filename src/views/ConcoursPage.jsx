import React, { useState, useEffect ,useContext} from "react";
import { useLocation } from 'react-router-dom';

import { FiUpload, FiX, FiInfo } from "react-icons/fi";
import concoursList from "../data/concours.json";
import { DarkModeContext } from '../context/DarkModeContext';


const ConcoursPage = () => {
  const location = useLocation();
  const initialDomaine = location.state?.selectedDomaine || "?";

  const { darkMode } = useContext(DarkModeContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNiveau, setSelectedNiveau] = useState("");
  const [selectedChoix, setSelectedChoix] = useState("");
  const [selectedDomaine, setSelectedDomaine] = useState(initialDomaine);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const filteredConcours = concoursList.filter((concours) => {
    const matchesSearch = searchQuery === "" ||
      Object.values(concours).some(
        value => value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      );
      
    const matchesFilters = 
      (selectedNiveau === "" || concours.niveau === selectedNiveau) &&
      (selectedChoix === "" || concours.choix === selectedChoix) &&
      (selectedDomaine === "" || concours.domaine === selectedDomaine);

    return matchesSearch && matchesFilters;
  });

  const handleVoirDetails = (url) => {
    if (url) window.open(url, "_blank");
  };

  const handleFilterChange = (setter) => (e) => {
    setter(e.target.value);
    if (e.target.value) {
      if (setter === setSelectedNiveau) {
        setSelectedChoix("");
        setSelectedDomaine("");
      } else if (setter === setSelectedChoix) {
        setSelectedNiveau("");
        setSelectedDomaine("");
      } else {
        setSelectedNiveau("");
        setSelectedChoix("");
      }
    }
  };

  const handleUploadClick = () => {
    setShowUploadModal(true);
  };

  const handleContinueToForm = () => {
    window.open("https://docs.google.com/forms/d/e/1FAIpQLSevJ0tO8TLxDEu6V808cDJXg3aXFBE2b_Srf7QIVXec0gg4vg/viewform?usp=sharing", "_blank");
    setShowUploadModal(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className={` min-h-screen ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} p-4 md:p-6`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-blue-700">Concours</h1>
          <p className={`${darkMode ? 'text-gray-50' : 'text-gray-600'} mt-2 text-base md:text-lg`}>
            Trouvez les meilleures opportunités pour votre avenir
          </p>
        </div>

        {/* Search Input - Now on its own line */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Rechercher un concours par titre, domaine, niveau..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className= {`${darkMode ? 'text-gray-50' : 'text-gray-800'} w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-300 focus:outline-none transition text-lg `}
          />
        </div>

        {/* Filters Container - Now on separate line below search */}
        <div className="flex flex-col md:flex-row gap-3 mb-8">
          <div className="flex flex-wrap gap-3 md:flex-nowrap w-full">
            <select
              value={selectedNiveau}
              onChange={handleFilterChange(setSelectedNiveau)}
              className="flex-1 min-w-[120px] p-3 border rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-300 focus:outline-none"
            >
              <option value="">Tous niveaux</option>
              <option value="Bac+2">Bac +2</option>
              <option value="Bac+3">Bac +3</option>
            </select>
            
            <select
              value={selectedChoix}
              onChange={handleFilterChange(setSelectedChoix)}
              className="flex-1 min-w-[120px] p-3 border rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-300 focus:outline-none"
            >
              <option value="">Tous diplômes</option>
              <option value="licence">Licence</option>
              <option value="Cycle">Cycle</option>
              <option value="Master">Master</option>
            </select>
            
            <select
              value={selectedDomaine}
              onChange={handleFilterChange(setSelectedDomaine)}
              className="flex-1 min-w-[120px] p-3 border rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-300 focus:outline-none"
            >
              {/* informatique */}
              <option value="">Tous domaines</option>
              <option value="Informatique">Informatique</option>
              <option value="Industrielle">Industrielle</option>
              <option value="Économique">Économique</option>
              <option value="Mécanique">Mécanique</option>
              <option value="Génie civil">Génie civil</option>
            
            </select>
            <button
              onClick={handleUploadClick}
              className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-lg transition-all shadow-md whitespace-nowrap min-w-[150px]"
            >
              <FiUpload className="text-lg" />
              <span className="hidden sm:inline">Proposer concours</span>
              <span className="sm:hidden">Upload</span>
            </button>
          </div>
        </div>

        {/* Concours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredConcours.length === 0 ? (
            <div className="col-span-full text-center py-10">
              <p className="text-lg text-gray-500">Aucun concours trouvé</p>
              <button 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedNiveau("");
                  setSelectedChoix("");
                  setSelectedDomaine("");
                }}
                className="mt-4 text-blue-600 hover:underline"
              >
                Réinitialiser les filtres
              </button>
            </div>
          ) : (
            filteredConcours.map((concours) => (
              <div
                key={concours.id}
                className={`p-5 rounded-xl shadow-md border  transition-all border-green-500 duration-300 hover:shadow-lg ${
                  darkMode
                    ? "bg-gray-900 "
                    : "bg-gray-50"
                }`}
              >
                <h2 className="font-semibold text-xl text-blue-700 mb-1">
                  {concours.title}
                </h2>
                <div className={`${darkMode ? 'text-white' : 'text-gray-700'}`} >
                <p className={`text-2xs mb-2 ${darkMode ? ' text-orange-500 ' : 'text-red-400'}`}>{concours.date}</p>
                
                <div className="space-y-1 mb-4">
                  <p className="text-sm ">
                    <span className="font-medium">Niveau:</span> {concours.niveau}
                  </p>
                  <p className="text-sm ">
                    <span className="font-medium">Diplôme:</span> {concours.choix}
                  </p>
                  <p className="text-sm ">
                    <span className="font-medium">Domaine:</span> {concours.domaine}
                  </p>
                  </div>
                </div>

                <button
                  onClick={() => handleVoirDetails(concours.pdfUrl)}
                  disabled={!concours.isAvailable}
                  className={`w-full px-4 py-2 font-medium rounded-lg transition ${
                    concours.isAvailable
                      ? "bg-green-500 hover:bg-green-600 text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {concours.isAvailable ? "Voir les détails" : "Non disponible"}
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="bg-blue-600 p-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <FiInfo className="text-white text-xl" />
                <h3 className="text-white font-semibold">Partagez un concours</h3>
              </div>
              <button 
                onClick={() => setShowUploadModal(false)}
                className="text-white hover:text-blue-100"
                aria-label="Fermer"
              >
                <FiX className="text-xl" />
              </button>
            </div>
            
            <div className="p-5">
              <div className="mb-4">
                <h4 className="font-medium text-gray-800 mb-2">Comment contribuer ?</h4>
                <p className="text-gray-600 text-sm">
                  Aidez-nous à enrichir notre base de données en partageant des informations sur des concours que vous connaissez.
                </p>
              </div>
              
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 mb-4">
                <h4 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
                  <FiInfo className="text-blue-600" />
                  Informations requises
                </h4>
                <ul className="text-gray-700 text-sm list-disc pl-5 space-y-1">
                  <li>Spécialité du concours</li>
                  <li>Année Scolaire de concours</li>
                  <li>Concours d'accès au cycle?</li>
                  <li>Documents</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-gray-50 px-5 py-3 flex justify-end gap-3 border-t border-gray-200">
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
              >
                Annuler
              </button>
              <button
                onClick={handleContinueToForm}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition flex items-center gap-2"
              >
                Accéder au formulaire
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConcoursPage;