
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
    <div className="relative h-[600px] overflow-hidden rounded-2xl group shadow-2xl">
      {/* Background con gradient overlay migliorato */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
        style={{
          backgroundImage: `url(${featuredContent.image})`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      
      {/* Animated overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-wurth-red/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />
      
      {/* Featured Badge - Fixed positioning */}
      <div className="absolute top-8 left-8 z-30">
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-sm font-bold px-4 py-2 rounded-full flex items-center space-x-2 shadow-lg">
          <div className="w-2 h-2 bg-black rounded-full animate-pulse"></div>
          <span>IN EVIDENZA</span>
        </div>
      </div>
      
      {/* Content - Better structured and spaced */}
      <div className="relative h-full flex items-center px-8 md:px-16 z-20">
        <div className="max-w-3xl space-y-8">
          {/* Subtitle */}
          <div className="animate-fade-in">
            <span className="inline-block bg-wurth-red text-white text-sm font-bold px-4 py-2 rounded-full uppercase tracking-wider shadow-lg">
              {featuredContent.subtitle}
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight animate-slide-up">
            {featuredContent.title}
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl leading-relaxed animate-fade-in" style={{ animationDelay: '0.3s' }}>
            {featuredContent.description}
          </p>
          
          {/* Stats Row - Better grid and spacing */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-slide-up" style={{ animationDelay: '0.5s' }}>
            <div className="bg-black/40 rounded-xl p-4 backdrop-blur-md border border-white/10 hover:bg-black/50 transition-all duration-300">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">⭐</span>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Rating</p>
                  <p className="text-lg font-bold text-white">{featuredContent.rating}</p>
                </div>
              </div>
            </div>
            <div className="bg-black/40 rounded-xl p-4 backdrop-blur-md border border-white/10 hover:bg-black/50 transition-all duration-300">
              <div className="flex items-center space-x-3">
                <Users className="w-6 h-6 text-blue-400" />
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Audience</p>
                  <p className="text-lg font-bold text-white">{featuredContent.listeners}</p>
                </div>
              </div>
            </div>
            <div className="bg-black/40 rounded-xl p-4 backdrop-blur-md border border-white/10 hover:bg-black/50 transition-all duration-300">
              <div className="flex items-center space-x-3">
                <Calendar className="w-6 h-6 text-green-400" />
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Rilascio</p>
                  <p className="text-lg font-bold text-white">{featuredContent.releaseDate}</p>
                </div>
              </div>
            </div>
            <div className="bg-black/40 rounded-xl p-4 backdrop-blur-md border border-white/10 hover:bg-black/50 transition-all duration-300">
              <div className="flex items-center space-x-3">
                <Clock className="w-6 h-6 text-purple-400" />
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Durata</p>
                  <p className="text-lg font-bold text-white">{featuredContent.totalDuration}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Buttons - Better spacing and animations */}
          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: '0.7s' }}>
            <button 
              className="bg-wurth-red hover:bg-red-600 text-white font-bold py-4 px-8 rounded-full flex items-center justify-center space-x-3 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg relative overflow-hidden group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Play className={`w-6 h-6 transition-transform duration-300 relative z-10 ${isHovered ? 'scale-110' : ''}`} />
              <span className="relative z-10 text-lg">Inizia l'ascolto</span>
            </button>
            <button className="border-2 border-white/80 text-white hover:bg-white hover:text-black font-bold py-4 px-8 rounded-full flex items-center justify-center space-x-3 transition-all duration-300 hover:shadow-xl backdrop-blur-sm">
              <span className="text-lg">Esplora contenuti</span>
              <ChevronRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
          
          {/* Audio visualizer - Better positioned */}
          <div className="flex items-center space-x-4 opacity-0 group-hover:opacity-100 transition-all duration-700 animate-fade-in" style={{ animationDelay: '0.9s' }}>
            <div className="bg-black/40 rounded-full p-3 backdrop-blur-md border border-white/10">
              <Volume2 className="w-5 h-5 text-wurth-red" />
            </div>
            <div className="flex items-end space-x-1">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-t from-wurth-red to-red-300 rounded-full"
                  style={{
                    width: '3px',
                    height: `${Math.random() * 30 + 10}px`,
                    animationName: 'pulse',
                    animationDuration: `${Math.random() * 1 + 0.5}s`,
                    animationIterationCount: 'infinite',
                    animationDelay: `${i * 0.1}s`
                  }}
                />
              ))}
            </div>
            <span className="text-sm text-gray-300 bg-black/40 px-3 py-2 rounded-full backdrop-blur-md border border-white/10">
              Anteprima Audio
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
