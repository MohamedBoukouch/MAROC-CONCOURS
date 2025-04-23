import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrophy } from 'react-icons/fa';
import { DarkModeContext } from '../context/DarkModeContext';

import user1 from '../assets/users/user2.jpeg';
import user2 from '../assets/users/user3.jpg';
import user3 from '../assets/users/user3.jpg';
import user4 from '../assets/users/user4.jpeg';
import user5 from '../assets/users/user5.jpg';
import user6 from '../assets/users/user6.jpg';
import user7 from '../assets/users/user7.jpg';

const HomeView = () => {
  const { darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();
  
  const reviews = [
    {
      id: 1,
      text: "CONCOURS-MAROC, la plateforme qui m'a sauvé la vie pour les concours! Grâce aux annales et exercices corrigés, j'ai intégré l'ENSIAS alors que j'étais moyen en classe.",
      author: "Yassine Bou",
      role: "Élève ENSIAS",
      image: user1
    },
    {
      id: 2,
      text: "Les concours ENSA deviennent faciles quand tu as les bonnes ressources. Merci pour les sujets des années précédentes avec solutions détaillées!",
      author: "Amina T.",
      role: "Élève ENSA",
      image: user2
    },
    {
      id: 3,
      text: "Pour les concours FST, c'est la meilleure plateforme. J'ai trouvé tous les sujets de maths et physique avec correction.",
      author: "Youssef M.",
      role: "Élève FST",
      image: user3
    },
    {
      id: 4,
      text: "La communauté m'a beaucoup aidé. On échange des conseils et méthodes de travail pour réussir les concours.",
      author: "Leila R.",
      role: "CPGE Student",
      image: user4
    },
    {
      id: 5,
      text: "J'ai préparé mon concours ENSAM en 2 mois seulement grâce aux ressources bien organisées sur la plateforme.",
      author: "Nadia S.",
      role: "Élève ENSAM",
      image: user5
    },
    {
      id: 6,
      text: "Les vidéos explicatives m'ont sauvé pour les concours EHTP. Les professeurs expliquent mieux qu'à l'école!",
      author: "Karim E.",
      role: "Élève EHTP",
      image: user6
    },
    {
      id: 7,
      text: "Même après avoir réussi le concours, je continue à utiliser la plateforme pour les cours et exercices.",
      author: "Omar F.",
      role: "Alumni ENSEM",
      image: user7
    }
  ];

  const domains = [
    'Informatique',
    'Économique',
    'Mécanique',
    'Industrielle',
    'Agricole',
    'Médecine',
    'Génie civil'
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleClick = () => {
    navigate('/concours');
  };

  // Auto-scrolling
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  // Mobile swipe handling
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      setCurrentSlide((prev) => (prev + 1) % reviews.length);
    }
    if (touchStart - touchEnd < -50) {
      setCurrentSlide((prev) => (prev - 1 + reviews.length) % reviews.length);
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      <div className='flex flex-col justify-center items-center container mx-auto px-4 py-12'>
        <div className='text-center mb-16'>
          <h1 className={`pt-7 font-Oswald text-5xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Votre Plateforme des <span className='text-blue-600 dark:text-blue-400'>Concours !!</span>
          </h1>
          <h2 className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'} mt-4`}>
            La référence ultime pour les concours des grandes écoles au Maroc :<br />
            INPT, EHTP, ENSA, FST et plus encore - Tout pour réussir vos examens d'accès
          </h2>
        </div>

        <button
          onClick={handleClick}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-700 dark:to-blue-600 text-white px-6 py-3 m-10 rounded-md hover:from-blue-700 hover:to-blue-600 dark:hover:from-blue-800 dark:hover:to-blue-700 transition-all text-lg font-medium"
        >
          Concours
          <FaTrophy className="text-yellow-300" />
        </button>

        <div className="flex justify-center my-12">
          <div className={`w-0.5 ${darkMode ? 'bg-blue-400' : 'bg-blue-600'} h-30`}></div>
        </div>

        <div className="w-full">
          <div className="text-center mb-12">
            <h3 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-2`}>Ils nous adorent !</h3>
            <h4 className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Ce que nos utilisateurs pensent de CONCOURS-MAROC</h4>
          </div>

          <div 
            className="relative w-full overflow-hidden"
            ref={sliderRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {reviews.map((review) => (
                <div key={review.id} className="w-full flex-shrink-0 px-4">
                  <div className={`flex flex-col items-center rounded-xl shadow-md p-8 w-full ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <div className="flex flex-col items-center">
                      <img 
                        src={review.image} 
                        alt={review.author}
                        className="w-20 h-20 rounded-full object-cover border-4 border-blue-100 dark:border-blue-900 mb-4"
                      />
                      <p className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>{review.author}</p>
                      <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-4`}>{review.role}</p>
                    </div>
                    <blockquote className={`italic text-lg text-center max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      "{review.text}"
                    </blockquote>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-8">
              {reviews.map((_, index) => (
                <button 
                  key={index}
                  className={`w-3 h-3 mx-1 rounded-full transition-colors ${
                    index === currentSlide 
                      ? (darkMode ? 'bg-blue-400' : 'bg-blue-600') 
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
          
          <div className="flex justify-center my-12">
            <div className={`w-0.5 ${darkMode ? 'bg-blue-400' : 'bg-blue-600'} h-30`}></div>
          </div>
          
          <div className="mt-20">
            <h3 className={`text-3xl font-bold text-center ${darkMode ? 'text-white' : 'text-gray-800'} mb-8`}>Nos Filières Disponibles</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {domains.map((demain, index) => (
                <div
                  key={index} 
                  onClick={() => navigate('/concours', { state: { selectedDomaine: demain } })}
                  className={`rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow hover:cursor-pointer ${
                    darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-blue-100'
                  }`}
                >
                  <h4 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} mb-2`}>
                    {demain}
                  </h4>
                  <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Documents disponibles</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeView;