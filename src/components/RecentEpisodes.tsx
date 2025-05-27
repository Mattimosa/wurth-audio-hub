
import React from 'react';
import { Play, Clock, Calendar } from 'lucide-react';

const RecentEpisodes = () => {
  const recentEpisodes = [
    {
      id: 1,
      title: "Implementazione WMS: Best Practices",
      series: "Digital Transformation",
      duration: "32 min",
      date: "2 giorni fa",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
    },
    {
      id: 2,
      title: "Protocolli di Sicurezza Cantieri 2024",
      series: "Safety First",
      duration: "28 min",
      date: "3 giorni fa",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475"
    },
    {
      id: 3,
      title: "Leadership in Tempi di Cambiamento",
      series: "Management Skills",
      duration: "41 min",
      date: "5 giorni fa",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1"
    },
    {
      id: 4,
      title: "Innovazioni nel Settore Automotive",
      series: "Industry Update",
      duration: "35 min",
      date: "1 settimana fa",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
    }
  ];

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Episodi Recenti</h2>
        <button className="text-wurth-red hover:text-red-400 font-medium text-sm transition-colors">
          Vedi tutti
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {recentEpisodes.map((episode) => (
          <div 
            key={episode.id} 
            className="bg-wurth-gray rounded-lg overflow-hidden hover:bg-gray-700 transition-colors cursor-pointer group"
          >
            <div className="relative h-32">
              <img 
                src={episode.image} 
                alt={episode.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Play className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <div className="p-4">
              <div className="mb-2">
                <span className="text-wurth-red text-xs font-medium">{episode.series}</span>
              </div>
              <h3 className="text-white font-medium text-sm mb-3 line-clamp-2 group-hover:text-wurth-red transition-colors">
                {episode.title}
              </h3>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{episode.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>{episode.date}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentEpisodes;
