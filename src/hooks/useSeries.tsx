
import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { Series, Category } from '@/types/database'
import { useToast } from '@/hooks/use-toast'

export function useSeries() {
  const [series, setSeries] = useState<Series[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchSeries()
    fetchCategories()
  }, [])

  const fetchSeries = async () => {
    try {
      const { data, error } = await supabase
        .from('series')
        .select(`
          *,
          category:categories(*),
          episodes(count)
        `)
        .order('created_at', { ascending: false })

      if (error) throw error

      const seriesWithCount = data?.map(s => ({
        ...s,
        episode_count: s.episodes?.[0]?.count || 0
      })) || []

      setSeries(seriesWithCount)
    } catch (error) {
      console.error('Error fetching series:', error)
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
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name')

      if (error) throw error
      setCategories(data || [])
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const createSeries = async (seriesData: {
    title: string
    description: string
    category_id: string
    cover_file?: File
  }) => {
    try {
      let cover_url = null

      // Upload cover image if provided
      if (seriesData.cover_file) {
        const fileExt = seriesData.cover_file.name.split('.').pop()
        const fileName = `${Date.now()}.${fileExt}`
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('podcast-covers')
          .upload(fileName, seriesData.cover_file)

        if (uploadError) throw uploadError

        const { data: { publicUrl } } = supabase.storage
          .from('podcast-covers')
          .getPublicUrl(uploadData.path)

        cover_url = publicUrl
      }

      // Create slug from title
      const slug = seriesData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')

      const { data, error } = await supabase
        .from('series')
        .insert({
          title: seriesData.title,
          description: seriesData.description,
          category_id: seriesData.category_id,
          cover_url,
          slug,
        })
        .select()
        .single()

      if (error) throw error

      toast({
        title: "Successo",
        description: "Serie creata con successo"
      })

      fetchSeries() // Refresh the list
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

  return {
    series,
    categories,
    loading,
    createSeries,
    refetch: fetchSeries
  }
}
