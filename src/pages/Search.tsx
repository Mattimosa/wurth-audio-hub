
import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import PodcastCard from '../components/PodcastCard';
import { Search as SearchIcon } from 'lucide-react';
import { useSeries } from '../hooks/useSeries';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const { series, categories } = useSeries();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    
    // Simple search function that looks at titles, descriptions, and categories
    const results = series.filter(s => {
      const query = searchQuery.toLowerCase();
      return (
        s.title.toLowerCase().includes(query) || 
        (s.description && s.description.toLowerCase().includes(query)) ||
        (s.category && s.category.name.toLowerCase().includes(query))
      );
    });
    
    setSearchResults(results);
  };
  
  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-6">Cerca</h1>
        
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex items-center bg-wurth-gray rounded-full overflow-hidden px-4 py-2 focus-within:ring-2 focus-within:ring-wurth-red">
            <SearchIcon className="w-5 h-5 text-gray-400 mr-3" />
            <input
              type="text"
              placeholder="Cerca serie, episodi o categorie..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-white flex-1"
            />
            <button 
              type="submit" 
              className="bg-wurth-red text-white rounded-full px-4 py-1 text-sm font-medium"
            >
              Cerca
            </button>
          </div>
        </form>
        
        {!searchQuery && (
          <div>
            <h2 className="text-xl font-bold text-white mb-4">Categorie popolari</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {categories.map(category => (
                <div 
                  key={category.id} 
                  className="bg-wurth-gray rounded-lg overflow-hidden cursor-pointer hover:bg-opacity-80 transition-colors"
                >
                  <div className="h-24 bg-gradient-to-br from-wurth-red to-black flex items-center justify-center">
                    <h3 className="text-lg font-bold text-white">{category.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {searchQuery && (
          <div>
            <h2 className="text-xl font-bold text-white mb-4">Risultati della ricerca</h2>
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {searchResults.map((seriesItem) => (
                  <PodcastCard key={seriesItem.id} podcast={seriesItem} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400">Nessun risultato trovato per "{searchQuery}".</p>
                <p className="text-gray-500 mt-2">Prova con un'altra ricerca.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Search;
