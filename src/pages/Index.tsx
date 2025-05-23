
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { fetchCategories, fetchSeriesByCategory, getRecentEpisodes } from '../lib/podcastUtils';
import { Category, Series, Episode } from '../types/podcast';
import { SearchCommand } from '../components/SearchCommand';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, TrendingUp, Clock, Users, Star, Headphones } from 'lucide-react';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
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
        setFeaturedSeries(allSeries.slice(0, 6));
        setTrendingSeries(allSeries.slice(0, 4));
        
        const episodesData = await getRecentEpisodes(8);
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
            <p className="text-gray-400">Caricamento podcast...</p>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-wurth-red via-red-600 to-red-800 rounded-2xl mb-12">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative px-8 py-16 md:py-24">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Scopri il Mondo dei
              <span className="block text-yellow-300">Podcast Würth</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl">
              Contenuti esclusivi, insights dal mondo del business e storie di successo che ispirano la tua crescita professionale.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <SearchCommand />
              <Link to="/admin">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-wurth-red">
                  <Headphones className="mr-2 h-5 w-5" />
                  Inizia ad Ascoltare
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
          <div className="w-full h-full bg-[url('/placeholder.svg')] bg-contain bg-no-repeat bg-right"></div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        <Card className="bg-wurth-gray border-gray-700 text-center">
          <CardContent className="p-6">
            <div className="flex items-center justify-center w-12 h-12 bg-wurth-red/20 rounded-full mx-auto mb-3">
              <Headphones className="h-6 w-6 text-wurth-red" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{featuredSeries.length}</div>
            <div className="text-sm text-gray-400">Serie Podcast</div>
          </CardContent>
        </Card>
        <Card className="bg-wurth-gray border-gray-700 text-center">
          <CardContent className="p-6">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-500/20 rounded-full mx-auto mb-3">
              <Play className="h-6 w-6 text-blue-400" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{recentEpisodes.length}</div>
            <div className="text-sm text-gray-400">Episodi Totali</div>
          </CardContent>
        </Card>
        <Card className="bg-wurth-gray border-gray-700 text-center">
          <CardContent className="p-6">
            <div className="flex items-center justify-center w-12 h-12 bg-green-500/20 rounded-full mx-auto mb-3">
              <Users className="h-6 w-6 text-green-400" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">1.2K</div>
            <div className="text-sm text-gray-400">Ascoltatori</div>
          </CardContent>
        </Card>
        <Card className="bg-wurth-gray border-gray-700 text-center">
          <CardContent className="p-6">
            <div className="flex items-center justify-center w-12 h-12 bg-yellow-500/20 rounded-full mx-auto mb-3">
              <Star className="h-6 w-6 text-yellow-400" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">4.8</div>
            <div className="text-sm text-gray-400">Rating Medio</div>
          </CardContent>
        </Card>
      </div>

      {/* Categories */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-white mb-6">Esplora per Categoria</h2>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
              selectedCategory === "all" 
                ? 'bg-wurth-red text-white shadow-lg' 
                : 'bg-wurth-gray text-gray-300 hover:bg-gray-600'
            }`}
          >
            Tutti
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.slug || "")}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category.slug 
                  ? 'bg-wurth-red text-white shadow-lg' 
                  : 'bg-wurth-gray text-gray-300 hover:bg-gray-600'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Trending Section */}
      {trendingSeries.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-white flex items-center">
              <TrendingUp className="mr-3 text-wurth-red" />
              Trending Ora
            </h2>
            <Link to="/category/trending">
              <Button variant="outline" className="text-wurth-red border-wurth-red hover:bg-wurth-red hover:text-white">
                Vedi Tutto
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingSeries.map((series) => (
              <Link key={series.id} to={`/series/${series.slug}`}>
                <Card className="bg-wurth-gray border-gray-700 hover:border-wurth-red transition-colors group cursor-pointer">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={series.cover_url || '/placeholder.svg'}
                        alt={series.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-lg flex items-center justify-center">
                        <Play className="h-12 w-12 text-white" />
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-white mb-2 line-clamp-2">{series.title}</h3>
                      <p className="text-sm text-gray-400 line-clamp-2">{series.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Featured Series */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-white">Serie in Evidenza</h2>
          <Link to="/category/featured">
            <Button variant="outline" className="text-wurth-red border-wurth-red hover:bg-wurth-red hover:text-white">
              Esplora Tutto
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {featuredSeries.map((series) => (
            <Link key={series.id} to={`/series/${series.slug}`}>
              <Card className="bg-wurth-gray border-gray-700 hover:border-wurth-red transition-all hover:scale-105 group cursor-pointer">
                <CardContent className="p-4">
                  <div className="relative mb-3">
                    <img
                      src={series.cover_url || '/placeholder.svg'}
                      alt={series.title}
                      className="w-full aspect-square object-cover rounded-lg"
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

      {/* Recent Episodes */}
      {recentEpisodes.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-white flex items-center">
              <Clock className="mr-3 text-wurth-red" />
              Episodi Recenti
            </h2>
            <Link to="/category/recent">
              <Button variant="outline" className="text-wurth-red border-wurth-red hover:bg-wurth-red hover:text-white">
                Vedi Tutti
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentEpisodes.slice(0, 6).map((episode) => {
              const series = episode.series as Series;
              return (
                <Link 
                  key={episode.id} 
                  to={`/series/${series?.slug}/${episode.id}`}
                  className="block"
                >
                  <Card className="bg-wurth-gray border-gray-700 hover:border-wurth-red transition-colors group cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <div className="relative flex-shrink-0">
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

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-wurth-red to-red-600 border-none">
        <CardContent className="p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Pronto per Iniziare?</h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Unisciti alla nostra community di professionisti e scopri contenuti esclusivi che ti aiuteranno a crescere nel tuo settore.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-wurth-red">
                Accedi
              </Button>
            </Link>
            <Link to="/admin">
              <Button size="lg" className="bg-white text-wurth-red hover:bg-gray-100">
                Carica il tuo Podcast
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default Index;
