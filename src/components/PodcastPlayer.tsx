
import React, { useState, useContext, useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Volume1, VolumeX } from 'lucide-react';
import { Episode } from '../types/database';
import { MainLayoutContext } from '../layouts/MainLayout';

interface PodcastPlayerProps {
  episode: Episode;
}

const PodcastPlayer: React.FC<PodcastPlayerProps> = ({ episode }) => {
  const { isPlaying, setIsPlaying } = useContext(MainLayoutContext);
  const [volume, setVolume] = useState<number>(70);
  const [progress, setProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    if (!episode.audio_url) {
      setError("URL audio non disponibile");
      return;
    }

    // Create new audio element when episode changes
    const audio = new Audio();
    audioRef.current = audio;
    
    const setAudioData = () => {
      setDuration(audio.duration);
      setError(null);
    };
    
    const setAudioTime = () => {
      setCurrentTime(audio.currentTime);
      setProgress((audio.currentTime / audio.duration) * 100);
    };
    
    const handleError = (e: Event) => {
      console.error("Error playing audio:", e);
      setError("Impossibile riprodurre l'audio");
      setIsPlaying(false);
    };
    
    // Add event listeners
    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);
    audio.addEventListener('error', handleError);
    
    // Set the source and try to load it
    audio.src = episode.audio_url;
    audio.load();
    
    // Play if isPlaying is true
    if (isPlaying) {
      audio.play().catch(error => {
        console.error("Error playing audio:", error);
        setError("Impossibile riprodurre l'audio");
        setIsPlaying(false);
      });
    }
    
    // Set volume
    audio.volume = volume / 100;
    
    return () => {
      audio.pause();
      audio.src = '';
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
      audio.removeEventListener('error', handleError);
    };
  }, [episode, setIsPlaying]);
  
  // Handle play/pause state changes
  useEffect(() => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.play().catch(error => {
        console.error("Error playing audio:", error);
        setError("Impossibile riprodurre l'audio");
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, setIsPlaying]);
  
  // Handle volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);
  
  const togglePlay = () => {
    if (error) {
      // If there was an error, try to reload the audio
      if (audioRef.current) {
        audioRef.current.load();
        setError(null);
      }
    }
    setIsPlaying(!isPlaying);
  };
  
  const handleProgressChange = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current && duration) {
      const progressBar = e.currentTarget;
      const rect = progressBar.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      const newTime = duration * percent;
      
      audioRef.current.currentTime = newTime;
      setProgress(percent * 100);
    }
  };
  
  const handleVolumeChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const volumeBar = e.currentTarget;
    const rect = volumeBar.getBoundingClientRect();
    const newVolume = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };
  
  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="flex items-center justify-between h-full px-4 py-3 bg-wurth-gray">
      <div className="flex items-center">
        <img 
          src={episode.cover_url || episode.series?.cover_url || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"} 
          alt={episode.title}
          className="w-14 h-14 object-cover rounded shadow mr-4" 
        />
        <div className="mr-6">
          <h4 className="text-sm font-medium text-white line-clamp-1">{episode.title}</h4>
          <p className="text-xs text-gray-400">{episode.description}</p>
          {error && <p className="text-xs text-wurth-red mt-1">{error}</p>}
        </div>
      </div>
      
      <div className="flex flex-col items-center flex-1 max-w-lg">
        <div className="flex items-center mb-2 space-x-4">
          <button className="text-gray-300 hover:text-white">
            <SkipBack className="w-5 h-5" />
          </button>
          <button 
            onClick={togglePlay}
            className="bg-wurth-red rounded-full p-2 text-white hover:scale-105 transition-transform"
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </button>
          <button className="text-gray-300 hover:text-white">
            <SkipForward className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex items-center w-full space-x-3">
          <span className="text-xs text-gray-400 w-10 text-right">
            {formatTime(currentTime)}
          </span>
          <div 
            className="player-progress flex-1" 
            onClick={handleProgressChange}
          >
            <div 
              className="player-progress-inner" 
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs text-gray-400 w-10">
            {formatTime(duration)}
          </span>
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        {volume === 0 ? (
          <VolumeX className="w-5 h-5 text-gray-400" />
        ) : volume < 50 ? (
          <Volume1 className="w-5 h-5 text-gray-400" />
        ) : (
          <Volume2 className="w-5 h-5 text-gray-400" />
        )}
        <div 
          className="volume-slider" 
          onClick={handleVolumeChange}
        >
          <div 
            className="volume-slider-inner" 
            style={{ width: `${volume}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default PodcastPlayer;
