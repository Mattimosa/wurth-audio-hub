
import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { Episode } from '@/types/database'
import { useToast } from '@/hooks/use-toast'

export function useEpisodes(seriesId?: string) {
  const [episodes, setEpisodes] = useState<Episode[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    if (seriesId) {
      fetchEpisodes()
    } else {
      setLoading(false)
    }
  }, [seriesId])

  const fetchEpisodes = async () => {
    if (!seriesId) return

    try {
      console.log('Fetching episodes for series:', seriesId)
      const { data, error } = await supabase
        .from('episodes')
        .select(`
          *,
          series:series(*)
        `)
        .eq('series_id', seriesId)
        .order('published_at', { ascending: false })

      if (error) {
        console.error('Error fetching episodes:', error)
        throw error
      }

      console.log('Episodes fetched:', data)
      setEpisodes(data || [])
    } catch (error) {
      console.error('Error in fetchEpisodes:', error)
      toast({
        title: "Errore",
        description: "Impossibile caricare gli episodi",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const createEpisode = async (episodeData: {
    title: string
    description: string
    series_id: string
    audio_file: File
    cover_file?: File
  }) => {
    try {
      console.log('Creating episode:', episodeData)
      let audio_url = null
      let cover_url = null

      // Upload audio file
      const audioExt = episodeData.audio_file.name.split('.').pop()
      const audioFileName = `${Date.now()}_audio.${audioExt}`
      
      console.log('Uploading audio file:', audioFileName)
      const { data: audioUpload, error: audioError } = await supabase.storage
        .from('podcast-audio')
        .upload(audioFileName, episodeData.audio_file)

      if (audioError) {
        console.error('Audio upload error:', audioError)
        throw audioError
      }

      const { data: { publicUrl: audioPublicUrl } } = supabase.storage
        .from('podcast-audio')
        .getPublicUrl(audioUpload.path)

      audio_url = audioPublicUrl
      console.log('Audio uploaded:', audio_url)

      // Upload cover image if provided
      if (episodeData.cover_file) {
        const coverExt = episodeData.cover_file.name.split('.').pop()
        const coverFileName = `${Date.now()}_cover.${coverExt}`
        
        console.log('Uploading episode cover:', coverFileName)
        const { data: coverUpload, error: coverError } = await supabase.storage
          .from('podcast-covers')
          .upload(coverFileName, episodeData.cover_file)

        if (coverError) {
          console.error('Cover upload error:', coverError)
          throw coverError
        }

        const { data: { publicUrl: coverPublicUrl } } = supabase.storage
          .from('podcast-covers')
          .getPublicUrl(coverUpload.path)

        cover_url = coverPublicUrl
        console.log('Episode cover uploaded:', cover_url)
      }

      // Calculate duration from file metadata (placeholder - in real app you'd extract from audio file)
      const duration = Math.floor(Math.random() * 3600) + 600 // 10-70 minutes

      const episodePayload = {
        title: episodeData.title,
        description: episodeData.description,
        series_id: episodeData.series_id,
        audio_url,
        cover_url,
        duration,
        published_at: new Date().toISOString()
      }

      console.log('Inserting episode:', episodePayload)

      const { data, error } = await supabase
        .from('episodes')
        .insert(episodePayload)
        .select(`
          *,
          series:series(*)
        `)
        .single()

      if (error) {
        console.error('Episode insert error:', error)
        throw error
      }

      console.log('Episode created successfully:', data)

      toast({
        title: "Successo",
        description: "Episodio creato con successo"
      })

      await fetchEpisodes() // Refresh the list
      return data
    } catch (error) {
      console.error('Error creating episode:', error)
      toast({
        title: "Errore",
        description: `Impossibile creare l'episodio: ${error.message}`,
        variant: "destructive"
      })
      throw error
    }
  }

  const deleteEpisode = async (episodeId: string) => {
    try {
      const { error } = await supabase
        .from('episodes')
        .delete()
        .eq('id', episodeId)

      if (error) throw error

      toast({
        title: "Successo",
        description: "Episodio eliminato con successo"
      })

      await fetchEpisodes()
    } catch (error) {
      console.error('Error deleting episode:', error)
      toast({
        title: "Errore",
        description: "Impossibile eliminare l'episodio",
        variant: "destructive"
      })
    }
  }

  return {
    episodes,
    loading,
    createEpisode,
    deleteEpisode,
    refetch: fetchEpisodes
  }
}
