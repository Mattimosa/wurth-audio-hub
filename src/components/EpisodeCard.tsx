
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Clock, TrendingUp } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Episode, Series } from '../types/podcast';

interface EpisodeCardProps {
  episode: Episode;
  series?: Series;
  showProgress?: boolean;
  progress?: number;
  size?: 'small' | 'medium' | 'large';
}

const EpisodeCard: React.FC<EpisodeCardProps> = ({ 
  episode, 
  series, 
  showProgress = false, 
  progress = 0,
  size = 'medium' 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [transform, setTransform] = useState('');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isHovered) return;
    
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransform('');
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return {
          card: 'h-20',
          image: 'w-16 h-16',
          title: 'text-sm',
          subtitle: 'text-xs'
        };
      case 'large':
        return {
          card: 'h-32',
          image: 'w-24 h-24',
          title: 'text-lg',
          subtitle: 'text-sm'
        };
      default:
        return {
          card: 'h-24',
          image: 'w-20 h-20',
          title: 'text-base',
          subtitle: 'text-sm'
        };
    }
  };

  const sizeClasses = getSizeClasses();
  const seriesData = episode.series as Series || series;

  return (
    <Link to={`/series/${seriesData?.slug}/${episode.id}`}>
      <Card 
        className="bg-wurth-gray border-gray-700 hover:bg-gray-700 transition-all duration-300 cursor-pointer overflow-hidden"
        style={{ transform }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <CardContent className={`p-4 ${sizeClasses.card} flex items-center`}>
          <div className="relative flex-shrink-0">
            <div className={`${sizeClasses.image} relative overflow-hidden rounded-lg`}>
              <img
                src={episode.cover_url || seriesData?.cover_url || '/placeholder.svg'}
                alt={episode.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                style={{ 
                  filter: isHovered ? 'brightness(1.1) contrast(1.1)' : 'brightness(1)',
                  transition: 'filter 0.3s ease'
                }}
              />
              
              {/* Play overlay */}
              <div className={`absolute inset-0 bg-black/60 opacity-0 transition-opacity duration-300 flex items-center justify-center ${isHovered ? 'opacity-100' : ''}`}>
                <Play className="h-6 w-6 text-white" />
              </div>
              
              {/* Progress ring */}
              {showProgress && progress > 0 && (
                <div className="absolute -top-1 -right-1">
                  <svg className="w-6 h-6 transform -rotate-90" viewBox="0 0 24 24">
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="rgba(255,255,255,0.2)"
                      strokeWidth="2"
                      fill="none"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="#E30613"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray={`${progress * 0.628} 62.8`}
                      className="transition-all duration-300"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>
          
          <div className="ml-4 flex-1 min-w-0">
            <h3 className={`font-semibold text-white mb-1 line-clamp-1 ${sizeClasses.title}`}>
              {episode.title}
            </h3>
            <p className={`text-wurth-red mb-1 line-clamp-1 ${sizeClasses.subtitle}`}>
              {seriesData?.title}
            </p>
            <div className={`flex items-center text-gray-400 ${sizeClasses.subtitle}`}>
              <Clock className="h-3 w-3 mr-1" />
              <span>
                {episode.published_at 
                  ? new Date(episode.published_at).toLocaleDateString('it-IT', {
                      day: '2-digit',
                      month: 'short'
                    })
                  : 'Recente'}
              </span>
              {episode.duration && (
                <span className="ml-3">
                  {Math.floor(episode.duration / 60)}:{(episode.duration % 60).toString().padStart(2, '0')}
                </span>
              )}
              {showProgress && progress > 0 && (
                <span className="ml-2 text-wurth-red">
                  {Math.round(progress)}%
                </span>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {isHovered && (
              <div className="animate-fadeIn">
                <TrendingUp className="h-4 w-4 text-wurth-red" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default EpisodeCard;
