
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
import { Sparkles, Users, TrendingUp } from 'lucide-react';

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
            <div className="text-white text-xl font-semibold animate-fade-in">Caricamento contenuti Würth...</div>
            <div className="text-gray-400 text-sm mt-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>Preparando la tua esperienza podcast</div>
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
          <section className="mb-12 animate-fade-in">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2 flex items-center space-x-2">
                  <Sparkles className="w-8 h-8 text-wurth-red" />
                  <span>Le Tue Serie</span>
                </h2>
                <p className="text-gray-400">Contenuti creati e gestiti da te</p>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse flex items-center space-x-1">
                <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                <span>LIVE CONTENT</span>
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
                    ATTIVO
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Enhanced Call to Action per creators */}
        <section className="mb-12 animate-fade-in">
          <div className="relative bg-gradient-to-r from-wurth-red via-red-600 to-red-700 rounded-xl p-8 text-center overflow-hidden shadow-2xl">
            {/* Animated background elements */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-1000"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-white/20 rounded-full p-3 mr-3">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white">Diventa un Creator Würth</h2>
              </div>
              
              <p className="text-red-100 text-lg mb-6 max-w-2xl mx-auto">
                Hai expertise da condividere? Crea la tua serie podcast e raggiungi migliaia di professionali del settore.
              </p>
              
              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4 mb-6 max-w-md mx-auto">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">15K+</div>
                  <div className="text-red-200 text-sm">Ascoltatori</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">4.9</div>
                  <div className="text-red-200 text-sm">Rating Medio</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">89%</div>
                  <div className="text-red-200 text-sm">Completamento</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-wurth-red font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl">
                  Inizia a creare
                </button>
                <button className="border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white hover:text-wurth-red transition-all duration-300 transform hover:scale-105">
                  Scopri di più
                </button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Success Stories Section */}
        <section className="mb-12 animate-fade-in">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Storie di Successo</h2>
            <p className="text-gray-400">I nostri creator raccontano la loro esperienza</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Marco Rossini",
                role: "Technical Manager",
                story: "Grazie alla piattaforma ho condiviso le mie competenze con oltre 5000 colleghi",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
              },
              {
                name: "Laura Bianchi",
                role: "Innovation Lead",
                story: "La mia serie su Industry 4.0 ha raggiunto 12K ascoltatori in 3 mesi",
                avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
              },
              {
                name: "Giuseppe Verde",
                role: "Safety Expert",
                story: "Ho aiutato centinaia di operatori a migliorare le loro competenze di sicurezza",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
              }
            ].map((testimonial, index) => (
              <div 
                key={index}
                className="bg-wurth-gray rounded-lg p-6 hover:bg-gray-700 transition-all duration-300 hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-3"
                  />
                  <div>
                    <h4 className="text-white font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm italic">"{testimonial.story}"</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Index;
