
import React from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import PodcastCard from '../components/PodcastCard';
import { getPodcastsByCategory } from '../data/podcasts';

const Category = () => {
  const { categoryName = "Tutti" } = useParams<{ categoryName: string }>();
  const podcasts = getPodcastsByCategory(categoryName);
  
  return (
    <MainLayout>
      <div className="mb-8">
        <div className="flex items-center mb-6">
          <h1 className="text-3xl font-bold text-white">{categoryName}</h1>
        </div>
        
        {podcasts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {podcasts.map((podcast) => (
              <PodcastCard key={podcast.id} podcast={podcast} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">Nessun podcast trovato in questa categoria.</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Category;
