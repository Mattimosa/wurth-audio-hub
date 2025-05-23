
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Upload, FileAudio, Play, Pause, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { createSeries, createEpisode, fetchCategories, fetchSeriesByCategory, getAudioDuration } from '../lib/podcastUtils';
import { slugify } from '../lib/utils';
import { Category, Series } from '../types/podcast';
import { useAuth } from '../lib/AuthContext';

const Admin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, isAdmin, isEditor } = useAuth();
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [seriesList, setSeriesList] = useState<Series[]>([]);
  
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    slug: "",
  });
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  
  const [seriesLoading, setSeriesLoading] = useState(false);
  const [episodeLoading, setEpisodeLoading] = useState(false);
  
  const [episodeData, setEpisodeData] = useState({
    seriesId: "",
    title: "",
    description: "",
  });
  const [episodeAudioFile, setEpisodeAudioFile] = useState<File | null>(null);
  const [episodeCoverFile, setEpisodeCoverFile] = useState<File | null>(null);
  const [episodeCoverPreview, setEpisodeCoverPreview] = useState<string | null>(null);
  
  // Preview functionality
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioDuration, setAudioDuration] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    async function loadInitialData() {
      const categoriesData = await fetchCategories();
      setCategories(categoriesData);
      
      if (categoriesData.length > 0) {
        setSelectedCategory(categoriesData[0].id);
      }
      
      const seriesData = await fetchSeriesByCategory();
      setSeriesList(seriesData);
    }
    
    loadInitialData();
  }, []);
  
  useEffect(() => {
    if (user && !isAdmin && !isEditor) {
      toast({
        title: "Accesso negato",
        description: "Non hai i permessi necessari per accedere a questa pagina.",
        variant: "destructive"
      });
      navigate('/');
    }
  }, [user, isAdmin, isEditor, navigate, toast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      
      if (name === 'title') {
        newData.slug = slugify(value);
      }
      
      return newData;
    });
  };

  const handleCoverFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCoverFile(file);
      
      const previewUrl = URL.createObjectURL(file);
      setCoverPreview(previewUrl);
      
      toast({
        title: "Immagine selezionata",
        description: `Hai selezionato: ${file.name}`,
      });
    }
  };

  const handleEpisodeInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEpisodeData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleEpisodeAudioChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setEpisodeAudioFile(file);
      
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      const newPreviewUrl = URL.createObjectURL(file);
      setPreviewUrl(newPreviewUrl);
      
      // Get audio duration
      const duration = await getAudioDuration(file);
      setAudioDuration(duration);
      
      toast({
        title: "Audio selezionato",
        description: `Hai selezionato: ${file.name} (${Math.floor(duration / 60)}:${(duration % 60).toString().padStart(2, '0')})`,
      });
    }
  };
  
  const handleEpisodeCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setEpisodeCoverFile(file);
      
      if (episodeCoverPreview) URL.revokeObjectURL(episodeCoverPreview);
      const previewUrl = URL.createObjectURL(file);
      setEpisodeCoverPreview(previewUrl);
      
      toast({
        title: "Immagine episodio selezionata",
        description: `Hai selezionato: ${file.name}`,
      });
    }
  };

  const togglePlayPreview = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(error => {
        console.error("Error playing audio:", error);
        toast({
          title: "Errore riproduzione",
          description: "Impossibile riprodurre il file audio",
          variant: "destructive"
        });
      });
    }
    setIsPlaying(!isPlaying);
  };

  const handleSubmitSeries = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCategory) {
      toast({
        title: "Categoria obbligatoria",
        description: "Seleziona una categoria per la serie",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setSeriesLoading(true);
      
      const seriesData = {
        category_id: selectedCategory,
        title: formData.title,
        description: formData.description,
        slug: formData.slug,
      };
      
      const newSeries = await createSeries(seriesData, coverFile || undefined);
      
      if (newSeries) {
        toast({
          title: "Serie creata con successo",
          description: "La nuova serie podcast è stata aggiunta",
        });
        
        setFormData({
          title: "",
          description: "",
          slug: "",
        });
        setCoverFile(null);
        if (coverPreview) {
          URL.revokeObjectURL(coverPreview);
          setCoverPreview(null);
        }
        
        const updatedSeries = await fetchSeriesByCategory();
        setSeriesList(updatedSeries);
      } else {
        toast({
          title: "Errore",
          description: "Impossibile creare la serie podcast",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error creating series:", error);
      toast({
        title: "Errore",
        description: "Si è verificato un errore durante la creazione della serie",
        variant: "destructive"
      });
    } finally {
      setSeriesLoading(false);
    }
  };

  const handleSubmitEpisode = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!episodeData.seriesId) {
      toast({
        title: "Serie obbligatoria",
        description: "Seleziona una serie per l'episodio",
        variant: "destructive"
      });
      return;
    }
    
    if (!episodeAudioFile) {
      toast({
        title: "Audio obbligatorio",
        description: "Carica un file audio per l'episodio",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setEpisodeLoading(true);
      
      const newEpisodeData = {
        series_id: episodeData.seriesId,
        title: episodeData.title,
        description: episodeData.description,
        duration: audioDuration || null,
      };
      
      const newEpisode = await createEpisode(
        newEpisodeData, 
        episodeAudioFile, 
        episodeCoverFile || undefined
      );
      
      if (newEpisode) {
        toast({
          title: "Episodio creato con successo",
          description: "Il nuovo episodio è stato aggiunto alla serie",
        });
        
        setEpisodeData({
          seriesId: "",
          title: "",
          description: "",
        });
        setEpisodeAudioFile(null);
        setEpisodeCoverFile(null);
        setAudioDuration(0);
        if (previewUrl) {
          URL.revokeObjectURL(previewUrl);
          setPreviewUrl(null);
        }
        if (episodeCoverPreview) {
          URL.revokeObjectURL(episodeCoverPreview);
          setEpisodeCoverPreview(null);
        }
      } else {
        toast({
          title: "Errore",
          description: "Impossibile creare l'episodio",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error creating episode:", error);
      toast({
        title: "Errore",
        description: "Si è verificato un errore durante la creazione dell'episodio",
        variant: "destructive"
      });
    } finally {
      setEpisodeLoading(false);
    }
  };

  React.useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      if (coverPreview) URL.revokeObjectURL(coverPreview);
      if (episodeCoverPreview) URL.revokeObjectURL(episodeCoverPreview);
    };
  }, []);

  if (!isAdmin && !isEditor) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <AlertCircle className="h-16 w-16 text-wurth-red mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-white mb-4">Accesso negato</h1>
            <p className="text-gray-400">Non hai i permessi necessari per accedere a questa pagina.</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-6">Amministrazione Podcast</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Create New Series */}
          <Card className="bg-wurth-gray text-white border-gray-700">
            <CardHeader>
              <CardTitle>Crea Nuova Serie Podcast</CardTitle>
              <CardDescription className="text-gray-400">Aggiungi una nuova serie podcast alla piattaforma</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitSeries} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-white">Titolo della Serie</Label>
                  <Input 
                    id="title" 
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Inserisci il titolo della serie podcast"
                    required
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-white">Descrizione</Label>
                  <Textarea 
                    id="description" 
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Descrivi la serie podcast"
                    required
                    className="bg-gray-800 border-gray-700 text-white min-h-[120px]"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="slug" className="text-white">Slug (URL)</Label>
                  <Input 
                    id="slug" 
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    placeholder="url-friendly-slug"
                    required
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-white">Categoria</Label>
                  <select 
                    id="category"
                    name="category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full rounded-md border border-gray-700 bg-gray-800 text-white p-2"
                    required
                  >
                    <option value="">Seleziona una categoria</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cover" className="text-white">Immagine di copertina</Label>
                  <div className="flex items-center space-x-2">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => document.getElementById('coverFile')?.click()}
                      className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
                    >
                      <Upload className="mr-2 h-4 w-4" /> Seleziona immagine
                    </Button>
                    <span className="text-sm text-gray-400">
                      {coverFile ? coverFile.name : 'Nessun file selezionato'}
                    </span>
                    {coverFile && <CheckCircle className="h-4 w-4 text-green-400" />}
                  </div>
                  <input 
                    type="file"
                    id="coverFile"
                    accept="image/*"
                    onChange={handleCoverFileChange}
                    className="hidden"
                  />
                </div>

                {coverPreview && (
                  <div className="mt-2">
                    <Label className="text-white">Anteprima immagine</Label>
                    <div className="mt-2">
                      <img 
                        src={coverPreview} 
                        alt="Preview" 
                        className="max-h-40 rounded border border-gray-700" 
                      />
                    </div>
                  </div>
                )}
              </form>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleSubmitSeries} 
                className="w-full bg-wurth-red hover:bg-wurth-red/90"
                disabled={seriesLoading}
              >
                {seriesLoading ? 'Creazione in corso...' : 'Crea Serie'}
              </Button>
            </CardFooter>
          </Card>
          
          {/* Add New Episode */}
          <Card className="bg-wurth-gray text-white border-gray-700">
            <CardHeader>
              <CardTitle>Aggiungi Episodio</CardTitle>
              <CardDescription className="text-gray-400">Aggiungi un nuovo episodio a una serie esistente</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitEpisode} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="seriesId" className="text-white">Seleziona Serie</Label>
                  <select 
                    id="seriesId"
                    name="seriesId"
                    value={episodeData.seriesId}
                    onChange={handleEpisodeInputChange}
                    className="w-full rounded-md border border-gray-700 bg-gray-800 text-white p-2"
                    required
                  >
                    <option value="">Seleziona una serie</option>
                    {seriesList.map((series) => (
                      <option key={series.id} value={series.id}>{series.title}</option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="episodeTitle" className="text-white">Titolo dell'Episodio</Label>
                  <Input 
                    id="episodeTitle" 
                    name="title"
                    value={episodeData.title}
                    onChange={handleEpisodeInputChange}
                    placeholder="Inserisci il titolo dell'episodio"
                    required
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="episodeDescription" className="text-white">Descrizione dell'Episodio</Label>
                  <Textarea 
                    id="episodeDescription" 
                    name="description"
                    value={episodeData.description}
                    onChange={handleEpisodeInputChange}
                    placeholder="Descrivi l'episodio"
                    required
                    className="bg-gray-800 border-gray-700 text-white min-h-[120px]"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="episodeAudio" className="text-white">File Audio</Label>
                  <div className="flex items-center space-x-2">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => document.getElementById('episodeAudio')?.click()}
                      className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
                    >
                      <FileAudio className="mr-2 h-4 w-4" /> Seleziona file audio
                    </Button>
                    <span className="text-sm text-gray-400">
                      {episodeAudioFile ? episodeAudioFile.name : 'Nessun file selezionato'}
                    </span>
                    {episodeAudioFile && <CheckCircle className="h-4 w-4 text-green-400" />}
                  </div>
                  <input 
                    type="file"
                    id="episodeAudio"
                    accept="audio/*"
                    onChange={handleEpisodeAudioChange}
                    className="hidden"
                  />
                  {audioDuration > 0 && (
                    <p className="text-sm text-green-400">
                      Durata: {Math.floor(audioDuration / 60)}:{(audioDuration % 60).toString().padStart(2, '0')}
                    </p>
                  )}
                </div>
                
                {previewUrl && (
                  <div className="mt-4 p-4 border border-gray-700 rounded-md">
                    <Label className="text-white mb-2 block">Anteprima Audio</Label>
                    <div className="flex items-center space-x-3">
                      <Button
                        type="button"
                        variant="outline"
                        className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700 rounded-full p-2 h-10 w-10"
                        onClick={togglePlayPreview}
                      >
                        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>
                      <div className="flex-1">
                        <audio 
                          ref={audioRef} 
                          src={previewUrl} 
                          onEnded={() => setIsPlaying(false)}
                          onPlay={() => setIsPlaying(true)}
                          onPause={() => setIsPlaying(false)}
                          className="w-full" 
                          controls 
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="episodeCover" className="text-white">Immagine dell'Episodio (opzionale)</Label>
                  <div className="flex items-center space-x-2">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => document.getElementById('episodeCover')?.click()}
                      className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
                    >
                      <Upload className="mr-2 h-4 w-4" /> Seleziona immagine
                    </Button>
                    <span className="text-sm text-gray-400">
                      {episodeCoverFile ? episodeCoverFile.name : 'Nessun file selezionato'}
                    </span>
                    {episodeCoverFile && <CheckCircle className="h-4 w-4 text-green-400" />}
                  </div>
                  <input 
                    type="file"
                    id="episodeCover"
                    accept="image/*"
                    onChange={handleEpisodeCoverChange}
                    className="hidden"
                  />
                  {episodeCoverPreview && (
                    <div className="mt-2">
                      <img 
                        src={episodeCoverPreview} 
                        alt="Episode Cover Preview" 
                        className="max-h-40 rounded border border-gray-700" 
                      />
                    </div>
                  )}
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleSubmitEpisode} 
                className="w-full bg-wurth-red hover:bg-wurth-red/90"
                disabled={episodeLoading}
              >
                {episodeLoading ? 'Caricamento in corso...' : 'Aggiungi Episodio'}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Admin;
