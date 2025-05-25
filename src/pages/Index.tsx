
import React from 'react';
import MainLayout from '../layouts/MainLayout';
import FeaturedPodcast from '../components/FeaturedPodcast';
import PodcastCard from '../components/PodcastCard';
import { useSeries } from '../hooks/useSeries';

const Index = () => {
  const { series, featuredSeries, loading } = useSeries();

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-96">
          <div className="text-white text-xl">Caricamento contenuti...</div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="mb-8">
        {featuredSeries && <FeaturedPodcast podcast={featuredSeries} />}
        
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Episodi Recenti</h2>
          {series.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg mb-4">Non ci sono ancora serie disponibili</p>
              <p className="text-gray-500">Vai alla sezione Admin per creare la tua prima serie podcast!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {series.map((podcast) => (
                <PodcastCard key={podcast.id} podcast={podcast} />
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
