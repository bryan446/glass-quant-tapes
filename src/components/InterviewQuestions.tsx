import React, { useState, useEffect } from 'react';
import { Users, MapPin, Calendar, Clock, Play, BookOpen, Star, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

interface ProfessionalInterview {
  id: string;
  title: string;
  expert: string;
  role: string;
  company: string;
  location?: string;
  category: string;
  duration: string;
  date: string;
  description: string;
  topics?: string[];
  rating?: number;
  views?: number;
  image_url?: string;
  created_at: string;
}

const InterviewQuestions = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [interviews, setInterviews] = useState<ProfessionalInterview[]>([]);
  const [loading, setLoading] = useState(true);
  const { isMasterAdmin } = useAuth();

  // Fetch professional interviews from database
  useEffect(() => {
    fetchProfessionalInterviews();
  }, []);

  const fetchProfessionalInterviews = async () => {
    try {
      const { data, error } = await supabase
        .from('interviews')
        .select('*')
        .eq('interview_type', 'professional')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setInterviews(data || []);
    } catch (error) {
      console.error('Error fetching professional interviews:', error);
    } finally {
      setLoading(false);
    }
  };

  // Get dynamic categories from the interviews
  const categories = ['All', ...Array.from(new Set(interviews.map(i => i.category)))];
  
  // Get dynamic locations from the interviews (extract country/state)
  const locations = ['All', ...Array.from(new Set(
    interviews
      .map(i => i.location)
      .filter(Boolean)
      .map(location => location!.split(', ').pop() || location)
  ))];

  const filteredInterviews = interviews.filter(interview => {
    const categoryMatch = selectedCategory === 'All' || interview.category === selectedCategory;
    const locationMatch = selectedLocation === 'All' || 
      (interview.location && interview.location.includes(selectedLocation));
    return categoryMatch && locationMatch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-4 mb-4">
          <h2 className="text-4xl font-bold glow-text bg-gradient-to-r from-white via-accent to-primary bg-clip-text text-transparent">
            Professional Interviews
          </h2>
          {isMasterAdmin && (
            <Button
              className="glass-card bg-primary/20 hover:bg-primary/30 border border-primary/30 text-primary morphic-hover"
              onClick={() => {
                // TODO: Implement add interview functionality
                alert('Add Interview feature will be implemented soon!');
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Interview
            </Button>
          )}
        </div>
        <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
          Discover insights from experts in quantitative trading, machine learning, deep learning research, quantum computing, generative AI, and advanced computational finance.
        </p>
      </div>

      {/* Filters */}
      <div className="glass-card p-6 rounded-2xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-foreground/70 mr-2">Category:</span>
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === selectedCategory ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={`glass-card morphic-hover ${
                  category === selectedCategory 
                    ? "bg-primary/20 border-primary/30 text-primary" 
                    : "border-white/10 hover:bg-white/5"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground/70 mr-2">Location:</span>
            {locations.map((location) => (
              <Button
                key={location}
                variant={location === selectedLocation ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedLocation(location)}
                className={`glass-card morphic-hover ${
                  location === selectedLocation 
                    ? "bg-primary/20 border-primary/30 text-primary" 
                    : "border-white/10 hover:bg-white/5"
                }`}
              >
                {location}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Interviews Grid */}
      <div className="grid gap-6">
        {filteredInterviews.map((interview) => (
          <Card key={interview.id} className="glass-card p-6 morphic-hover gradient-border">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 glass-card rounded-xl flex items-center justify-center pulse-glow bg-gradient-to-br from-primary/20 to-accent/20">
                <Users className="w-8 h-8 text-primary" />
              </div>
              
              <div className="flex-1 space-y-4">
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-foreground">{interview.expert}</h3>
                    <p className="text-lg font-medium text-accent">{interview.role}</p>
                    <p className="text-foreground/80">{interview.company}</p>
                    <div className="flex items-center gap-4 text-sm text-foreground/60">
                      {interview.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{interview.location}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(interview.created_at).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{interview.duration}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-2">
                      {interview.rating && (
                        <>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{interview.rating}</span>
                          </div>
                          <span className="text-sm text-foreground/60">•</span>
                        </>
                      )}
                      {interview.views && (
                        <span className="text-sm text-foreground/60">{interview.views.toLocaleString()} views</span>
                      )}
                    </div>
                    <span className="glass-card px-3 py-1 rounded-full text-xs font-medium text-accent border border-accent/20">
                      {interview.category}
                    </span>
                  </div>
                </div>
                
                <p className="text-foreground/80 leading-relaxed">
                  {interview.description}
                </p>
                
                {interview.topics && interview.topics.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {interview.topics.map((topic, index) => (
                      <span 
                        key={index}
                        className="glass-card px-3 py-1 rounded-md text-xs text-foreground/70 border border-white/5"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                )}
                
                <div className="flex items-center justify-between pt-4">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="glass-card morphic-hover text-primary hover:bg-primary/10"
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    View Transcript
                  </Button>
                  
                  <Button className="glass-card bg-primary/20 hover:bg-primary/30 border border-primary/30 text-primary morphic-hover">
                    <Play className="w-4 h-4 mr-2" />
                    Watch Interview
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
        
        {filteredInterviews.length === 0 && !loading && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-foreground/30 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground/70 mb-2">No Professional Interviews Found</h3>
            <p className="text-foreground/50 mb-6">
              {selectedCategory !== 'All' || selectedLocation !== 'All' 
                ? 'Try adjusting your filters to see more interviews.' 
                : 'Professional interviews will appear here once they are added.'}
            </p>
            {isMasterAdmin && (
              <Button
                className="glass-card bg-primary/20 hover:bg-primary/30 border border-primary/30 text-primary morphic-hover"
                onClick={() => {
                  alert('Use the "Add Interview" button and select "Professional Interview" type to add interviews here.');
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Professional Interview
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewQuestions;