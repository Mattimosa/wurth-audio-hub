
import React, { createContext, useState, useContext, useEffect } from 'react';
import { Podcast, PodcastEpisode } from '../data/podcasts';

interface PodcastContextType {
  podcasts: Podcast[];
  addPodcast: (podcast: Podcast) => void;
  addEpisode: (podcastId: string, episode: PodcastEpisode) => void;
  uploadedFiles: {id: string, name: string, url: string, type: string, date: string}[];
  addUploadedFile: (file: {id: string, name: string, url: string, type: string, date: string}) => void;
}

const initialContext: PodcastContextType = {
  podcasts: [],
  addPodcast: () => {},
  addEpisode: () => {},
  uploadedFiles: [],
  addUploadedFile: () => {}
};

const PodcastContext = createContext<PodcastContextType>(initialContext);

export const usePodcasts = () => useContext(PodcastContext);

export const PodcastProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  // Try to load podcasts from localStorage
  const loadFromStorage = <T,>(key: string, defaultValue: T): T => {
    const stored = localStorage.getItem(key);
    if (stored) {
      try {
        return JSON.parse(stored) as T;
      } catch (e) {
        console.error("Error parsing stored data:", e);
        return defaultValue;
      }
    }
    return defaultValue;
  };

  // Import initial podcasts from data file
  const [podcastsState, setPodcasts] = useState<Podcast[]>(() => {
    const storedPodcasts = loadFromStorage<Podcast[]>('wurthPodcasts', []);
    
    // If no stored podcasts, use imported ones
    if (storedPodcasts.length === 0) {
      // We'll import default podcasts in useEffect
      return [];
    }
    
    return storedPodcasts;
  });
  
  const [uploadedFiles, setUploadedFiles] = useState<{id: string, name: string, url: string, type: string, date: string}[]>(
    () => loadFromStorage('wurthUploadedFiles', [])
  );

  // Import default podcasts if none exist
  useEffect(() => {
    const importDefaultPodcasts = async () => {
      if (podcastsState.length === 0) {
        try {
          // Import podcasts from data file
          const { podcasts: defaultPodcasts } = await import('../data/podcasts');
          setPodcasts(defaultPodcasts);
          localStorage.setItem('wurthPodcasts', JSON.stringify(defaultPodcasts));
        } catch (error) {
          console.error("Failed to import default podcasts:", error);
        }
      }
    };
    
    importDefaultPodcasts();
  }, [podcastsState.length]);

  // Save podcasts to localStorage whenever they change
  useEffect(() => {
    if (podcastsState.length > 0) {
      localStorage.setItem('wurthPodcasts', JSON.stringify(podcastsState));
    }
  }, [podcastsState]);
  
  // Save uploaded files to localStorage
  useEffect(() => {
    localStorage.setItem('wurthUploadedFiles', JSON.stringify(uploadedFiles));
  }, [uploadedFiles]);

  const addPodcast = (podcast: Podcast) => {
    setPodcasts(prev => {
      // Check if podcast already exists
      const exists = prev.some(p => p.id === podcast.id);
      if (exists) {
        return prev.map(p => p.id === podcast.id ? podcast : p);
      } else {
        return [...prev, podcast];
      }
    });
  };

  const addEpisode = (podcastId: string, episode: PodcastEpisode) => {
    setPodcasts(prev => {
      return prev.map(podcast => {
        if (podcast.id === podcastId) {
          // Check if episode already exists
          const episodeExists = podcast.episodes.some(ep => ep.id === episode.id);
          
          if (episodeExists) {
            // Update existing episode
            return {
              ...podcast,
              episodes: podcast.episodes.map(ep => 
                ep.id === episode.id ? episode : ep
              )
            };
          } else {
            // Add new episode
            return {
              ...podcast,
              episodes: [...podcast.episodes, episode]
            };
          }
        }
        return podcast;
      });
    });
  };

  const addUploadedFile = (file: {id: string, name: string, url: string, type: string, date: string}) => {
    setUploadedFiles(prev => [...prev, file]);
  };

  const value = {
    podcasts: podcastsState,
    addPodcast,
    addEpisode,
    uploadedFiles,
    addUploadedFile
  };

  return (
    <PodcastContext.Provider value={value}>
      {children}
    </PodcastContext.Provider>
  );
};
