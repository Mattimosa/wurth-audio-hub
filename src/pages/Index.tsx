
import React, { useState, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import PodcastCard from '../components/PodcastCard';
import FeaturedPodcast from '../components/FeaturedPodcast';
import { categories, getFeaturedPodcasts, getPodcastsByCategory } from '../data/podcasts';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Tutti");
  const featuredPodcasts = getFeaturedPodcasts();
  const [filteredPodcasts, setFilteredPodcasts] = useState(getPodcastsByCategory(selectedCategory));
  
  useEffect(() => {
    setFilteredPodcasts(getPodcastsByCategory(selectedCategory));
  }, [selectedCategory]);
  
  return (
    <MainLayout>
      {featuredPodcasts.length > 0 && <FeaturedPodcast podcast={featuredPodcasts[0]} />}
      
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Categorie</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm ${
                selectedCategory === category 
                  ? 'bg-wurth-red text-white' 
                  : 'bg-wurth-gray text-gray-300 hover:bg-opacity-80'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      <div className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">
            {selectedCategory === "Tutti" ? "Tutti i podcast" : `Podcast: ${selectedCategory}`}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredPodcasts.map((podcast) => (
            <PodcastCard key={podcast.id} podcast={podcast} />
          ))}
        </div>
      </div>
      
      <div className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Episodi recenti</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredPodcasts.slice(0, 5).map((podcast) => (
            podcast.episodes.length > 0 && (
              <PodcastCard key={`recent-${podcast.id}`} podcast={podcast} size="small" />
            )
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
