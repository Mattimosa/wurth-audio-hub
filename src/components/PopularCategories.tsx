
import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, Shield, Car, Lightbulb, Users, BookOpen, TrendingUp, ArrowRight } from 'lucide-react';

const PopularCategories = () => {
  const categories = [
    {
      id: 'formazione-tecnica',
      name: 'Formazione Tecnica',
      icon: Wrench,
      count: 24,
      color: 'from-blue-500 to-blue-600',
      trending: true
    },
    {
      id: 'sicurezza',
      name: 'Sicurezza',
      icon: Shield,
      count: 18,
      color: 'from-green-500 to-green-600',
      trending: false
    },
    {
      id: 'sviluppo-professionale',
      name: 'Sviluppo Professionale',
      icon: BookOpen,
      count: 15,
      color: 'from-purple-500 to-purple-600',
      trending: true
    },
    {
      id: 'automotive',
      name: 'Automotive',
      icon: Car,
      count: 12,
      color: 'from-red-500 to-red-600',
      trending: false
    },
    {
      id: 'innovazione',
      name: 'Innovazione',
      icon: Lightbulb,
      count: 9,
      color: 'from-yellow-500 to-orange-500',
      trending: true
    },
    {
      id: 'leadership',
      name: 'Leadership',
      icon: Users,
      count: 11,
      color: 'from-indigo-500 to-indigo-600',
      trending: false
    }
  ];

  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-white">Categorie Popolari</h2>
          <p className="text-gray-400">Esplora i contenuti più seguiti dal team</p>
        </div>
        <Link 
          to="/search" 
          className="group flex items-center space-x-2 text-wurth-red hover:text-red-400 font-semibold transition-all duration-300 bg-wurth-red/10 hover:bg-wurth-red/20 px-4 py-2 rounded-full"
        >
          <span>Esplora tutte</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category, index) => {
          const IconComponent = category.icon;
          return (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="group bg-wurth-gray/80 backdrop-blur-sm rounded-xl p-6 hover:bg-gray-700/80 transition-all duration-500 transform hover:scale-105 hover:shadow-xl border border-gray-700/50 hover:border-gray-600/50 relative overflow-hidden animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Trending indicator */}
              {category.trending && (
                <div className="absolute top-3 right-3 z-10">
                  <div className="bg-green-500/20 backdrop-blur-sm rounded-full p-1 border border-green-500/30">
                    <TrendingUp className="w-3 h-3 text-green-400" />
                  </div>
                </div>
              )}
              
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-all duration-500`} />
              
              <div className="relative space-y-4">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} shadow-lg group-hover:scale-110 transition-all duration-500`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                
                {/* Content */}
                <div className="space-y-2">
                  <h3 className="text-white font-semibold text-sm leading-tight group-hover:text-wurth-red transition-colors duration-300">
                    {category.name}
                  </h3>
                  <p className="text-gray-400 text-xs group-hover:text-gray-300 transition-colors duration-300">
                    {category.count} episodi
                  </p>
                </div>

                {/* Progress indicator */}
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="w-full h-0.5 bg-gray-600 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${category.color} rounded-full transition-all duration-700 transform translate-x-[-100%] group-hover:translate-x-0`}
                    ></div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default PopularCategories;
