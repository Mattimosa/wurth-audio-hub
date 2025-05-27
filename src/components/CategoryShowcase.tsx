import React from 'react';
import { ArrowRight, Wrench, Car, Shield, Lightbulb, BookOpen, Users, TrendingUp, Award } from 'lucide-react';

const CategoryShowcase = () => {
  const categories = [
    {
      id: 'formazione-tecnica',
      name: 'Formazione Tecnica',
      description: 'Contenuti formativi e aggiornamenti tecnici per il team',
      icon: Wrench,
      color: 'from-blue-500 to-blue-700',
      episodeCount: 24,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      trending: true
    },
    {
      id: 'sicurezza',
      name: 'Sicurezza & Procedure',
      description: 'Protocolli di sicurezza e best practices per il lavoro quotidiano',
      icon: Shield,
      color: 'from-green-500 to-green-700',
      episodeCount: 32,
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      trending: false
    },
    {
      id: 'sviluppo-professionale',
      name: 'Sviluppo Professionale',
      description: 'Opportunità di crescita, competenze e percorsi di carriera',
      icon: BookOpen,
      color: 'from-purple-500 to-purple-700',
      episodeCount: 28,
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
      trending: true,
      featured: true
    },
    {
      id: 'innovazione',
      name: 'Innovazione & Ricerca',
      description: 'Progetti innovativi e sviluppi futuri dell\'azienda',
      icon: Lightbulb,
      color: 'from-yellow-500 to-orange-600',
      episodeCount: 15,
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      trending: false
    },
    {
      id: 'leadership',
      name: 'Leadership & Management',
      description: 'Competenze manageriali e leadership per team leader',
      icon: Users,
      color: 'from-indigo-500 to-indigo-700',
      episodeCount: 21,
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      trending: false
    },
    {
      id: 'automotive',
      name: 'Settore Automotive',
      description: 'Novità e aggiornamenti specifici per il settore automotive',
      icon: Car,
      color: 'from-red-500 to-red-700',
      episodeCount: 18,
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      trending: false
    }
  ];

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-8">
        <div className="animate-fade-in">
          <h2 className="text-3xl font-bold text-white mb-2">Aree di Competenza</h2>
          <p className="text-gray-400">Contenuti organizzati per settore e competenza</p>
        </div>
        <button className="text-wurth-red hover:text-red-400 flex items-center space-x-1 font-medium transition-all duration-300 hover:scale-105">
          <span>Vedi tutte</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((category, index) => {
          const IconComponent = category.icon;
          return (
            <div 
              key={category.id} 
              className="group cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden rounded-xl bg-wurth-gray hover:bg-gray-700 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 shadow-lg hover:shadow-2xl">
                {/* Featured Badge */}
                {category.featured && (
                  <div className="absolute top-3 left-3 z-10">
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                      FEATURED
                    </span>
                  </div>
                )}
                
                {/* Trending Badge */}
                {category.trending && (
                  <div className="absolute top-3 right-3 z-10">
                    <div className="bg-wurth-red text-white text-xs font-bold px-2 py-1 rounded-full flex items-center space-x-1">
                      <TrendingUp className="w-3 h-3" />
                      <span>HOT</span>
                    </div>
                  </div>
                )}
                
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />
                
                {/* Subtle pattern overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${category.color} shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded-full transition-colors duration-300 group-hover:bg-gray-700 group-hover:text-gray-300">
                      {category.episodeCount} episodi
                    </span>
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2 group-hover:text-wurth-red transition-colors duration-300">
                    {category.name}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-2 mb-4 group-hover:text-gray-300 transition-colors duration-300">
                    {category.description}
                  </p>
                  <div className="flex items-center text-wurth-red group-hover:text-red-400 transition-all duration-300">
                    <span className="text-sm font-medium">Esplora categoria</span>
                    <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CategoryShowcase;
