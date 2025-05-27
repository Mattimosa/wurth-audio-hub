
import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import PodcastCard from '../components/PodcastCard';
import { Search as SearchIcon, Filter, TrendingUp, Clock, Star } from 'lucide-react';
import { useSeries } from '../hooks/useSeries';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const { series, categories } = useSeries();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    
    let results = series.filter(s => {
      const query = searchQuery.toLowerCase();
      return (
        s.title.toLowerCase().includes(query) || 
        (s.description && s.description.toLowerCase().includes(query)) ||
        (s.category && s.category.name.toLowerCase().includes(query))
      );
    });

    // Apply filters
    if (activeFilter === 'recent') {
      results = results.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    } else if (activeFilter === 'popular') {
      results = results.sort((a, b) => (b.episodes?.length || 0) - (a.episodes?.length || 0));
    }
    
    setSearchResults(results);
  };

  const popularSearches = [
    'Formazione tecnica', 'Sicurezza', 'Innovazione', 'Leadership', 
    'Automotive', 'Sviluppo professionale'
  ];

  const recentSearches = [
    'Industria 4.0', 'Best practices', 'Team building'
  ];
  
  return (
    <MainLayout>
      <div className="mb-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Cerca</h1>
          <p className="text-gray-400">Trova contenuti formativi, serie e episodi del team Würth</p>
        </div>
        
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex items-center bg-wurth-gray rounded-full overflow-hidden px-4 py-3 focus-within:ring-2 focus-within:ring-wurth-red shadow-lg">
            <SearchIcon className="w-5 h-5 text-gray-400 mr-3" />
            <input
              type="text"
              placeholder="Cerca serie, episodi, categorie o argomenti..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-white flex-1 placeholder-gray-500"
            />
            <button 
              type="submit" 
              className="bg-wurth-red text-white rounded-full px-6 py-2 text-sm font-medium hover:bg-red-600 transition-colors"
            >
              Cerca
            </button>
          </div>
        </form>

        {/* Filtri */}
        {searchQuery && (
          <div className="flex items-center space-x-4 mb-6">
            <Filter className="w-4 h-4 text-gray-400" />
            <div className="flex space-x-2">
              {[
                { id: 'all', label: 'Tutti', icon: null },
                { id: 'recent', label: 'Recenti', icon: Clock },
                { id: 'popular', label: 'Popolari', icon: TrendingUp },
              ].map(filter => {
                const IconComponent = filter.icon;
                return (
                  <button
                    key={filter.id}
                    onClick={() => {
                      setActiveFilter(filter.id);
                      if (searchQuery) handleSearch({ preventDefault: () => {} } as any);
                    }}
                    className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm transition-colors ${
                      activeFilter === filter.id 
                        ? 'bg-wurth-red text-white' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {IconComponent && <IconComponent className="w-3 h-3" />}
                    <span>{filter.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
        
        {!searchQuery && (
          <div className="space-y-8">
            {/* Categorie popolari */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 text-wurth-red mr-2" />
                Categorie Popolari
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {categories.map(category => (
                  <div 
                    key={category.id} 
                    className="bg-wurth-gray rounded-lg overflow-hidden cursor-pointer hover:bg-gray-700 transition-colors group"
                    onClick={() => {
                      setSearchQuery(category.name);
                      handleSearch({ preventDefault: () => {} } as any);
                    }}
                  >
                    <div className="h-24 bg-gradient-to-br from-wurth-red to-red-800 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <h3 className="text-sm font-bold text-white text-center px-2 relative z-10">{category.name}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ricerche popolari */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <Star className="w-5 h-5 text-yellow-400 mr-2" />
                Ricerche Popolari
              </h2>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map(search => (
                  <button
                    key={search}
                    onClick={() => {
                      setSearchQuery(search);
                      handleSearch({ preventDefault: () => {} } as any);
                    }}
                    className="bg-gray-700 hover:bg-wurth-red text-gray-300 hover:text-white px-4 py-2 rounded-full text-sm transition-colors"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>

            {/* Ricerche recenti */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <Clock className="w-5 h-5 text-blue-400 mr-2" />
                Ricerche Recenti
              </h2>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map(search => (
                  <button
                    key={search}
                    onClick={() => {
                      setSearchQuery(search);
                      handleSearch({ preventDefault: () => {} } as any);
                    }}
                    className="bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-gray-300 px-3 py-2 rounded-lg text-sm transition-colors flex items-center space-x-2"
                  >
                    <Clock className="w-3 h-3" />
                    <span>{search}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {searchQuery && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">
                Risultati per "{searchQuery}" 
                {searchResults.length > 0 && (
                  <span className="text-gray-400 font-normal ml-2">({searchResults.length} risultati)</span>
                )}
              </h2>
            </div>
            
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {searchResults.map((seriesItem) => (
                  <PodcastCard key={seriesItem.id} podcast={seriesItem} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="mb-4">
                  <SearchIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                </div>
                <p className="text-gray-400 text-lg mb-2">Nessun risultato trovato per "{searchQuery}"</p>
                <p className="text-gray-500 mb-6">Prova con termini diversi o esplora le categorie popolari</p>
                <button 
                  onClick={() => setSearchQuery('')}
                  className="bg-wurth-red text-white px-6 py-2 rounded-full hover:bg-red-600 transition-colors"
                >
                  Torna alla ricerca
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Search;
