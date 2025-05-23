
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { fetchSeriesBySlug, fetchEpisodesBySeries } from '../lib/podcastUtils';
import { Series, Episode } from '../types/podcast';
import { Headphones, Calendar, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SeriesPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [series, setSeries] = useState<Series | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (!slug) return;
      
      setLoading(true);
      const seriesData = await fetchSeriesBySlug(slug);
      setSeries(seriesData);
      
      if (seriesData) {
        const episodesData = await fetchEpisodesBySeries(seriesData.id);
        setEpisodes(episodesData);
      }
      
      setLoading(false);
    }
    
    loadData();
  }, [slug]);

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-white">Caricamento...</div>
        </div>
      </MainLayout>
    );
  }

  if (!series) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center h-64">
          <h2 className="text-2xl font-bold text-white mb-4">Serie non trovata</h2>
          <Link to="/">
            <Button variant="outline" className="text-wurth-red border-wurth-red hover:bg-wurth-red hover:text-white">
              Torna alla Home
            </Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="mb-12">
        <div className="flex flex-col md:flex-row items-start gap-8 mb-10">
          <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0">
            <img
              src={series.cover_url || '/placeholder.svg'}
              alt={series.title}
              className="w-full rounded-lg shadow-lg object-cover aspect-square"
            />
          </div>
          
          <div className="flex-1">
            <div className="mb-4">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{series.title}</h1>
              
              <div className="flex items-center text-gray-400 mb-6">
                <Info className="h-4 w-4 mr-2" />
                <span className="text-sm">
                  {series.description || 'Nessuna descrizione disponibile'}
                </span>
              </div>
            </div>
            
            <div className="bg-wurth-gray p-6 rounded-lg">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <Headphones className="mr-2 text-wurth-red" /> 
                Episodi
              </h2>
              
              {episodes.length === 0 ? (
                <p className="text-gray-400">Nessun episodio disponibile</p>
              ) : (
                <div className="text-sm text-gray-400">
                  {episodes.length} episodi disponibili
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-white mb-6">Tutti gli episodi</h2>
          
          {episodes.length === 0 ? (
            <div className="bg-wurth-gray p-6 rounded-lg text-center">
              <p className="text-gray-400">Nessun episodio disponibile per questa serie.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {episodes.map((episode) => (
                <Link 
                  key={episode.id}
                  to={`/series/${slug}/${episode.id}`} 
                  className="block bg-wurth-gray p-4 rounded-lg hover:bg-opacity-80 transition-colors"
                >
                  <div className="flex items-center">
                    <div className="w-16 h-16 flex-shrink-0">
                      <img
                        src={episode.cover_url || series.cover_url || '/placeholder.svg'}
                        alt={episode.title}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    
                    <div className="ml-4 flex-1">
                      <h3 className="font-medium text-white">{episode.title}</h3>
                      
                      <div className="flex items-center text-sm text-gray-400 mt-1">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>
                          {episode.published_at 
                            ? new Date(episode.published_at).toLocaleDateString('it-IT', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric'
                              })
                            : 'Data non disponibile'}
                        </span>
                        
                        {episode.duration && (
                          <span className="ml-3">
                            {Math.floor(episode.duration / 60)}:{(episode.duration % 60).toString().padStart(2, '0')}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="ml-auto text-wurth-red border-wurth-red hover:bg-wurth-red hover:text-white"
                    >
                      Ascolta
                    </Button>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default SeriesPage;
