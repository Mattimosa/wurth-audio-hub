
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
    }
  }, [seriesId])

  const fetchEpisodes = async () => {
    if (!seriesId) return

    try {
      const { data, error } = await supabase
        .from('episodes')
        .select(`
          *,
          series:series(*)
        `)
        .eq('series_id', seriesId)
        .order('published_at', { ascending: false })

      if (error) throw error
      setEpisodes(data || [])
    } catch (error) {
      console.error('Error fetching episodes:', error)
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
      let audio_url = null
      let cover_url = null

      // Upload audio file
      const audioExt = episodeData.audio_file.name.split('.').pop()
      const audioFileName = `${Date.now()}.${audioExt}`
      
      const { data: audioUpload, error: audioError } = await supabase.storage
        .from('podcast-audio')
        .upload(audioFileName, episodeData.audio_file)

      if (audioError) throw audioError

      const { data: { publicUrl: audioPublicUrl } } = supabase.storage
        .from('podcast-audio')
        .getPublicUrl(audioUpload.path)

      audio_url = audioPublicUrl

      // Upload cover image if provided
      if (episodeData.cover_file) {
        const coverExt = episodeData.cover_file.name.split('.').pop()
        const coverFileName = `${Date.now()}.${coverExt}`
        
        const { data: coverUpload, error: coverError } = await supabase.storage
          .from('podcast-covers')
          .upload(coverFileName, episodeData.cover_file)

        if (coverError) throw coverError

        const { data: { publicUrl: coverPublicUrl } } = supabase.storage
          .from('podcast-covers')
          .getPublicUrl(coverUpload.path)

        cover_url = coverPublicUrl
      }

      // Create episode duration (placeholder - in real app you'd extract from audio file)
      const duration = Math.floor(Math.random() * 3600) + 600 // 10-70 minutes

      const { data, error } = await supabase
        .from('episodes')
        .insert({
          title: episodeData.title,
          description: episodeData.description,
          series_id: episodeData.series_id,
          audio_url,
          cover_url,
          duration
        })
        .select()
        .single()

      if (error) throw error

      toast({
        title: "Successo",
        description: "Episodio creato con successo"
      })

      fetchEpisodes() // Refresh the list
      return data
    } catch (error) {
      console.error('Error creating episode:', error)
      toast({
        title: "Errore",
        description: "Impossibile creare l'episodio",
        variant: "destructive"
      })
      throw error
    }
  }

  return {
    episodes,
    loading,
    createEpisode,
    refetch: fetchEpisodes
  }
}
