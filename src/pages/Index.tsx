
import React from 'react';
import MainLayout from '../layouts/MainLayout';
import HeroSection from '../components/HeroSection';
import FeaturedContent from '../components/FeaturedContent';
import QuickActions from '../components/QuickActions';
import LiveUpdates from '../components/LiveUpdates';
import PopularCategories from '../components/PopularCategories';
import RecentEpisodes from '../components/RecentEpisodes';
import { useSeries } from '../hooks/useSeries';
import { Headphones, Loader2 } from 'lucide-react';

const Index = () => {
  const { series, loading } = useSeries();

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-96">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Loader2 className="w-12 h-12 text-wurth-red animate-spin" />
              <div className="absolute inset-0 w-12 h-12 rounded-full border-2 border-wurth-red/20"></div>
            </div>
            <div className="text-center">
              <h3 className="text-white text-xl font-semibold mb-2">Caricamento Würth Podcast</h3>
              <p className="text-gray-400 text-sm">Preparando i contenuti formativi...</p>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-12 pb-8 overflow-hidden">
        {/* Welcome Banner - Fixed positioning and spacing */}
        <section className="relative bg-gradient-to-r from-wurth-red/10 via-red-900/20 to-transparent rounded-xl p-8 border border-wurth-red/20 animate-fade-in">
          <div className="flex items-start space-x-4 mb-6">
            <div className="bg-wurth-red/20 p-3 rounded-full flex-shrink-0">
              <Headphones className="w-8 h-8 text-wurth-red" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-2">Benvenuto su Würth Podcast</h1>
              <p className="text-gray-300 text-lg">La piattaforma formativa dedicata al team Würth</p>
            </div>
          </div>
          <p className="text-gray-400 leading-relaxed max-w-4xl">
            Accedi ai contenuti formativi, aggiornamenti tecnici e sessioni di sviluppo professionale 
            pensati per valorizzare le competenze del nostro team.
          </p>
        </section>

        {/* Hero Section - Better spacing */}
        <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <HeroSection />
        </div>

        {/* Quick Actions - Improved animation */}
        <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <QuickActions />
        </div>

        {/* Featured Content - Staggered animation */}
        <div className="animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <FeaturedContent />
        </div>

        {/* Live Updates - Better positioning */}
        <div className="animate-slide-up" style={{ animationDelay: '0.8s' }}>
          <LiveUpdates />
        </div>

        {/* Popular Categories - Enhanced spacing */}
        <div className="animate-slide-up" style={{ animationDelay: '1s' }}>
          <PopularCategories />
        </div>

        {/* Recent Episodes - Improved layout */}
        <div className="animate-slide-up" style={{ animationDelay: '1.2s' }}>
          <RecentEpisodes />
        </div>

        {/* User Series if available - Better integration */}
        {series.length > 0 && (
          <div className="animate-slide-up" style={{ animationDelay: '1.4s' }}>
            <section className="bg-wurth-gray/50 rounded-xl p-8 backdrop-blur-sm border border-gray-700/50">
              <h2 className="text-2xl font-bold text-white mb-6">I Tuoi Contenuti</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {series.slice(0, 3).map((podcast, index) => (
                  <div 
                    key={podcast.id} 
                    className="bg-gray-700/80 rounded-lg p-6 hover:bg-gray-600/80 transition-all duration-300 transform hover:scale-105 hover:shadow-xl group animate-scale-in"
                    style={{ animationDelay: `${1.6 + index * 0.1}s` }}
                  >
                    <h3 className="text-white font-semibold mb-3 group-hover:text-wurth-red transition-colors">
                      {podcast.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{podcast.description}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Index;
