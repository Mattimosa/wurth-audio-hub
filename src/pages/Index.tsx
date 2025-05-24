
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { fetchCategories, fetchSeriesByCategory, getRecentEpisodes } from '../lib/podcastUtils';
import { Category, Series, Episode } from '../types/podcast';
import { SearchCommand } from '../components/SearchCommand';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, TrendingUp, Clock, Users, Star, Headphones, ArrowRight, Mic, Radio } from 'lucide-react';

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
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl mb-8 bg-gradient-to-br from-wurth-red via-red-600 to-red-800">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 opacity-50"></div>
        <div className="relative px-12 py-20">
          <div className="max-w-4xl">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4 backdrop-blur-sm">
                <Headphones className="h-6 w-6 text-white" />
              </div>
              <span className="text-white/90 font-medium text-lg">{getGreeting()}</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Il tuo mondo
              <span className="block text-yellow-300 bg-gradient-to-r from-yellow-300 to-yellow-100 bg-clip-text text-transparent">
                audio Würth
              </span>
            </h1>
            
            <p className="text-xl text-white/90 mb-10 max-w-2xl leading-relaxed">
              Esplora contenuti esclusivi, insights dal business e storie che ispirano la crescita. 
              La conoscenza che trasforma il tuo lavoro.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <SearchCommand />
              <Link to="/admin">
                <Button size="lg" className="bg-white text-wurth-red hover:bg-gray-100 font-semibold">
                  <Mic className="mr-2 h-5 w-5" />
                  Carica Podcast
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { icon: Radio, label: "Ascolta ora", color: "bg-green-600", link: "#" },
          { icon: TrendingUp, label: "Trending", color: "bg-blue-600", link: "#" },
          { icon: Clock, label: "Recenti", color: "bg-purple-600", link: "#" },
          { icon: Star, label: "Preferiti", color: "bg-yellow-600", link: "#" }
        ].map((action, index) => (
          <Link key={index} to={action.link}>
            <Card className="bg-wurth-gray border-gray-700 hover:bg-gray-700 transition-all duration-300 hover:scale-105 cursor-pointer group">
              <CardContent className="p-6 flex items-center">
                <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform`}>
                  <action.icon className="h-6 w-6 text-white" />
                </div>
                <span className="text-white font-medium">{action.label}</span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Categories Pills */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-6">Esplora per categoria</h2>
        <div className="flex flex-wrap gap-3">
          <Link to="/category/all">
            <div className="px-6 py-3 bg-wurth-red text-white rounded-full font-medium hover:scale-105 transition-transform cursor-pointer">
              Tutto
            </div>
          </Link>
          {categories.map((category) => (
            <Link key={category.id} to={`/category/${category.slug}`}>
              <div className="px-6 py-3 bg-wurth-gray text-gray-300 rounded-full font-medium hover:bg-gray-600 hover:scale-105 transition-all cursor-pointer">
                {category.name}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recently Played / Continue Listening */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-white">Riprendi l'ascolto</h2>
          <Button variant="ghost" className="text-gray-400 hover:text-white">
            Mostra tutto
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentEpisodes.slice(0, 6).map((episode) => {
            const series = episode.series as Series;
            return (
              <Link key={episode.id} to={`/series/${series?.slug}/${episode.id}`}>
                <Card className="bg-wurth-gray border-gray-700 hover:bg-gray-700 transition-all duration-300 group cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <img
                          src={episode.cover_url || series?.cover_url || '/placeholder.svg'}
                          alt={episode.title}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                          <Play className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-white mb-1 truncate">{episode.title}</h3>
                        <p className="text-sm text-gray-400 truncate">{series?.title}</p>
                        <div className="w-full bg-gray-600 rounded-full h-1 mt-2">
                          <div className="bg-wurth-red h-1 rounded-full" style={{ width: '30%' }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Made for You */}
      {featuredSeries.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-white">Creato per te</h2>
            <Button variant="ghost" className="text-gray-400 hover:text-white">
              Mostra tutto
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
            {featuredSeries.map((series) => (
              <Link key={series.id} to={`/series/${series.slug}`}>
                <Card className="bg-wurth-gray border-gray-700 hover:bg-gray-700 transition-all duration-300 group cursor-pointer hover:scale-105">
                  <CardContent className="p-4">
                    <div className="relative mb-3">
                      <img
                        src={series.cover_url || '/placeholder.svg'}
                        alt={series.title}
                        className="w-full aspect-square object-cover rounded-lg shadow-lg"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                        <Play className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-white text-sm mb-1 line-clamp-2">{series.title}</h3>
                    <p className="text-xs text-gray-400 line-clamp-2">{series.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Trending */}
      {trendingSeries.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-white flex items-center">
              <TrendingUp className="mr-3 text-wurth-red" />
              Tendenze
            </h2>
            <Button variant="ghost" className="text-gray-400 hover:text-white">
              Vedi tutto
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingSeries.map((series, index) => (
              <Link key={series.id} to={`/series/${series.slug}`}>
                <Card className="bg-gradient-to-br from-wurth-gray to-gray-800 border-gray-700 hover:border-wurth-red transition-all duration-300 group cursor-pointer hover:scale-105">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="text-4xl font-bold text-wurth-red">
                        #{index + 1}
                      </div>
                      <div className="relative">
                        <img
                          src={series.cover_url || '/placeholder.svg'}
                          alt={series.title}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                          <Play className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-white mb-1">{series.title}</h3>
                        <p className="text-sm text-gray-400 line-clamp-2">{series.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Recent Episodes */}
      {recentEpisodes.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-white flex items-center">
              <Clock className="mr-3 text-wurth-red" />
              Episodi più recenti
            </h2>
            <Button variant="ghost" className="text-gray-400 hover:text-white">
              Scopri di più
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentEpisodes.slice(6, 12).map((episode) => {
              const series = episode.series as Series;
              return (
                <Link key={episode.id} to={`/series/${series?.slug}/${episode.id}`}>
                  <Card className="bg-wurth-gray border-gray-700 hover:bg-gray-700 transition-all duration-300 group cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <img
                            src={episode.cover_url || series?.cover_url || '/placeholder.svg'}
                            alt={episode.title}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                            <Play className="h-6 w-6 text-white" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-white mb-1 line-clamp-1">{episode.title}</h3>
                          <p className="text-sm text-wurth-red mb-1">{series?.title}</p>
                          <div className="flex items-center text-xs text-gray-400">
                            <span>
                              {episode.published_at 
                                ? new Date(episode.published_at).toLocaleDateString('it-IT', {
                                    day: '2-digit',
                                    month: 'short'
                                  })
                                : 'Recente'}
                            </span>
                            {episode.duration && (
                              <span className="ml-3">
                                {Math.floor(episode.duration / 60)}:{(episode.duration % 60).toString().padStart(2, '0')}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Bottom CTA */}
      <Card className="bg-gradient-to-r from-wurth-red to-red-600 border-none mb-8">
        <CardContent className="p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Inizia la tua esperienza audio</h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Scopri contenuti esclusivi, cresci professionalmente e lasciati ispirare dalle storie di successo Würth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/admin">
              <Button size="lg" className="bg-white text-wurth-red hover:bg-gray-100">
                <Mic className="mr-2 h-5 w-5" />
                Carica il tuo Podcast
              </Button>
            </Link>
            <Link to="/category/all">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-wurth-red">
                <Headphones className="mr-2 h-5 w-5" />
                Esplora tutto
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default Index;
