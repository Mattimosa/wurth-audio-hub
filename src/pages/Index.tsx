
import React from 'react';
import MainLayout from '../layouts/MainLayout';
import HeroSection from '../components/HeroSection';
import NewsSection from '../components/NewsSection';
import TrendingSection from '../components/TrendingSection';
import CategoryShowcase from '../components/CategoryShowcase';
import RecommendedPodcasts from '../components/RecommendedPodcasts';
import StatsSection from '../components/StatsSection';
import PodcastCard from '../components/PodcastCard';
import { useSeries } from '../hooks/useSeries';

const Index = () => {
  const { series, featuredSeries, loading } = useSeries();

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-96">
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-16 h-16 bg-wurth-red rounded-full mb-4 animate-pulse-subtle"></div>
            <div className="text-white text-xl font-semibold">Caricamento contenuti Würth...</div>
            <div className="text-gray-400 text-sm mt-2">Preparando la tua esperienza podcast</div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-12">
        {/* Hero Section - Sempre visibile con contenuto demo */}
        <HeroSection />
        
        {/* News Section */}
        <NewsSection />
        
        {/* Stats Section */}
        <StatsSection />
        
        {/* Trending Section */}
        <TrendingSection />
        
        {/* Category Showcase */}
        <CategoryShowcase />
        
        {/* Recommended Podcasts */}
        <RecommendedPodcasts />
        
        {/* Serie Reali (se presenti) */}
        {series.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Le Tue Serie</h2>
                <p className="text-gray-400">Contenuti creati e gestiti da te</p>
              </div>
              <div className="bg-wurth-red text-white text-xs font-bold px-3 py-1 rounded-full">
                LIVE CONTENT
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {series.map((podcast) => (
                <div key={podcast.id} className="relative">
                  <PodcastCard podcast={podcast} />
                  <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    ATTIVO
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Call to Action per creators */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-wurth-red to-red-700 rounded-xl p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Diventa un Creator Würth</h2>
            <p className="text-red-100 text-lg mb-6 max-w-2xl mx-auto">
              Hai expertise da condividere? Crea la tua serie podcast e raggiungi migliaia di professionisti del settore.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-wurth-red font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors">
                Inizia a creare
              </button>
              <button className="border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white hover:text-wurth-red transition-colors">
                Scopri di più
              </button>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Index;
