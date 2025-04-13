import React, { useState, useEffect, useRef } from 'react';
import NewFeaturesButton from '../components/home/NewFeaturesButton';
import concoursData from '../data/concours.json';

import user1 from '../assets/users/user2.jpeg';
import user2 from '../assets/users/user3.jpg';
import user3 from '../assets/users/user3.jpg';
import user4 from '../assets/users/user4.jpeg';
import user5 from '../assets/users/user5.jpg';
import user6 from '../assets/users/user6.jpg';
import user7 from '../assets/users/user7.jpg';

const HomeView = () => {
  const reviews = [
    {
      id: 1,
      text: "CONCOURS-MAROC, la plateforme qui m'a sauvé la vie pour les concours! Grâce aux annales et exercices corrigés, j'ai intégré l'INPT alors que j'étais moyen en classe.",
      author: "Yassine Bou",
      role: "Élève ENSIASD",
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

  // Rest of your component code...

  // Compter les documents par domaine exact
  const domaines = concoursData.reduce((acc, item) => {
    const domaine = item.domaine || 'Autres';
    if (!acc[domaine]) {
      acc[domaine] = 0;
    }
    acc[domaine]++;
    return acc;
  }, {});

  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Défilement automatique
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  // Gestion du swipe pour mobile
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
    <div className='min-h-screen bg-gray-50'>
      <div className='flex flex-col justify-center items-center container mx-auto px-4 py-12'>
        {/* <NewFeaturesButton /> */}
        
        <div className='text-center mb-16'>
          <h1 className='pt-7 font-Oswald text-5xl font-bold text-gray-800'>Votre Plateforme des <span className='text-blue-600 '>Concours !!</span></h1>
          <h2 className='text-xl text-gray-600 mt-4'>
            La référence ultime pour les concours des grandes écoles au Maroc :<br />
            INPT, EHTP, ENSA, FST et plus encore - Tout pour réussir vos examens d'accès
          </h2>
        </div>

        <div className="flex justify-center my-12">
          <div className="w-0.5 bg-blue-600 h-30"></div>
        </div>

        <div className="w-full">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-2">They Love us!</h3>
            <h4 className="text-xl text-gray-600">What your fellow CONCOURS-MAROC say about us</h4>
          </div>

          {/* Slider des témoignages */}
          <div 
            className="relative w-full overflow-hidden"
            ref={sliderRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {reviews.map((review) => (
                <div key={review.id} className="w-full flex-shrink-0 px-4">
                  <div className="flex flex-col items-center bg-white rounded-xl shadow-md p-8 w-full">
                    <div className="flex flex-col items-center">
                      <img 
                        src={review.image} 
                        alt={review.author}
                        className="w-20 h-20 rounded-full object-cover border-4 border-blue-100 mb-4"
                      />
                      <p className="text-gray-900 font-bold text-lg">{review.author}</p>
                      <p className="text-gray-500 mb-4">{review.role}</p>
                    </div>
                    <blockquote className="text-gray-700 italic text-lg text-center max-w-2xl mx-auto">
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
                  className={`w-3 h-3 mx-1 rounded-full transition-colors ${index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'}`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
          <div className="flex justify-center my-12">
          <div className="w-0.5 bg-blue-600 h-30"></div>
          </div>
          {/* Section des domaines exacts */}
          <div className="mt-20">
            <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">Available Branches</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
              {Object.entries(domaines).map(([domaine, count]) => (
                <div key={domaine} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow hover:bg-blue-100 hover:cursor-pointer">
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">
                    {domaine === '?' ? 'Autres Domaines' : domaine}
                  </h4>
                  <p className="text-gray-600">{count} Documents</p>
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