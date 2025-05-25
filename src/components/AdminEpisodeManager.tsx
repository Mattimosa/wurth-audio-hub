
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileAudio, Trash2, Play } from 'lucide-react';
import { useSeries } from '../hooks/useSeries';
import { useEpisodes } from '../hooks/useEpisodes';
import { useToast } from "@/hooks/use-toast";

const AdminEpisodeManager = () => {
  const { series } = useSeries();
  const { toast } = useToast();
  const [selectedSeriesId, setSelectedSeriesId] = useState("");
  const [loading, setLoading] = useState(false);
  const { episodes, createEpisode, deleteEpisode } = useEpisodes(selectedSeriesId);
  
  const [episodeData, setEpisodeData] = useState({
    title: "",
    description: "",
    audioFile: null as File | null,
    coverFile: null as File | null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEpisodeData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: 'audio' | 'cover') => {
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

  const handleSubmit = async (e: React.FormEvent) => {
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
    
    if (!episodeData.title || !episodeData.description) {
      toast({
        title: "Errore",
        description: "Compila tutti i campi obbligatori",
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
      
      // Reset form
      setEpisodeData({
        title: "",
        description: "",
        audioFile: null,
        coverFile: null,
      });
      
      // Reset file inputs
      const audioInput = document.getElementById('episodeAudio') as HTMLInputElement;
      const coverInput = document.getElementById('episodeCover') as HTMLInputElement;
      if (audioInput) audioInput.value = '';
      if (coverInput) coverInput.value = '';
      
    } catch (error) {
      // Error handled in hook
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (seconds: number | null) => {
    if (!seconds) return 'N/A';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const selectedSeries = series.find(s => s.id === selectedSeriesId);

  return (
    <div className="space-y-8">
      {/* Add Episode Form */}
      <Card className="bg-wurth-gray text-white border-gray-700">
        <CardHeader>
          <CardTitle>Aggiungi Nuovo Episodio</CardTitle>
          <CardDescription className="text-gray-400">
            Carica un nuovo episodio per una serie esistente
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="seriesSelect" className="text-white">Seleziona Serie *</Label>
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
                    {s.title} ({s.episode_count} episodi)
                  </option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="episodeTitle" className="text-white">Titolo dell'Episodio *</Label>
              <Input 
                id="episodeTitle" 
                name="title"
                value={episodeData.title}
                onChange={handleInputChange}
                placeholder="es. Episodio 1: Introduzione alla trasformazione digitale"
                required
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="episodeDescription" className="text-white">Descrizione dell'Episodio *</Label>
              <Textarea 
                id="episodeDescription" 
                name="description"
                value={episodeData.description}
                onChange={handleInputChange}
                placeholder="Descrivi il contenuto di questo episodio..."
                required
                className="bg-gray-800 border-gray-700 text-white min-h-[120px]"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="episodeAudio" className="text-white">File Audio *</Label>
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
                onChange={(e) => handleFileChange(e, 'audio')}
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
                onChange={(e) => handleFileChange(e, 'cover')}
                className="hidden"
              />
            </div>
            
            <Button 
              type="submit"
              className="w-full bg-wurth-red hover:bg-wurth-red/90"
              disabled={loading || !selectedSeriesId || !episodeData.audioFile}
            >
              {loading ? 'Caricamento in corso...' : 'Aggiungi Episodio'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Episodes List */}
      {selectedSeriesId && (
        <Card className="bg-wurth-gray text-white border-gray-700">
          <CardHeader>
            <CardTitle>
              Episodi di {selectedSeries?.title} ({episodes.length})
            </CardTitle>
            <CardDescription className="text-gray-400">
              Gestisci gli episodi di questa serie
            </CardDescription>
          </CardHeader>
          <CardContent>
            {episodes.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-400">Non ci sono ancora episodi per questa serie</p>
              </div>
            ) : (
              <div className="space-y-4">
                {episodes.map((episode) => (
                  <div key={episode.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <img 
                        src={episode.cover_url || selectedSeries?.cover_url || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"} 
                        alt={episode.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <h3 className="font-semibold text-white">{episode.title}</h3>
                        <p className="text-sm text-gray-400">{formatDuration(episode.duration)}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(episode.published_at).toLocaleDateString('it-IT')}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {episode.audio_url && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(episode.audio_url!, '_blank')}
                          className="bg-green-600 hover:bg-green-700 border-green-600 text-white"
                        >
                          <Play className="w-4 h-4" />
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          if (window.confirm(`Sei sicuro di voler eliminare l'episodio "${episode.title}"?`)) {
                            deleteEpisode(episode.id);
                          }
                        }}
                        className="bg-red-600 hover:bg-red-700 border-red-600 text-white"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminEpisodeManager;
