
import React, { ReactNode, useState, createContext } from 'react';
import Sidebar from '../components/Sidebar';
import PodcastPlayer from '../components/PodcastPlayer';
import { Episode } from '../types/database';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayoutContext = createContext<{
  currentEpisode: Episode | null;
  setCurrentEpisode: (episode: Episode | null) => void;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
}>({
  currentEpisode: null,
  setCurrentEpisode: () => {},
  isPlaying: false,
  setIsPlaying: () => {},
});

const MainLayout = ({ children }: MainLayoutProps) => {
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null);
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
        <main className="flex-1 flex flex-col h-screen overflow-hidden">
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
            <div className="p-6 md:p-8 max-w-7xl mx-auto">
              {children}
            </div>
          </div>
          {currentEpisode && (
            <div className="h-24 border-t border-gray-800/50 backdrop-blur-sm bg-wurth-dark/95">
              <PodcastPlayer episode={currentEpisode} />
            </div>
          )}
        </main>
      </div>
    </MainLayoutContext.Provider>
  );
};

export default MainLayout;
