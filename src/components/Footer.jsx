import React, { useContext } from "react";
import { 
  FaFacebook, 
  FaTwitter, 
  FaLinkedin, 
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaInstagram
} from "react-icons/fa";
import { FiBookOpen } from "react-icons/fi";
import logo from "../assets/logo.png";
import buymeacoffeeLogo from "../assets/buy-me-a-coffee-logo.png";
import { DarkModeContext } from "../context/DarkModeContext";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { darkMode } = useContext(DarkModeContext);
  
  const socialLinks = [
    { icon: <FaFacebook size={18} />, href: "#" },
    { icon: <FaLinkedin size={18} />, href: "https://linkedin.com/in/mohamed-boukouch-b889b824a" },
    { icon: <FaInstagram size={18} />, href: "https://www.instagram.com/maroconcours" }
  ];

  const quickLinks = [
    { icon: <FiBookOpen className="mr-2" />, text: "Annales corrigées", href: "/concours" },
    { icon: <FaGraduationCap className="mr-2" />, text: "Tous les concours", href: "/concours" }
  ];

  const contactInfo = [
    { icon: <FaPhone />, text: "+212 7 77 18 90 17" },
    { icon: <FaEnvelope />, text: "concoursmaroc7@gmail.com" }
  ];

  return (
    <footer className={`${darkMode ? 'bg-gray-900' : 'bg-gray-100'} ${darkMode ? 'text-white' : 'text-gray-800'} pt-12 pb-6 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* About Section */}
          <div>
            <div className="flex items-center mb-4">
              <div className={`${darkMode ? 'bg-gray-700' : 'bg-white'} p-2 rounded-lg mr-3 shadow-sm`}>
                <img src={logo} alt="MAROC-CONCOURS Logo" className="w-10 h-10" />
              </div>
              <span className="text-xl font-bold">MAROC-CONCOURS</span>
            </div>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-sm mb-4`}>
              Plateforme leader pour la préparation aux concours des grandes écoles marocaines.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.href}
                  className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-800'} transition-colors`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className={`text-lg font-semibold mb-4 pb-2 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>Liens Utiles</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className={`flex items-center ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} text-sm`}>
                    {link.icon}
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className={`text-lg font-semibold mb-4 pb-2 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>Contact</h3>
            <ul className="space-y-3 text-sm">
              {contactInfo.map((info, index) => (
                <li key={index} className="flex items-start">
                  <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} mr-3 mt-1`}>{info.icon}</span>
                  <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{info.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Donation Section */}
          <div>
            <h3 className={`text-lg font-semibold mb-4 pb-2 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>Support Us</h3>
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex items-center mb-3">
                <img 
                  src={buymeacoffeeLogo} 
                  alt="Buy Me a Coffee" 
                  className="h-8 mr-2" 
                />
                <span className="font-medium">Buy Me a Coffee</span>
              </div>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-sm mb-4`}>
                Soutenez notre travail en nous offrant un café. Chaque don nous aide à améliorer la plateforme.
              </p>
              <a 
                href="https://www.buymeacoffee.com/maroconcours" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 text-center py-2 px-4 rounded transition-colors text-sm font-medium"
              >
                Donate Now
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} mt-8 pt-6 flex flex-col md:flex-row justify-between items-center`}>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>
            &copy; 2025 - {currentYear} MAROC-CONCOURS. Tous droits réservés.
          </p>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <a href="#" className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-800'} text-sm`}>Mentions légales</a>
            <a href="#" className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-800'} text-sm`}>Confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;