
import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { Series } from '@/types/database'
import { useToast } from '@/hooks/use-toast'
import { useCategories } from './useCategories'

export function useSeries() {
  const [series, setSeries] = useState<Series[]>([])
  const [loading, setLoading] = useState(true)
  const [featuredSeries, setFeaturedSeries] = useState<Series | null>(null)
  const { toast } = useToast()
  const { categories } = useCategories()

  useEffect(() => {
    fetchSeries()
  }, [])

  const fetchSeries = async () => {
    try {
      console.log('Fetching series...')
      
      // Prima proviamo a fetch senza la relazione per vedere se funziona
      const { data: seriesData, error: seriesError } = await supabase
        .from('series')
        .select('*')
        .order('created_at', { ascending: false })

      if (seriesError) {
        console.error('Error fetching series basic data:', seriesError)
        throw seriesError
      }

      console.log('Series basic data fetched:', seriesData)

      // Ora proviamo a fetch le categorie separatamente
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select('*')

      if (categoriesError) {
        console.error('Error fetching categories:', categoriesError)
      }

      console.log('Categories data fetched:', categoriesData)

      // Ora proviamo a fetch gli episodi separatamente
      const { data: episodesData, error: episodesError } = await supabase
        .from('episodes')
        .select('*')

      if (episodesError) {
        console.error('Error fetching episodes:', episodesError)
      }

      console.log('Episodes data fetched:', episodesData)

      // Combiniamo i dati manualmente
      const seriesWithRelations = seriesData?.map(s => {
        const category = categoriesData?.find(c => c.id === s.category_id)
        const seriesEpisodes = episodesData?.filter(e => e.series_id === s.id) || []
        
        return {
          ...s,
          category,
          episodes: seriesEpisodes,
          episode_count: seriesEpisodes.length
        }
      }) || []

      console.log('Series with relations:', seriesWithRelations)

      setSeries(seriesWithRelations)
      
      // Imposta la serie in evidenza (la prima con episodi)
      const featured = seriesWithRelations.find(s => s.episodes && s.episodes.length > 0)
      if (featured) {
        setFeaturedSeries(featured)
      }

    } catch (error) {
      console.error('Error in fetchSeries:', error)
      toast({
        title: "Errore",
        description: `Impossibile caricare le serie: ${error.message}`,
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const createSeries = async (seriesData: {
    title: string
    description: string
    category_id: string
    cover_file?: File
  }) => {
    try {
      console.log('Creating series:', seriesData)
      let cover_url = null

      // Upload cover image if provided
      if (seriesData.cover_file) {
        const fileExt = seriesData.cover_file.name.split('.').pop()
        const fileName = `${Date.now()}.${fileExt}`
        
        console.log('Uploading cover image:', fileName)
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('podcast-covers')
          .upload(fileName, seriesData.cover_file)

        if (uploadError) {
          console.error('Upload error:', uploadError)
          throw uploadError
        }

        const { data: { publicUrl } } = supabase.storage
          .from('podcast-covers')
          .getPublicUrl(uploadData.path)

        cover_url = publicUrl
        console.log('Cover uploaded:', cover_url)
      }

      // Create slug from title
      const slug = seriesData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')

      const seriesPayload = {
        title: seriesData.title,
        description: seriesData.description,
        category_id: seriesData.category_id,
        cover_url,
        slug,
      }

      console.log('Inserting series:', seriesPayload)

      const { data, error } = await supabase
        .from('series')
        .insert(seriesPayload)
        .select('*')
        .single()

      if (error) {
        console.error('Insert error:', error)
        throw error
      }

      console.log('Series created successfully:', data)

      toast({
        title: "Successo",
        description: "Serie creata con successo"
      })

      await fetchSeries() // Refresh the list
      return data
    } catch (error) {
      console.error('Error creating series:', error)
      toast({
        title: "Errore",
        description: `Impossibile creare la serie: ${error.message}`,
        variant: "destructive"
      })
      throw error
    }
  }

  const deleteSeries = async (seriesId: string) => {
    try {
      const { error } = await supabase
        .from('series')
        .delete()
        .eq('id', seriesId)

      if (error) throw error

      toast({
        title: "Successo",
        description: "Serie eliminata con successo"
      })

      await fetchSeries()
    } catch (error) {
      console.error('Error deleting series:', error)
      toast({
        title: "Errore",
        description: "Impossibile eliminare la serie",
        variant: "destructive"
      })
    }
  }

  return {
    series,
    categories,
    loading,
    featuredSeries,
    createSeries,
    deleteSeries,
    refetch: fetchSeries
  }
}
