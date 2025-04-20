import React from "react";
import { 
  FaFacebook, 
  FaTwitter, 
  FaLinkedin, 
  FaYoutube,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaInstagram
} from "react-icons/fa";
import { FiBookOpen, FiClock } from "react-icons/fi";
import logo from "../assets/logo.png";


const Footer = ({ darkMode }) => {
  return (
    <footer className="bg-gray-800  text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* About */}
          <div>
            <div className="flex items-center mb-4">
              <div className="bg-withe-600 text-white p-2 rounded-lg mr-3">
              <img src={logo} alt="Logo" className="w-10 h-10 " />
              </div>
              <span className="text-xl font-bold">MAROC-CONCOURS</span>
            </div>
            <p className="text-gray-400 text-sm">
              Plateforme leader pour la préparation aux concours des grandes écoles marocaines.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaFacebook size={18} />
              </a>
              <a href="https://www.x.com/medbkch" className="text-gray-400 hover:text-white transition-colors">
                <FaTwitter size={18} />
              </a>
              <a href="https://www.linkedin.com/in/mohamed-boukouch-b889b824a/" className="text-gray-400 hover:text-white transition-colors">
                <FaLinkedin size={18} />
              </a>
              <a href="https://www.instagram.com/maroconcours" className="text-gray-400 hover:text-white transition-colors">
                <FaInstagram size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-700">Liens Utiles</h3>
            <ul className="space-y-2">
              <li>
                <a href="/concours" className="flex items-center text-gray-400 hover:text-white text-sm">
                  <FiBookOpen className="mr-2" />
                  Annales corrigées
                </a>
              </li>
              <li>
                <a href="/concours" className="flex items-center text-gray-400 hover:text-white text-sm">
                  <FaGraduationCap className="mr-2" />
                  Tous les concours
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-700">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-3 text-gray-400 flex-shrink-0" />
                <span className="text-gray-400">123 Avenue Hassan II, Rabat</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-3 text-gray-400" />
                <span className="text-gray-400">+212 6 12 34 56 78</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-3 text-gray-400" />
                <span className="text-gray-400">concoursmaroc7@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-700">Newsletter</h3>
            <form className="flex flex-col space-y-3">
              <input 
                type="email" 
                placeholder="Votre email" 
                className="bg-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                required
              />
              <button 
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors text-sm font-medium"
              >
                S'abonner
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-xs md:text-sm text-center md:text-left">
            &copy; 2025 - {new Date().getFullYear()} MAROC-CONCOURS. Tous droits réservés.
          </p>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-xs md:text-sm">Mentions légales</a>
            <a href="#" className="text-gray-400 hover:text-white text-xs md:text-sm">Confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;