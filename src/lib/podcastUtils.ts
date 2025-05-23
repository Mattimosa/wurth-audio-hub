
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
    categories(id, name, slug)
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
      categories(id, name, slug)
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
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    console.log('Uploading file:', filePath);

    const { data, error } = await supabase.storage
      .from('podcasts')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Error uploading file:', error);
      return null;
    }

    console.log('File uploaded successfully:', data);

    const { data: urlData } = supabase.storage
      .from('podcasts')
      .getPublicUrl(filePath);

    console.log('Public URL:', urlData.publicUrl);
    
    return urlData.publicUrl;
  } catch (error) {
    console.error('Upload error:', error);
    return null;
  }
}

// Create a signed URL for authenticated access to audio files
export async function getSignedAudioUrl(audioPath: string): Promise<string | null> {
  try {
    // Extract the path from the full URL if it's a full URL
    let path = audioPath;
    if (audioPath.includes('/storage/v1/object/public/podcasts/')) {
      path = audioPath.split('/storage/v1/object/public/podcasts/')[1];
    }

    const { data, error } = await supabase.storage
      .from('podcasts')
      .createSignedUrl(path, 60 * 60 * 24); // 24 hours expiry

    if (error) {
      console.error('Error creating signed URL:', error);
      // If signed URL fails, return the original public URL
      return audioPath;
    }

    return data.signedUrl;
  } catch (error) {
    console.error('Signed URL error:', error);
    return audioPath;
  }
}

// Create a new series
export async function createSeries(seriesData: Partial<Series> & { title: string, slug: string }, coverFile?: File): Promise<Series | null> {
  try {
    let coverUrl = null;
    
    if (coverFile) {
      console.log('Uploading cover file for series...');
      coverUrl = await uploadFile(coverFile, 'covers');
      if (!coverUrl) {
        console.error('Failed to upload cover file');
        return null;
      }
    }
    
    const userResponse = await supabase.auth.getUser();
    
    const { data, error } = await supabase
      .from('series')
      .insert({
        ...seriesData,
        cover_url: coverUrl,
        created_by: userResponse.data.user?.id
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error creating series:', error);
      return null;
    }
    
    console.log('Series created successfully:', data);
    return data;
  } catch (error) {
    console.error('Create series error:', error);
    return null;
  }
}

// Create a new episode
export async function createEpisode(
  episodeData: Partial<Episode> & { title: string, series_id: string }, 
  audioFile?: File, 
  coverFile?: File
): Promise<Episode | null> {
  try {
    let audioUrl = null;
    let coverUrl = null;
    
    if (audioFile) {
      console.log('Uploading audio file...');
      audioUrl = await uploadFile(audioFile, 'audio');
      if (!audioUrl) {
        console.error('Failed to upload audio file');
        return null;
      }
      console.log('Audio file uploaded:', audioUrl);
    }
    
    if (coverFile) {
      console.log('Uploading cover file for episode...');
      coverUrl = await uploadFile(coverFile, 'covers');
      if (!coverUrl) {
        console.error('Failed to upload cover file');
      }
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
    
    console.log('Episode created successfully:', data);
    return data;
  } catch (error) {
    console.error('Create episode error:', error);
    return null;
  }
}

// Get recent episodes
export async function getRecentEpisodes(limit = 5): Promise<Episode[]> {
  const { data, error } = await supabase
    .from('episodes')
    .select(`
      *,
      series(*)
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
    .select(`
      *,
      categories(id, name, slug)
    `)
    .ilike('title', `%${query}%`)
    .limit(5);
    
  // Search episodes
  const { data: episodesData, error: episodesError } = await supabase
    .from('episodes')
    .select(`
      *,
      series(*)
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

// Get audio duration from file
export async function getAudioDuration(file: File): Promise<number> {
  return new Promise((resolve) => {
    const audio = new Audio();
    audio.onloadedmetadata = () => {
      resolve(Math.floor(audio.duration));
    };
    audio.onerror = () => {
      resolve(0);
    };
    audio.src = URL.createObjectURL(file);
  });
}
