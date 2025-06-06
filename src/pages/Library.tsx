
import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import PodcastCard from '../components/PodcastCard';
import { Clock, Heart, ListMusic } from 'lucide-react';
import { useSeries } from '../hooks/useSeries';

const Library = () => {
  const [activeTab, setActiveTab] = useState('recenti');
  const { series } = useSeries();
  
  // Mock data for saved podcasts - using real series
  const recentlyPlayed = series.slice(0, 3);
  const favorites = series.slice(2, 5);
  
  const playlists = [
    { 
      id: "pl1", 
      name: "I migliori podcast tecnici", 
      description: "Una selezione dei migliori podcast tecnici di Würth",
      series: series.filter(s => s.category?.name === "Tecnica" || s.category?.name === "Costruzioni")
    },
    { 
      id: "pl2", 
      name: "Podcast sulla sicurezza", 
      description: "Tutto sulla sicurezza nel lavoro",
      series: series.filter(s => s.category?.name === "Sicurezza") 
    }
  ];
  
  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-6">La tua libreria</h1>
        
        <div className="border-b border-gray-700 mb-6">
          <nav className="flex space-x-8">
            <button
              className={`py-2 px-1 -mb-px ${activeTab === 'recenti' 
                ? 'text-white border-b-2 border-wurth-red font-medium'
                : 'text-gray-400 hover:text-white'}`}
              onClick={() => setActiveTab('recenti')}
            >
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Ascoltati di recente
              </span>
            </button>
            <button
              className={`py-2 px-1 -mb-px ${activeTab === 'preferiti' 
                ? 'text-white border-b-2 border-wurth-red font-medium'
                : 'text-gray-400 hover:text-white'}`}
              onClick={() => setActiveTab('preferiti')}
            >
              <span className="flex items-center">
                <Heart className="w-4 h-4 mr-2" />
                Preferiti
              </span>
            </button>
            <button
              className={`py-2 px-1 -mb-px ${activeTab === 'playlist' 
                ? 'text-white border-b-2 border-wurth-red font-medium'
                : 'text-gray-400 hover:text-white'}`}
              onClick={() => setActiveTab('playlist')}
            >
              <span className="flex items-center">
                <ListMusic className="w-4 h-4 mr-2" />
                Playlist
              </span>
            </button>
          </nav>
        </div>
        
        {activeTab === 'recenti' && (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {recentlyPlayed.map((seriesItem) => (
                <PodcastCard key={seriesItem.id} podcast={seriesItem} />
              ))}
            </div>
            {recentlyPlayed.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400">Non hai ancora ascoltato nessun podcast.</p>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'preferiti' && (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {favorites.map((seriesItem) => (
                <PodcastCard key={seriesItem.id} podcast={seriesItem} />
              ))}
            </div>
            {favorites.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400">Non hai ancora aggiunto podcast ai preferiti.</p>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'playlist' && (
          <div className="space-y-10">
            {playlists.map(playlist => (
              <div key={playlist.id}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">{playlist.name}</h3>
                </div>
                <p className="text-gray-400 mb-4">{playlist.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {playlist.series.slice(0, 5).map((seriesItem) => (
                    <PodcastCard key={`${playlist.id}-${seriesItem.id}`} podcast={seriesItem} size="small" />
                  ))}
                </div>
              </div>
            ))}
            {playlists.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400">Non hai ancora creato playlist.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Library;
