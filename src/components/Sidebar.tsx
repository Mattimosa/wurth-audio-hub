
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, List, Podcast, Code, Layout, Settings, Plus, ArrowRight, Heart, Download } from 'lucide-react';
import { categories } from '../data/podcasts';

const Sidebar = () => {
  const location = useLocation();
  const [isLibraryExpanded, setIsLibraryExpanded] = useState(true);
  
  return (
    <aside className="w-64 h-screen bg-wurth-dark flex-shrink-0 overflow-y-auto border-r border-gray-800">
      {/* Top Section */}
      <div className="p-6">
        <div className="flex items-center mb-8">
          <img 
            src="/lovable-uploads/687e7b12-6eff-44dc-b3c9-e8f7423844d7.png" 
            alt="Wurth Logo" 
            className="h-8" 
          />
          <span className="ml-3 text-xl font-bold text-white">Podcast</span>
        </div>
        
        {/* Main Navigation */}
        <nav className="mb-8">
          <ul className="space-y-4">
            <li>
              <Link 
                to="/" 
                className={`flex items-center py-3 px-4 rounded-md transition-colors ${
                  location.pathname === '/' 
                    ? 'bg-wurth-gray text-white font-semibold' 
                    : 'text-gray-300 hover:text-white hover:bg-wurth-gray/50'
                }`}
              >
                <Home className="w-6 h-6 mr-4" />
                <span className="font-medium">Home</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/search" 
                className={`flex items-center py-3 px-4 rounded-md transition-colors ${
                  location.pathname === '/search' 
                    ? 'bg-wurth-gray text-white font-semibold' 
                    : 'text-gray-300 hover:text-white hover:bg-wurth-gray/50'
                }`}
              >
                <Search className="w-6 h-6 mr-4" />
                <span className="font-medium">Cerca</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Your Library Section */}
        <div className="mb-6">
          <div 
            className="flex items-center justify-between py-2 px-4 text-gray-300 hover:text-white cursor-pointer group"
            onClick={() => setIsLibraryExpanded(!isLibraryExpanded)}
          >
            <div className="flex items-center">
              <List className="w-6 h-6 mr-4" />
              <span className="font-medium">La tua libreria</span>
            </div>
            <div className="flex items-center space-x-2">
              <Plus className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <ArrowRight className={`w-4 h-4 transition-transform ${isLibraryExpanded ? 'rotate-90' : ''}`} />
            </div>
          </div>
          
          {isLibraryExpanded && (
            <div className="mt-4 space-y-2">
              {/* Recently Played */}
              <div className="flex items-center p-3 rounded-md hover:bg-wurth-gray/30 cursor-pointer group">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-md flex items-center justify-center mr-3">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-white text-sm font-medium">Episodi piaciuti</h4>
                  <p className="text-gray-400 text-xs">0 episodi</p>
                </div>
              </div>

              {/* Downloaded */}
              <div className="flex items-center p-3 rounded-md hover:bg-wurth-gray/30 cursor-pointer group">
                <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-md flex items-center justify-center mr-3">
                  <Download className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-white text-sm font-medium">I tuoi episodi</h4>
                  <p className="text-gray-400 text-xs">Salvati e scaricati</p>
                </div>
              </div>

              {/* Quick Links */}
              <Link to="/digital">
                <div className="flex items-center p-3 rounded-md hover:bg-wurth-gray/30 cursor-pointer group">
                  <div className="w-12 h-12 bg-gradient-to-br from-wurth-red to-red-700 rounded-md flex items-center justify-center mr-3">
                    <Code className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white text-sm font-medium">Tecnologia</h4>
                    <p className="text-gray-400 text-xs">Serie tech</p>
                  </div>
                </div>
              </Link>

              <Link to="/admin">
                <div className="flex items-center p-3 rounded-md hover:bg-wurth-gray/30 cursor-pointer group">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-orange-700 rounded-md flex items-center justify-center mr-3">
                    <Settings className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white text-sm font-medium">Amministrazione</h4>
                    <p className="text-gray-400 text-xs">Gestisci contenuti</p>
                  </div>
                </div>
              </Link>
            </div>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          <div className="px-3 py-1 bg-wurth-gray rounded-full text-xs text-gray-300 hover:bg-gray-600 cursor-pointer">
            Playlist
          </div>
          <div className="px-3 py-1 bg-wurth-gray rounded-full text-xs text-gray-300 hover:bg-gray-600 cursor-pointer">
            Artisti
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-2">
          {categories.slice(0, 8).map((category) => (
            <Link key={category} to={`/category/${category}`}>
              <div className={`flex items-center p-2 rounded-md transition-colors cursor-pointer ${
                location.pathname === `/category/${category}` 
                  ? 'bg-wurth-gray/50 text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-wurth-gray/30'
              }`}>
                <div className="w-12 h-12 bg-gray-700 rounded mr-3 flex items-center justify-center">
                  <Podcast className="w-6 h-6 text-gray-400" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium truncate">{category}</h4>
                  <p className="text-xs text-gray-500">Categoria</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
