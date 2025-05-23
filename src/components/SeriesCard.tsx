
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Headphones, TrendingUp } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Series } from '../types/podcast';

interface SeriesCardProps {
  series: Series;
  size?: 'small' | 'medium' | 'large';
  showStats?: boolean;
}

const SeriesCard: React.FC<SeriesCardProps> = ({ 
  series, 
  size = 'medium',
  showStats = false 
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
    
    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;
    
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
          container: 'w-40',
          image: 'w-40 h-40',
          title: 'text-sm',
          description: 'text-xs'
        };
      case 'large':
        return {
          container: 'w-72',
          image: 'w-72 h-72',
          title: 'text-lg',
          description: 'text-sm'
        };
      default:
        return {
          container: 'w-56',
          image: 'w-56 h-56',
          title: 'text-base',
          description: 'text-sm'
        };
    }
  };

  const sizeClasses = getSizeClasses();

  return (
    <Link to={`/series/${series.slug}`}>
      <Card 
        className={`${sizeClasses.container} bg-wurth-gray border-gray-700 hover:bg-gray-700 transition-all duration-300 cursor-pointer overflow-hidden`}
        style={{ transform }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <CardContent className="p-4">
          <div className="relative mb-4 group">
            <div className={`${sizeClasses.image} relative overflow-hidden rounded-lg shadow-lg`}>
              <img
                src={series.cover_url || '/placeholder.svg'}
                alt={series.title}
                className="w-full h-full object-cover transition-all duration-300"
                style={{ 
                  filter: isHovered ? 'brightness(1.1) contrast(1.1)' : 'brightness(1)',
                  transform: isHovered ? 'scale(1.1)' : 'scale(1)'
                }}
              />
              
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 ${isHovered ? 'opacity-100' : ''}`} />
              
              {/* Play button */}
              <div className={`absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 ${isHovered ? 'opacity-100' : ''}`}>
                <div className="bg-wurth-red rounded-full p-3 shadow-lg transform transition-transform duration-300 hover:scale-110">
                  <Play className="h-6 w-6 text-white" />
                </div>
              </div>
              
              {/* Stats overlay */}
              {showStats && (
                <div className={`absolute top-2 right-2 opacity-0 transition-opacity duration-300 ${isHovered ? 'opacity-100' : ''}`}>
                  <div className="bg-black/70 rounded-full px-2 py-1 flex items-center">
                    <TrendingUp className="h-3 w-3 text-wurth-red mr-1" />
                    <span className="text-white text-xs">Hot</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div>
            <h3 className={`font-bold text-white mb-2 line-clamp-2 ${sizeClasses.title}`}>
              {series.title}
            </h3>
            <p className={`text-gray-400 line-clamp-2 ${sizeClasses.description}`}>
              {series.description}
            </p>
            
            {showStats && (
              <div className="flex items-center mt-3 text-xs text-gray-500">
                <Headphones className="h-3 w-3 mr-1" />
                <span>Serie podcast</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default SeriesCard;
