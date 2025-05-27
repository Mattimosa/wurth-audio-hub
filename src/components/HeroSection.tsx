
import React, { useContext, useState } from 'react';
import { Play, ChevronRight, Volume2, Users, Calendar, Clock } from 'lucide-react';
import { MainLayoutContext } from '../layouts/MainLayout';

const HeroSection = () => {
  const { setCurrentEpisode, setIsPlaying } = useContext(MainLayoutContext);
  const [isHovered, setIsHovered] = useState(false);

  const featuredContent = {
    title: "Il Futuro dell'Industria 4.0",
    subtitle: "CONTENUTI FORMATIVI WÜRTH",
    description: "Scopri come Würth sta evolvendo nel settore industriale con tecnologie all'avanguardia. Formazione, innovazione e competenze per il team.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    category: "Formazione Tecnica",
    duration: "6 episodi • Serie completa",
    listeners: "Team Würth",
    rating: "4.9",
    releaseDate: "Dicembre 2024",
    totalDuration: "3h 45m"
  };

  return (
    <div className="relative h-96 md:h-[500px] overflow-hidden rounded-xl mb-8 group">
      {/* Background con gradient overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{
          backgroundImage: `url(${featuredContent.image})`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      
      {/* Subtle animated overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-wurth-red/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Featured Badge */}
      <div className="absolute top-6 left-6 z-20">
        <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-3 py-2 rounded-full animate-pulse flex items-center space-x-1">
          <div className="w-2 h-2 bg-black rounded-full animate-ping"></div>
          <span>IN EVIDENZA</span>
        </span>
      </div>
      
      {/* Content */}
      <div className="relative h-full flex items-center px-8 md:px-12">
        <div className="max-w-2xl animate-fade-in">
          <div className="mb-4">
            <span className="inline-block bg-wurth-red text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {featuredContent.subtitle}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight transition-all duration-300 group-hover:text-shadow-lg">
            {featuredContent.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-6 max-w-lg leading-relaxed">
            {featuredContent.description}
          </p>
          
          {/* Stats Row Migliorata */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-black/30 rounded-lg p-3 backdrop-blur-sm">
              <div className="flex items-center space-x-2 text-gray-300">
                <span className="text-yellow-400">⭐</span>
                <div>
                  <p className="text-xs text-gray-400">Rating</p>
                  <p className="text-sm font-semibold text-white">{featuredContent.rating}</p>
                </div>
              </div>
            </div>
            <div className="bg-black/30 rounded-lg p-3 backdrop-blur-sm">
              <div className="flex items-center space-x-2 text-gray-300">
                <Users className="w-4 h-4 text-blue-400" />
                <div>
                  <p className="text-xs text-gray-400">Audience</p>
                  <p className="text-sm font-semibold text-white">{featuredContent.listeners}</p>
                </div>
              </div>
            </div>
            <div className="bg-black/30 rounded-lg p-3 backdrop-blur-sm">
              <div className="flex items-center space-x-2 text-gray-300">
                <Calendar className="w-4 h-4 text-green-400" />
                <div>
                  <p className="text-xs text-gray-400">Rilascio</p>
                  <p className="text-sm font-semibold text-white">{featuredContent.releaseDate}</p>
                </div>
              </div>
            </div>
            <div className="bg-black/30 rounded-lg p-3 backdrop-blur-sm">
              <div className="flex items-center space-x-2 text-gray-300">
                <Clock className="w-4 h-4 text-purple-400" />
                <div>
                  <p className="text-xs text-gray-400">Durata</p>
                  <p className="text-sm font-semibold text-white">{featuredContent.totalDuration}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <button 
              className="bg-wurth-red hover:bg-red-600 text-white font-bold py-4 px-8 rounded-full flex items-center justify-center space-x-2 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Play className={`w-5 h-5 transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`} />
              <span>Inizia l'ascolto</span>
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-black font-bold py-4 px-8 rounded-full flex items-center justify-center space-x-2 transition-all duration-300 hover:shadow-xl">
              <span>Esplora contenuti</span>
              <ChevronRight className="w-5 h-5 transition-transform duration-300 hover:translate-x-1" />
            </button>
          </div>
          
          {/* Audio visualizer simulation migliorato */}
          <div className="mt-6 flex items-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="bg-black/30 rounded-full p-2 backdrop-blur-sm">
              <Volume2 className="w-4 h-4 text-wurth-red" />
            </div>
            <div className="flex items-end space-x-1">
              {[...Array(25)].map((_, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-t from-wurth-red to-red-300 rounded-full animate-pulse"
                  style={{
                    width: '3px',
                    height: `${Math.random() * 20 + 8}px`,
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: `${Math.random() * 0.8 + 0.4}s`
                  }}
                />
              ))}
            </div>
            <span className="text-xs text-gray-300 bg-black/30 px-2 py-1 rounded-full backdrop-blur-sm">
              Anteprima Audio
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
