
import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { Category } from '@/types/database'
import { useToast } from '@/hooks/use-toast'

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchCategories()
  }, [])

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
      
      // Se non ci sono categorie, creane alcune di default
      if (!data || data.length === 0) {
        await createDefaultCategories()
        return
      }

      setCategories(data || [])
    } catch (error) {
      console.error('Error in fetchCategories:', error)
      toast({
        title: "Errore",
        description: "Impossibile caricare le categorie",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const createDefaultCategories = async () => {
    try {
      console.log('Creating default categories...')
      const defaultCategories = [
        { name: 'Tecnologia', slug: 'tecnologia' },
        { name: 'Business', slug: 'business' },
        { name: 'Innovazione', slug: 'innovazione' },
        { name: 'Digital Talk', slug: 'digital-talk' }
      ]

      const { data, error } = await supabase
        .from('categories')
        .insert(defaultCategories)
        .select()

      if (error) {
        console.error('Error creating default categories:', error)
        throw error
      }

      console.log('Default categories created:', data)
      setCategories(data || [])
    } catch (error) {
      console.error('Error creating default categories:', error)
    }
  }

  return {
    categories,
    loading,
    refetch: fetchCategories
  }
}
