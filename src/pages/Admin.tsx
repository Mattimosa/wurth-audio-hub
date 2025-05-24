
import React, { useState } from 'react';
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
import { Upload, FileAudio } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useSeries } from '../hooks/useSeries';
import { useEpisodes } from '../hooks/useEpisodes';

const Admin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { series, categories, createSeries } = useSeries();
  const { createEpisode } = useEpisodes();
  
  const [selectedSeriesId, setSelectedSeriesId] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Series form state
  const [seriesData, setSeriesData] = useState({
    title: "",
    description: "",
    categoryId: "",
    coverFile: null as File | null,
  });
  
  // Episode form state
  const [episodeData, setEpisodeData] = useState({
    title: "",
    description: "",
    audioFile: null as File | null,
    coverFile: null as File | null,
  });

  const handleSeriesInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSeriesData(prev => ({ ...prev, [name]: value }));
  };

  const handleSeriesFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSeriesData(prev => ({ ...prev, coverFile: file }));
      
      toast({
        title: "File selezionato",
        description: `Hai selezionato: ${file.name}`,
      });
    }
  };

  const handleEpisodeInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEpisodeData(prev => ({ ...prev, [name]: value }));
  };

  const handleEpisodeFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: 'audio' | 'cover') => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      if (fileType === 'audio') {
        setEpisodeData(prev => ({ ...prev, audioFile: file }));
      } else {
        setEpisodeData(prev => ({ ...prev, coverFile: file }));
      }
      
      toast({
        title: "File selezionato",
        description: `Hai selezionato: ${file.name}`,
      });
    }
  };

  const handleSubmitSeries = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const newSeries = await createSeries({
        title: seriesData.title,
        description: seriesData.description,
        category_id: seriesData.categoryId,
        cover_file: seriesData.coverFile || undefined,
      });
      
      setSeriesData({
        title: "",
        description: "",
        categoryId: "",
        coverFile: null,
      });
      
      navigate(`/podcast/${newSeries.id}`);
    } catch (error) {
      // Error is handled in the hook
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitEpisode = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedSeriesId) {
      toast({
        title: "Errore",
        description: "Seleziona una serie",
        variant: "destructive"
      });
      return;
    }
    
    if (!episodeData.audioFile) {
      toast({
        title: "Errore",
        description: "Seleziona un file audio",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    
    try {
      await createEpisode({
        title: episodeData.title,
        description: episodeData.description,
        series_id: selectedSeriesId,
        audio_file: episodeData.audioFile,
        cover_file: episodeData.coverFile || undefined,
      });
      
      setEpisodeData({
        title: "",
        description: "",
        audioFile: null,
        coverFile: null,
      });
      
      navigate(`/podcast/${selectedSeriesId}`);
    } catch (error) {
      // Error is handled in the hook
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-6">Gestione Podcast</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Create New Series */}
          <Card className="bg-wurth-gray text-white border-gray-700">
            <CardHeader>
              <CardTitle>Crea Nuova Serie</CardTitle>
              <CardDescription className="text-gray-400">Aggiungi una nuova serie podcast alla piattaforma</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitSeries} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-white">Titolo della Serie</Label>
                  <Input 
                    id="title" 
                    name="title"
                    value={seriesData.title}
                    onChange={handleSeriesInputChange}
                    placeholder="Inserisci il titolo della serie"
                    required
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-white">Descrizione</Label>
                  <Textarea 
                    id="description" 
                    name="description"
                    value={seriesData.description}
                    onChange={handleSeriesInputChange}
                    placeholder="Descrivi la serie"
                    required
                    className="bg-gray-800 border-gray-700 text-white min-h-[120px]"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="categoryId" className="text-white">Categoria</Label>
                  <select 
                    id="categoryId"
                    name="categoryId"
                    value={seriesData.categoryId}
                    onChange={handleSeriesInputChange}
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
                    onChange={handleSeriesFileChange}
                    className="hidden"
                  />
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleSubmitSeries} 
                className="w-full bg-wurth-red hover:bg-wurth-red/90"
                disabled={loading}
              >
                {loading ? 'Creazione in corso...' : 'Crea Serie'}
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
                  <Label htmlFor="seriesSelect" className="text-white">Seleziona Serie</Label>
                  <select 
                    id="seriesSelect"
                    value={selectedSeriesId}
                    onChange={(e) => setSelectedSeriesId(e.target.value)}
                    className="w-full rounded-md border border-gray-700 bg-gray-800 text-white p-2"
                    required
                  >
                    <option value="">-- Seleziona una serie --</option>
                    {series.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title}
                      </option>
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
                      {episodeData.audioFile ? episodeData.audioFile.name : 'Nessun file selezionato'}
                    </span>
                  </div>
                  <input 
                    type="file"
                    id="episodeAudio"
                    accept="audio/*"
                    onChange={(e) => handleEpisodeFileChange(e, 'audio')}
                    className="hidden"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="episodeCover" className="text-white">Immagine Episodio (opzionale)</Label>
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
                      {episodeData.coverFile ? episodeData.coverFile.name : 'Nessun file selezionato'}
                    </span>
                  </div>
                  <input 
                    type="file"
                    id="episodeCover"
                    accept="image/*"
                    onChange={(e) => handleEpisodeFileChange(e, 'cover')}
                    className="hidden"
                  />
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleSubmitEpisode} 
                className="w-full bg-wurth-red hover:bg-wurth-red/90"
                disabled={loading || !selectedSeriesId || !episodeData.audioFile}
              >
                {loading ? 'Caricamento in corso...' : 'Aggiungi Episodio'}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Admin;
