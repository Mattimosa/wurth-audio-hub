
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, List, Podcast, Code, Layout, Settings } from 'lucide-react';
import { categories } from '../data/podcasts';

const Sidebar = () => {
  const location = useLocation();
  
  return (
    <aside className="w-64 h-screen bg-sidebar flex-shrink-0 overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center mb-8">
          <img 
            src="/lovable-uploads/687e7b12-6eff-44dc-b3c9-e8f7423844d7.png" 
            alt="Wurth Logo" 
            className="h-10" 
          />
          <span className="ml-2 text-xl font-bold text-white">Podcast</span>
        </div>
        
        <nav>
          <ul className="space-y-4">
            <li>
              <Link 
                to="/" 
                className={`flex items-center ${location.pathname === '/' ? 'bg-wurth-red/20 text-wurth-red font-bold py-2 px-3 rounded-md' : 'text-gray-300 hover:text-wurth-red'} transition-colors`}
              >
                <Home className="w-5 h-5 mr-3" />
                <span className="text-sm font-medium">Home</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/search" 
                className={`flex items-center ${location.pathname === '/search' ? 'bg-wurth-red/20 text-wurth-red font-bold py-2 px-3 rounded-md' : 'text-gray-300 hover:text-wurth-red'} transition-colors`}
              >
                <Search className="w-5 h-5 mr-3" />
                <span className="text-sm font-medium">Cerca</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/digital" 
                className={`flex items-center ${location.pathname === '/digital' ? 'bg-wurth-red/20 text-wurth-red font-bold py-2 px-3 rounded-md' : 'text-gray-300 hover:text-wurth-red'} transition-colors`}
              >
                <Code className="w-5 h-5 mr-3" />
                <span className="text-sm font-medium">Digitale</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/library" 
                className={`flex items-center ${location.pathname === '/library' ? 'bg-wurth-red/20 text-wurth-red font-bold py-2 px-3 rounded-md' : 'text-gray-300 hover:text-wurth-red'} transition-colors`}
              >
                <List className="w-5 h-5 mr-3" />
                <span className="text-sm font-medium">La tua libreria</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/admin" 
                className={`flex items-center ${location.pathname === '/admin' ? 'bg-wurth-red/20 text-wurth-red font-bold py-2 px-3 rounded-md' : 'text-gray-300 hover:text-wurth-red'} transition-colors`}
              >
                <Settings className="w-5 h-5 mr-3" />
                <span className="text-sm font-medium">Amministrazione</span>
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="mt-8">
          <h3 className="text-xs uppercase font-bold tracking-wider text-gray-400 mb-4">Categorie</h3>
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category}>
                <Link 
                  to={`/category/${category}`} 
                  className={`flex items-center ${location.pathname === `/category/${category}` ? 'text-wurth-red' : 'text-gray-300 hover:text-wurth-red'} transition-colors py-1`}
                >
                  <Podcast className="w-4 h-4 mr-3" />
                  <span className="text-sm">{category}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
