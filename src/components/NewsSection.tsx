
import React from 'react';
import { Calendar, Clock, ArrowRight, TrendingUp, Star, Users } from 'lucide-react';

const NewsSection = () => {
  const news = [
    {
      id: 1,
      title: "Würth lancia la nuova gamma di prodotti per l'Industria 4.0",
      summary: "Una rivoluzione tecnologica che cambierà il modo di lavorare nei cantieri moderni.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      date: "2 giorni fa",
      category: "Innovazione",
      readTime: "3 min",
      trending: true,
      featured: true,
      views: "12.5K"
    },
    {
      id: 2,
      title: "Sostenibilità: il nuovo programma green di Würth",
      summary: "Obiettivo carbon neutral entro il 2030 con nuove iniziative eco-friendly.",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      date: "5 giorni fa",
      category: "Sostenibilità",
      readTime: "5 min",
      trending: false,
      featured: false,
      views: "8.3K"
    },
    {
      id: 3,
      title: "Partnership strategica con leader tecnologici europei",
      summary: "Nuove collaborazioni per accelerare la digitalizzazione industriale.",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      date: "1 settimana fa",
      category: "Business",
      readTime: "4 min",
      trending: true,
      featured: false,
      views: "15.7K"
    },
    {
      id: 4,
      title: "Nuovi percorsi di formazione per i dipendenti Würth",
      summary: "Programmi di sviluppo professionale e certificazioni digitali per tutto il personale.",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
      date: "3 giorni fa",
      category: "Formazione",
      readTime: "6 min",
      trending: true,
      featured: true,
      views: "9.8K"
    }
  ];

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6 animate-fade-in">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">News & Aggiornamenti</h2>
          <p className="text-gray-400">Le ultime novità dal mondo Würth</p>
        </div>
        <button className="text-wurth-red hover:text-red-400 flex items-center space-x-1 font-medium transition-all duration-300 hover:scale-105 group">
          <span>Vedi tutte</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {news.map((item, index) => (
          <article 
            key={item.id} 
            className={`bg-wurth-gray rounded-lg overflow-hidden hover:bg-gray-700 transition-all duration-500 cursor-pointer group hover:scale-105 hover:-translate-y-2 shadow-lg hover:shadow-2xl animate-fade-in ${
              item.featured ? 'md:col-span-2 xl:col-span-2' : ''
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className={`relative overflow-hidden ${item.featured ? 'h-64' : 'h-48'}`}>
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Badges */}
              <div className="absolute top-3 left-3 flex space-x-2">
                <span className="bg-wurth-red text-white text-xs font-bold px-2 py-1 rounded">
                  {item.category}
                </span>
                {item.trending && (
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-2 py-1 rounded flex items-center space-x-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>HOT</span>
                  </span>
                )}
                {item.featured && (
                  <span className="bg-gradient-to-r from-purple-500 to-pink-600 text-white text-xs font-bold px-2 py-1 rounded flex items-center space-x-1">
                    <Star className="w-3 h-3" />
                    <span>FEATURED</span>
                  </span>
                )}
              </div>
              
              {/* Views counter */}
              <div className="absolute top-3 right-3">
                <div className="bg-black/50 text-white text-xs px-2 py-1 rounded flex items-center space-x-1">
                  <Users className="w-3 h-3" />
                  <span>{item.views}</span>
                </div>
              </div>
            </div>
            
            <div className="p-5">
              <h3 className={`text-white font-bold mb-2 line-clamp-2 group-hover:text-wurth-red transition-colors duration-300 ${
                item.featured ? 'text-xl' : 'text-lg'
              }`}>
                {item.title}
              </h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                {item.summary}
              </p>
              <div className="flex items-center justify-between text-gray-500 text-xs">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{item.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{item.readTime}</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1" />
              </div>
            </div>
          </article>
        ))}
      </div>
      
      {/* Call to action */}
      <div className="mt-8 bg-gradient-to-r from-wurth-red/10 to-transparent rounded-lg p-6 border border-wurth-red/20">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white font-semibold mb-1">Rimani sempre aggiornato</h3>
            <p className="text-gray-400 text-sm">Ricevi le ultime novità direttamente nella tua email</p>
          </div>
          <button className="bg-wurth-red hover:bg-red-600 text-white font-medium py-2 px-6 rounded-full transition-all duration-300 hover:scale-105">
            Iscriviti
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
