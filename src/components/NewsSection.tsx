
import React from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

const NewsSection = () => {
  const news = [
    {
      id: 1,
      title: "Würth lancia la nuova gamma di prodotti per l'Industria 4.0",
      summary: "Una rivoluzione tecnologica che cambierà il modo di lavorare nei cantieri moderni.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      date: "2 giorni fa",
      category: "Innovazione",
      readTime: "3 min"
    },
    {
      id: 2,
      title: "Sostenibilità: il nuovo programma green di Würth",
      summary: "Obiettivo carbon neutral entro il 2030 con nuove iniziative eco-friendly.",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      date: "5 giorni fa",
      category: "Sostenibilità",
      readTime: "5 min"
    },
    {
      id: 3,
      title: "Partnership strategica con leader tecnologici europei",
      summary: "Nuove collaborazioni per accelerare la digitalizzazione industriale.",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      date: "1 settimana fa",
      category: "Business",
      readTime: "4 min"
    }
  ];

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-white">News & Aggiornamenti</h2>
        <button className="text-wurth-red hover:text-red-400 flex items-center space-x-1 font-medium">
          <span>Vedi tutte</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {news.map((item) => (
          <article key={item.id} className="bg-wurth-gray rounded-lg overflow-hidden hover:bg-gray-700 transition-colors cursor-pointer group">
            <div className="relative h-48 overflow-hidden">
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3">
                <span className="bg-wurth-red text-white text-xs font-bold px-2 py-1 rounded">
                  {item.category}
                </span>
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-white font-bold text-lg mb-2 line-clamp-2 group-hover:text-wurth-red transition-colors">
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
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default NewsSection;
