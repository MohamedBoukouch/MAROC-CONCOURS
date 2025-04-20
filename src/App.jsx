import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeView from "./views/HomeView";
import ConcoursPage from "./views/ConcoursPage";
import ContactPage from "./views/ContactPage";
import AbouUsPage from "./views/AbouUsPage";
import FaqPage from "./views/FaqPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivacyPolicy from "./views/PrivacyPolicy";
import { DarkModeProvider, DarkModeContext } from './context/DarkModeContext'; // Both
import DarkModeToggle from './components/DarkModeToggle';
import './style/App.css';
import { Analytics } from "@vercel/analytics/react";

function AppContent() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={` ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} flex flex-col min-h-screen transition-colors`}>
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/concours" element={<ConcoursPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AbouUsPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
      </main>
      <Footer />
      <DarkModeToggle />
    </div>
  );
}

function App() {
  return (
    <DarkModeProvider>
      <Router>
        <AppContent />
        <Analytics />
      </Router>
    </DarkModeProvider>
  );
}

export default App;
