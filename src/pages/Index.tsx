
import React from 'react';
import MainLayout from '../layouts/MainLayout';
import HeroSection from '../components/HeroSection';
import NewsSection from '../components/NewsSection';
import TrendingSection from '../components/TrendingSection';
import CategoryShowcase from '../components/CategoryShowcase';
import RecommendedPodcasts from '../components/RecommendedPodcasts';
import PodcastCard from '../components/PodcastCard';
import { useSeries } from '../hooks/useSeries';
import { Sparkles, Users } from 'lucide-react';

const Index = () => {
  const { series, featuredSeries, loading } = useSeries();

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-96">
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-16 h-16 bg-wurth-red rounded-full mb-4 animate-pulse-subtle relative">
              <div className="absolute inset-0 bg-wurth-red rounded-full animate-ping opacity-20"></div>
            </div>
            <div className="text-white text-xl font-semibold animate-fade-in">Caricamento contenuti...</div>
            <div className="text-gray-400 text-sm mt-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>Preparando i tuoi podcast</div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-12">
        {/* Hero Section */}
        <HeroSection />
        
        {/* News Section */}
        <NewsSection />
        
        {/* Trending Section */}
        <TrendingSection />
        
        {/* Category Showcase */}
        <CategoryShowcase />
        
        {/* Serie Personali (se presenti) */}
        {series.length > 0 && (
          <section className="mb-12 animate-fade-in">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2 flex items-center space-x-2">
                  <Sparkles className="w-8 h-8 text-wurth-red" />
                  <span>I Tuoi Contenuti</span>
                </h2>
                <p className="text-gray-400">Serie e podcast che hai creato</p>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse flex items-center space-x-1">
                <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                <span>ATTIVO</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {series.map((podcast, index) => (
                <div 
                  key={podcast.id} 
                  className="relative animate-fade-in hover-scale"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <PodcastCard podcast={podcast} />
                  <div className="absolute top-2 right-2 bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                    LIVE
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Recommended Podcasts */}
        <RecommendedPodcasts />
        
        {/* Call to Action per colleghi */}
        <section className="mb-12 animate-fade-in">
          <div className="relative bg-gradient-to-r from-wurth-red via-red-600 to-red-700 rounded-xl p-8 text-center overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-1000"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-white/20 rounded-full p-3 mr-3">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white">Condividi la Tua Esperienza</h2>
              </div>
              
              <p className="text-red-100 text-lg mb-6 max-w-2xl mx-auto">
                Hai competenze e conoscenze da condividere con i colleghi? Crea il tuo podcast e contribuisci alla crescita professionale del team Würth.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-wurth-red font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl">
                  Crea il tuo podcast
                </button>
                <button className="border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white hover:text-wurth-red transition-all duration-300 transform hover:scale-105">
                  Scopri come iniziare
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Index;
