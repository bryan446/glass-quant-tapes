
import React, { useState } from 'react';
import { TrendingUp, Users, Play, Filter, Grid, List } from 'lucide-react';
import Header from '@/components/Header';
import InterviewCard from '@/components/InterviewCard';
import InterviewForm from '@/components/InterviewForm';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Sample interview data
  const interviews = [
    {
      id: 1,
      title: "The Future of Algorithmic Trading with Machine Learning",
      expert: "Dr. Sarah Chen",
      role: "Head of Quantitative Research",
      company: "Two Sigma",
      duration: "52 min",
      category: "Quantitative Finance",
      description: "Exploring cutting-edge machine learning techniques in high-frequency trading, risk management, and portfolio optimization. Dr. Chen shares insights from her 15 years in quantitative finance.",
      date: "2 days ago",
      likes: 234,
      image: "/placeholder.svg"
    },
    {
      id: 2,
      title: "Building Resilient Distributed Systems at Scale",
      expert: "Alex Rodriguez",
      role: "Principal Engineer",
      company: "Netflix",
      duration: "38 min",
      category: "Software Engineering",
      description: "Deep dive into architecting systems that can handle millions of concurrent users. Learn about microservices, chaos engineering, and the mindset needed for large-scale distributed systems.",
      date: "1 week ago",
      likes: 156,
      image: "/placeholder.svg"
    },
    {
      id: 3,
      title: "Cryptographic Security in the Age of Quantum Computing",
      expert: "Prof. Michael Thompson",
      role: "Research Scientist",
      company: "IBM Research",
      duration: "44 min",
      category: "Cybersecurity",
      description: "Understanding quantum-resistant cryptography and preparing for the post-quantum world. Insights into current research and practical implications for modern security systems.",
      date: "3 days ago",
      likes: 89,
      image: "/placeholder.svg"
    },
    {
      id: 4,
      title: "Data Science in Climate Change Research",
      expert: "Dr. Emma Watson",
      role: "Climate Data Scientist",
      company: "NOAA",
      duration: "41 min",
      category: "Data Science",
      description: "How machine learning and big data analytics are revolutionizing climate science. From predictive modeling to real-time environmental monitoring systems.",
      date: "5 days ago",
      likes: 312,
      image: "/placeholder.svg"
    },
    {
      id: 5,
      title: "Autonomous Systems and Real-time Decision Making",
      expert: "James Liu",
      role: "AI Research Lead",
      company: "Waymo",
      duration: "47 min",
      category: "Artificial Intelligence",
      description: "Inside the world of self-driving cars: computer vision, sensor fusion, and the challenges of making split-second decisions in complex environments.",
      date: "1 week ago",
      likes: 198,
      image: "/placeholder.svg"
    },
    {
      id: 6,
      title: "DeFi Protocols and Smart Contract Architecture",
      expert: "Maria Garcia",
      role: "Blockchain Architect",
      company: "Ethereum Foundation",
      duration: "55 min",
      category: "Blockchain",
      description: "Exploring the technical foundations of decentralized finance. From automated market makers to yield farming protocols and the future of programmable money.",
      date: "4 days ago",
      likes: 267,
      image: "/placeholder.svg"
    }
  ];

  const categories = [
    "All Categories",
    "Quantitative Finance",
    "Machine Learning",
    "Artificial Intelligence",
    "Blockchain",
    "Cybersecurity",
    "Data Science",
    "Software Engineering"
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
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 glow-text bg-gradient-to-r from-purple-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Tech Interviews
              <br />
              <span className="text-4xl md:text-6xl">Redefined</span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover insights from the brightest minds in technology. From quantum computing to algorithmic trading, explore the future through expert conversations.
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
      <section className="px-6 mb-8">
        <div className="container mx-auto">
          <div className="glass-card p-6 rounded-2xl">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                {categories.map((category, index) => (
                  <Button
                    key={index}
                    variant={index === 0 ? "default" : "ghost"}
                    className={`glass-card morphic-hover ${
                      index === 0 
                        ? "bg-primary/20 border-primary/30 text-primary" 
                        : "border-white/10 hover:bg-white/5"
                    }`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="ghost" className="glass-card morphic-hover">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
                <div className="flex items-center glass-card rounded-lg p-1">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className={viewMode === 'grid' ? "bg-primary/20 text-primary" : ""}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className={viewMode === 'list' ? "bg-primary/20 text-primary" : ""}
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

      {/* Interview Form Modal */}
      <InterviewForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </div>
  );
};

export default Index;
