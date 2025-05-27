
import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Search, BookOpen, Settings, Mic, Headphones } from 'lucide-react';

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
    <section>
      <h2 className="text-xl font-bold text-white mb-6">Azioni Rapide</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action, index) => {
          const IconComponent = action.icon;
          return (
            <Link
              key={index}
              to={action.href}
              className="group relative bg-wurth-gray rounded-xl p-6 hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`} />
              <div className="relative">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br ${action.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white font-semibold mb-2 group-hover:text-wurth-red transition-colors">
                  {action.title}
                </h3>
                <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                  {action.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default QuickActions;
