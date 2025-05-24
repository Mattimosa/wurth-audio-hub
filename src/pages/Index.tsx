
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { fetchCategories, fetchSeriesByCategory, getRecentEpisodes } from '../lib/podcastUtils';
import { Category, Series, Episode } from '../types/podcast';
import { SearchCommand } from '../components/SearchCommand';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, TrendingUp, Clock, Users, Star, Headphones, ArrowRight, Mic, Radio, ChevronLeft, ChevronRight } from 'lucide-react';

const Index = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredSeries, setFeaturedSeries] = useState<Series[]>([]);
  const [recentEpisodes, setRecentEpisodes] = useState<Episode[]>([]);
  const [trendingSeries, setTrendingSeries] = useState<Series[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      
      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
        
        const allSeries = await fetchSeriesByCategory();
        setFeaturedSeries(allSeries.slice(0, 8));
        setTrendingSeries(allSeries.slice(0, 6));
        
        const episodesData = await getRecentEpisodes(12);
        setRecentEpisodes(episodesData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadData();
  }, []);
  
  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-wurth-red mx-auto mb-4"></div>
            <p className="text-gray-400 text-lg">Caricamento del tuo mondo audio...</p>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  const currentHour = new Date().getHours();
  const getGreeting = () => {
    if (currentHour < 12) return "Buongiorno";
    if (currentHour < 18) return "Buon pomeriggio";
    return "Buonasera";
  };
  
  return (
    <MainLayout>
      <div className="bg-wurth-dark text-white">
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between p-4 bg-wurth-gray/50 backdrop-blur-sm">
          <div className="flex items-center space-x-4">
            <button className="w-8 h-8 bg-black/70 rounded-full flex items-center justify-center text-gray-400 hover:text-white">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="w-8 h-8 bg-black/70 rounded-full flex items-center justify-center text-gray-400 hover:text-white">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <SearchCommand />
            <Link to="/admin">
              <Button size="sm" className="bg-white text-black hover:bg-gray-200 font-semibold rounded-full">
                Carica Podcast
              </Button>
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-6 pb-6">
          {/* Greeting Section */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-6">{getGreeting()}</h1>
            
            {/* Quick Access Grid - Spotify Style */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {recentEpisodes.slice(0, 6).map((episode, index) => {
                const series = episode.series as Series;
                return (
                  <Link key={episode.id} to={`/series/${series?.slug}/${episode.id}`}>
                    <div className="bg-white/10 hover:bg-white/20 rounded-md flex items-center transition-all duration-300 group cursor-pointer">
                      <img
                        src={episode.cover_url || series?.cover_url || '/placeholder.svg'}
                        alt={episode.title}
                        className="w-20 h-20 object-cover rounded-l-md"
                      />
                      <div className="px-4 flex-1 truncate">
                        <h3 className="font-semibold text-white truncate">{episode.title}</h3>
                      </div>
                      <div className="pr-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Made for You Section */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Creato per te</h2>
              <Button variant="ghost" className="text-gray-400 hover:text-white text-sm">
                Mostra tutto
              </Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
              {featuredSeries.map((series) => (
                <Link key={series.id} to={`/series/${series.slug}`}>
                  <div className="bg-wurth-gray/30 hover:bg-wurth-gray/50 p-4 rounded-lg transition-all duration-300 group cursor-pointer">
                    <div className="relative mb-4">
                      <img
                        src={series.cover_url || '/placeholder.svg'}
                        alt={series.title}
                        className="w-full aspect-square object-cover rounded-lg shadow-lg"
                      />
                      <div className="absolute bottom-2 right-2 w-12 h-12 bg-wurth-red rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                        <Play className="w-6 h-6 text-white ml-1" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-white text-sm mb-2 line-clamp-1">{series.title}</h3>
                    <p className="text-gray-400 text-xs line-clamp-2">{series.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Recently Played */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Riprodotti di recente</h2>
              <Button variant="ghost" className="text-gray-400 hover:text-white text-sm">
                Mostra tutto
              </Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
              {recentEpisodes.slice(6, 12).map((episode) => {
                const series = episode.series as Series;
                return (
                  <Link key={episode.id} to={`/series/${series?.slug}/${episode.id}`}>
                    <div className="bg-wurth-gray/30 hover:bg-wurth-gray/50 p-4 rounded-lg transition-all duration-300 group cursor-pointer">
                      <div className="relative mb-4">
                        <img
                          src={episode.cover_url || series?.cover_url || '/placeholder.svg'}
                          alt={episode.title}
                          className="w-full aspect-square object-cover rounded-lg shadow-lg"
                        />
                        <div className="absolute bottom-2 right-2 w-12 h-12 bg-wurth-red rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                          <Play className="w-6 h-6 text-white ml-1" />
                        </div>
                      </div>
                      <h3 className="font-semibold text-white text-sm mb-2 line-clamp-1">{episode.title}</h3>
                      <p className="text-gray-400 text-xs line-clamp-2">{series?.title}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Trending Podcasts */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Podcast di tendenza</h2>
              <Button variant="ghost" className="text-gray-400 hover:text-white text-sm">
                Mostra tutto
              </Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
              {trendingSeries.map((series) => (
                <Link key={series.id} to={`/series/${series.slug}`}>
                  <div className="bg-wurth-gray/30 hover:bg-wurth-gray/50 p-4 rounded-lg transition-all duration-300 group cursor-pointer">
                    <div className="relative mb-4">
                      <img
                        src={series.cover_url || '/placeholder.svg'}
                        alt={series.title}
                        className="w-full aspect-square object-cover rounded-lg shadow-lg"
                      />
                      <div className="absolute bottom-2 right-2 w-12 h-12 bg-wurth-red rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                        <Play className="w-6 h-6 text-white ml-1" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-white text-sm mb-2 line-clamp-1">{series.title}</h3>
                    <p className="text-gray-400 text-xs line-clamp-2">{series.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Categories Section */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Sfoglia tutto</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {categories.map((category) => (
                <Link key={category.id} to={`/category/${category.slug}`}>
                  <div className="bg-gradient-to-br from-wurth-red to-red-700 rounded-lg p-4 h-32 relative overflow-hidden hover:scale-105 transition-transform cursor-pointer">
                    <h3 className="font-bold text-white text-lg">{category.name}</h3>
                    <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-black/20 rounded-full"></div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
