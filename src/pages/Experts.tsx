import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { Users, Star, MapPin, Building, Calendar, Filter, Grid, List, UserCheck, Plus } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

interface Expert {
  id: string;
  name: string;
  title: string;
  company: string;
  location?: string;
  bio: string;
  expertise: string[];
  rating: number;
  interviews_count: number;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

const Experts = () => {
  const [experts, setExperts] = useState<Expert[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedExpertise, setSelectedExpertise] = useState('All Expertise');
  const { user, loading: authLoading, isAuthenticated, isGuest, isMasterAdmin } = useAuth();

  useEffect(() => {
    fetchExperts();
  }, []);

  const fetchExperts = async () => {
    try {
      // TODO: Fetch from database when experts table is created
      // For now, we'll use an empty array until real experts are added
      setExperts([]);
    } catch (error) {
      console.error('Error fetching experts:', error);
    } finally {
      setLoading(false);
    }
  };

  // Redirect to auth if not logged in and not in guest mode
  if (!authLoading && !isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const expertiseAreas = [
    "All Expertise",
    "Quantitative Trading",
    "Deep Learning",
    "Machine Learning",
    "Quantum Computing",
    "Generative Models",
    "Computer Vision",
    "NLP",
    "Reinforcement Learning",
    "AI Safety"
  ];

  // Filter experts based on selected expertise
  const filteredExperts = experts.filter(expert => {
    if (selectedExpertise === 'All Expertise') return true;
    return expert.expertise.includes(selectedExpertise);
  });

  return (
    <div className="min-h-screen bg-background relative">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="container mx-auto text-center">
          <div className="relative">
            {/* Floating particles */}
            <div className="floating-particle" style={{ top: '10%', left: '20%' }}></div>
            <div className="floating-particle" style={{ top: '30%', right: '15%' }}></div>
            <div className="floating-particle" style={{ bottom: '20%', left: '10%' }}></div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 glow-text bg-gradient-to-r from-white via-accent to-primary bg-clip-text text-transparent tracking-tight">
              Expert Profiles
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-foreground/80 mb-8 max-w-3xl mx-auto leading-relaxed px-4">
              Whether you're implementing the latest DeepMind paper, building trading algorithms, or developing quantitative research models, we have interviewed industry professionals who provide insights that make complex concepts accessible and actionable.
            </p>
            
            {isGuest && (
              <div className="glass-card bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 px-6 py-3 rounded-lg text-sm mb-8 max-w-lg mx-auto flex items-center justify-center">
                <UserCheck className="w-4 h-4 mr-2 flex-shrink-0" />
                <span>You're browsing as a guest. Sign in to unlock all features.</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="px-4 sm:px-6 mb-8">
        <div className="container mx-auto">
          <div className="glass-card p-4 sm:p-6 rounded-2xl">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                {expertiseAreas.map((area, index) => (
                  <Button
                    key={index}
                    variant={area === selectedExpertise ? "default" : "outline"}
                    size="sm"
                    className="text-xs sm:text-sm"
                    onClick={() => setSelectedExpertise(area)}
                  >
                    {area}
                  </Button>
                ))}
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
                <div className="flex items-center glass-card rounded-lg p-1">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experts Grid */}
      <section className="px-6 pb-16">
        <div className="container mx-auto">
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3' 
              : 'grid-cols-1 max-w-4xl mx-auto'
          }`}>
            {filteredExperts.length > 0 ? (
              filteredExperts.map((expert) => (
                <div key={expert.id} className="glass-card p-6 morphic-hover group cursor-pointer gradient-border">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 glass-card rounded-xl flex items-center justify-center overflow-hidden">
                      {expert.image_url ? (
                        <img src={expert.image_url} alt={expert.name} className="w-full h-full object-cover" />
                      ) : (
                        <Users className="w-8 h-8 text-primary" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-xl text-foreground group-hover:text-primary transition-colors">
                        {expert.name}
                      </h3>
                      <p className="text-sm text-foreground/70">{expert.title}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Building className="w-3 h-3 text-foreground/50" />
                        <span className="text-xs text-foreground/60">{expert.company}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-foreground/80 mb-4 line-clamp-3 leading-relaxed">
                    {expert.bio}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {expert.expertise.slice(0, 3).map((skill, index) => (
                      <span key={index} className="glass-card px-2 py-1 rounded-full text-xs text-accent">
                        {skill}
                      </span>
                    ))}
                    {expert.expertise.length > 3 && (
                      <span className="glass-card px-2 py-1 rounded-full text-xs text-foreground/50">
                        +{expert.expertise.length - 3} more
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-foreground/60">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span>{expert.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{expert.interviews_count} interviews</span>
                      </div>
                    </div>
                    
                    <Button className="glass-card bg-primary/20 hover:bg-primary/30 border border-primary/30 text-primary morphic-hover">
                      View Profile
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full">
                <div className="text-center py-20">
                  <div className="w-20 h-20 glass-card rounded-xl flex items-center justify-center mx-auto mb-6 pulse-glow">
                    <Users className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground/70 mb-4">No Experts Yet</h3>
                  <p className="text-foreground/50 mb-8 max-w-md mx-auto leading-relaxed">
                    {filteredExperts.length === 0 && experts.length > 0 
                      ? `No experts found with "${selectedExpertise}" expertise. Try selecting a different expertise area.`
                      : 'Expert profiles will appear here once interviews are conducted and published.'
                    }
                  </p>
                  {isMasterAdmin && (
                    <Link to="/">
                      <Button
                        className="glass-card bg-primary/20 hover:bg-primary/30 border border-primary/30 text-primary morphic-hover px-8 py-3"
                      >
                        <Plus className="w-5 h-5 mr-2" />
                        Add Expert Profile
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Experts;
