
import React, { useContext } from 'react';
import { Play } from 'lucide-react';
import { Series } from '../types/database';
import { MainLayoutContext } from '../layouts/MainLayout';

interface FeaturedPodcastProps {
  podcast: Series;
}

const FeaturedPodcast: React.FC<FeaturedPodcastProps> = ({ podcast }) => {
  const { setCurrentEpisode, setIsPlaying } = useContext(MainLayoutContext);
  
  const handlePlayPodcast = () => {
    if (podcast.episodes && podcast.episodes.length > 0) {
      // Prendi il primo episodio disponibile
      const firstEpisode = podcast.episodes[0];
      setCurrentEpisode(firstEpisode);
      setIsPlaying(true);
    }
  };
  
  return (
    <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-wurth-red/30 to-black mb-8">
      <div className="flex flex-col md:flex-row items-center p-6 gap-6">
        <div className="relative group">
          <img 
            src={podcast.cover_url || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"} 
            alt={podcast.title} 
            className="w-40 h-40 md:w-56 md:h-56 object-cover rounded shadow-lg" 
          />
          {podcast.episodes && podcast.episodes.length > 0 && (
            <button 
              onClick={handlePlayPodcast}
              className="absolute right-3 bottom-3 bg-wurth-red text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:scale-105 transform"
            >
              <Play className="w-6 h-6" />
            </button>
          )}
        </div>
        
        <div className="md:ml-4 flex-1">
          <span className="text-xs uppercase tracking-wider text-gray-300">Serie in evidenza</span>
          <h2 className="text-2xl md:text-4xl font-bold text-white mt-2">{podcast.title}</h2>
          <p className="text-gray-300 mt-3 line-clamp-2 md:line-clamp-3">{podcast.description}</p>
          <div className="mt-5 flex space-x-3">
            {podcast.episodes && podcast.episodes.length > 0 ? (
              <button 
                onClick={handlePlayPodcast}
                className="bg-wurth-red hover:bg-opacity-80 text-white font-medium py-2 px-6 rounded-full"
              >
                Ascolta ora
              </button>
            ) : (
              <div className="bg-gray-600 text-white font-medium py-2 px-6 rounded-full opacity-50">
                Nessun episodio disponibile
              </div>
            )}
            <button className="border border-gray-400 text-white hover:bg-white hover:bg-opacity-10 font-medium py-2 px-6 rounded-full">
              Esplora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPodcast;
