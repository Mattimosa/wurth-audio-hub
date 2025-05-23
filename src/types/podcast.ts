
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
}
