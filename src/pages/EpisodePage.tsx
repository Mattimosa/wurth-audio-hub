
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { fetchEpisodeById, getSignedAudioUrl } from '../lib/podcastUtils';
import { Episode } from '../types/podcast';
import { Calendar, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AudioPlayer from '../components/AudioPlayer';

const EpisodePage = () => {
  const { slug, episodeId } = useParams<{ slug: string; episodeId: string }>();
  const [episode, setEpisode] = useState<any | null>(null);
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEpisode() {
      if (!episodeId) return;
      
      setLoading(true);
      const episodeData = await fetchEpisodeById(episodeId);
      setEpisode(episodeData);
      
      if (episodeData?.audio_url) {
        // Extract the path from the audio URL (remove the base URL and bucket name)
        const audioPath = episodeData.audio_url.split('/').slice(-2).join('/');
        const url = await getSignedAudioUrl(audioPath);
        setSignedUrl(url);
      }
      
      setLoading(false);
    }
    
    loadEpisode();
  }, [episodeId]);

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-white">Caricamento...</div>
        </div>
      </MainLayout>
    );
  }

  if (!episode) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center h-64">
          <h2 className="text-2xl font-bold text-white mb-4">Episodio non trovato</h2>
          <Link to={`/series/${slug}`}>
            <Button variant="outline" className="text-wurth-red border-wurth-red hover:bg-wurth-red hover:text-white">
              Torna alla serie
            </Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  const series = episode.series;

  return (
    <MainLayout>
      <div className="mb-20">
        <Link to={`/series/${slug}`} className="inline-flex items-center text-gray-400 hover:text-wurth-red mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Torna alla serie
        </Link>
        
        <div className="flex flex-col md:flex-row items-start gap-8 mb-10">
          <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0">
            <img
              src={episode.cover_url || series?.cover_url || '/placeholder.svg'}
              alt={episode.title}
              className="w-full rounded-lg shadow-lg object-cover aspect-square"
            />
          </div>
          
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{episode.title}</h1>
            
            <div className="text-lg text-wurth-red mb-4">
              {series?.title}
            </div>
            
            <div className="flex items-center text-sm text-gray-400 mb-6">
              <Calendar className="h-4 w-4 mr-1" />
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
            
            <div className="bg-wurth-gray p-6 rounded-lg">
              <h2 className="text-xl font-bold text-white mb-4">Descrizione</h2>
              <p className="text-gray-300">
                {episode.description || 'Nessuna descrizione disponibile per questo episodio.'}
              </p>
            </div>
            
            {!signedUrl && (
              <div className="mt-6 bg-wurth-red bg-opacity-10 border border-wurth-red text-wurth-red p-4 rounded-lg">
                <p>L'audio di questo episodio non è disponibile al momento.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {signedUrl && (
        <AudioPlayer 
          audioUrl={signedUrl}
          title={episode.title}
          seriesTitle={series?.title}
          coverUrl={episode.cover_url || series?.cover_url}
        />
      )}
    </MainLayout>
  );
};

export default EpisodePage;
