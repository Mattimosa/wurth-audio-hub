
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Repeat, Shuffle, Heart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface AudioPlayerProps {
  audioUrl: string;
  title: string;
  seriesTitle?: string;
  coverUrl?: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  audioUrl,
  title,
  seriesTitle,
  coverUrl = '/placeholder.svg',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioUrl && audioRef.current) {
      audioRef.current.src = audioUrl;
      audioRef.current.load();
    }
  }, [audioUrl]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play()
          .catch(error => {
            console.error('Error playing audio:', error);
          });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const total = audioRef.current.duration;
      setCurrentTime(current);
      setProgress((current / total) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    if (isRepeat) {
      audioRef.current?.play();
    } else {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const skipSeconds = (seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime += seconds;
    }
  };

  const changePlaybackRate = () => {
    const rates = [1, 1.25, 1.5, 1.75, 2];
    const nextRate = rates[(rates.indexOf(playbackRate) + 1) % rates.length];
    setPlaybackRate(nextRate);
    if (audioRef.current) {
      audioRef.current.playbackRate = nextRate;
    }
  };

  const handleProgressChange = (value: number[]) => {
    if (audioRef.current) {
      const newTime = (value[0] / 100) * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
      setProgress(value[0]);
      setCurrentTime(newTime);
    }
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="bg-gradient-to-r from-wurth-gray to-gray-800 border-t border-gray-700 fixed bottom-0 left-0 right-0 p-4 z-50 backdrop-blur-lg">
      <div className="container mx-auto flex items-center justify-between">
        {/* Track info */}
        <div className="flex items-center space-x-4 flex-1 min-w-0">
          <div className="flex-shrink-0">
            <img
              src={coverUrl}
              alt={title}
              className="w-14 h-14 object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="min-w-0">
            <h4 className="font-semibold text-white text-sm truncate">{title}</h4>
            {seriesTitle && (
              <p className="text-gray-400 text-xs truncate">{seriesTitle}</p>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-wurth-red transition-colors"
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-wurth-red text-wurth-red' : ''}`} />
          </Button>
        </div>

        {/* Player controls */}
        <div className="flex-1 mx-8 max-w-2xl">
          <div className="flex flex-col space-y-3">
            {/* Control buttons */}
            <div className="flex items-center justify-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className={`text-gray-400 hover:text-white transition-colors ${isShuffle ? 'text-wurth-red' : ''}`}
                onClick={() => setIsShuffle(!isShuffle)}
              >
                <Shuffle size={16} />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-gray-300 transition-colors"
                onClick={() => skipSeconds(-15)}
              >
                <SkipBack size={20} />
                <span className="absolute text-xs font-bold mt-1">15</span>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="bg-wurth-red hover:bg-red-600 text-white rounded-full p-3 transition-all hover:scale-105"
                onClick={togglePlayPause}
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-gray-300 transition-colors"
                onClick={() => skipSeconds(15)}
              >
                <SkipForward size={20} />
                <span className="absolute text-xs font-bold mt-1">15</span>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className={`text-gray-400 hover:text-white transition-colors ${isRepeat ? 'text-wurth-red' : ''}`}
                onClick={() => setIsRepeat(!isRepeat)}
              >
                <Repeat size={16} />
              </Button>
            </div>

            {/* Progress bar */}
            <div className="flex items-center space-x-3">
              <span className="text-xs text-gray-400 w-10 text-right">
                {formatTime(currentTime)}
              </span>
              
              <div className="flex-1">
                <Slider
                  value={[progress]}
                  min={0}
                  max={100}
                  step={0.1}
                  onValueChange={handleProgressChange}
                  className="cursor-pointer [&_[role=slider]]:bg-wurth-red [&_[role=slider]]:border-wurth-red"
                />
              </div>
              
              <span className="text-xs text-gray-400 w-10">
                {formatTime(duration)}
              </span>
            </div>
          </div>
        </div>

        {/* Volume and extras */}
        <div className="flex items-center space-x-4 flex-1 justify-end">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white px-3 py-1 text-xs font-medium border border-gray-600 hover:border-gray-500"
            onClick={changePlaybackRate}
          >
            {playbackRate}×
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-white transition-colors"
            onClick={toggleMute}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </Button>
          
          <div className="w-24">
            <Slider
              value={[isMuted ? 0 : volume]}
              min={0}
              max={1}
              step={0.01}
              onValueChange={handleVolumeChange}
              className="cursor-pointer [&_[role=slider]]:bg-gray-400 [&_[role=slider]]:border-gray-400"
            />
          </div>
        </div>
      </div>

      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        className="hidden"
      />
    </div>
  );
};

export default AudioPlayer;
