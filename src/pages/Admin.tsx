
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
import { Upload, FileAudio, Folder } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("Digitale");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    author: "",
    image: null,
    audio: null,
  });
  const [loading, setLoading] = useState(false);
  const [episodeData, setEpisodeData] = useState({
    episodeTitle: "",
    episodeDescription: "",
    episodeAudio: null,
  });
  
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: 'image' | 'audio') => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, [fileType]: e.target.files![0] }));
      
      // Show a toast notification for file selection
      toast({
        title: "File selezionato",
        description: `Hai selezionato: ${e.target.files[0].name}`,
      });
    }
  };

  const handleEpisodeFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setEpisodeData(prev => ({ ...prev, episodeAudio: e.target.files![0] }));
      
      toast({
        title: "Audio episodio selezionato",
        description: `Hai selezionato: ${e.target.files[0].name}`,
      });
    }
  };

  const handleEpisodeInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEpisodeData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitPodcast = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // This is a mock implementation that would connect to a backend
    // In a real application, we would upload files and save data to a database
    setTimeout(() => {
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
        audio: null,
      });
      navigate("/digital");
    }, 1500);
  };

  const handleSubmitEpisode = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Mock implementation
    setTimeout(() => {
      toast({
        title: "Episodio aggiunto con successo",
        description: "Il nuovo episodio è stato aggiunto al podcast",
      });
      setLoading(false);
      setEpisodeData({
        episodeTitle: "",
        episodeDescription: "",
        episodeAudio: null,
      });
    }, 1500);
  };

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
                    className="w-full rounded-md border border-gray-700 bg-gray-800 text-white p-2"
                    required
                  >
                    <option value="1">Innovazioni nel settore delle costruzioni</option>
                    <option value="2">Automotive Solutions</option>
                    <option value="3">Industria 4.0</option>
                    <option value="d1">Innovazione Digitale Würth</option>
                    <option value="d2">App e Servizi Würth</option>
                    <option value="d3">E-Commerce e Soluzioni Online</option>
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
                
                <div className="space-y-2">
                  <Label htmlFor="episodeDate" className="text-white">Data di pubblicazione</Label>
                  <Input 
                    id="episodeDate" 
                    type="date"
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
                disabled={loading}
              >
                {loading ? 'Caricamento in corso...' : 'Aggiungi Episodio'}
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="mt-8">
          <Card className="bg-wurth-gray text-white border-gray-700">
            <CardHeader>
              <CardTitle>Gestione File</CardTitle>
              <CardDescription className="text-gray-400">Gestisci i file dei podcast caricati</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-gray-800 p-4 rounded-md flex items-center justify-between">
                  <div className="flex items-center">
                    <FileAudio className="h-8 w-8 mr-3 text-wurth-red" />
                    <div>
                      <h3 className="font-medium">Episodio_1_Digitale.mp3</h3>
                      <p className="text-sm text-gray-400">12.4 MB • Caricato il 18/05/2025</p>
                    </div>
                  </div>
                  <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-700">
                    Scarica
                  </Button>
                </div>
                
                <div className="bg-gray-800 p-4 rounded-md flex items-center justify-between">
                  <div className="flex items-center">
                    <FileAudio className="h-8 w-8 mr-3 text-wurth-red" />
                    <div>
                      <h3 className="font-medium">Episodio_2_Digitale.mp3</h3>
                      <p className="text-sm text-gray-400">9.8 MB • Caricato il 20/05/2025</p>
                    </div>
                  </div>
                  <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-700">
                    Scarica
                  </Button>
                </div>
                
                <div className="bg-gray-800 p-4 rounded-md flex items-center justify-between">
                  <div className="flex items-center">
                    <FileAudio className="h-8 w-8 mr-3 text-wurth-red" />
                    <div>
                      <h3 className="font-medium">Innovazione_Episodio_1.mp3</h3>
                      <p className="text-sm text-gray-400">15.2 MB • Caricato il 15/05/2025</p>
                    </div>
                  </div>
                  <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-700">
                    Scarica
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Admin;
