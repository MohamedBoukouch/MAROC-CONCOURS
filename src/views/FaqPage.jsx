import React, { useState, useContext } from "react";
import { DarkModeContext } from '../context/DarkModeContext';

const faqData = [
  {
    question: "C'est quoi Concours Maroc ?",
    answer: "Concours Maroce est une plateforme dédiée aux concours des grandes écoles marocaines, offrant des annales, corrigés et ressources pour réussir les examens d'accès.",
  },
  {
    question: "Quelles écoles sont couvertes par Concours Maroc ?",
    answer: "Nous couvrons tous les concours nationaux : INPT, EHTP, ENSA, ENCG, FST, ENSAM ...",
  },
  {
    question: "Comment accéder aux sujets des années précédentes ?",
    answer: "Les annales sont disponibles dans la section 'Concours' classées par école et par année. Vous pouvez filtrer par matière et télécharger les PDF.",
  },
  {
    question: "Les corrigés sont-ils disponibles ?",
    answer: "Oui, nous fournissons des corrigés détaillés pour la plupart des sujets, réalisés par des professeurs et des lauréats des concours.",
  },
  {
    question: "Y a-t-il des cours préparatoires disponibles ?",
    answer: "Oui, nous proposons des cours condensés et fiches de révision spécialement adaptés pour chaque concours, avec focus sur les chapitres fréquents.",
  },
  {
    question: "Quand sont publiés les résultats des concours ?",
    answer: "Nous mettons à jour les dates importantes et publions les résultats dès leur sortie officielle, avec analyse des seuils d'admission.",
  },
];

const FaqPage = () => {
  const { darkMode } = useContext(DarkModeContext);
  const [openIndex, setOpenIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFaqs = faqData.filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (typeof faq.answer === 'string' && faq.answer.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className={`max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} rounded-lg shadow-lg`}>
      <h1 className={`text-2xl sm:text-3xl font-bold text-center ${darkMode ? 'text-blue-400' : 'text-blue-700'} mb-6`}>
        FAQ - Questions Fréquentes
      </h1>

      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Rechercher une question..."
          className={`w-full p-3 border ${darkMode ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-300 bg-white'} rounded-md mb-6 focus:outline-none focus:ring-2 ${darkMode ? 'focus:ring-blue-500' : 'focus:ring-blue-500'} text-sm sm:text-base`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className={`absolute right-3 top-3 ${darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-400 hover:text-gray-600'}`}
          >
            ×
          </button>
        )}
      </div>

      {/* FAQ List */}
      <div className="space-y-4">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, index) => (
            <div key={index} className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} pb-4`}>
              <button
                className={`w-full text-left p-3 sm:p-4 font-medium text-base sm:text-lg flex justify-between items-center ${darkMode ? 'hover:text-blue-400 text-gray-100' : 'hover:text-blue-700 text-gray-800'} transition-colors`}
                onClick={() => toggleQuestion(index)}
              >
                <span className="text-left">{faq.question}</span>
                <span className={`${darkMode ? 'text-blue-400' : 'text-blue-700'} text-lg sm:text-xl ml-4`}>
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>
              {openIndex === index && (
                <div className={`p-3 sm:p-4 ${darkMode ? 'text-gray-300 bg-gray-800' : 'text-gray-600 bg-blue-50'} rounded-md mt-2`}>
                  {faq.answer}
                </div>
              )}
            </div>
          ))
        ) : (
          <p className={`text-center py-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Aucun résultat trouvé pour "{searchTerm}"
          </p>
        )}
      </div>

      {/* Additional Help */}
      <div className={`mt-10 p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-blue-100'}`}>
        <h3 className={`font-semibold mb-2 ${darkMode ? 'text-blue-400' : 'text-blue-800'}`}>
          Besoin d'aide supplémentaire ?
        </h3>
        <p className={darkMode ? 'text-blue-300' : 'text-blue-700'}>
          Contactez-nous via notre page <a href="/contact" className={`font-semibold underline ${darkMode ? 'hover:text-blue-200' : 'hover:text-blue-900'}`}>Contact</a> ou rejoignez notre communauté WhatsApp.
        </p>
      </div>
    </div>
  );
};

export default FaqPage;