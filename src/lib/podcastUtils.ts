
import { supabase } from './supabaseClient';
import { v4 as uuidv4 } from 'uuid';
import { Category, Series, Episode } from '../types/podcast';

// Fetch all categories
export async function fetchCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');
  
  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
  
  return data || [];
}

// Fetch series by category
export async function fetchSeriesByCategory(categorySlug?: string): Promise<Series[]> {
  let query = supabase.from('series').select(`
    *,
    categories(name, slug)
  `);
  
  if (categorySlug && categorySlug !== 'all') {
    query = query.eq('categories.slug', categorySlug);
  }
  
  const { data, error } = await query.order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching series:', error);
    return [];
  }
  
  return data || [];
}

// Fetch a series by slug
export async function fetchSeriesBySlug(slug: string): Promise<Series | null> {
  const { data, error } = await supabase
    .from('series')
    .select(`
      *,
      categories(name, slug)
    `)
    .eq('slug', slug)
    .single();
  
  if (error) {
    console.error('Error fetching series by slug:', error);
    return null;
  }
  
  return data;
}

// Fetch episodes for a series
export async function fetchEpisodesBySeries(seriesId: string): Promise<Episode[]> {
  const { data, error } = await supabase
    .from('episodes')
    .select('*')
    .eq('series_id', seriesId)
    .order('published_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching episodes:', error);
    return [];
  }
  
  return data || [];
}

// Fetch a single episode by ID
export async function fetchEpisodeById(episodeId: string): Promise<Episode | null> {
  const { data, error } = await supabase
    .from('episodes')
    .select(`
      *,
      series(*)
    `)
    .eq('id', episodeId)
    .single();
  
  if (error) {
    console.error('Error fetching episode:', error);
    return null;
  }
  
  return data;
}

// Upload a file to Supabase Storage
export async function uploadFile(file: File, folder: 'covers' | 'audio'): Promise<string | null> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${uuidv4()}.${fileExt}`;
  const filePath = `${folder}/${fileName}`;

  const { error } = await supabase.storage
    .from('podcasts')
    .upload(filePath, file);

  if (error) {
    console.error('Error uploading file:', error);
    return null;
  }

  const { data } = supabase.storage
    .from('podcasts')
    .getPublicUrl(filePath);

  return data.publicUrl;
}

// Create a signed URL for authenticated access to audio files
export async function getSignedAudioUrl(audioPath: string): Promise<string | null> {
  const { data, error } = await supabase.storage
    .from('podcasts')
    .createSignedUrl(audioPath, 60 * 60 * 24); // 24 hours expiry

  if (error) {
    console.error('Error creating signed URL:', error);
    return null;
  }

  return data.signedUrl;
}

// Create a new series
export async function createSeries(seriesData: Partial<Series>, coverFile?: File): Promise<Series | null> {
  let coverUrl = null;
  
  if (coverFile) {
    coverUrl = await uploadFile(coverFile, 'covers');
  }
  
  const { data, error } = await supabase
    .from('series')
    .insert({
      ...seriesData,
      cover_url: coverUrl,
      created_by: (await supabase.auth.getUser()).data.user?.id
    })
    .select()
    .single();
  
  if (error) {
    console.error('Error creating series:', error);
    return null;
  }
  
  return data;
}

// Create a new episode
export async function createEpisode(
  episodeData: Partial<Episode>, 
  audioFile?: File, 
  coverFile?: File
): Promise<Episode | null> {
  let audioUrl = null;
  let coverUrl = null;
  
  if (audioFile) {
    audioUrl = await uploadFile(audioFile, 'audio');
  }
  
  if (coverFile) {
    coverUrl = await uploadFile(coverFile, 'covers');
  }
  
  const { data, error } = await supabase
    .from('episodes')
    .insert({
      ...episodeData,
      audio_url: audioUrl,
      cover_url: coverUrl,
      published_at: new Date().toISOString(),
    })
    .select()
    .single();
  
  if (error) {
    console.error('Error creating episode:', error);
    return null;
  }
  
  return data;
}

// Get recent episodes
export async function getRecentEpisodes(limit = 5): Promise<Episode[]> {
  const { data, error } = await supabase
    .from('episodes')
    .select(`
      *,
      series(title, slug, cover_url)
    `)
    .order('published_at', { ascending: false })
    .limit(limit);
    
  if (error) {
    console.error('Error fetching recent episodes:', error);
    return [];
  }
  
  return data || [];
}

// Search series and episodes
export async function searchContent(query: string): Promise<{ series: Series[], episodes: Episode[] }> {
  // Search series
  const { data: seriesData, error: seriesError } = await supabase
    .from('series')
    .select('*')
    .ilike('title', `%${query}%`)
    .limit(5);
    
  // Search episodes
  const { data: episodesData, error: episodesError } = await supabase
    .from('episodes')
    .select(`
      *,
      series(title, slug)
    `)
    .ilike('title', `%${query}%`)
    .limit(5);
    
  if (seriesError) console.error('Error searching series:', seriesError);
  if (episodesError) console.error('Error searching episodes:', episodesError);
  
  return {
    series: seriesData || [],
    episodes: episodesData || [],
  };
}
