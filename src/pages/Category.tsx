
import React from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import PodcastCard from '../components/PodcastCard';
import { useSeries } from '../hooks/useSeries';
import { ArrowLeft, Filter, SortAsc, Users, Clock, Star, TrendingUp } from 'lucide-react';

const Category = () => {
  const { categoryName } = useParams();
  const { series, categories } = useSeries();
  
  // Trova la categoria
  const category = categories.find(cat => 
    cat.name.toLowerCase().replace(/\s+/g, '-') === categoryName?.toLowerCase()
  );
  
  // Filtra le serie per categoria
  const categorySeries = series.filter(s => 
    s.category?.name === category?.name
  );

  const categoryStats = {
    totalSeries: categorySeries.length,
    totalEpisodes: categorySeries.reduce((acc, s) => acc + (s.episodes?.length || 0), 0),
    avgRating: "4.7",
    totalListeners: "Team Würth"
  };

  if (!category) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-white mb-4">Categoria non trovata</h1>
          <a href="/" className="text-wurth-red hover:text-red-400">
            Torna alla homepage
          </a>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="mb-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-gray-400 mb-6">
          <a href="/" className="hover:text-white transition-colors">Home</a>
          <span>•</span>
          <span className="text-white">{category.name}</span>
        </div>

        {/* Header della categoria */}
        <div className="relative bg-gradient-to-r from-wurth-red to-red-800 rounded-xl p-8 mb-8 overflow-hidden">
          <div className="absolute top-4 left-4">
            <button 
              onClick={() => window.history.back()}
              className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          </div>
          
          <div className="relative z-10 pt-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{category.name}</h1>
            <p className="text-red-100 text-lg mb-6 max-w-2xl">
              {category.description || `Contenuti formativi e informativi per la categoria ${category.name}`}
            </p>
            
            {/* Statistiche categoria */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-white" />
                  <div>
                    <p className="text-red-100 text-sm">Serie</p>
                    <p className="text-white text-xl font-bold">{categoryStats.totalSeries}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-white" />
                  <div>
                    <p className="text-red-100 text-sm">Episodi</p>
                    <p className="text-white text-xl font-bold">{categoryStats.totalEpisodes}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <div>
                    <p className="text-red-100 text-sm">Rating</p>
                    <p className="text-white text-xl font-bold">{categoryStats.avgRating}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-red-100 text-sm">Audience</p>
                    <p className="text-white text-lg font-bold">{categoryStats.totalListeners}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controlli filtri e ordinamento */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">
            Contenuti in {category.name} ({categorySeries.length})
          </h2>
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 bg-wurth-gray hover:bg-gray-700 text-gray-300 px-4 py-2 rounded-lg transition-colors">
              <Filter className="w-4 h-4" />
              <span>Filtri</span>
            </button>
            <button className="flex items-center space-x-2 bg-wurth-gray hover:bg-gray-700 text-gray-300 px-4 py-2 rounded-lg transition-colors">
              <SortAsc className="w-4 h-4" />
              <span>Ordina</span>
            </button>
          </div>
        </div>
        
        {/* Griglia contenuti */}
        {categorySeries.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {categorySeries.map((seriesItem, index) => (
              <div 
                key={seriesItem.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <PodcastCard podcast={seriesItem} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-wurth-gray rounded-xl p-8 max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Nessun contenuto disponibile</h3>
              <p className="text-gray-400 mb-6">
                Non ci sono ancora contenuti in questa categoria. Torna presto per nuovi aggiornamenti!
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a 
                  href="/" 
                  className="bg-wurth-red hover:bg-red-600 text-white px-6 py-2 rounded-full transition-colors"
                >
                  Esplora altre categorie
                </a>
                <a 
                  href="/admin" 
                  className="border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white px-6 py-2 rounded-full transition-colors"
                >
                  Aggiungi contenuto
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Categorie correlate */}
        {categories.length > 1 && (
          <div className="mt-12">
            <h3 className="text-xl font-bold text-white mb-6">Altre categorie</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {categories
                .filter(cat => cat.id !== category.id)
                .slice(0, 6)
                .map(relatedCategory => (
                  <a
                    key={relatedCategory.id}
                    href={`/category/${relatedCategory.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="bg-wurth-gray hover:bg-gray-700 rounded-lg p-4 transition-colors group"
                  >
                    <div className="h-16 bg-gradient-to-br from-wurth-red to-red-800 rounded-lg mb-3 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <span className="text-white text-xs font-bold text-center px-2">
                        {relatedCategory.name}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm text-center group-hover:text-white transition-colors">
                      {relatedCategory.name}
                    </p>
                  </a>
                ))}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Category;
