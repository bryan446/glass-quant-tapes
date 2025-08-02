
import React, { useState } from 'react';
import { TrendingUp, Users, Play, Filter, Grid, List } from 'lucide-react';
import Header from '@/components/Header';
import InterviewCard from '@/components/InterviewCard';
import InterviewForm from '@/components/InterviewForm';
import InterviewQuestions from '@/components/InterviewQuestions';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Research papers to code interviews
  const interviews = [
    {
      id: 1,
      title: "From Transformer Papers to Production: Implementing Attention Mechanisms",
      expert: "Dr. Sarah Chen",
      role: "ML Research Engineer",
      company: "Google DeepMind",
      duration: "52 min",
      category: "Deep Learning Implementation",
      description: "Breaking down the original Transformer paper and walking through a complete implementation from scratch. Learn how to translate research concepts into efficient, production-ready code.",
      date: "2 days ago",
      likes: 234,
      image: "/placeholder.svg"
    },
    {
      id: 2,
      title: "Implementing Graph Neural Networks: From GCN Paper to Code",
      expert: "Alex Rodriguez",
      role: "Research Scientist",
      company: "Facebook AI",
      duration: "38 min",
      category: "Graph ML Implementation",
      description: "Step-by-step implementation of Graph Convolutional Networks based on Kipf & Welling's seminal paper. Includes PyTorch code walkthrough and optimization techniques.",
      date: "1 week ago",
      likes: 156,
      image: "/placeholder.svg"
    },
    {
      id: 3,
      title: "Quantum Algorithm Implementation: Shor's Algorithm in Practice",
      expert: "Prof. Michael Thompson",
      role: "Quantum Computing Researcher",
      company: "IBM Quantum",
      duration: "44 min",
      category: "Quantum Computing",
      description: "Translating Shor's factorization algorithm from theoretical paper to working quantum circuit implementation using Qiskit. Real code examples included.",
      date: "3 days ago",
      likes: 89,
      image: "/placeholder.svg"
    },
    {
      id: 4,
      title: "VAE Paper Implementation: Variational Autoencoders from Scratch",
      expert: "Dr. Emma Watson",
      role: "AI Research Engineer",
      company: "OpenAI",
      duration: "41 min",
      category: "Generative Models",
      description: "Complete implementation of Kingma & Welling's Variational Autoencoder paper. From mathematical derivations to working PyTorch code with practical tips.",
      date: "5 days ago",
      likes: 312,
      image: "/placeholder.svg"
    },
    {
      id: 5,
      title: "BERT Implementation: From Paper to Hugging Face Compatible Code",
      expert: "James Liu",
      role: "NLP Research Engineer",
      company: "Anthropic",
      duration: "47 min",
      category: "NLP Implementation",
      description: "Building BERT from the ground up based on the original paper. Learn tokenization, attention mechanisms, and how to make your implementation compatible with existing frameworks.",
      date: "1 week ago",
      likes: 198,
      image: "/placeholder.svg"
    },
    {
      id: 6,
      title: "Implementing Reinforcement Learning: DQN Paper to Working Agent",
      expert: "Maria Garcia",
      role: "RL Research Scientist",
      company: "DeepMind",
      duration: "55 min",
      category: "Reinforcement Learning",
      description: "Complete walkthrough of implementing Deep Q-Networks from the original DeepMind paper. Includes environment setup, neural network architecture, and training loop.",
      date: "4 days ago",
      likes: 267,
      image: "/placeholder.svg"
    }
  ];

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
              Research Papers
              <br />
              <span className="text-3xl sm:text-4xl md:text-6xl">To Code</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-foreground/80 mb-8 max-w-3xl mx-auto leading-relaxed px-4">
              Transform cutting-edge research into production-ready code. Watch experts implement papers from DeepMind, OpenAI, and top conferences step-by-step.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button 
                onClick={() => setIsFormOpen(true)}
                className="glass-card bg-primary/20 hover:bg-primary/30 border border-primary/30 text-primary px-8 py-4 text-lg morphic-hover pulse-glow"
              >
                Share Your Interview
              </Button>
              <Button 
                variant="outline" 
                className="glass-card border-white/20 hover:bg-white/5 px-8 py-4 text-lg morphic-hover"
              >
                Explore Collection
              </Button>
            </div>

            {/* Stats */}
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
            </div>
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
              <InterviewCard key={interview.id} {...interview} />
            ))}
          </div>
        </div>
      </section>

      {/* Interview Questions Section */}
      <section id="questions" className="px-6 pb-16">
        <div className="container mx-auto">
          <InterviewQuestions />
        </div>
      </section>

      {/* Interview Form Modal */}
      <InterviewForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </div>
  );
};

export default Index;
