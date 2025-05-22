
export interface PodcastEpisode {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  audioUrl: string;
  duration: string;
  date: string;
}

export interface Podcast {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  episodes: PodcastEpisode[];
  author: string;
  isFeatured?: boolean;
}

export const podcasts: Podcast[] = [
  {
    id: "1",
    title: "Innovazioni nel settore delle costruzioni",
    description: "Esplora le ultime tecnologie e prodotti Wurth per il settore delle costruzioni.",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    category: "Costruzioni",
    author: "Marco Rossi",
    isFeatured: true,
    episodes: [
      {
        id: "1-1",
        title: "Episodio 1: Nuovi sistemi di fissaggio",
        description: "Scopri i nostri innovativi sistemi di fissaggio per l'edilizia moderna.",
        imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
        audioUrl: "https://example.com/audio1.mp3", // Placeholder URL
        duration: "32:15",
        date: "12 Gen 2025"
      },
      {
        id: "1-2",
        title: "Episodio 2: Sostenibilità nei cantieri",
        description: "Come i prodotti Wurth contribuiscono alla sostenibilità nei cantieri moderni.",
        imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
        audioUrl: "https://example.com/audio2.mp3", // Placeholder URL
        duration: "28:45",
        date: "19 Gen 2025"
      }
    ]
  },
  {
    id: "2",
    title: "Automotive Solutions",
    description: "Soluzioni professionali Wurth per il settore automotive e officine.",
    imageUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    category: "Automotive",
    author: "Laura Bianchi",
    episodes: [
      {
        id: "2-1",
        title: "Episodio 1: Diagnostica avanzata",
        description: "Strumenti di diagnostica avanzata per officine moderne.",
        imageUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
        audioUrl: "https://example.com/audio3.mp3", // Placeholder URL
        duration: "34:22",
        date: "5 Feb 2025"
      }
    ]
  },
  {
    id: "3",
    title: "Industria 4.0",
    description: "Digitalizzazione e automazione con le soluzioni Wurth per l'industria.",
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    category: "Industria",
    author: "Paolo Verdi",
    isFeatured: true,
    episodes: [
      {
        id: "3-1",
        title: "Episodio 1: Gestione digitale del magazzino",
        description: "Soluzioni smart per ottimizzare la gestione del magazzino nelle industrie.",
        imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
        audioUrl: "https://example.com/audio4.mp3", // Placeholder URL
        duration: "41:30",
        date: "15 Feb 2025"
      }
    ]
  },
  {
    id: "4",
    title: "Sicurezza sul lavoro",
    description: "Formazione e prodotti per garantire la massima sicurezza negli ambienti di lavoro.",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    category: "Sicurezza",
    author: "Giulia Romano",
    episodes: [
      {
        id: "4-1",
        title: "Episodio 1: DPI innovativi",
        description: "I dispositivi di protezione individuale più avanzati per ogni settore.",
        imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475",
        audioUrl: "https://example.com/audio5.mp3", // Placeholder URL
        duration: "26:18",
        date: "20 Feb 2025"
      }
    ]
  },
  {
    id: "5",
    title: "Tecniche di installazione",
    description: "Guide pratiche e consigli per installazioni professionali.",
    imageUrl: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    category: "Tecnica",
    author: "Alessio Neri",
    episodes: [
      {
        id: "5-1",
        title: "Episodio 1: Installazioni elettriche",
        description: "Metodi e strumenti per installazioni elettriche a regola d'arte.",
        imageUrl: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
        audioUrl: "https://example.com/audio6.mp3", // Placeholder URL
        duration: "38:54",
        date: "1 Mar 2025"
      }
    ]
  },
  {
    id: "6",
    title: "Formazione professionale",
    description: "Percorsi formativi Wurth per professionisti di ogni settore.",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    category: "Formazione",
    author: "Elena Costa",
    episodes: [
      {
        id: "6-1",
        title: "Episodio 1: Certificazioni tecniche",
        description: "Come ottenere le certificazioni più richieste nel settore tecnico.",
        imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
        audioUrl: "https://example.com/audio7.mp3", // Placeholder URL
        duration: "45:12",
        date: "10 Mar 2025"
      }
    ]
  }
];

export const categories = [
  "Tutti",
  "Costruzioni",
  "Automotive",
  "Industria",
  "Sicurezza",
  "Tecnica",
  "Formazione"
];

export const getFeaturedPodcasts = (): Podcast[] => {
  return podcasts.filter(podcast => podcast.isFeatured);
};

export const getPodcastsByCategory = (category: string): Podcast[] => {
  if (category === "Tutti") {
    return podcasts;
  }
  return podcasts.filter(podcast => podcast.category === category);
};

export const getPodcastById = (id: string): Podcast | undefined => {
  return podcasts.find(podcast => podcast.id === id);
};

export const getEpisodeById = (podcastId: string, episodeId: string): PodcastEpisode | undefined => {
  const podcast = getPodcastById(podcastId);
  if (!podcast) return undefined;
  return podcast.episodes.find(episode => episode.id === episodeId);
};
