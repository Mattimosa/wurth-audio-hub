
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, BookOpen, Settings, Mic } from 'lucide-react';

const QuickActions = () => {
  const actions = [
    {
      title: "Esplora Contenuti",
      description: "Scopri i podcast formativi",
      icon: Search,
      href: "/search",
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "La Tua Libreria",
      description: "I tuoi preferiti e progressi",
      icon: BookOpen,
      href: "/library",
      color: "from-green-500 to-green-600"
    },
    {
      title: "Crea Contenuto",
      description: "Condividi la tua esperienza",
      icon: Mic,
      href: "/admin",
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Area Digitale",
      description: "Tools e risorse tech",
      icon: Settings,
      href: "/digital",
      color: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <section className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-white">Azioni Rapide</h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Accedi rapidamente alle funzionalità principali della piattaforma
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {actions.map((action, index) => {
          const IconComponent = action.icon;
          return (
            <Link
              key={index}
              to={action.href}
              className="group relative bg-wurth-gray/80 backdrop-blur-sm rounded-2xl p-8 hover:bg-gray-700/80 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl border border-gray-700/50 hover:border-gray-600/50 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Background gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-20 rounded-2xl transition-all duration-500`} />
              
              {/* Content */}
              <div className="relative space-y-6">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${action.color} shadow-lg group-hover:scale-110 transition-all duration-500 group-hover:shadow-xl`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                
                {/* Text content */}
                <div className="space-y-3">
                  <h3 className="text-white font-bold text-xl group-hover:text-wurth-red transition-colors duration-300">
                    {action.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {action.description}
                  </p>
                </div>

                {/* Hover indicator */}
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <div className="w-full h-1 bg-gradient-to-r from-transparent via-wurth-red to-transparent rounded-full"></div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default QuickActions;
