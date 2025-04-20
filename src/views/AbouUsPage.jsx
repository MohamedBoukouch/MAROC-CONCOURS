import React ,{useContext}from 'react';
import { FaAccessibleIcon, FaMedal, FaUsers, FaArrowRight } from 'react-icons/fa';
import { FiCheckCircle } from 'react-icons/fi';
import teamImage from '../assets/users/user1.png';
import logo from '../assets/logo.png';
import admin1 from '../assets/admins/admin1.png';
import admin2 from '../assets/admins/admin2.jpeg';
import admin3 from '../assets/admins/admin3.jpeg';
import { DarkModeContext } from '../context/DarkModeContext';


const AboutUsPage = () => {
  const { darkMode } = useContext(DarkModeContext);


  const whatsappGroupLink = "https://chat.whatsapp.com/HMgqaH3qpE9BwcyZCliwmr"; // Remplacez par votre vrai lien

  const joinWhatsAppGroup = () => {
    // Ouvrir le lien dans un nouvel onglet
    window.open(whatsappGroupLink, '_blank');
    
    // Optionnel : Suivi analytique
    console.log("User joined WhatsApp group");
    // Ici vous pourriez ajouter Google Analytics ou autre outil de suivi
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Contenu principal */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Notre Mission</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Concours Maroc a été créé pour révolutionner la préparation aux concours des grandes écoles marocaines. 
            Nous offrons des ressources pédagogiques de qualité, accessibles à tous les étudiants.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            Notre plateforme rassemble annales, corrigés, conseils méthodologiques et une communauté d'entraide 
            pour maximiser vos chances de réussite.
          </p>
        </div>
        <div className={` ${darkMode ? 'bg-gray-800' : 'bg-blue-50'} p-8 rounded-xl shadow-sm border border-blue-100`}>
          <img 
            src={logo} 
            alt="Logo Concours Maroc" 
            className="w-40 h-40 mx-auto mb-6"
          />
          <h3 className={`text-xl font-semibold text-center ${darkMode ? 'text-gray-50' : 'text-gray-800'} mb-4 `}>
            Chiffres clés
          </h3>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-gray-50'} p-4 rounded-lg shadow border border-gray-100`}>
              <p className="text-3xl font-bold text-blue-600">500+</p>
              <p className="text-gray-600">Annales</p>
            </div>
            <div className="${darkMode ? 'bg-gray-800' : 'bg-gray-50'} p-4 rounded-lg shadow border border-gray-100">
              <p className="text-3xl font-bold text-blue-600">10K+</p>
              <p className="text-gray-600">Étudiants</p>
            </div>
            <div className="${darkMode ? 'bg-gray-800' : 'bg-gray-50'} p-4 rounded-lg shadow border border-gray-100">
              <p className="text-3xl font-bold text-blue-600">50+</p>
              <p className="text-gray-600">Écoles</p>
            </div>
            <div className="${darkMode ? 'bg-gray-800' : 'bg-gray-50'} p-4 rounded-lg shadow border border-gray-100">
              <p className="text-3xl font-bold text-blue-600">100%</p>
              <p className="text-gray-600">Gratuit</p>
            </div>
          </div>
        </div>
      </div>

      {/* Section équipe */}
      {/* <div className="mb-16">
        <h2 className="text-3xl font-bold text-blue-800 mb-8 text-center">Notre Équipe</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Mohamed Boukouch",
              role: "Fondateur & Développeur",
              bio: "Étudiant ENSIASD TAROUDANT",
              img: admin1
            },
            {
              name: "Yassine Bouachrine",
              role: "Responsable Media",
              bio: "Étudiant ENSIASD TAROUDANT",
              img: admin2
            },
            {
              name: "Khadija Asehnoune",
              role: "Membre Actif",
              bio: "Étudiante ENSAM CASA",
              img: admin3
            }
          ].map((member, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
              <img 
                src={member.img} 
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-blue-100"
              />
              <h3 className="text-xl font-bold text-center text-gray-800">{member.name}</h3>
              <p className="text-blue-600 text-center mb-3 font-medium">{member.role}</p>
              <p className="text-gray-600 text-center text-sm">{member.bio}</p>
            </div>
          ))}
        </div>
      </div> */}

      {/* Valeurs */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-blue-50'} rounded-xl p-8 mb-16 border border-blue-100 `}>
        <h2 className="text-3xl font-bold text-blue-800 mb-8 text-center">Nos Valeurs</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Accessibilité",
              desc: "Ressources gratuites pour tous les étudiants marocains",
              icon: <FaAccessibleIcon className="text-blue-600 text-3xl" />,
              bg: "bg-blue-100"
            },
            {
              title: "Excellence",
              desc: "Contenu vérifié par des experts et lauréats",
              icon: <FaMedal className="text-yellow-600 text-3xl" />,
              bg: "bg-yellow-100"
            },
            {
              title: "Communauté",
              desc: "Partage et entraide entre étudiants",
              icon: <FaUsers className="text-green-600 text-3xl" />,
              bg: "bg-green-100"
            }
          ].map((value, index) => (
            <div key={index} className={`${darkMode ? 'text-gray-50 ' : 'text-gray-800 bg-white'} p-6 rounded-lg text-center border border-gray-100 hover:shadow-md transition-shadow`}>
              <div className={`w-16 h-16 ${value.bg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                {value.icon}
              </div>
              <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-gray-50' : 'text-gray-800'}`}>{value.title}</h3>
              <p className={` text-sm ${darkMode ? 'text-gray-50' : 'text-gray-800'}`}>{value.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl p-10 shadow-lg border border-blue-700">
        <FiCheckCircle className="text-4xl mx-auto mb-4 text-blue-200" />
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Prêt à réussir vos concours ?</h2>
        <p className="text-lg sm:text-xl mb-6 opacity-90">
          Rejoignez notre communauté de plus de 10,000 étudiants
        </p>
        <button onClick={joinWhatsAppGroup} className=" hover:cursor-pointer hover:bg-green-400 group bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition-all flex items-center justify-center mx-auto gap-2 shadow-md">
          Commencer maintenant
          <FaArrowRight className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};

export default AboutUsPage;