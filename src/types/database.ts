
export interface Category {
  id: string
  name: string
  slug: string
  created_at?: string
}

export interface Series {
  id: string
  title: string
  description: string | null
  cover_url: string | null
  category_id: string | null
  created_by: string | null
  slug: string
  created_at: string
  category?: Category
  episodes?: Episode[]
  episode_count?: number
}

export interface Episode {
  id: string
  title: string
  description: string | null
  audio_url: string | null
  cover_url: string | null
  duration: number | null
  series_id: string | null
  published_at: string
  created_at: string
  series?: Series
}

export interface UserRole {
  id: string
  user_id: string
  role: 'admin' | 'user'
}

// Helper types for UI
export interface PlaylistItem {
  episode: Episode
  series: Series
}
