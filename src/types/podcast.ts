
export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Series {
  id: string;
  category_id: string;
  title: string;
  description: string | null;
  slug: string;
  cover_url: string | null;
  created_by: string | null;
  created_at: string;
  categories?: Category;
}

export interface Episode {
  id: string;
  series_id: string;
  title: string;
  description: string | null;
  audio_url: string | null;
  cover_url: string | null;
  duration: number | null;
  published_at: string | null;
  created_at: string;
  series?: Series;
}

export interface Podcast {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  episodes: Episode[];
  author: string;
  slug: string;
}
