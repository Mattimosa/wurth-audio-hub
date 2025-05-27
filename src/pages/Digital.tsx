
import React from 'react';
import MainLayout from '../layouts/MainLayout';
import PodcastCard from '../components/PodcastCard';
import { Code, Layers, Layout } from 'lucide-react';
import { useSeries } from '../hooks/useSeries';

// Digital services offered by Würth
const digitalServices = [
  {
    id: 1,
    title: "Würth App",
    description: "Gestisci ordini, consulta cataloghi e traccia le consegne dal tuo smartphone",
    icon: <Layout className="w-8 h-8 text-wurth-red" />
  },
  {
    id: 2,
    title: "E-Shop",
    description: "La piattaforma di e-commerce completa per tutti i prodotti Würth",
    icon: <Layers className="w-8 h-8 text-wurth-red" />
  },
  {
    id: 3,
    title: "API e Integrazioni",
    description: "Soluzioni di integrazione per connettere i tuoi sistemi con i servizi Würth",
    icon: <Code className="w-8 h-8 text-wurth-red" />
  }
];

const Digital = () => {
  const { series } = useSeries();
  
  // Filter for digital category
  const digitalSeries = series.filter(s => s.category?.name === "Digitale");
  
  return (
    <MainLayout>
      <div className="mb-10">
        <div className="bg-gradient-to-r from-wurth-red to-black p-8 rounded-lg mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Sezione Digitale</h1>
          <p className="text-gray-200 text-lg max-w-3xl">
            Scopri tutte le innovazioni digitali di Würth Italia: podcast, app, servizi online 
            e soluzioni per professionisti nel mondo digitale.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {digitalServices.map((service) => (
            <div key={service.id} className="bg-wurth-gray p-6 rounded-lg hover:bg-gray-800 transition-colors">
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
              <p className="text-gray-300">{service.description}</p>
            </div>
          ))}
        </div>
      
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Podcast Digitali</h2>
          </div>
          {digitalSeries.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {digitalSeries.map((seriesItem) => (
                <PodcastCard key={seriesItem.id} podcast={seriesItem} />
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center py-8">
              Nessuna serie digitale trovata. 
              <a href="/admin" className="text-wurth-red ml-1 hover:underline">
                Aggiungi una nuova serie digitale
              </a>
            </p>
          )}
        </div>
        
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Episodi Recenti</h2>
          </div>
          {digitalSeries.some(seriesItem => seriesItem.episodes && seriesItem.episodes.length > 0) ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {digitalSeries
                .filter(seriesItem => seriesItem.episodes && seriesItem.episodes.length > 0)
                .map((seriesItem) => (
                  <PodcastCard key={`recent-${seriesItem.id}`} podcast={seriesItem} size="small" />
                ))
              }
            </div>
          ) : (
            <p className="text-gray-400 text-center py-8">
              Nessun episodio recente trovato. 
              <a href="/admin" className="text-wurth-red ml-1 hover:underline">
                Aggiungi un nuovo episodio
              </a>
            </p>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Digital;
