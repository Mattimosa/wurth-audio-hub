
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import PodcastCard from '../components/PodcastCard';
import { Podcast, Headphones } from 'lucide-react';
import { useSeries } from '../hooks/useSeries';
import { MainLayoutContext } from '../layouts/MainLayout';
import { useContext } from 'react';

const Category = () => {
  const { categoryName = "Tutti" } = useParams<{ categoryName: string }>();
  const { series } = useSeries();
  const { setCurrentEpisode, setIsPlaying } = useContext(MainLayoutContext);
  
  // Filter series by category
  const filteredSeries = categoryName === "Tutti" 
    ? series 
    : series.filter(s => s.category?.name === categoryName);
  
  // Set background colors based on category
  const getCategoryStyle = () => {
    switch(categoryName) {
      case "Digitale":
        return "from-purple-700 to-black";
      case "Costruzioni":
        return "from-yellow-700 to-black";
      case "Automotive":
        return "from-blue-700 to-black";
      case "Industria":
        return "from-green-700 to-black";
      case "Sicurezza":
        return "from-red-700 to-black";
      case "Tecnica":
        return "from-orange-700 to-black";
      case "Formazione":
        return "from-teal-700 to-black";
      default:
        return "from-wurth-red to-black";
    }
  };
  
  // Custom code icon component for digital category
  const CodeIcon = (props: any) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
  
  // Get appropriate icon based on category
  const getCategoryIcon = () => {
    if (categoryName === "Digitale") {
      return <CodeIcon className="h-12 w-12 text-white opacity-80" />;
    }
    return <Podcast className="h-12 w-12 text-white opacity-80" />;
  };

  const playEpisode = (seriesItem: any, episodeIndex: number) => {
    if (seriesItem.episodes && seriesItem.episodes.length > episodeIndex) {
      setCurrentEpisode(seriesItem.episodes[episodeIndex]);
      setIsPlaying(true);
    }
  };
  
  return (
    <MainLayout>
      <div className="mb-8">
        <div className={`bg-gradient-to-r ${getCategoryStyle()} p-8 rounded-lg mb-8`}>
          <div className="flex items-center">
            <div className="mr-4">
              {getCategoryIcon()}
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">{categoryName}</h1>
              <p className="text-gray-200 mt-2">
                {categoryName === "Tutti" 
                  ? "Tutti i podcast disponibili su Würth Podcast" 
                  : `Podcast della categoria ${categoryName} - ${filteredSeries.length} serie disponibili`}
              </p>
            </div>
          </div>
        </div>
        
        {filteredSeries.length > 0 ? (
          <>
            <div className="flex items-center mb-6">
              <Podcast className="mr-2 text-wurth-red" />
              <h2 className="text-xl font-bold text-white">Serie Podcast</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredSeries.map((seriesItem) => (
                <PodcastCard key={seriesItem.id} podcast={seriesItem} />
              ))}
            </div>
            
            <div className="mt-12">
              <div className="flex items-center mb-6">
                <Headphones className="mr-2 text-wurth-red" />
                <h2 className="text-xl font-bold text-white">Episodi Recenti</h2>
              </div>
              {filteredSeries.some(seriesItem => seriesItem.episodes && seriesItem.episodes.length > 0) ? (
                <div className="space-y-4">
                  {filteredSeries
                    .filter(seriesItem => seriesItem.episodes && seriesItem.episodes.length > 0)
                    .flatMap(seriesItem => 
                      seriesItem.episodes!.slice(0, 1).map(episode => (
                        <div 
                          key={episode.id} 
                          className="bg-wurth-gray p-4 rounded-md hover:bg-gray-800 transition-colors cursor-pointer"
                          onClick={() => playEpisode(seriesItem, seriesItem.episodes!.findIndex((ep: any) => ep.id === episode.id))}
                        >
                          <div className="flex items-center">
                            <img 
                              src={episode.cover_url || seriesItem.cover_url || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"} 
                              alt={episode.title}
                              className="w-16 h-16 object-cover rounded mr-4" 
                            />
                            <div className="flex-1">
                              <h3 className="font-medium text-white">{episode.title}</h3>
                              <Link to={`/podcast/${seriesItem.id}`} className="text-sm text-gray-400 line-clamp-1 hover:text-wurth-red">
                                {seriesItem.title}
                              </Link>
                            </div>
                            <div className="text-sm text-gray-400">
                              {episode.duration ? `${Math.floor(episode.duration / 60)}:${(episode.duration % 60).toString().padStart(2, '0')}` : '--:--'}
                            </div>
                          </div>
                        </div>
                      ))
                    )
                  }
                </div>
              ) : (
                <p className="text-gray-400 text-center py-8">
                  Nessun episodio trovato per questa categoria. 
                  <a href="/admin" className="text-wurth-red ml-1 hover:underline">
                    Aggiungi un nuovo episodio
                  </a>
                </p>
              )}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">Nessun podcast trovato in questa categoria.</p>
            <a href="/admin" className="text-wurth-red mt-2 inline-block hover:underline">
              Aggiungi un nuovo podcast
            </a>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Category;
