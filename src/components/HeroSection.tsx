
import React, { useContext } from 'react';
import { Play, ChevronRight } from 'lucide-react';
import { MainLayoutContext } from '../layouts/MainLayout';

const HeroSection = () => {
  const { setCurrentEpisode, setIsPlaying } = useContext(MainLayoutContext);

  const featuredContent = {
    title: "Il Futuro dell'Industria 4.0",
    subtitle: "SERIE ESCLUSIVA WÜRTH",
    description: "Scopri come Würth sta rivoluzionando il settore industriale con tecnologie all'avanguardia. Un viaggio attraverso innovazione, sostenibilità e digitalizzazione.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    category: "Innovazione & Tecnologia",
    duration: "6 episodi • Nuova serie"
  };

  return (
    <div className="relative h-96 md:h-[500px] overflow-hidden rounded-xl mb-8">
      {/* Background con gradient overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${featuredContent.image})`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      
      {/* Content */}
      <div className="relative h-full flex items-center px-8 md:px-12">
        <div className="max-w-2xl">
          <div className="mb-4">
            <span className="inline-block bg-wurth-red text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {featuredContent.subtitle}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            {featuredContent.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-6 max-w-lg leading-relaxed">
            {featuredContent.description}
          </p>
          <div className="flex items-center text-gray-300 mb-8">
            <span className="text-sm font-medium">{featuredContent.category}</span>
            <span className="mx-2">•</span>
            <span className="text-sm">{featuredContent.duration}</span>
          </div>
          <div className="flex space-x-4">
            <button className="bg-wurth-red hover:bg-red-600 text-white font-bold py-3 px-8 rounded-full flex items-center space-x-2 transition-all transform hover:scale-105">
              <Play className="w-5 h-5" />
              <span>Ascolta ora</span>
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-black font-bold py-3 px-8 rounded-full flex items-center space-x-2 transition-all">
              <span>Scopri di più</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
