import React, { useState } from "react";
import concoursList from "../data/concours.json";
// import AdBanner from '../ADS/GoogleAd';

const ConcoursPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNiveau, setSelectedNiveau] = useState("");
  const [selectedChoix, setSelectedChoix] = useState("");
  const [selectedDomaine, setSelectedDomaine] = useState("");
  const [showAd, setShowAd] = useState(false);
  const [pendingPdfUrl, setPendingPdfUrl] = useState(null);

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

  const handleShowAd = (url) => {
    setPendingPdfUrl(url);
    setShowAd(true);
  };

  const handleOpenPdf = () => {
    if (pendingPdfUrl) {
      window.open(pendingPdfUrl, "_blank");
      setShowAd(false);
      setPendingPdfUrl(null);
    }
  };

  return (
    <div className="App">
      <h1>Welcome to My Website</h1>
      {/* <AdBanner /> */}
    </div>
    // <div className="min-h-screen bg-gray-50 p-6">
    //   <div className="text-center mb-6">
    //     <h1 className="text-4xl font-extrabold text-blue-700">Concours</h1>
    //     <p className="text-gray-600 mt-2 text-lg">Trouvez les meilleures opportunités pour votre avenir</p>
    //   </div>

    //   <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
    //     <input
    //       type="text"
    //       placeholder="Rechercher un concours..."
    //       value={searchQuery}
    //       onChange={(e) => setSearchQuery(e.target.value)}
    //       className="p-3 w-full md:w-1/3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300"
    //     />
    //     <select
    //       onChange={(e) => setSelectedNiveau(e.target.value)}
    //       className="p-3 border rounded-lg bg-white shadow-sm focus:ring focus:ring-blue-300"
    //     >
    //       <option value="">Tous les niveaux</option>
    //       <option value="bac+2">Bac +2</option>
    //       <option value="bac+3">Bac +3</option>
    //     </select>
    //     <select
    //       onChange={(e) => setSelectedChoix(e.target.value)}
    //       className="p-3 border rounded-lg bg-white shadow-sm focus:ring focus:ring-blue-300"
    //     >
    //       <option value="">Tous les diplômes</option>
    //       <option value="licence">Licence</option>
    //       <option value="cycle">Cycle</option>
    //       <option value="master">Master</option>
    //     </select>
    //     <select
    //       onChange={(e) => setSelectedDomaine(e.target.value)}
    //       className="p-3 border rounded-lg bg-white shadow-sm focus:ring focus:ring-blue-300"
    //     >
    //       <option value="">Tous les domaines</option>
    //       <option value="informatique">Informatique</option>
    //       <option value="industrielle">Industrielle</option>
    //       <option value="economie">Économie</option>
    //     </select>
    //   </div>

    //   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    //     {filteredConcours.length === 0 ? (
    //       <p className="text-center text-lg text-gray-500">Aucun concours trouvé</p>
    //     ) : (
    //       filteredConcours.map((concours) => (
    //         <div
    //           key={concours.id}
    //           className={`p-6 rounded-xl shadow-lg border-2 transition-all duration-300 ${
    //             concours.isAvailable
    //               ? "bg-green-50 border-green-500 hover:shadow-xl"
    //               : "bg-gray-100 border-gray-400"
    //           }`}
    //         >
    //           <h2 className="font-semibold text-2xl text-blue-700">{concours.title}</h2>
    //           <p className="text-sm text-gray-500 mt-1">{concours.date}</p>
    //           <p className="text-sm text-gray-700">Niveau : <span className="font-semibold">{concours.niveau}</span></p>
    //           <p className="text-sm text-gray-700">Diplôme : <span className="font-semibold">{concours.choix}</span></p>
    //           <p className="text-sm text-gray-700">Domaine : <span className="font-semibold">{concours.domaine}</span></p>
              
    //           <button
    //             onClick={() => handleShowAd(concours.pdfUrl)}
    //             className={`mt-4 w-full px-5 py-2.5 text-lg font-semibold rounded-lg transition-all duration-200 ${
    //               concours.isAvailable
    //                 ? "bg-green-500 text-white hover:bg-green-600"
    //                 : "bg-gray-400 text-gray-200 cursor-not-allowed"
    //             }`}
    //             disabled={!concours.isAvailable}
    //           >
    //             {concours.isAvailable ? "Voir les détails" : "Non disponible"}
    //           </button>
    //         </div>
    //       ))
    //     )}
    //   </div>

    //   {showAd && (
    //     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
    //       <div className="bg-white p-8 rounded-lg shadow-lg text-center w-80">
    //         <h2 className="text-2xl font-bold text-red-500">Publicité sponsorisée</h2>
    //         <p className="text-gray-700 mt-3">Cette publicité précède l'accès aux détails du concours.</p>
    //         <div id="ad-container" className="mt-4">
    //           {/* Here you can insert your ad network script or ad placeholder */}
    //           <div id="ezoic-pub-ad-placeholder-101"></div>
    //           <div id="ezoic-pub-ad-placeholder-102"></div>
    //         </div>
    //         <button
    //           onClick={handleOpenPdf}
    //           className="mt-4 px-5 py-2.5 w-full bg-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-blue-600 transition-all"
    //         >
    //           Continuer vers le concours
    //         </button>
    //       </div>
    //     </div>
    //   )}
    // </div>
  );
};

export default ConcoursPage;
