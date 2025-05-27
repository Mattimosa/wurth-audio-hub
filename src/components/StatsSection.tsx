
import React from 'react';
import { Users, Headphones, Clock, Star, TrendingUp, Award } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    {
      icon: Users,
      value: "15.2K",
      label: "Utenti Attivi",
      growth: "+23%",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10"
    },
    {
      icon: Headphones,
      value: "2.8M",
      label: "Ore di Ascolto",
      growth: "+45%",
      color: "text-green-400",
      bgColor: "bg-green-500/10"
    },
    {
      icon: Clock,
      value: "342",
      label: "Episodi Totali",
      growth: "+67%",
      color: "text-purple-400",
      bgColor: "bg-purple-500/10"
    },
    {
      icon: Star,
      value: "4.9",
      label: "Rating Medio",
      growth: "+0.3",
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10"
    },
    {
      icon: TrendingUp,
      value: "89%",
      label: "Tasso Completamento",
      growth: "+12%",
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10"
    },
    {
      icon: Award,
      value: "156",
      label: "Certificazioni Rilasciate",
      growth: "+34%",
      color: "text-rose-400",
      bgColor: "bg-rose-500/10"
    }
  ];

  return (
    <section className="mb-12">
      <div className="bg-gradient-to-r from-wurth-red/10 to-red-900/10 rounded-xl p-8 border border-wurth-red/20">
        <div className="text-center mb-8 animate-fade-in">
          <h2 className="text-3xl font-bold text-white mb-2">Würth Podcast in numeri</h2>
          <p className="text-gray-400">La crescita della nostra community professionale</p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div 
                key={index} 
                className="text-center animate-fade-in hover-scale"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`${stat.bgColor} rounded-lg p-6 hover:bg-gray-700 transition-all duration-300 border border-gray-700 hover:border-gray-600 hover:shadow-xl group`}>
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gray-800 mb-4 ${stat.color} transition-transform duration-300 group-hover:scale-110`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-1 transition-colors duration-300 group-hover:text-wurth-red">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm mb-2">{stat.label}</div>
                  <div className="text-green-400 text-xs font-medium flex items-center justify-center space-x-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>{stat.growth} questo mese</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Additional insights */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-700/10 rounded-lg p-4 border border-blue-500/20">
            <h4 className="text-blue-400 font-semibold mb-2">🚀 Crescita Esplosiva</h4>
            <p className="text-gray-300 text-sm">+156% di nuovi utenti negli ultimi 3 mesi</p>
          </div>
          <div className="bg-gradient-to-br from-green-500/10 to-green-700/10 rounded-lg p-4 border border-green-500/20">
            <h4 className="text-green-400 font-semibold mb-2">⭐ Eccellenza Qualitativa</h4>
            <p className="text-gray-300 text-sm">Rating medio superiore a 4.8/5 per tutti i contenuti</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500/10 to-purple-700/10 rounded-lg p-4 border border-purple-500/20">
            <h4 className="text-purple-400 font-semibold mb-2">🎯 Engagement Alto</h4>
            <p className="text-gray-300 text-sm">Tempo medio di ascolto: 42 minuti per sessione</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
