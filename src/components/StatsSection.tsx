
import React from 'react';
import { Users, Headphones, Clock, Star } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    {
      icon: Users,
      value: "15.2K",
      label: "Utenti Attivi",
      growth: "+23%",
      color: "text-blue-400"
    },
    {
      icon: Headphones,
      value: "2.8M",
      label: "Ore di Ascolto",
      growth: "+45%",
      color: "text-green-400"
    },
    {
      icon: Clock,
      value: "342",
      label: "Episodi Totali",
      growth: "+67%",
      color: "text-purple-400"
    },
    {
      icon: Star,
      value: "4.9",
      label: "Rating Medio",
      growth: "+0.3",
      color: "text-yellow-400"
    }
  ];

  return (
    <section className="mb-12">
      <div className="bg-gradient-to-r from-wurth-red/10 to-red-900/10 rounded-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Würth Podcast in numeri</h2>
          <p className="text-gray-400">La crescita della nostra community professionale</p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="bg-wurth-gray rounded-lg p-6 hover:bg-gray-700 transition-colors">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gray-800 mb-4 ${stat.color}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-gray-400 text-sm mb-2">{stat.label}</div>
                  <div className="text-green-400 text-xs font-medium">
                    {stat.growth} questo mese
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
