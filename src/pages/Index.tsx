
import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import PodcastCard from '../components/PodcastCard';
import FeaturedPodcast from '../components/FeaturedPodcast';
import { useSeries } from '../hooks/useSeries';
import { useAuth } from '../hooks/useAuth';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Tutti");
  const { series, categories, loading } = useSeries();
  const { isAdmin } = useAuth();
  
  // Get featured series (first 3)
  const featuredSeries = series.slice(0, 3);
  
  // Filter series by category
  const filteredSeries = selectedCategory === "Tutti" 
    ? series 
    : series.filter(s => s.category?.slug === selectedCategory.toLowerCase());
  
  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-white text-xl">Caricamento...</div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {featuredSeries.length > 0 && <FeaturedPodcast podcast={featuredSeries[0]} />}
      
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Categorie</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory("Tutti")}
            className={`px-4 py-2 rounded-full text-sm ${
              selectedCategory === "Tutti" 
                ? 'bg-wurth-red text-white' 
                : 'bg-wurth-gray text-gray-300 hover:bg-opacity-80'
            }`}
          >
            Tutti
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.name)}
              className={`px-4 py-2 rounded-full text-sm ${
                selectedCategory === category.name 
                  ? 'bg-wurth-red text-white' 
                  : 'bg-wurth-gray text-gray-300 hover:bg-opacity-80'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
      
      <div className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">
            {selectedCategory === "Tutti" ? "Tutte le serie" : `Serie: ${selectedCategory}`}
          </h2>
        </div>
        {filteredSeries.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredSeries.map((seriesItem) => (
              <PodcastCard key={seriesItem.id} podcast={seriesItem} />
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center py-8">
            Nessuna serie trovata per questa categoria. 
            <a href="/admin" className="text-wurth-red ml-1 hover:underline">
              Aggiungi una nuova serie
            </a>
          </p>
        )}
      </div>
      
      <div className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Serie recenti</h2>
        </div>
        {series.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {series
              .slice(0, 5)
              .map((seriesItem) => (
                <PodcastCard key={`recent-${seriesItem.id}`} podcast={seriesItem} size="small" />
              ))
            }
          </div>
        ) : (
          <p className="text-gray-400 text-center py-8">
            Nessuna serie recente trovata. 
            <a href="/admin" className="text-wurth-red ml-1 hover:underline">
              Aggiungi una nuova serie
            </a>
          </p>
        )}
      </div>
    </MainLayout>
  );
};

export default Index;
