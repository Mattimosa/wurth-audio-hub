
import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import PodcastCard from '../components/PodcastCard';
import { Clock, Heart, List, ListMusic } from 'lucide-react';
import { podcasts } from '../data/podcasts';

const Library = () => {
  const [activeTab, setActiveTab] = useState('recenti');
  
  // Mock data for saved podcasts
  const recentlyPlayed = podcasts.slice(0, 3);
  const favorites = podcasts.slice(2, 5);
  const playlists = [
    { 
      id: "pl1", 
      name: "I migliori podcast tecnici", 
      description: "Una selezione dei migliori podcast tecnici di Würth",
      podcasts: podcasts.filter(p => p.category === "Tecnica" || p.category === "Costruzioni")
    },
    { 
      id: "pl2", 
      name: "Podcast sulla sicurezza", 
      description: "Tutto sulla sicurezza nel lavoro",
      podcasts: podcasts.filter(p => p.category === "Sicurezza") 
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
              {recentlyPlayed.map((podcast) => (
                <PodcastCard key={podcast.id} podcast={podcast} />
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
              {favorites.map((podcast) => (
                <PodcastCard key={podcast.id} podcast={podcast} />
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
                  {playlist.podcasts.slice(0, 5).map((podcast) => (
                    <PodcastCard key={`${playlist.id}-${podcast.id}`} podcast={podcast} size="small" />
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
