
import React from 'react';
import { Play, Clock, Users, Star } from 'lucide-react';

const FeaturedContent = () => {
  const featured = [
    {
      id: 1,
      title: "Sicurezza 4.0: Le Nuove Frontiere",
      series: "Safety Evolution",
      description: "Innovazioni tecnologiche per la sicurezza nei cantieri e negli ambienti di lavoro.",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      duration: "45 min",
      listeners: "1.2K",
      rating: 4.8,
      isNew: true
    },
    {
      id: 2,
      title: "Digitalizzazione dei Processi Würth",
      series: "Digital Evolution",
      description: "Come la trasformazione digitale sta cambiando i nostri processi operativi.",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      duration: "38 min",
      listeners: "2.1K",
      rating: 4.9,
      isNew: false
    }
  ];

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Contenuti in Evidenza</h2>
        <div className="bg-wurth-red text-white text-xs font-bold px-3 py-1 rounded-full">
          FEATURED
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {featured.map((item) => (
          <div key={item.id} className="bg-wurth-gray rounded-xl overflow-hidden group hover:bg-gray-700 transition-all duration-300 cursor-pointer">
            <div className="relative h-48">
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              
              {item.isNew && (
                <div className="absolute top-4 left-4">
                  <span className="bg-wurth-red text-white text-xs font-bold px-2 py-1 rounded-full">
                    NUOVO
                  </span>
                </div>
              )}
              
              <button className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                <div className="bg-wurth-red rounded-full p-4 transform scale-90 group-hover:scale-100 transition-transform">
                  <Play className="w-6 h-6 text-white" />
                </div>
              </button>
              
              <div className="absolute bottom-4 right-4 flex items-center space-x-1 text-yellow-400">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-white text-sm font-medium">{item.rating}</span>
              </div>
            </div>
            
            <div className="p-6">
              <div className="mb-2">
                <span className="text-wurth-red text-sm font-medium">{item.series}</span>
              </div>
              <h3 className="text-white font-bold text-lg mb-3 group-hover:text-wurth-red transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                {item.description}
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{item.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{item.listeners} ascolti</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedContent;
