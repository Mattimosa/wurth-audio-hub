
import React from 'react';
import { TrendingUp, Play, Headphones } from 'lucide-react';

const TrendingSection = () => {
  const trendingContent = [
    {
      id: 1,
      title: "Sicurezza nei cantieri: le nuove normative 2024",
      podcast: "Safety First",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      plays: "12.5K",
      trend: "+45%"
    },
    {
      id: 2,
      title: "Innovazioni automotive: il futuro è elettrico",
      podcast: "Tech Drive",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      plays: "8.9K",
      trend: "+32%"
    },
    {
      id: 3,
      title: "Gestione digitale del magazzino: caso studio",
      podcast: "Digital Solutions",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      plays: "15.2K",
      trend: "+67%"
    },
    {
      id: 4,
      title: "Nuovi materiali per l'edilizia sostenibile",
      podcast: "Green Building",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      plays: "6.7K",
      trend: "+28%"
    },
    {
      id: 5,
      title: "Formazione tecnica: competenze del futuro",
      podcast: "Skills Lab",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
      plays: "9.3K",
      trend: "+41%"
    }
  ];

  return (
    <section className="mb-12">
      <div className="flex items-center space-x-3 mb-6">
        <TrendingUp className="w-8 h-8 text-wurth-red" />
        <h2 className="text-3xl font-bold text-white">Trending Now</h2>
        <div className="bg-wurth-red text-white text-xs font-bold px-2 py-1 rounded-full">
          HOT
        </div>
      </div>
      
      <div className="space-y-3">
        {trendingContent.map((item, index) => (
          <div key={item.id} className="bg-wurth-gray rounded-lg p-4 hover:bg-gray-700 transition-colors cursor-pointer group flex items-center space-x-4">
            <div className="text-wurth-red font-bold text-lg w-8">
              #{index + 1}
            </div>
            <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center transition-all">
                <Play className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-semibold text-sm line-clamp-1 group-hover:text-wurth-red transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-400 text-xs">{item.podcast}</p>
            </div>
            <div className="flex items-center space-x-4 text-xs">
              <div className="flex items-center space-x-1 text-gray-400">
                <Headphones className="w-3 h-3" />
                <span>{item.plays}</span>
              </div>
              <div className="flex items-center space-x-1 text-green-400">
                <TrendingUp className="w-3 h-3" />
                <span>{item.trend}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrendingSection;
