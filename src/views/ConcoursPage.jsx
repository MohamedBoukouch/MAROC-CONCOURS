import React, { useState } from "react";
import { FiUpload, FiX, FiInfo } from "react-icons/fi";
import concoursList from "../data/concours.json";

const ConcoursPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNiveau, setSelectedNiveau] = useState("");
  const [selectedChoix, setSelectedChoix] = useState("");
  const [selectedDomaine, setSelectedDomaine] = useState("");
  const [showUploadModal, setShowUploadModal] = useState(false);

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
    window.open(url, "_blank");
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

  const handleUploadClick = () => {
    setShowUploadModal(true);
  };

  const handleContinueToForm = () => {
    window.open("https://docs.google.com/forms/d/e/1FAIpQLSevJ0tO8TLxDEu6V808cDJXg3aXFBE2b_Srf7QIVXec0gg4vg/viewform?usp=sharing", "_blank");
    setShowUploadModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-extrabold text-blue-700">Concours</h1>
        <p className="text-gray-600 mt-2 text-lg">
          Trouvez les meilleures opportunités pour votre avenir
        </p>
      </div>

      {/* Combined search/filters/upload row */}
      <div className="flex flex-col md:flex-row items-stretch gap-3 mb-8">
        {/* Search input */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="Rechercher un concours..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300 h-full"
          />
        </div>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-3 md:flex-nowrap">
          <select
            value={selectedNiveau}
            onChange={handleNiveauChange}
            className="flex-1 min-w-[150px] p-3 border rounded-lg bg-white shadow-sm focus:ring focus:ring-blue-300"
          >
            <option value="">Tous niveaux</option>
            <option value="Bac+2">Bac +2</option>
            <option value="Bac+3">Bac +3</option>
          </select>
          
          <select
            value={selectedChoix}
            onChange={handleChoixChange}
            className="flex-1 min-w-[150px] p-3 border rounded-lg bg-white shadow-sm focus:ring focus:ring-blue-300"
          >
            <option value="">Tous diplômes</option>
            <option value="licence">Licence</option>
            <option value="Cycle">Cycle</option>
            <option value="Master">Master</option>
          </select>
          
          <select
            value={selectedDomaine}
            onChange={handleDomaineChange}
            className="flex-1 min-w-[150px] p-3 border rounded-lg bg-white shadow-sm focus:ring focus:ring-blue-300"
          >
            <option value="">Tous domaines</option>
            <option value="informatique">Informatique</option>
            <option value="industrielle">Industrielle</option>
            <option value="economie">Économie</option>
            <option value="informatique & industriel">Info & industriel</option>
            <option value="Génie électrique">Génie électrique</option>
            <option value="Génie électrique & Génie mécanique">Génie électrique/mécanique</option>
            <option value="Informatique Industrielle & Systèmes Electriques & Mécanique">
              Info Industrielle & Systèmes
            </option>
          </select>
          
          {/* Upload button */}
          <button
            onClick={handleUploadClick}
            className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-lg transition-all shadow-md whitespace-nowrap min-w-[180px]"
          >
            <FiUpload className="text-lg" />
            <span className="hidden sm:inline">Proposer concours</span>
            <span className="sm:hidden">Upload</span>
          </button>
        </div>
      </div>

      {/* Concours Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredConcours.length === 0 ? (
          <p className="text-center text-lg text-gray-500 col-span-full">
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
                Niveau : <span className="font-semibold">{concours.niveau}</span>
              </p>
              <p className="text-sm text-gray-700">
                Diplôme : <span className="font-semibold">{concours.choix}</span>
              </p>
              <p className="text-sm text-gray-700">
                Domaine : <span className="font-semibold">{concours.domaine}</span>
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

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden">
            <div className="bg-blue-600 p-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <FiInfo className="text-white text-xl" />
                <h3 className="text-white font-semibold text-lg">Partagez un concours</h3>
              </div>
              <button 
                onClick={() => setShowUploadModal(false)}
                className="text-white hover:text-blue-100"
              >
                <FiX className="text-xl" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="mb-4">
                <h4 className="font-medium text-gray-800 mb-2">Comment contribuer ?</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Aidez-nous à enrichir notre base de données en partageant des informations sur des concours que vous connaissez.
                </p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-4">
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
            
            <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t border-gray-200">
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