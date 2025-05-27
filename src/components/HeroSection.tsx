
import React, { useContext, useState } from 'react';
import { Play, ChevronRight, Volume2, Users } from 'lucide-react';
import { MainLayoutContext } from '../layouts/MainLayout';

const HeroSection = () => {
  const { setCurrentEpisode, setIsPlaying } = useContext(MainLayoutContext);
  const [isHovered, setIsHovered] = useState(false);

  const featuredContent = {
    title: "Il Futuro dell'Industria 4.0",
    subtitle: "SERIE ESCLUSIVA WÜRTH",
    description: "Scopri come Würth sta rivoluzionando il settore industriale con tecnologie all'avanguardia. Un viaggio attraverso innovazione, sostenibilità e digitalizzazione.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    category: "Innovazione & Tecnologia",
    duration: "6 episodi • Nuova serie",
    listeners: "15.2K",
    rating: "4.9"
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
      
      {/* Content */}
      <div className="relative h-full flex items-center px-8 md:px-12">
        <div className="max-w-2xl animate-fade-in">
          <div className="mb-4">
            <span className="inline-block bg-wurth-red text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider animate-pulse">
              {featuredContent.subtitle}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight transition-all duration-300 group-hover:text-shadow-lg">
            {featuredContent.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-6 max-w-lg leading-relaxed">
            {featuredContent.description}
          </p>
          
          {/* Stats Row */}
          <div className="flex items-center space-x-6 text-gray-300 mb-6">
            <div className="flex items-center space-x-1">
              <span className="text-sm font-medium">{featuredContent.category}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span className="text-sm">{featuredContent.listeners} ascoltatori</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-yellow-400">⭐</span>
              <span className="text-sm">{featuredContent.rating}</span>
            </div>
            <span className="text-sm">{featuredContent.duration}</span>
          </div>
          
          <div className="flex space-x-4">
            <button 
              className="bg-wurth-red hover:bg-red-600 text-white font-bold py-3 px-8 rounded-full flex items-center space-x-2 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Play className={`w-5 h-5 transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`} />
              <span>Ascolta ora</span>
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-black font-bold py-3 px-8 rounded-full flex items-center space-x-2 transition-all duration-300 hover:shadow-xl">
              <span>Scopri di più</span>
              <ChevronRight className="w-5 h-5 transition-transform duration-300 hover:translate-x-1" />
            </button>
          </div>
          
          {/* Audio visualizer simulation */}
          <div className="mt-6 flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <Volume2 className="w-4 h-4 text-wurth-red" />
            <div className="flex space-x-1">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-wurth-red rounded-full animate-pulse"
                  style={{
                    height: `${Math.random() * 16 + 4}px`,
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: `${Math.random() * 0.5 + 0.5}s`
                  }}
                />
              ))}
            </div>
            <span className="text-xs text-gray-400">Live Preview</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
