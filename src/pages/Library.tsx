
import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import PodcastCard from '../components/PodcastCard';
import { Clock, Heart, ListMusic, Download, Play, BookOpen, Star, Trash2 } from 'lucide-react';
import { useSeries } from '../hooks/useSeries';

const Library = () => {
  const [activeTab, setActiveTab] = useState('recenti');
  const { series } = useSeries();
  
  // Mock data per libreria utente - usando serie reali
  const recentlyPlayed = series.slice(0, 4);
  const favorites = series.slice(2, 6);
  const downloads = series.slice(1, 4);
  
  const playlists = [
    { 
      id: "pl1", 
      name: "Formazione Tecnica Avanzata", 
      description: "I migliori contenuti per la crescita professionale tecnica",
      series: series.filter(s => s.category?.name === "Tecnica" || s.category?.name === "Formazione Tecnica"),
      created: "2024-01-15",
      episodes: 24
    },
    { 
      id: "pl2", 
      name: "Sicurezza sul Lavoro", 
      description: "Tutto sulla sicurezza e le best practices",
      series: series.filter(s => s.category?.name === "Sicurezza"),
      created: "2024-02-01", 
      episodes: 18
    },
    { 
      id: "pl3", 
      name: "Leadership e Management", 
      description: "Competenze manageriali per team leader",
      series: series.filter(s => s.category?.name === "Leadership"),
      created: "2024-02-10",
      episodes: 15
    }
  ];

  const stats = {
    totalListening: "47h 32m",
    completedSeries: 8,
    favoriteCategory: "Formazione Tecnica"
  };
  
  return (
    <MainLayout>
      <div className="mb-8">
        {/* Header con statistiche */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">La Tua Libreria</h1>
          <p className="text-gray-400 mb-6">I tuoi contenuti formativi personali</p>
          
          {/* Statistiche utente */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-wurth-gray rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Tempo di ascolto</p>
                  <p className="text-white text-xl font-bold">{stats.totalListening}</p>
                </div>
                <Clock className="w-8 h-8 text-blue-400" />
              </div>
            </div>
            <div className="bg-wurth-gray rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Serie completate</p>
                  <p className="text-white text-xl font-bold">{stats.completedSeries}</p>
                </div>
                <BookOpen className="w-8 h-8 text-green-400" />
              </div>
            </div>
            <div className="bg-wurth-gray rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Categoria preferita</p>
                  <p className="text-white text-lg font-bold">{stats.favoriteCategory}</p>
                </div>
                <Star className="w-8 h-8 text-yellow-400" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <div className="border-b border-gray-700 mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'recenti', label: 'Ascoltati di recente', icon: Clock },
              { id: 'preferiti', label: 'Preferiti', icon: Heart },
              { id: 'downloads', label: 'Download', icon: Download },
              { id: 'playlist', label: 'Le mie Playlist', icon: ListMusic }
            ].map(tab => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  className={`py-3 px-1 -mb-px flex items-center space-x-2 transition-colors ${tab.id === activeTab 
                    ? 'text-white border-b-2 border-wurth-red font-medium'
                    : 'text-gray-400 hover:text-white'}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
        
        {/* Contenuto Tab: Recenti */}
        {activeTab === 'recenti' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Ascoltati di recente</h2>
              <button className="text-gray-400 hover:text-white text-sm">Cancella cronologia</button>
            </div>
            
            {recentlyPlayed.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {recentlyPlayed.map((seriesItem) => (
                  <div key={seriesItem.id} className="relative group">
                    <PodcastCard podcast={seriesItem} />
                    <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                      <Clock className="w-3 h-3 inline mr-1" />
                      2 giorni fa
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-wurth-gray rounded-xl">
                <Clock className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-lg mb-4">Non hai ancora ascoltato nessun podcast</p>
                <a href="/" className="text-wurth-red hover:text-red-400 font-medium">
                  Inizia ad esplorare i contenuti
                </a>
              </div>
            )}
          </div>
        )}
        
        {/* Contenuto Tab: Preferiti */}
        {activeTab === 'preferiti' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">I tuoi preferiti</h2>
              <span className="text-gray-400 text-sm">{favorites.length} elementi</span>
            </div>
            
            {favorites.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {favorites.map((seriesItem) => (
                  <div key={seriesItem.id} className="relative group">
                    <PodcastCard podcast={seriesItem} />
                    <button className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <Heart className="w-4 h-4 fill-current" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-wurth-gray rounded-xl">
                <Heart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-lg mb-4">Non hai ancora aggiunto podcast ai preferiti</p>
                <p className="text-gray-500">Clicca sull'icona del cuore per salvare i tuoi contenuti preferiti</p>
              </div>
            )}
          </div>
        )}
        
        {/* Contenuto Tab: Download */}
        {activeTab === 'downloads' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Download offline</h2>
              <div className="text-gray-400 text-sm">
                <span>Spazio usato: 2.4 GB</span>
              </div>
            </div>
            
            {downloads.length > 0 ? (
              <div className="space-y-4">
                {downloads.map((seriesItem) => (
                  <div key={seriesItem.id} className="bg-wurth-gray rounded-lg p-4 flex items-center justify-between hover:bg-gray-700 transition-colors">
                    <div className="flex items-center space-x-4">
                      <img 
                        src={seriesItem.cover_url || "https://images.unsplash.com/photo-1611532736597-de2d4265fba3"} 
                        alt={seriesItem.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="text-white font-medium">{seriesItem.title}</h3>
                        <p className="text-gray-400 text-sm">{seriesItem.category?.name}</p>
                        <div className="flex items-center text-green-400 text-xs mt-1">
                          <Download className="w-3 h-3 mr-1" />
                          <span>Download completato</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="bg-wurth-red hover:bg-red-600 text-white p-2 rounded-full">
                        <Play className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-red-400 p-2">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-wurth-gray rounded-xl">
                <Download className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-lg mb-4">Nessun contenuto scaricato</p>
                <p className="text-gray-500">Scarica i podcast per ascoltarli offline</p>
              </div>
            )}
          </div>
        )}
        
        {/* Contenuto Tab: Playlist */}
        {activeTab === 'playlist' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Le tue playlist</h2>
              <button className="bg-wurth-red hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                Crea playlist
              </button>
            </div>
            
            {playlists.length > 0 ? (
              <div className="space-y-8">
                {playlists.map(playlist => (
                  <div key={playlist.id} className="bg-wurth-gray rounded-xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{playlist.name}</h3>
                        <p className="text-gray-400 mb-2">{playlist.description}</p>
                        <div className="flex items-center text-gray-500 text-sm space-x-4">
                          <span>{playlist.episodes} episodi</span>
                          <span>Creata il {new Date(playlist.created).toLocaleDateString('it-IT')}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="bg-wurth-red hover:bg-red-600 text-white p-2 rounded-full">
                          <Play className="w-4 h-4" />
                        </button>
                        <button className="text-gray-400 hover:text-red-400 p-2">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                      {playlist.series.slice(0, 5).map((seriesItem) => (
                        <PodcastCard key={`${playlist.id}-${seriesItem.id}`} podcast={seriesItem} size="small" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-wurth-gray rounded-xl">
                <ListMusic className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-lg mb-4">Non hai ancora creato playlist</p>
                <p className="text-gray-500 mb-6">Organizza i tuoi contenuti preferiti in playlist personalizzate</p>
                <button className="bg-wurth-red hover:bg-red-600 text-white px-6 py-3 rounded-full font-medium">
                  Crea la tua prima playlist
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Library;
