
import React from 'react';
import { Clock, User, Tag, ArrowUpRight, Heart, Share2, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

interface InterviewCardProps {
  id?: string;
  title: string;
  expert: string;
  role: string;
  company: string;
  duration: string;
  category: string;
  description: string;
  image_url?: string;
  date: string;
  likes?: number;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const InterviewCard: React.FC<InterviewCardProps> = ({
  id,
  title,
  expert,
  role,
  company,
  duration,
  category,
  description,
  image_url,
  date,
  likes = 0,
  onEdit,
  onDelete
}) => {
  const { isMasterAdmin } = useAuth();
  return (
    <div className="glass-card p-6 morphic-hover group cursor-pointer gradient-border">
      <div className="relative">
        {/* Floating particles */}
        <div className="floating-particle" style={{ top: '10%', left: '20%' }}></div>
        <div className="floating-particle" style={{ top: '30%', right: '15%' }}></div>
        <div className="floating-particle" style={{ bottom: '20%', left: '10%' }}></div>
        
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 glass-card rounded-xl flex items-center justify-center overflow-hidden">
              {image_url ? (
                <img src={image_url} alt={expert} className="w-full h-full object-cover" />
              ) : (
                <User className="w-6 h-6 text-primary" />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                {expert}
              </h3>
              <p className="text-sm text-foreground/70">{role} at {company}</p>
            </div>
          </div>
          <div className="glass-card px-3 py-1 rounded-full">
            <span className="text-xs font-medium text-accent">{category}</span>
          </div>
          
          {/* Admin Controls */}
          {isMasterAdmin && id && (
            <div className="flex items-center space-x-1 ml-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit?.(id);
                }}
                className="glass-card p-2 hover:bg-blue-500/20 hover:border-blue-500/30"
              >
                <Edit className="w-3 h-3 text-blue-400" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete?.(id);
                }}
                className="glass-card p-2 hover:bg-red-500/20 hover:border-red-500/30"
              >
                <Trash2 className="w-3 h-3 text-red-400" />
              </Button>
            </div>
          )}
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold mb-3 text-foreground group-hover:glow-text transition-all duration-300">
          {title}
        </h2>

        {/* Description */}
        <p className="text-foreground/80 mb-4 line-clamp-3 leading-relaxed">
          {description}
        </p>

        {/* Meta Info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-sm text-foreground/60">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Tag className="w-4 h-4" />
              <span>{date}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="glass-card morphic-hover p-2">
              <Heart className="w-4 h-4 mr-1" />
              <span className="text-xs">{likes}</span>
            </Button>
            <Button variant="ghost" size="sm" className="glass-card morphic-hover p-2">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
          
          <Button className="glass-card bg-primary/20 hover:bg-primary/30 border border-primary/30 text-primary morphic-hover group-hover:scale-105 transition-all">
            <span className="mr-2">Watch</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;
