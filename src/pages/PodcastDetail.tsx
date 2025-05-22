
import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { Play, Calendar, Clock, Share2, Heart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { MainLayoutContext } from '../layouts/MainLayout';
import { useToast } from "@/hooks/use-toast";
import { usePodcasts } from '../contexts/PodcastContext';

const PodcastDetail = () => {
  const { podcastId } = useParams<{ podcastId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setCurrentEpisode, setIsPlaying } = useContext(MainLayoutContext);
  const { podcasts } = usePodcasts();
  
  const podcast = podcasts.find(p => p.id === podcastId);
  
  if (!podcast) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <p className="text-gray-400">Podcast non trovato.</p>
          <Button 
            onClick={() => navigate('/')}
            variant="link"
            className="text-wurth-red mt-2"
          >
            Torna alla home
          </Button>
        </div>
      </MainLayout>
    );
  }
  
  const playEpisode = (episodeIndex: number) => {
    if (podcast.episodes[episodeIndex]) {
      setCurrentEpisode(podcast.episodes[episodeIndex]);
      setIsPlaying(true);
    }
  };
  
  const handleShare = () => {
    toast({
      title: "Link copiato",
      description: "Link al podcast copiato negli appunti",
    });
  };
  
  const handleFollow = () => {
    toast({
      title: "Podcast seguito",
      description: "Riceverai notifiche per i nuovi episodi",
    });
  };
  
  return (
    <MainLayout>
      <div className="mb-8">
        <div className="bg-gradient-to-b from-wurth-red/30 to-wurth-dark p-8 rounded-lg mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <img 
              src={podcast.imageUrl} 
              alt={podcast.title}
              className="w-60 h-60 object-cover rounded-lg shadow-lg" 
            />
            
            <div className="flex flex-col">
              <span className="text-gray-300 text-sm">PODCAST</span>
              <h1 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-3">{podcast.title}</h1>
              <p className="text-lg text-gray-300 mb-3">{podcast.author}</p>
              <span className="inline-block bg-gray-700 text-white text-sm px-3 py-1 rounded-full mb-4">
                {podcast.category}
              </span>
              <p className="text-gray-300 mb-6 max-w-2xl">{podcast.description}</p>
              
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={() => podcast.episodes.length > 0 && playEpisode(0)}
                  className="bg-wurth-red hover:bg-wurth-red/90 text-white"
                  disabled={podcast.episodes.length === 0}
                >
                  <Play className="w-5 h-5 mr-2" /> Riproduci
                </Button>
                <Button
                  onClick={handleFollow}
                  variant="outline"
                  className="border-gray-600 text-white hover:bg-gray-700"
                >
                  <Heart className="w-5 h-5 mr-2" /> Segui
                </Button>
                <Button
                  onClick={handleShare}
                  variant="outline"
                  className="border-gray-600 text-white hover:bg-gray-700"
                >
                  <Share2 className="w-5 h-5 mr-2" /> Condividi
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-6">Tutti gli episodi</h2>
          
          {podcast.episodes.length > 0 ? (
            <div className="space-y-4">
              {podcast.episodes.map((episode, index) => (
                <div 
                  key={episode.id}
                  className="bg-wurth-gray hover:bg-gray-800 transition-colors p-4 rounded-lg flex flex-col md:flex-row items-start md:items-center gap-4"
                >
                  <div className="text-xl text-gray-400 font-medium w-8 text-center">{index + 1}</div>
                  
                  <img 
                    src={episode.imageUrl || podcast.imageUrl} 
                    alt={episode.title}
                    className="w-16 h-16 object-cover rounded" 
                  />
                  
                  <div className="flex-1">
                    <h3 className="font-medium text-white text-lg hover:underline cursor-pointer" onClick={() => playEpisode(index)}>
                      {episode.title}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-2 mt-1">{episode.description}</p>
                    
                    <div className="flex items-center mt-2 text-xs text-gray-400">
                      <Calendar className="w-3 h-3 mr-1" /> 
                      <span className="mr-4">{episode.date}</span>
                      
                      <Clock className="w-3 h-3 mr-1" /> 
                      <span>{episode.duration}</span>
                    </div>
                  </div>
                  
                  <Button
                    onClick={() => playEpisode(index)}
                    size="sm"
                    className="bg-wurth-red hover:bg-wurth-red/90"
                  >
                    <Play className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-wurth-gray rounded-lg">
              <p className="text-gray-400">Nessun episodio disponibile per questo podcast.</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default PodcastDetail;
