
import React from 'react';
import { ArrowRight, Wrench, Car, Shield, Lightbulb, BookOpen, Users } from 'lucide-react';

const CategoryShowcase = () => {
  const categories = [
    {
      id: 'costruzioni',
      name: 'Costruzioni & Edilizia',
      description: 'Tecniche avanzate, materiali innovativi e best practices per il settore edilizio',
      icon: Wrench,
      color: 'from-blue-500 to-blue-700',
      episodeCount: 24,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
    },
    {
      id: 'automotive',
      name: 'Automotive Solutions',
      description: 'Il futuro della mobilità, diagnostica avanzata e soluzioni per officine',
      icon: Car,
      color: 'from-red-500 to-red-700',
      episodeCount: 18,
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
    },
    {
      id: 'sicurezza',
      name: 'Sicurezza & Normative',
      description: 'Aggiornamenti normativi, DPI innovativi e cultura della sicurezza',
      icon: Shield,
      color: 'from-green-500 to-green-700',
      episodeCount: 32,
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475"
    },
    {
      id: 'innovazione',
      name: 'Innovazione & R&D',
      description: 'Ricerca e sviluppo, brevetti e tecnologie del futuro',
      icon: Lightbulb,
      color: 'from-yellow-500 to-orange-600',
      episodeCount: 15,
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
    },
    {
      id: 'formazione',
      name: 'Formazione Professionale',
      description: 'Sviluppo competenze, certificazioni e crescita professionale',
      icon: BookOpen,
      color: 'from-purple-500 to-purple-700',
      episodeCount: 28,
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
    },
    {
      id: 'business',
      name: 'Business & Leadership',
      description: 'Strategie aziendali, leadership e gestione del cambiamento',
      icon: Users,
      color: 'from-indigo-500 to-indigo-700',
      episodeCount: 21,
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1"
    }
  ];

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Esplora per Categorie</h2>
          <p className="text-gray-400">Contenuti specializzati per ogni settore di competenza Würth</p>
        </div>
        <button className="text-wurth-red hover:text-red-400 flex items-center space-x-1 font-medium">
          <span>Vedi tutte</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => {
          const IconComponent = category.icon;
          return (
            <div key={category.id} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-xl bg-wurth-gray hover:bg-gray-700 transition-all duration-300 transform hover:scale-105">
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
                <div className="relative p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${category.color}`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded-full">
                      {category.episodeCount} episodi
                    </span>
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2 group-hover:text-wurth-red transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                    {category.description}
                  </p>
                  <div className="flex items-center text-wurth-red group-hover:text-red-400 transition-colors">
                    <span className="text-sm font-medium">Esplora categoria</span>
                    <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
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
