import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi"; // Import icons for menu

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

  return (
    <header className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between">
      {/* Logo & Home Button */}
      <button className="cursor-pointer flex items-center" onClick={handleClickToHome}>
        <img src={logo} alt="Logo" className="w-11 h-11" />
        <span className="ml-2 text-lg font-semibold hover:text-blue-700">EC-PARTAGE</span>
      </button>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex flex-1 justify-center space-x-10 ">
        {["faq", "about", "contact"].map((item) => (
          <Link
            key={item}
            to={`/${item}`}
            className="text-gray-700 hover:text-blue-700 hover:font-bold cursor-pointer relative after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:w-0 after:h-0.5 after:bg-blue-700 after:transition-all after:duration-300 after:-translate-x-1/2 hover:after:w-full"
          >
            {item.charAt(0).toUpperCase() + item.slice(1).replace("-", " ")}
          </Link>
        ))}
      </nav>

      {/* Get Started Button */}
      <button onClick={handleClick} className="hidden md:block cursor-pointer bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition">
        Get Started
      </button>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-2xl text-gray-700"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md md:hidden">
          <ul className="flex flex-col items-center space-y-4 py-6">
            {["faq", "about", "contact"].map((item) => (
              <li key={item}>
                <Link
                  to={`/${item}`}
                  className="text-gray-700 hover:text-blue-700 hover:font-bold cursor-pointer"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1).replace("-", " ")}
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={handleClick}
                className="cursor-pointer bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition"
              >
                Get Started
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
