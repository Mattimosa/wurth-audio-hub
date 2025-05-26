
import React, { useContext } from 'react';
import { Play, Clock, Star, Bookmark } from 'lucide-react';
import { MainLayoutContext } from '../layouts/MainLayout';

const RecommendedPodcasts = () => {
  const { setCurrentEpisode, setIsPlaying } = useContext(MainLayoutContext);

  const recommendations = [
    {
      id: 1,
      title: "Il Futuro della Sostenibilità Industriale",
      series: "Green Innovation",
      description: "Come l'industria sta evolvendo verso pratiche più sostenibili con tecnologie innovative.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      duration: "42:15",
      rating: 4.8,
      category: "Sostenibilità",
      isNew: true,
      listeners: "2.1K"
    },
    {
      id: 2,
      title: "Automazione Intelligente nei Magazzini",
      series: "Digital Transformation",
      description: "Tecnologie AI e robotica per ottimizzare la gestione logistica moderna.",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      duration: "38:22",
      rating: 4.9,
      category: "Tecnologia",
      isNew: false,
      listeners: "3.5K"
    },
    {
      id: 3,
      title: "Sicurezza 5.0: Prevenzione Predittiva",
      series: "Safety Evolution",
      description: "Come l'intelligenza artificiale sta rivoluzionando la sicurezza sul lavoro.",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      duration: "35:48",
      rating: 4.7,
      category: "Sicurezza",
      isNew: true,
      listeners: "1.8K"
    },
    {
      id: 4,
      title: "Materiali Innovativi per l'Automotive",
      series: "Future Materials",
      description: "Nuove leghe e compositi che stanno cambiando l'industria automobilistica.",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      duration: "44:10",
      rating: 4.6,
      category: "Automotive",
      isNew: false,
      listeners: "2.7K"
    }
  ];

  return (
    <section className="mb-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Consigliati per te</h2>
        <p className="text-gray-400">Basato sui tuoi interessi e ascolti recenti</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {recommendations.map((podcast) => (
          <div key={podcast.id} className="bg-wurth-gray rounded-xl p-6 hover:bg-gray-700 transition-all duration-300 group cursor-pointer">
            <div className="flex space-x-4">
              <div className="relative flex-shrink-0">
                <img 
                  src={podcast.image} 
                  alt={podcast.title}
                  className="w-24 h-24 rounded-lg object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 flex items-center justify-center rounded-lg transition-all">
                  <Play className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
                {podcast.isNew && (
                  <div className="absolute -top-2 -right-2 bg-wurth-red text-white text-xs font-bold px-2 py-1 rounded-full">
                    NEW
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="bg-gray-600 text-white text-xs px-2 py-1 rounded">
                      {podcast.category}
                    </span>
                    <div className="flex items-center space-x-1 text-yellow-400">
                      <Star className="w-3 h-3 fill-current" />
                      <span className="text-xs text-gray-400">{podcast.rating}</span>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-wurth-red transition-colors">
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>
                
                <h3 className="text-white font-bold text-lg mb-1 line-clamp-1 group-hover:text-wurth-red transition-colors">
                  {podcast.title}
                </h3>
                <p className="text-gray-400 text-sm mb-1">{podcast.series}</p>
                <p className="text-gray-500 text-sm line-clamp-2 mb-3">
                  {podcast.description}
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{podcast.duration}</span>
                    </div>
                    <span>{podcast.listeners} ascolti</span>
                  </div>
                  <button className="text-wurth-red hover:text-red-400 font-medium">
                    Ascolta ora
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecommendedPodcasts;
