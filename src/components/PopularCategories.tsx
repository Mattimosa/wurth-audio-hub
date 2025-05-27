
import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, Shield, Car, Lightbulb, Users, BookOpen, TrendingUp } from 'lucide-react';

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
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Categorie Popolari</h2>
        <Link 
          to="/search" 
          className="text-wurth-red hover:text-red-400 font-medium text-sm transition-colors"
        >
          Esplora tutte
        </Link>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category) => {
          const IconComponent = category.icon;
          return (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="bg-wurth-gray rounded-lg p-4 hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 group relative"
            >
              {category.trending && (
                <div className="absolute top-2 right-2">
                  <TrendingUp className="w-3 h-3 text-green-400" />
                </div>
              )}
              
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br ${category.color} mb-3 group-hover:scale-110 transition-transform duration-300`}>
                <IconComponent className="w-5 h-5 text-white" />
              </div>
              
              <h3 className="text-white font-medium text-sm mb-1 group-hover:text-wurth-red transition-colors">
                {category.name}
              </h3>
              <p className="text-gray-400 text-xs">
                {category.count} episodi
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default PopularCategories;
