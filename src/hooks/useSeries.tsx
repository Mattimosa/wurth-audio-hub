
import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { Series, Category } from '@/types/database'
import { useToast } from '@/hooks/use-toast'

export function useSeries() {
  const [series, setSeries] = useState<Series[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [featuredSeries, setFeaturedSeries] = useState<Series | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchSeries()
    fetchCategories()
  }, [])

  const fetchSeries = async () => {
    try {
      console.log('Fetching series...')
      const { data, error } = await supabase
        .from('series')
        .select(`
          *,
          category:categories(*),
          episodes(*)
        `)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching series:', error)
        throw error
      }

      console.log('Series fetched:', data)

      const seriesWithCount = data?.map(s => ({
        ...s,
        episode_count: s.episodes?.length || 0
      })) || []

      setSeries(seriesWithCount)
      
      // Imposta la serie in evidenza (la prima con episodi)
      const featured = seriesWithCount.find(s => s.episodes && s.episodes.length > 0)
      if (featured) {
        setFeaturedSeries(featured)
      }

    } catch (error) {
      console.error('Error in fetchSeries:', error)
      toast({
        title: "Errore",
        description: "Impossibile caricare le serie",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      console.log('Fetching categories...')
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name')

      if (error) {
        console.error('Error fetching categories:', error)
        throw error
      }

      console.log('Categories fetched:', data)
      setCategories(data || [])
    } catch (error) {
      console.error('Error in fetchCategories:', error)
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
        .select(`
          *,
          category:categories(*),
          episodes(*)
        `)
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
        description: "Impossibile creare la serie",
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
