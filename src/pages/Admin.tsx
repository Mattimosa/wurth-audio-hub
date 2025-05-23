
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
import { Upload, FileAudio, Play, Pause, CheckCircle, Mic, Radio, Zap } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { createSeries, createEpisode, fetchCategories, fetchSeriesByCategory, getAudioDuration } from '../lib/podcastUtils';
import { slugify } from '../lib/utils';
import { Category, Series } from '../types/podcast';

const Admin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
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
        title: "✨ Cover selezionata",
        description: `${file.name} caricata con successo`,
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
        title: "🎵 Audio caricato",
        description: `${file.name} - Durata: ${Math.floor(duration / 60)}:${(duration % 60).toString().padStart(2, '0')}`,
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
        title: "📸 Cover episodio aggiunta",
        description: `${file.name} pronta per il caricamento`,
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
        title: "❌ Categoria richiesta",
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
          title: "🎉 Serie creata con successo!",
          description: `"${formData.title}" è ora disponibile sulla piattaforma`,
        });
        
        // Reset form
        setFormData({ title: "", description: "", slug: "" });
        setCoverFile(null);
        if (coverPreview) {
          URL.revokeObjectURL(coverPreview);
          setCoverPreview(null);
        }
        
        // Reload series list
        const updatedSeries = await fetchSeriesByCategory();
        setSeriesList(updatedSeries);
      } else {
        toast({
          title: "❌ Errore",
          description: "Impossibile creare la serie podcast",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error creating series:", error);
      toast({
        title: "❌ Errore del sistema",
        description: "Si è verificato un errore durante la creazione",
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
        title: "📺 Serie richiesta",
        description: "Seleziona una serie per l'episodio",
        variant: "destructive"
      });
      return;
    }
    
    if (!episodeAudioFile) {
      toast({
        title: "🎵 Audio richiesto",
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
          title: "🚀 Episodio pubblicato!",
          description: `"${episodeData.title}" è ora in diretta e disponibile per l'ascolto`,
        });
        
        // Reset form
        setEpisodeData({ seriesId: "", title: "", description: "" });
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
          title: "❌ Errore",
          description: "Impossibile pubblicare l'episodio",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error creating episode:", error);
      toast({
        title: "❌ Errore di pubblicazione",
        description: "Si è verificato un errore durante il caricamento",
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

  return (
    <MainLayout>
      <div className="mb-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-wurth-red rounded-full flex items-center justify-center mr-4">
              <Mic className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">Studio Würth</h1>
              <p className="text-gray-400">Crea e pubblica i tuoi contenuti audio</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="bg-gradient-to-r from-green-600 to-green-500 border-none text-white">
              <CardContent className="p-4 flex items-center">
                <Radio className="h-8 w-8 mr-3" />
                <div>
                  <div className="text-2xl font-bold">{seriesList.length}</div>
                  <div className="text-sm opacity-90">Serie attive</div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-blue-600 to-blue-500 border-none text-white">
              <CardContent className="p-4 flex items-center">
                <Zap className="h-8 w-8 mr-3" />
                <div>
                  <div className="text-2xl font-bold">Live</div>
                  <div className="text-sm opacity-90">Pubblicazione istantanea</div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-purple-600 to-purple-500 border-none text-white">
              <CardContent className="p-4 flex items-center">
                <CheckCircle className="h-8 w-8 mr-3" />
                <div>
                  <div className="text-2xl font-bold">Pronto</div>
                  <div className="text-sm opacity-90">Sistema operativo</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Create New Series */}
          <Card className="bg-wurth-gray text-white border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Radio className="mr-2 text-wurth-red" />
                Nuova Serie Podcast
              </CardTitle>
              <CardDescription className="text-gray-400">
                Crea una nuova serie per organizzare i tuoi episodi
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitSeries} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-white font-medium">Titolo della Serie</Label>
                  <Input 
                    id="title" 
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="es. Innovazione Würth, Storie di Successo..."
                    required
                    className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-wurth-red"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-white font-medium">Descrizione</Label>
                  <Textarea 
                    id="description" 
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Racconta di cosa parla questa serie..."
                    required
                    className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 min-h-[100px] focus:border-wurth-red"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="slug" className="text-white font-medium">URL (generato automaticamente)</Label>
                  <Input 
                    id="slug" 
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    placeholder="url-della-serie"
                    required
                    className="bg-gray-800 border-gray-600 text-white focus:border-wurth-red"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-white font-medium">Categoria</Label>
                  <select 
                    id="category"
                    name="category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full rounded-md border border-gray-600 bg-gray-800 text-white p-3 focus:border-wurth-red focus:outline-none"
                    required
                  >
                    <option value="">Seleziona una categoria</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-4">
                  <Label className="text-white font-medium">Cover della Serie</Label>
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-wurth-red transition-colors">
                    <input 
                      type="file"
                      id="coverFile"
                      accept="image/*"
                      onChange={handleCoverFileChange}
                      className="hidden"
                    />
                    <label htmlFor="coverFile" className="cursor-pointer">
                      {coverPreview ? (
                        <div>
                          <img 
                            src={coverPreview} 
                            alt="Preview" 
                            className="max-h-40 mx-auto rounded mb-4" 
                          />
                          <p className="text-sm text-gray-400">Clicca per cambiare</p>
                        </div>
                      ) : (
                        <div>
                          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-white mb-2">Carica la cover della serie</p>
                          <p className="text-sm text-gray-400">PNG, JPG fino a 5MB</p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleSubmitSeries} 
                className="w-full bg-wurth-red hover:bg-red-600 text-white font-semibold py-3"
                disabled={seriesLoading}
              >
                {seriesLoading ? '🚀 Creazione in corso...' : '✨ Crea Serie'}
              </Button>
            </CardFooter>
          </Card>
          
          {/* Add New Episode */}
          <Card className="bg-wurth-gray text-white border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mic className="mr-2 text-wurth-red" />
                Nuovo Episodio
              </CardTitle>
              <CardDescription className="text-gray-400">
                Pubblica un nuovo episodio in una serie esistente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitEpisode} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="seriesId" className="text-white font-medium">Serie di destinazione</Label>
                  <select 
                    id="seriesId"
                    name="seriesId"
                    value={episodeData.seriesId}
                    onChange={handleEpisodeInputChange}
                    className="w-full rounded-md border border-gray-600 bg-gray-800 text-white p-3 focus:border-wurth-red focus:outline-none"
                    required
                  >
                    <option value="">Seleziona una serie</option>
                    {seriesList.map((series) => (
                      <option key={series.id} value={series.id}>{series.title}</option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="episodeTitle" className="text-white font-medium">Titolo dell'Episodio</Label>
                  <Input 
                    id="episodeTitle" 
                    name="title"
                    value={episodeData.title}
                    onChange={handleEpisodeInputChange}
                    placeholder="es. Come l'AI sta trasformando il settore..."
                    required
                    className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-wurth-red"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="episodeDescription" className="text-white font-medium">Descrizione dell'Episodio</Label>
                  <Textarea 
                    id="episodeDescription" 
                    name="description"
                    value={episodeData.description}
                    onChange={handleEpisodeInputChange}
                    placeholder="Descrivi il contenuto di questo episodio..."
                    required
                    className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 min-h-[100px] focus:border-wurth-red"
                  />
                </div>
                
                <div className="space-y-4">
                  <Label className="text-white font-medium">File Audio *</Label>
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-wurth-red transition-colors">
                    <input 
                      type="file"
                      id="episodeAudio"
                      accept="audio/*"
                      onChange={handleEpisodeAudioChange}
                      className="hidden"
                    />
                    <label htmlFor="episodeAudio" className="cursor-pointer">
                      {episodeAudioFile ? (
                        <div>
                          <FileAudio className="h-12 w-12 text-wurth-red mx-auto mb-4" />
                          <p className="text-white mb-2">{episodeAudioFile.name}</p>
                          {audioDuration > 0 && (
                            <p className="text-sm text-green-400">
                              Durata: {Math.floor(audioDuration / 60)}:{(audioDuration % 60).toString().padStart(2, '0')}
                            </p>
                          )}
                        </div>
                      ) : (
                        <div>
                          <FileAudio className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-white mb-2">Carica il file audio</p>
                          <p className="text-sm text-gray-400">MP3, WAV, M4A fino a 100MB</p>
                        </div>
                      )}
                    </label>
                  </div>
                  
                  {previewUrl && (
                    <div className="bg-gray-800 p-4 rounded-lg">
                      <Label className="text-white mb-3 block">🎧 Anteprima Audio</Label>
                      <div className="flex items-center space-x-3">
                        <Button
                          type="button"
                          variant="outline"
                          className="bg-wurth-red border-wurth-red text-white hover:bg-red-600 rounded-full p-3 h-12 w-12"
                          onClick={togglePlayPreview}
                        >
                          {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
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
                </div>
                
                <div className="space-y-4">
                  <Label className="text-white font-medium">Cover Episodio (opzionale)</Label>
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center hover:border-wurth-red transition-colors">
                    <input 
                      type="file"
                      id="episodeCover"
                      accept="image/*"
                      onChange={handleEpisodeCoverChange}
                      className="hidden"
                    />
                    <label htmlFor="episodeCover" className="cursor-pointer">
                      {episodeCoverPreview ? (
                        <div>
                          <img 
                            src={episodeCoverPreview} 
                            alt="Episode Cover Preview" 
                            className="max-h-32 mx-auto rounded mb-2" 
                          />
                          <p className="text-sm text-gray-400">Clicca per cambiare</p>
                        </div>
                      ) : (
                        <div>
                          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-400">Cover personalizzata per questo episodio</p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleSubmitEpisode} 
                className="w-full bg-wurth-red hover:bg-red-600 text-white font-semibold py-3"
                disabled={episodeLoading}
              >
                {episodeLoading ? '🚀 Pubblicazione in corso...' : '📡 Pubblica Episodio'}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Admin;
