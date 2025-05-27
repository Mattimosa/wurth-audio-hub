
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
      <div className="space-y-8 pb-8">
        {/* Welcome Banner */}
        <section className="bg-gradient-to-r from-wurth-red/10 via-red-900/20 to-transparent rounded-xl p-6 border border-wurth-red/20">
          <div className="flex items-center space-x-3 mb-4">
            <Headphones className="w-8 h-8 text-wurth-red" />
            <div>
              <h1 className="text-2xl font-bold text-white">Benvenuto su Würth Podcast</h1>
              <p className="text-gray-300">La piattaforma formativa dedicata al team Würth</p>
            </div>
          </div>
          <p className="text-gray-400 leading-relaxed">
            Accedi ai contenuti formativi, aggiornamenti tecnici e sessioni di sviluppo professionale 
            pensati per valorizzare le competenze del nostro team.
          </p>
        </section>

        {/* Hero Section */}
        <HeroSection />

        {/* Quick Actions */}
        <QuickActions />

        {/* Featured Content */}
        <FeaturedContent />

        {/* Live Updates */}
        <LiveUpdates />

        {/* Popular Categories */}
        <PopularCategories />

        {/* Recent Episodes */}
        <RecentEpisodes />

        {/* User Series if available */}
        {series.length > 0 && (
          <section className="bg-wurth-gray rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">I Tuoi Contenuti</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {series.slice(0, 3).map((podcast) => (
                <div key={podcast.id} className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors">
                  <h3 className="text-white font-semibold mb-2">{podcast.title}</h3>
                  <p className="text-gray-400 text-sm">{podcast.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </MainLayout>
  );
};

export default Index;
