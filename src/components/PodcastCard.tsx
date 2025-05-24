
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';
import { Series } from '../types/database';
import { MainLayoutContext } from '../layouts/MainLayout';

interface PodcastCardProps {
  podcast: Series;
  size?: 'small' | 'medium' | 'large';
}

const PodcastCard: React.FC<PodcastCardProps> = ({ podcast, size = 'medium' }) => {
  const { setCurrentEpisode, setIsPlaying } = useContext(MainLayoutContext);
  
  const handlePlayPodcast = (e: React.MouseEvent) => {
    e.preventDefault();
    if (podcast.episodes && podcast.episodes.length > 0) {
      const episode = podcast.episodes[0];
      setCurrentEpisode(episode);
      setIsPlaying(true);
    }
  };
  
  // Conditional classes based on size
  const containerClasses = {
    small: "w-40",
    medium: "w-56",
    large: "w-64",
  };
  
  const imageClasses = {
    small: "w-40 h-40",
    medium: "w-56 h-56",
    large: "w-64 h-64",
  };
  
  return (
    <Link 
      to={`/podcast/${podcast.id}`}
      className={`${containerClasses[size]} bg-wurth-gray rounded-md p-4 podcast-card-hover block transition-transform hover:scale-105`}
    >
      <div className="relative group">
        <img 
          src={podcast.cover_url || "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74"} 
          alt={podcast.title} 
          className={`${imageClasses[size]} object-cover rounded shadow-lg mb-4`} 
        />
        <button 
          onClick={handlePlayPodcast}
          className="absolute right-2 bottom-6 bg-wurth-red text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:scale-105 transform"
        >
          <Play className="w-5 h-5" />
        </button>
      </div>
      <h3 className="font-bold text-white line-clamp-2">{podcast.title}</h3>
      <p className="text-sm text-gray-400 mt-1">{podcast.category?.name || 'Senza categoria'}</p>
      {podcast.episode_count !== undefined && (
        <p className="text-xs text-gray-500 mt-1">{podcast.episode_count} episodi</p>
      )}
    </Link>
  );
};

export default PodcastCard;
