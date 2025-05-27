
import React from 'react';
import MainLayout from '../layouts/MainLayout';
import PodcastCard from '../components/PodcastCard';
import { Code, Layers, Layout, Smartphone, Globe, Zap, ArrowRight, Cpu, Cloud, Database } from 'lucide-react';
import { useSeries } from '../hooks/useSeries';

const digitalServices = [
  {
    id: 1,
    title: "Würth App",
    description: "Gestisci ordini, consulta cataloghi e traccia le consegne dal tuo smartphone",
    icon: <Smartphone className="w-8 h-8 text-blue-400" />,
    features: ["Catalogo digitale", "Gestione ordini", "Tracking consegne"],
    color: "from-blue-500 to-blue-700"
  },
  {
    id: 2,
    title: "E-Shop Platform",
    description: "La piattaforma di e-commerce completa per tutti i prodotti Würth",
    icon: <Globe className="w-8 h-8 text-green-400" />,
    features: ["E-commerce avanzato", "Integrazione ERP", "Analytics dettagliati"],
    color: "from-green-500 to-green-700"
  },
  {
    id: 3,
    title: "API & Integrazioni",
    description: "Soluzioni di integrazione per connettere i tuoi sistemi con i servizi Würth",
    icon: <Code className="w-8 h-8 text-purple-400" />,
    features: ["REST APIs", "Webhooks", "SDK multi-linguaggio"],
    color: "from-purple-500 to-purple-700"
  },
  {
    id: 4,
    title: "Cloud Solutions",
    description: "Infrastrutture cloud scalabili per supportare la crescita digitale",
    icon: <Cloud className="w-8 h-8 text-cyan-400" />,
    features: ["Auto-scaling", "Backup automatici", "Sicurezza avanzata"],
    color: "from-cyan-500 to-cyan-700"
  },
  {
    id: 5,
    title: "Data Analytics",
    description: "Soluzioni di business intelligence per decisioni data-driven",
    icon: <Database className="w-8 h-8 text-orange-400" />,
    features: ["Dashboard real-time", "Predictive analytics", "Reportistica avanzata"],
    color: "from-orange-500 to-orange-700"
  },
  {
    id: 6,
    title: "AI & Automation",
    description: "Intelligenza artificiale e automazione per ottimizzare i processi",
    icon: <Cpu className="w-8 h-8 text-pink-400" />,
    features: ["Machine Learning", "Process automation", "Chatbot intelligenti"],
    color: "from-pink-500 to-pink-700"
  }
];

const Digital = () => {
  const { series } = useSeries();
  
  // Filter for digital category
  const digitalSeries = series.filter(s => s.category?.name === "Digitale" || s.category?.name === "Innovazione");
  
  return (
    <MainLayout>
      <div className="mb-10">
        {/* Hero Header */}
        <div className="relative bg-gradient-to-r from-wurth-red via-red-600 to-black p-8 rounded-xl mb-8 overflow-hidden">
          <div className="absolute top-4 right-4">
            <Zap className="w-8 h-8 text-yellow-400 animate-pulse" />
          </div>
          <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 flex items-center">
              <Layout className="w-10 h-10 text-white mr-3" />
              Sezione Digitale
            </h1>
            <p className="text-gray-200 text-lg max-w-3xl mb-4">
              Scopri l'ecosistema digitale di Würth Italia: innovazioni tecnologiche, 
              soluzioni digitali e contenuti formativi per la trasformazione digitale del team.
            </p>
            <div className="flex items-center space-x-6 text-sm text-gray-300">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Sempre aggiornato</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>Tecnologie innovative</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span>Formazione continua</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Servizi Digitali */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Servizi Digitali Würth</h2>
              <p className="text-gray-400">Le nostre soluzioni tecnologiche per il futuro</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {digitalServices.map((service, index) => (
              <div 
                key={service.id} 
                className="group bg-wurth-gray rounded-xl p-6 hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-wurth-red transition-colors">{service.title}</h3>
                <p className="text-gray-300 mb-4 group-hover:text-gray-200 transition-colors">{service.description}</p>
                
                <div className="space-y-1 mb-4">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm text-gray-400">
                      <div className="w-1 h-1 bg-wurth-red rounded-full mr-2"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                
                <button className="text-wurth-red hover:text-red-400 flex items-center text-sm font-medium group-hover:translate-x-1 transition-all duration-300">
                  <span>Scopri di più</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            ))}
          </div>
        </div>
      
        {/* Podcast Digitali */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Podcast & Formazione Digitale</h2>
              <p className="text-gray-400">Contenuti formativi su innovazione e tecnologie</p>
            </div>
          </div>
          
          {digitalSeries.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {digitalSeries.map((seriesItem) => (
                <PodcastCard key={seriesItem.id} podcast={seriesItem} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-wurth-gray rounded-xl">
              <Layers className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg mb-4">
                Presto disponibili podcast dedicati alla trasformazione digitale
              </p>
              <a 
                href="/admin" 
                className="inline-flex items-center text-wurth-red hover:text-red-400 font-medium"
              >
                <span>Aggiungi contenuti digitali</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </a>
            </div>
          )}
        </div>
        
        {/* Episodi Recenti */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Episodi Recenti</h2>
              <p className="text-gray-400">Gli ultimi contenuti sulla digitalizzazione</p>
            </div>
          </div>
          
          {digitalSeries.some(seriesItem => seriesItem.episodes && seriesItem.episodes.length > 0) ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {digitalSeries
                .filter(seriesItem => seriesItem.episodes && seriesItem.episodes.length > 0)
                .slice(0, 5)
                .map((seriesItem) => (
                  <PodcastCard key={`recent-${seriesItem.id}`} podcast={seriesItem} size="small" />
                ))
              }
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-800 rounded-xl">
              <Code className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg mb-4">
                I primi episodi digitali saranno disponibili presto
              </p>
              <a 
                href="/admin" 
                className="inline-flex items-center text-wurth-red hover:text-red-400 font-medium"
              >
                <span>Crea il primo episodio</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </a>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Partecipa alla Rivoluzione Digitale</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Condividi le tue competenze digitali e contribuisci alla crescita tecnologica del team Würth. 
            Il futuro è digitale, e tu puoi essere parte del cambiamento.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
              Proponi un contenuto
            </button>
            <button className="border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300">
              Scopri le tecnologie
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Digital;
