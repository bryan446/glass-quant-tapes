
import React, { useState } from 'react';
import { Upload, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

interface InterviewFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const InterviewForm: React.FC<InterviewFormProps> = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    expert: '',
    role: '',
    company: '',
    category: '',
    duration: '',
    description: '',
    image_url: '',
    location: '',
    topics: '',
    interview_type: 'regular' as 'regular' | 'professional'
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      // Parse topics from comma-separated string to array
      const topicsArray = formData.topics ? formData.topics.split(',').map(t => t.trim()).filter(t => t) : [];
      
      const { error } = await supabase
        .from('interviews')
        .insert({
          title: formData.title,
          expert: formData.expert,
          role: formData.role,
          company: formData.company,
          category: formData.category,
          duration: formData.duration,
          description: formData.description,
          image_url: formData.image_url,
          location: formData.location,
          topics: topicsArray,
          interview_type: formData.interview_type,
          date: new Date().toLocaleDateString(),
          created_by: user.id
        });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Interview has been published successfully.",
      });

      // Reset form
      setFormData({
        title: '',
        expert: '',
        role: '',
        company: '',
        category: '',
        duration: '',
        description: '',
        image_url: '',
        location: '',
        topics: '',
        interview_type: 'regular'
      });

      onSuccess?.();
    } catch (error: unknown) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to publish interview. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-card p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto gradient-border">
        <div className="relative">
          {/* Floating particles */}
          <div className="floating-particle" style={{ top: '5%', left: '10%' }}></div>
          <div className="floating-particle" style={{ top: '15%', right: '20%' }}></div>
          <div className="floating-particle" style={{ bottom: '10%', left: '15%' }}></div>
          
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 glass-card rounded-xl flex items-center justify-center pulse-glow">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold glow-text">Post New Interview</h2>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="glass-card morphic-hover">
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground/80">Interview Title</label>
                <Input
                  placeholder="e.g., AI in Quantitative Finance"
                  className="glass-card bg-white/5 border-white/10 focus:border-primary/50"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground/80">Expert Name</label>
                <Input
                  placeholder="e.g., Dr. Jane Smith"
                  className="glass-card bg-white/5 border-white/10 focus:border-primary/50"
                  value={formData.expert}
                  onChange={(e) => setFormData({ ...formData, expert: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground/80">Role</label>
                <Input
                  placeholder="e.g., Senior Quant Developer"
                  className="glass-card bg-white/5 border-white/10 focus:border-primary/50"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground/80">Company</label>
                <Input
                  placeholder="e.g., Goldman Sachs"
                  className="glass-card bg-white/5 border-white/10 focus:border-primary/50"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground/80">Category</label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger className="glass-card bg-white/5 border-white/10 focus:border-primary/50">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="glass-card bg-background border-white/10">
                    <SelectItem value="Deep Learning Implementation">Deep Learning Implementation</SelectItem>
                    <SelectItem value="Deep Learning Research">Deep Learning Research</SelectItem>
                    <SelectItem value="Graph ML Implementation">Graph ML Implementation</SelectItem>
                    <SelectItem value="Quantum Computing">Quantum Computing</SelectItem>
                    <SelectItem value="Quantitative Finance">Quantitative Finance</SelectItem>
                    <SelectItem value="Machine Learning in Finance">Machine Learning in Finance</SelectItem>
                    <SelectItem value="Generative Models">Generative Models</SelectItem>
                    <SelectItem value="NLP Implementation">NLP Implementation</SelectItem>
                    <SelectItem value="Reinforcement Learning">Reinforcement Learning</SelectItem>
                    <SelectItem value="Computer Vision">Computer Vision</SelectItem>
                    <SelectItem value="AI Safety & Alignment">AI Safety & Alignment</SelectItem>
                    <SelectItem value="MLOps & Infrastructure">MLOps & Infrastructure</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground/80">Duration</label>
                <Input
                  placeholder="e.g., 45 min"
                  className="glass-card bg-white/5 border-white/10 focus:border-primary/50"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground/80">Location</label>
                <Input
                  placeholder="e.g., New York, NY or London, UK"
                  className="glass-card bg-white/5 border-white/10 focus:border-primary/50"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground/80">Interview Type</label>
                <Select value={formData.interview_type} onValueChange={(value: 'regular' | 'professional') => setFormData({ ...formData, interview_type: value })}>
                  <SelectTrigger className="glass-card bg-white/5 border-white/10 focus:border-primary/50">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="glass-card bg-background border-white/10">
                    <SelectItem value="regular">Regular Interview</SelectItem>
                    <SelectItem value="professional">Professional Interview</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-foreground/80">Topics</label>
              <Input
                placeholder="e.g., Machine Learning, Python, Trading Algorithms (comma-separated)"
                className="glass-card bg-white/5 border-white/10 focus:border-primary/50"
                value={formData.topics}
                onChange={(e) => setFormData({ ...formData, topics: e.target.value })}
              />
              <p className="text-xs text-foreground/60 mt-1">Separate topics with commas. These will appear as tags and filter categories.</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-foreground/80">Description</label>
              <Textarea
                placeholder="Describe what makes this interview special and what topics are covered..."
                className="glass-card bg-white/5 border-white/10 focus:border-primary/50 min-h-[120px]"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-foreground/80">Image URL</label>
              <Input
                placeholder="https://example.com/image.jpg"
                className="glass-card bg-white/5 border-white/10 focus:border-primary/50"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              />
            </div>

            {/* Upload Area */}
            <div className="glass-card p-6 border-2 border-dashed border-white/20 rounded-xl text-center morphic-hover">
              <Upload className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="text-foreground/80 mb-2">Upload Expert Photo</p>
              <p className="text-sm text-foreground/60">Drag & drop or click to browse</p>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-white/10">
              <Button variant="ghost" onClick={onClose} className="glass-card morphic-hover">
                Cancel
              </Button>
              <Button 
                type="submit"
                disabled={loading}
                className="glass-card bg-primary/20 hover:bg-primary/30 border border-primary/30 text-primary morphic-hover pulse-glow"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                ) : (
                  <Sparkles className="w-4 h-4 mr-2" />
                )}
                Publish Interview
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InterviewForm;
