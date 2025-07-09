
import React, { useState } from 'react';
import { Upload, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface InterviewFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const InterviewForm: React.FC<InterviewFormProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    expert: '',
    role: '',
    company: '',
    category: '',
    duration: '',
    description: '',
    videoUrl: ''
  });

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
          <div className="space-y-6">
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
                    <SelectItem value="quant">Quantitative Finance</SelectItem>
                    <SelectItem value="ml">Machine Learning</SelectItem>
                    <SelectItem value="ai">Artificial Intelligence</SelectItem>
                    <SelectItem value="blockchain">Blockchain</SelectItem>
                    <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
                    <SelectItem value="data-science">Data Science</SelectItem>
                    <SelectItem value="software-eng">Software Engineering</SelectItem>
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
              <label className="block text-sm font-medium mb-2 text-foreground/80">Video URL</label>
              <Input
                placeholder="https://youtube.com/watch?v=..."
                className="glass-card bg-white/5 border-white/10 focus:border-primary/50"
                value={formData.videoUrl}
                onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
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
              <Button className="glass-card bg-primary/20 hover:bg-primary/30 border border-primary/30 text-primary morphic-hover pulse-glow">
                <Sparkles className="w-4 h-4 mr-2" />
                Publish Interview
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewForm;
