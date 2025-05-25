import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Trash2 } from 'lucide-react';
import { useSeries } from '../hooks/useSeries';
import { useToast } from "@/hooks/use-toast";

const AdminSeriesManager = () => {
  const { series, categories, createSeries, deleteSeries } = useSeries();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const [seriesData, setSeriesData] = useState({
    title: "",
    description: "",
    categoryId: "",
    coverFile: null as File | null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSeriesData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSeriesData(prev => ({ ...prev, coverFile: file }));
      
      toast({
        title: "File selezionato",
        description: `Hai selezionato: ${file.name}`,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!seriesData.title || !seriesData.description || !seriesData.categoryId) {
      toast({
        title: "Errore",
        description: "Compila tutti i campi obbligatori",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    
    try {
      await createSeries({
        title: seriesData.title,
        description: seriesData.description,
        category_id: seriesData.categoryId,
        cover_file: seriesData.coverFile || undefined,
      });
      
      // Reset form
      setSeriesData({
        title: "",
        description: "",
        categoryId: "",
        coverFile: null,
      });
      
      // Reset file input
      const fileInput = document.getElementById('seriesCover') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
    } catch (error) {
      // Error handled in hook
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (seriesId: string, title: string) => {
    if (window.confirm(`Sei sicuro di voler eliminare la serie "${title}"?`)) {
      await deleteSeries(seriesId);
    }
  };

  return (
    <div className="space-y-8">
      {/* Create Series Form */}
      <Card className="bg-wurth-gray text-white border-gray-700">
        <CardHeader>
          <CardTitle>Crea Nuova Serie Podcast</CardTitle>
          <CardDescription className="text-gray-400">
            Aggiungi una nuova serie podcast alla piattaforma Würth
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-white">Titolo della Serie *</Label>
              <Input 
                id="title" 
                name="title"
                value={seriesData.title}
                onChange={handleInputChange}
                placeholder="es. Digital Talk - Innovazione nel settore automotive"
                required
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description" className="text-white">Descrizione *</Label>
              <Textarea 
                id="description" 
                name="description"
                value={seriesData.description}
                onChange={handleInputChange}
                placeholder="Descrivi il contenuto e gli obiettivi di questa serie podcast..."
                required
                className="bg-gray-800 border-gray-700 text-white min-h-[120px]"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="categoryId" className="text-white">Categoria *</Label>
              <select 
                id="categoryId"
                name="categoryId"
                value={seriesData.categoryId}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-700 bg-gray-800 text-white p-2"
                required
              >
                <option value="">-- Seleziona una categoria --</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="seriesCover" className="text-white">Immagine di copertina</Label>
              <div className="flex items-center space-x-2">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => document.getElementById('seriesCover')?.click()}
                  className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
                >
                  <Upload className="mr-2 h-4 w-4" /> Seleziona immagine
                </Button>
                <span className="text-sm text-gray-400">
                  {seriesData.coverFile ? seriesData.coverFile.name : 'Nessun file selezionato'}
                </span>
              </div>
              <input 
                type="file"
                id="seriesCover"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
            
            <Button 
              type="submit"
              className="w-full bg-wurth-red hover:bg-wurth-red/90"
              disabled={loading}
            >
              {loading ? 'Creazione in corso...' : 'Crea Serie'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Existing Series */}
      <Card className="bg-wurth-gray text-white border-gray-700">
        <CardHeader>
          <CardTitle>Serie Esistenti ({series.length})</CardTitle>
          <CardDescription className="text-gray-400">
            Gestisci le serie podcast esistenti
          </CardDescription>
        </CardHeader>
        <CardContent>
          {series.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400">Non ci sono ancora serie create</p>
            </div>
          ) : (
            <div className="space-y-4">
              {series.map((s) => (
                <div key={s.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={s.cover_url || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"} 
                      alt={s.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-semibold text-white">{s.title}</h3>
                      <p className="text-sm text-gray-400">{s.category?.name}</p>
                      <p className="text-sm text-gray-500">{s.episode_count} episodi</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(s.id, s.title)}
                    className="bg-red-600 hover:bg-red-700 border-red-600 text-white"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSeriesManager;
