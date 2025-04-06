import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

import logo from "../assets/logo.png";

const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClick = () => {
    navigate("/concours");
  };

  const handleClickToHome = () => {
    navigate("/");
  };

  // Navigation items with proper labels
  const navItems = [
    { path: "faq", label: "FAQ" },
    { path: "about", label: "À propos" },
    { path: "contact", label: "Contact" }
  ];

  return (
    <header className="w-full bg-white shadow-sm px-6 py-3 flex items-center justify-between sticky top-0 z-50">
      {/* Logo & Home Button */}
      <button 
        className="cursor-pointer flex items-center focus:outline-none" 
        onClick={handleClickToHome}
      >
        <img src={logo} alt="Logo" className="w-10 h-10" />
        <span className="ml-3 text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
          CONCOURS MAROC
        </span>
      </button>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-8">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={`/${item.path}`}
            className="text-gray-600 hover:text-blue-600 font-medium text-sm uppercase tracking-wider transition-colors relative group"
          >
            {item.label}
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        ))}
        <button 
          onClick={handleClick} 
          className="ml-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-5 py-2 rounded-md hover:from-blue-700 hover:to-blue-600 transition-all shadow-sm text-sm font-medium"
        >
          Commencer
        </button>
      </nav>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-2xl text-gray-600 focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-40 mt-16">
          <div className="container mx-auto px-6 py-8">
            <ul className="flex flex-col space-y-6">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={`/${item.path}`}
                    className="block text-gray-700 hover:text-blue-600 text-lg font-medium py-2 border-b border-gray-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="pt-4">
                <button
                  onClick={() => {
                    handleClick();
                    setMenuOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-md hover:from-blue-700 hover:to-blue-600 transition-all text-lg font-medium"
                >
                  Commencer
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;