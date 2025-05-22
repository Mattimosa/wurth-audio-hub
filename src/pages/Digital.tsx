
import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import PodcastCard from '../components/PodcastCard';
import { Code, Layers, Layout } from 'lucide-react';

// Mock digital podcast data
const digitalPodcasts = [
  {
    id: "d1",
    title: "Innovazione Digitale Würth",
    description: "Esplora le ultime innovazioni digitali di Würth Italia e come stanno trasformando il settore.",
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    category: "Digitale",
    author: "Marco Digital",
    isFeatured: true,
    episodes: [
      {
        id: "d1-1",
        title: "Ep 1: Trasformazione digitale nel settore industriale",
        description: "Come Würth sta guidando la trasformazione digitale nel settore industriale.",
        imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
        audioUrl: "https://example.com/digital1.mp3",
        duration: "28:45",
        date: "15 Apr 2025"
      },
      {
        id: "d1-2",
        title: "Ep 2: Piattaforme digitali per professionisti",
        description: "Le piattaforme digitali Würth per professionisti e come utilizzarle al meglio.",
        imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
        audioUrl: "https://example.com/digital2.mp3",
        duration: "32:10",
        date: "22 Apr 2025"
      }
    ]
  },
  {
    id: "d2",
    title: "App e Servizi Würth",
    description: "Scopri tutte le app e i servizi digitali offerti da Würth Italia.",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    category: "Digitale",
    author: "Team Digital Würth",
    episodes: [
      {
        id: "d2-1",
        title: "Ep 1: Würth App - Guida completa",
        description: "Come utilizzare al meglio la Würth App per gestire ordini e consultare prodotti.",
        imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
        audioUrl: "https://example.com/appguide.mp3",
        duration: "24:30",
        date: "5 May 2025"
      }
    ]
  },
  {
    id: "d3",
    title: "E-Commerce e Soluzioni Online",
    description: "Come ottimizzare l'esperienza di acquisto attraverso i canali digitali Würth.",
    imageUrl: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    category: "Digitale",
    author: "Team Digital Würth",
    episodes: [
      {
        id: "d3-1",
        title: "Ep 1: Ottimizzare gli acquisti online",
        description: "Strategie e consigli per ottimizzare gli acquisti online sulla piattaforma Würth.",
        imageUrl: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
        audioUrl: "https://example.com/ecommerce.mp3",
        duration: "26:15",
        date: "12 May 2025"
      }
    ]
  }
];

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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {digitalPodcasts.map((podcast) => (
              <PodcastCard key={podcast.id} podcast={podcast} />
            ))}
          </div>
        </div>
        
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Episodi Recenti</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {digitalPodcasts.map((podcast) => (
              podcast.episodes.length > 0 && (
                <PodcastCard key={`recent-${podcast.id}`} podcast={podcast} size="small" />
              )
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Digital;
