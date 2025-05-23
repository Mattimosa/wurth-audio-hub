
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import PodcastCard from '../components/PodcastCard';
import FeaturedPodcast from '../components/FeaturedPodcast';
import { fetchCategories, fetchSeriesByCategory, getRecentEpisodes } from '../lib/podcastUtils';
import { Category, Series, Episode } from '../types/podcast';
import { SearchCommand } from '../components/SearchCommand';

// Adapter function to convert Series to the format expected by PodcastCard
const adaptSeriesToPodcastCard = (series: Series) => {
  return {
    id: series.id,
    title: series.title,
    description: series.description || '',
    imageUrl: series.cover_url || '/placeholder.svg',
    category: (series as any).categories?.name || 'Uncategorized',
    episodes: [],
    author: series.created_by || 'Unknown',
    slug: series.slug
  };
};

// Adapter function to convert Episode to the format expected by PodcastCard
const adaptEpisodeToPodcastCard = (episode: Episode) => {
  const seriesData = episode.series as any;
  return {
    id: episode.id,
    title: episode.title,
    description: episode.description || '',
    imageUrl: episode.cover_url || seriesData?.cover_url || '/placeholder.svg',
    category: 'Episode',
    episodes: [],
    author: 'Unknown',
    slug: seriesData?.slug
  };
};

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [categories, setCategories] = useState<Category[]>([]);
  const [series, setSeries] = useState<Series[]>([]);
  const [recentEpisodes, setRecentEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      
      try {
        // Load categories
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
        
        // Load series by category
        const categorySlug = selectedCategory === "all" ? undefined : selectedCategory;
        const seriesData = await fetchSeriesByCategory(categorySlug);
        setSeries(seriesData);
        
        // Load recent episodes
        const episodesData = await getRecentEpisodes();
        setRecentEpisodes(episodesData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadData();
  }, [selectedCategory]);
  
  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Würth Podcast</h1>
        <SearchCommand />
      </div>
      
      {series.length > 0 && (
        <FeaturedPodcast podcast={adaptSeriesToPodcastCard(series[0])} />
      )}
      
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Categorie</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-full text-sm ${
              selectedCategory === "all" 
                ? 'bg-wurth-red text-white' 
                : 'bg-wurth-gray text-gray-300 hover:bg-opacity-80'
            }`}
          >
            Tutti
          </button>
          
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.slug)}
              className={`px-4 py-2 rounded-full text-sm ${
                selectedCategory === category.slug 
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
            {selectedCategory === "all" ? "Tutti i podcast" : `Podcast: ${selectedCategory}`}
          </h2>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-gray-400">Caricamento podcast...</p>
          </div>
        ) : series.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {series.map((podcast) => (
              <Link key={podcast.id} to={`/series/${podcast.slug}`}>
                <PodcastCard podcast={adaptSeriesToPodcastCard(podcast)} />
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-wurth-gray p-8 rounded-lg text-center">
            <p className="text-gray-400">Nessun podcast trovato in questa categoria.</p>
          </div>
        )}
      </div>
      
      {recentEpisodes.length > 0 && (
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Episodi recenti</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {recentEpisodes.map((episode) => {
              const seriesInfo = episode.series as any;
              return (
                <Link 
                  key={episode.id} 
                  to={`/series/${seriesInfo?.slug}/${episode.id}`}
                >
                  <PodcastCard 
                    key={`recent-${episode.id}`}
                    podcast={adaptEpisodeToPodcastCard(episode)}
                    size="small" 
                  />
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default Index;
