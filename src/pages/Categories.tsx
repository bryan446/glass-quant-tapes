import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Tag, TrendingUp, Users, Play, Brain, Code, Database, Calculator, Lock, UserCheck } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

interface Category {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  interview_count: number;
  expert_count: number;
  difficulty_level: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
}

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const { user, loading: authLoading, isAuthenticated, isGuest } = useAuth();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      // Mock data for categories
      const mockCategories: Category[] = [
        {
          id: '1',
          name: 'Machine Learning Profiles',
          description: 'Profiles of ML engineers, researchers, and practitioners working on neural networks, computer vision, NLP, and cutting-edge AI systems.',
          icon: Brain,
          color: 'from-blue-500 to-purple-600',
          interview_count: 0,
          expert_count: 0,
          difficulty_level: 'Advanced',
          tags: ['Deep Learning', 'Computer Vision', 'NLP', 'Research']
        },
        {
          id: '2',
          name: 'Quantitative Finance Profiles',
          description: 'Profiles of quants, algorithmic traders, risk managers, and financial engineers from top banks and hedge funds.',
          icon: TrendingUp,
          color: 'from-emerald-500 to-green-600',
          interview_count: 0,
          expert_count: 0,
          difficulty_level: 'Advanced',
          tags: ['Algorithmic Trading', 'Risk Management', 'Derivatives', 'Quant Research']
        },
        {
          id: '3',
          name: 'Research Paper Discussions',
          description: 'Community-driven discussions about groundbreaking research papers in ML, finance, and quantitative sciences. Share and discover impactful papers.',
          icon: Database,
          color: 'from-orange-500 to-red-600',
          interview_count: 0,
          expert_count: 0,
          difficulty_level: 'Intermediate',
          tags: ['Research Papers', 'Community', 'Discussions', 'Academia']
        },
        {
          id: '4',
          name: 'Quantitative Research Profiles',
          description: 'Profiles of academic and industry researchers specializing in statistical modeling, econometrics, and quantitative methodologies.',
          icon: Calculator,
          color: 'from-indigo-500 to-blue-600',
          interview_count: 0,
          expert_count: 0,
          difficulty_level: 'Advanced',
          tags: ['Statistics', 'Econometrics', 'Research Methods', 'Data Science']
        },
        {
          id: '5',
          name: 'FinTech & Innovation Profiles',
          description: 'Profiles of fintech entrepreneurs, blockchain developers, and financial technology innovators disrupting traditional finance.',
          icon: Code,
          color: 'from-cyan-500 to-teal-600',
          interview_count: 0,
          expert_count: 0,
          difficulty_level: 'Intermediate',
          tags: ['FinTech', 'Blockchain', 'DeFi', 'Financial Innovation']
        },
        {
          id: '6',
          name: 'Quantitative Biology Profiles',
          description: 'Profiles of computational biologists, bioinformaticians, and researchers applying quantitative methods to biological systems.',
          icon: Brain,
          color: 'from-pink-500 to-rose-600',
          interview_count: 0,
          expert_count: 0,
          difficulty_level: 'Intermediate',
          tags: ['Bioinformatics', 'Computational Biology', 'Genomics', 'Systems Biology']
        }
      ];
      
      setCategories(mockCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
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

  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredCategories = categories.filter(category => {
    return selectedDifficulty === 'All' || category.difficulty_level === selectedDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-400 border-green-400/30 bg-green-400/10';
      case 'Intermediate': return 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10';
      case 'Advanced': return 'text-red-400 border-red-400/30 bg-red-400/10';
      default: return 'text-foreground border-border';
    }
  };

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
              Research Categories
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-foreground/80 mb-8 max-w-3xl mx-auto leading-relaxed px-4">
              Explore different areas of quantitative research and technology. Each category features expert profiles with professionals in specific domains.
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
                <span className="text-sm font-medium text-foreground/70 mr-2">Difficulty:</span>
                {difficulties.map((difficulty) => (
                  <Button
                    key={difficulty}
                    variant={difficulty === selectedDifficulty ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedDifficulty(difficulty)}
                    className="text-xs sm:text-sm"
                  >
                    {difficulty}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="px-6 pb-16">
        <div className="container mx-auto">
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {filteredCategories.map((category) => (
              <div key={category.id} className="glass-card p-6 morphic-hover group cursor-pointer gradient-border">
                <div className="relative">
                  {/* Category Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-16 h-16 glass-card rounded-xl flex items-center justify-center pulse-glow bg-gradient-to-r ${category.color}`}>
                      <category.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className={`glass-card px-3 py-1 rounded-full border ${getDifficultyColor(category.difficulty_level)}`}>
                      <span className="text-xs font-medium">{category.difficulty_level}</span>
                    </div>
                  </div>

                  {/* Category Title */}
                  <h3 className="text-xl font-bold mb-3 text-foreground group-hover:glow-text transition-all duration-300">
                    {category.name}
                  </h3>

                  {/* Description */}
                  <p className="text-foreground/80 mb-4 line-clamp-3 leading-relaxed">
                    {category.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {category.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="glass-card px-2 py-1 rounded-full text-xs text-accent">
                        {tag}
                      </span>
                    ))}
                    {category.tags.length > 3 && (
                      <span className="glass-card px-2 py-1 rounded-full text-xs text-foreground/50">
                        +{category.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-sm text-foreground/60">
                      <div className="flex items-center space-x-1">
                        <Play className="w-4 h-4" />
                        <span>Coming Soon</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>Interviews</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button className="w-full glass-card bg-primary/20 hover:bg-primary/30 border border-primary/30 text-primary morphic-hover group-hover:scale-105 transition-all">
                    Explore Category
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Categories;
