
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { TrendingUp, Users, Play, Filter, Grid, List, UserCheck } from 'lucide-react';
import Header from '@/components/Header';
import InterviewCard from '@/components/InterviewCard';
import InterviewForm from '@/components/InterviewForm';
import InterviewQuestions from '@/components/InterviewQuestions';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Interview {
  id: string;
  title: string;
  expert: string;
  role: string;
  company: string;
  duration: string;
  category: string;
  description: string;
  date: string;
  likes: number;
  image_url?: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

const Index = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, loading: authLoading, isMasterAdmin, isAuthenticated, isGuest } = useAuth();
  const { toast } = useToast();

  // Fetch interviews from database
  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      const { data, error } = await supabase
        .from('interviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setInterviews(data || []);
    } catch (error) {
      console.error('Error fetching interviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteInterview = async (id: string) => {
    if (!isMasterAdmin) {
      toast({
        title: "Access Denied",
        description: "Only the master administrator can delete interviews.",
        variant: "destructive"
      });
      return;
    }

    if (window.confirm('Are you sure you want to delete this interview? This action cannot be undone.')) {
      try {
        const { error } = await supabase
          .from('interviews')
          .delete()
          .eq('id', id);

        if (error) throw error;

        toast({
          title: "Interview Deleted",
          description: "The interview has been successfully deleted.",
        });

        // Refresh the interviews list
        fetchInterviews();
      } catch (error) {
        console.error('Error deleting interview:', error);
        toast({
          title: "Delete Failed",
          description: "Failed to delete the interview. Please try again.",
          variant: "destructive"
        });
      }
    }
  };

  const handleEditInterview = (id: string) => {
    if (!isMasterAdmin) {
      toast({
        title: "Access Denied",
        description: "Only the master administrator can edit interviews.",
        variant: "destructive"
      });
      return;
    }
    
    // TODO: Implement edit functionality
    // This could open a modal with the interview form pre-populated
    toast({
      title: "Edit Feature",
      description: "Edit functionality will be implemented soon.",
    });
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


  const categories = [
    "All Categories",
    "Deep Learning Implementation",
    "Graph ML Implementation", 
    "Quantum Computing",
    "Generative Models",
    "NLP Implementation",
    "Reinforcement Learning"
  ];

  const stats = [
    { label: "Total Interviews", value: "1,247", icon: Play },
    { label: "Expert Contributors", value: "342", icon: Users },
    { label: "Growing Monthly", value: "+28%", icon: TrendingUp }
  ];

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
            <div className="floating-particle" style={{ top: '60%', right: '30%' }}></div>
            <div className="floating-particle" style={{ bottom: '40%', right: '10%' }}></div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 glow-text bg-gradient-to-r from-white via-accent to-primary bg-clip-text text-transparent tracking-tight">
              Expert Profiles
              <br />
              <span className="text-3xl sm:text-4xl md:text-6xl">In Quantitative Fields</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-foreground/80 mb-8 max-w-3xl mx-auto leading-relaxed px-4">
              Learn from industry professionals in quantitative trading, machine learning, deep learning research, and cutting-edge AI implementations.
            </p>
            
            {isGuest && (
              <div className="glass-card bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 px-6 py-3 rounded-lg text-sm mb-8 max-w-lg mx-auto flex items-center justify-center">
                <UserCheck className="w-4 h-4 mr-2 flex-shrink-0" />
                <span>You're browsing as a guest. Sign in to unlock all features.</span>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              {isMasterAdmin && (
                <Button 
                  onClick={() => setIsFormOpen(true)}
                  className="glass-card bg-primary/20 hover:bg-primary/30 border border-primary/30 text-primary px-8 py-4 text-lg morphic-hover pulse-glow"
                >
                  Add Interview
                </Button>
              )}
              <Button 
                variant="outline" 
                className="glass-card border-white/20 hover:bg-white/5 px-8 py-4 text-lg morphic-hover"
              >
                Explore Collection
              </Button>
            </div>

            {/* Stats
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="glass-card p-6 morphic-hover gradient-border">
                  <div className="flex items-center justify-center mb-3">
                    <div className="w-12 h-12 glass-card rounded-xl flex items-center justify-center pulse-glow">
                      <stat.icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div className="text-2xl md:text-3xl font-bold glow-text mb-2">{stat.value}</div>
                  <div className="text-foreground/70">{stat.label}</div>
                </div>
              ))}
            </div> */}



          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="px-4 sm:px-6 mb-8">
        <div className="container mx-auto">
          <div className="glass-card p-4 sm:p-6 rounded-2xl">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                {categories.map((category, index) => (
                  <Button
                    key={index}
                    variant={index === 0 ? "default" : "outline"}
                    size="sm"
                    className="text-xs sm:text-sm"
                  >
                    {category}
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

      {/* Interviews Grid */}
      <section className="px-6 pb-16">
        <div className="container mx-auto">
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3' 
              : 'grid-cols-1 max-w-4xl mx-auto'
          }`}>
            {interviews.map((interview) => (
              <InterviewCard 
                key={interview.id} 
                {...interview} 
                onEdit={handleEditInterview}
                onDelete={handleDeleteInterview}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Professional Interviews Section */}
      <section id="interviews" className="px-6 pb-16">
        <div className="container mx-auto">
          <InterviewQuestions />
        </div>
      </section>

      {/* Interview Form Modal */}
      <InterviewForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)}
        onSuccess={() => {
          setIsFormOpen(false);
          fetchInterviews();
        }}
      />
    </div>
  );
};

export default Index;
