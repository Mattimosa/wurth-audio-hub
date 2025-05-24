
import React, { ReactNode, useState, createContext } from 'react';
import Sidebar from '../components/Sidebar';
import PodcastPlayer from '../components/PodcastPlayer';
import { PodcastEpisode } from '../data/podcasts';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayoutContext = createContext<{
  currentEpisode: PodcastEpisode | null;
  setCurrentEpisode: (episode: PodcastEpisode | null) => void;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
}>({
  currentEpisode: null,
  setCurrentEpisode: () => {},
  isPlaying: false,
  setIsPlaying: () => {},
});

const MainLayout = ({ children }: MainLayoutProps) => {
  const [currentEpisode, setCurrentEpisode] = useState<PodcastEpisode | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  
  return (
    <MainLayoutContext.Provider 
      value={{ 
        currentEpisode, 
        setCurrentEpisode, 
        isPlaying, 
        setIsPlaying 
      }}
    >
      <div className="flex h-screen overflow-hidden bg-wurth-dark">
        <Sidebar />
        <main className="flex-1 flex flex-col h-screen overflow-hidden bg-gradient-to-b from-wurth-gray/20 to-wurth-dark">
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
          {currentEpisode && (
            <div className="h-24 border-t border-gray-800 bg-wurth-gray">
              <PodcastPlayer episode={currentEpisode} />
            </div>
          )}
        </main>
      </div>
    </MainLayoutContext.Provider>
  );
};

export default MainLayout;
