import React, { useState } from 'react';
import { Brain, Code, Database, TrendingUp, Calculator, Lock, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface Question {
  id: number;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  question: string;
  topics: string[];
  estimatedTime: string;
  icon: React.ElementType;
}

const InterviewQuestions = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  const questions: Question[] = [
    {
      id: 1,
      category: 'Paper Implementation',
      difficulty: 'Advanced',
      question: 'Implement the Transformer architecture from "Attention Is All You Need" paper. Include multi-head attention, positional encoding, and the complete encoder-decoder structure.',
      topics: ['Attention Mechanisms', 'PyTorch', 'Neural Networks'],
      estimatedTime: '90 min',
      icon: Brain
    },
    {
      id: 2,
      category: 'Algorithm Implementation',
      difficulty: 'Intermediate',
      question: 'Code the ResNet architecture from the original paper. Explain skip connections and implement the residual blocks with proper initialization.',
      topics: ['Deep Learning', 'Computer Vision', 'Skip Connections'],
      estimatedTime: '60 min',
      icon: Code
    },
    {
      id: 3,
      category: 'Research to Code',
      difficulty: 'Advanced',
      question: 'Implement BERT from scratch following the original paper. Include WordPiece tokenization, masked language modeling, and next sentence prediction.',
      topics: ['NLP', 'Transformers', 'Self-Supervised Learning'],
      estimatedTime: '120 min',
      icon: Database
    },
    {
      id: 4,
      category: 'ML Algorithms',
      difficulty: 'Intermediate',
      question: 'Implement Variational Autoencoder from Kingma & Welling paper. Include the reparameterization trick and ELBO loss function.',
      topics: ['Generative Models', 'Variational Inference', 'PyTorch'],
      estimatedTime: '75 min',
      icon: TrendingUp
    },
    {
      id: 5,
      category: 'Deep Learning',
      difficulty: 'Advanced',
      question: 'Code the GAN architecture from the original Goodfellow paper. Implement both generator and discriminator with proper training dynamics.',
      topics: ['Generative Models', 'Adversarial Training', 'Neural Networks'],
      estimatedTime: '90 min',
      icon: Calculator
    },
    {
      id: 6,
      category: 'Reinforcement Learning',
      difficulty: 'Advanced',
      question: 'Implement Deep Q-Network (DQN) from the DeepMind paper. Include experience replay, target networks, and epsilon-greedy exploration.',
      topics: ['RL Algorithms', 'Q-Learning', 'Neural Networks'],
      estimatedTime: '100 min',
      icon: Lock
    }
  ];

  const categories = ['All', ...Array.from(new Set(questions.map(q => q.category)))];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredQuestions = questions.filter(question => {
    const categoryMatch = selectedCategory === 'All' || question.category === selectedCategory;
    const difficultyMatch = selectedDifficulty === 'All' || question.difficulty === selectedDifficulty;
    return categoryMatch && difficultyMatch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-400 border-green-400/30';
      case 'Intermediate': return 'text-yellow-400 border-yellow-400/30';
      case 'Advanced': return 'text-red-400 border-red-400/30';
      default: return 'text-foreground border-border';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4 glow-text bg-gradient-to-r from-white via-accent to-primary bg-clip-text text-transparent">
          Interview Questions
        </h2>
        <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
          Master quantitative finance, algorithms, and mathematical concepts with our curated collection of interview questions.
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
            <span className="text-sm font-medium text-foreground/70 mr-2">Difficulty:</span>
            {difficulties.map((difficulty) => (
              <Button
                key={difficulty}
                variant={difficulty === selectedDifficulty ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedDifficulty(difficulty)}
                className={`glass-card morphic-hover ${
                  difficulty === selectedDifficulty 
                    ? "bg-primary/20 border-primary/30 text-primary" 
                    : "border-white/10 hover:bg-white/5"
                }`}
              >
                {difficulty}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Questions Grid */}
      <div className="grid gap-6">
        {filteredQuestions.map((question) => (
          <Card key={question.id} className="glass-card p-6 morphic-hover gradient-border">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 glass-card rounded-xl flex items-center justify-center pulse-glow">
                <question.icon className="w-6 h-6 text-primary" />
              </div>
              
              <div className="flex-1 space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-3">
                    <span className="glass-card px-3 py-1 rounded-full text-xs font-medium text-accent">
                      {question.category}
                    </span>
                    <span className={`glass-card px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(question.difficulty)}`}>
                      {question.difficulty}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-foreground/60">
                    <Clock className="w-4 h-4" />
                    <span>{question.estimatedTime}</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-foreground leading-relaxed">
                  {question.question}
                </h3>
                
                <div className="flex flex-wrap gap-2">
                  {question.topics.map((topic, index) => (
                    <span 
                      key={index}
                      className="glass-card px-2 py-1 rounded-md text-xs text-foreground/70 border border-white/5"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="glass-card morphic-hover text-primary hover:bg-primary/10"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Mark as Practiced
                  </Button>
                  
                  <Button className="glass-card bg-primary/20 hover:bg-primary/30 border border-primary/30 text-primary morphic-hover">
                    View Solution
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default InterviewQuestions;