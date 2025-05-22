
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
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
import { Upload, FileAudio, Play, Pause } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { usePodcasts } from '../contexts/PodcastContext';

const Admin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { podcasts, addPodcast, addEpisode, uploadedFiles, addUploadedFile } = usePodcasts();
  
  const [selectedCategory, setSelectedCategory] = useState("Digitale");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    author: "",
    image: null as File | null,
  });
  const [loading, setLoading] = useState(false);
  const [selectedPodcastId, setSelectedPodcastId] = useState("");
  const [episodeData, setEpisodeData] = useState({
    episodeTitle: "",
    episodeDescription: "",
    episodeAudio: null as File | null,
    episodeDate: new Date().toISOString().split('T')[0],
  });
  
  // Preview functionality
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const categories = [
    "Digitale",
    "Costruzioni",
    "Automotive",
    "Industria",
    "Sicurezza",
    "Tecnica", 
    "Formazione"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: 'image') => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({ ...prev, [fileType]: file }));
      
      // Show a toast notification for file selection
      toast({
        title: "File selezionato",
        description: `Hai selezionato: ${file.name}`,
      });
    }
  };

  const handleEpisodeFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setEpisodeData(prev => ({ ...prev, episodeAudio: file }));
      
      // Create URL for audio preview
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      const newPreviewUrl = URL.createObjectURL(file);
      setPreviewUrl(newPreviewUrl);
      
      toast({
        title: "Audio episodio selezionato",
        description: `Hai selezionato: ${file.name}`,
      });
    }
  };

  const handleEpisodeInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEpisodeData(prev => ({ ...prev, [name]: value }));
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
        });
      });
    }
    setIsPlaying(!isPlaying);
  };

  const handleSubmitPodcast = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Create a new podcast object
    const newPodcastId = uuidv4();
    
    // Create image URL (in a real app this would upload to storage)
    let imageUrl = "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74";
    if (formData.image) {
      imageUrl = URL.createObjectURL(formData.image);
      
      // Save the uploaded file info
      addUploadedFile({
        id: uuidv4(),
        name: formData.image.name,
        url: imageUrl,
        type: 'image',
        date: new Date().toLocaleDateString()
      });
    }
    
    const newPodcast = {
      id: newPodcastId,
      title: formData.title,
      description: formData.description,
      imageUrl: imageUrl,
      category: selectedCategory,
      author: formData.author,
      episodes: []
    };
    
    // Add the podcast to context
    addPodcast(newPodcast);
    
    toast({
      title: "Podcast creato con successo",
      description: "Il nuovo podcast è stato aggiunto alla piattaforma",
    });
    
    setLoading(false);
    setFormData({
      title: "",
      description: "",
      author: "",
      image: null,
    });
    
    // Navigate to the new podcast page
    navigate(`/podcast/${newPodcastId}`);
  };

  const handleSubmitEpisode = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedPodcastId) {
      toast({
        title: "Errore",
        description: "Seleziona un podcast",
        variant: "destructive"
      });
      return;
    }
    
    if (!episodeData.episodeAudio) {
      toast({
        title: "Errore",
        description: "Seleziona un file audio",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    
    // Create audio URL (in a real app this would upload to storage)
    const audioUrl = URL.createObjectURL(episodeData.episodeAudio);
    
    // Save the uploaded file info
    const fileId = uuidv4();
    addUploadedFile({
      id: fileId,
      name: episodeData.episodeAudio.name,
      url: audioUrl,
      type: 'audio',
      date: new Date().toLocaleDateString()
    });
    
    // Get the selected podcast
    const podcast = podcasts.find(p => p.id === selectedPodcastId);
    
    if (!podcast) {
      toast({
        title: "Errore",
        description: "Podcast non trovato",
        variant: "destructive"
      });
      setLoading(false);
      return;
    }
    
    // Calculate duration (in a real app this would be extracted from the audio file)
    const randomMinutes = Math.floor(Math.random() * 40) + 10;
    const randomSeconds = Math.floor(Math.random() * 60);
    const duration = `${randomMinutes}:${randomSeconds < 10 ? '0' + randomSeconds : randomSeconds}`;
    
    // Create new episode
    const newEpisode = {
      id: fileId,
      title: episodeData.episodeTitle,
      description: episodeData.episodeDescription,
      imageUrl: podcast.imageUrl, // Use podcast image for the episode
      audioUrl: audioUrl,
      duration: duration,
      date: new Date(episodeData.episodeDate).toLocaleDateString('it-IT', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
      })
    };
    
    // Add the episode to the podcast
    addEpisode(selectedPodcastId, newEpisode);
    
    toast({
      title: "Episodio aggiunto con successo",
      description: "Il nuovo episodio è stato aggiunto al podcast",
    });
    
    setLoading(false);
    setEpisodeData({
      episodeTitle: "",
      episodeDescription: "",
      episodeAudio: null,
      episodeDate: new Date().toISOString().split('T')[0],
    });
    setPreviewUrl(null);
    
    // Navigate to the podcast page
    navigate(`/podcast/${selectedPodcastId}`);
  };

  // Clean up object URLs when component unmounts
  React.useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, []);

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-6">Amministrazione Podcast</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Create New Podcast */}
          <Card className="bg-wurth-gray text-white border-gray-700">
            <CardHeader>
              <CardTitle>Crea Nuovo Podcast</CardTitle>
              <CardDescription className="text-gray-400">Aggiungi una nuova serie podcast alla piattaforma</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitPodcast} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-white">Titolo del Podcast</Label>
                  <Input 
                    id="title" 
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Inserisci il titolo del podcast"
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
                    placeholder="Descrivi il podcast"
                    required
                    className="bg-gray-800 border-gray-700 text-white min-h-[120px]"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="author" className="text-white">Autore</Label>
                  <Input 
                    id="author" 
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    placeholder="Nome dell'autore"
                    required
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-white">Categoria</Label>
                  <select 
                    id="category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full rounded-md border border-gray-700 bg-gray-800 text-white p-2"
                    required
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="image" className="text-white">Immagine di copertina</Label>
                  <div className="flex items-center space-x-2">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => document.getElementById('image')?.click()}
                      className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
                    >
                      <Upload className="mr-2 h-4 w-4" /> Seleziona immagine
                    </Button>
                    <span className="text-sm text-gray-400">
                      {formData.image ? formData.image.name : 'Nessun file selezionato'}
                    </span>
                  </div>
                  <input 
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'image')}
                    className="hidden"
                  />
                </div>

                {/* Preview section for image */}
                {formData.image && (
                  <div className="mt-2">
                    <Label className="text-white">Anteprima immagine</Label>
                    <div className="mt-2">
                      <img 
                        src={URL.createObjectURL(formData.image)} 
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
                onClick={handleSubmitPodcast} 
                className="w-full bg-wurth-red hover:bg-wurth-red/90"
                disabled={loading}
              >
                {loading ? 'Creazione in corso...' : 'Crea Podcast'}
              </Button>
            </CardFooter>
          </Card>
          
          {/* Add New Episode */}
          <Card className="bg-wurth-gray text-white border-gray-700">
            <CardHeader>
              <CardTitle>Aggiungi Episodio</CardTitle>
              <CardDescription className="text-gray-400">Aggiungi un nuovo episodio a un podcast esistente</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitEpisode} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="podcastSelect" className="text-white">Seleziona Podcast</Label>
                  <select 
                    id="podcastSelect"
                    value={selectedPodcastId}
                    onChange={(e) => setSelectedPodcastId(e.target.value)}
                    className="w-full rounded-md border border-gray-700 bg-gray-800 text-white p-2"
                    required
                  >
                    <option value="">-- Seleziona un podcast --</option>
                    {podcasts.map((podcast) => (
                      <option key={podcast.id} value={podcast.id}>
                        {podcast.title}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="episodeTitle" className="text-white">Titolo dell'Episodio</Label>
                  <Input 
                    id="episodeTitle" 
                    name="episodeTitle"
                    value={episodeData.episodeTitle}
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
                    name="episodeDescription"
                    value={episodeData.episodeDescription}
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
                      {episodeData.episodeAudio ? episodeData.episodeAudio.name : 'Nessun file selezionato'}
                    </span>
                  </div>
                  <input 
                    type="file"
                    id="episodeAudio"
                    accept="audio/*"
                    onChange={handleEpisodeFileChange}
                    className="hidden"
                  />
                </div>
                
                {/* Audio Preview Player */}
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
                  <Label htmlFor="episodeDate" className="text-white">Data di pubblicazione</Label>
                  <Input 
                    id="episodeDate" 
                    name="episodeDate"
                    type="date"
                    value={episodeData.episodeDate}
                    onChange={handleEpisodeInputChange}
                    className="bg-gray-800 border-gray-700 text-white"
                    required
                  />
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleSubmitEpisode} 
                className="w-full bg-wurth-red hover:bg-wurth-red/90"
                disabled={loading || !selectedPodcastId || !episodeData.episodeAudio}
              >
                {loading ? 'Caricamento in corso...' : 'Aggiungi Episodio'}
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="mt-8">
          <Card className="bg-wurth-gray text-white border-gray-700">
            <CardHeader>
              <CardTitle>File Caricati</CardTitle>
              <CardDescription className="text-gray-400">Gestisci i file dei podcast caricati</CardDescription>
            </CardHeader>
            <CardContent>
              {uploadedFiles.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {uploadedFiles.map((file) => (
                    <div key={file.id} className="bg-gray-800 p-4 rounded-md flex items-center justify-between">
                      <div className="flex items-center">
                        <FileAudio className="h-8 w-8 mr-3 text-wurth-red" />
                        <div>
                          <h3 className="font-medium">{file.name}</h3>
                          <p className="text-sm text-gray-400">Caricato il {file.date}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {file.type === 'audio' && (
                          <Button 
                            variant="outline" 
                            className="border-gray-700 text-white hover:bg-gray-700"
                            onClick={() => {
                              // Open the audio in a new tab
                              window.open(file.url, '_blank');
                            }}
                          >
                            <Play className="h-4 w-4 mr-2" /> Anteprima
                          </Button>
                        )}
                        <Button 
                          variant="outline" 
                          className="border-gray-700 text-white hover:bg-gray-700"
                          onClick={() => {
                            // Create a download link
                            const link = document.createElement('a');
                            link.href = file.url;
                            link.download = file.name;
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                            
                            toast({
                              title: "Download avviato",
                              description: "Il file verrà scaricato a breve",
                            });
                          }}
                        >
                          Scarica
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  Nessun file caricato. Aggiungi un podcast o un episodio per visualizzare i file caricati.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Admin;
