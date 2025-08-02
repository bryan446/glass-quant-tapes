import React from 'react';
import { Navigate } from 'react-router-dom';
import { Github, Twitter, Linkedin, Mail, Heart, Star, Users, Play, UserCheck } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

const About = () => {
  const { user, loading: authLoading, isAuthenticated, isGuest } = useAuth();

  // Redirect to auth if not logged in and not in guest mode
  if (!authLoading && !isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const stats = [
    { label: "Research Papers ", value: "1", icon: Play },
    { label: "Expert Contributors", value: "1", icon: Users },
    { label: "Trading Strategies Coded", value: "75+", icon: Star },
    { label: "Quant Professionals Helped", value: "10K+", icon: Heart }
  ];

  const team = [
    {
      name: "Bryan Rodas",
      role: "Founder",
      bio: "Passionate about quantitative methods, machine learning, and bridging the gap between academic research and practical implementation in finance and technology.",
      image: "/bryan-graduation.jpg",
      social: {
        email: "bryanrodasquant@gmail.com",
        linkedin: "https://www.linkedin.com/in/bryan-rodas-9a7a30206/"
      }
    }
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
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 glow-text bg-gradient-to-r from-white via-accent to-primary bg-clip-text text-transparent tracking-tight">
              About Quanty
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-foreground/80 mb-8 max-w-3xl mx-auto leading-relaxed px-4">
              Your platform for expert profiles in quantitative fields and community-driven research discovery. 
              Share your favorite papers, connect with fellow researchers, and help shape our interview topics.
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

      {/* Mission Section */}
      <section className="px-6 pb-16">
        <div className="container mx-auto">
          <div className="glass-card p-8 rounded-2xl gradient-border">
            <h2 className="text-3xl font-bold mb-6 text-center glow-text">Our Mission</h2>
            <p className="text-lg text-foreground/80 leading-relaxed text-center max-w-4xl mx-auto">
              Quanty is a platform dedicated to conducting and showcasing professional interviews with experts 
              in quantitative fields. We focus on bringing you authentic conversations with professionals working 
              at the intersection of technology and quantitative sciences.
              <br /><br />
              Our interviews cover multiple domains: <strong>AI & Machine Learning</strong> - conversations with 
              ML engineers and researchers, <strong>Quantitative Finance</strong> - insights from quants and traders, 
              <strong>Quantitative Research</strong> - discussions with academic and industry researchers, and
              <strong>Financial Technology</strong> - perspectives from fintech innovators.
              <br /><br />
              Through these interviews, we aim to provide valuable insights into career paths, industry trends, 
              and the real-world application of quantitative methods across different fields.
            </p>
          </div>
        </div>
      </section>

      {/* Domains Section */}
      <section className="px-6 pb-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center glow-text">Our Domains</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card p-6 morphic-hover gradient-border">
              <h3 className="text-xl font-bold mb-3 text-primary">Machine Learning & Deep Learning</h3>
              <ul className="text-foreground/80 space-y-2">
                <li>• Neural Networks & Transformers</li>
                <li>• Computer Vision & NLP</li>
                <li>• Reinforcement Learning</li>
                <li>• Generative Models (GANs, VAEs, Diffusion)</li>
                <li>• Graph Neural Networks</li>
              </ul>
            </div>
            
            <div className="glass-card p-6 morphic-hover gradient-border">
              <h3 className="text-xl font-bold mb-3 text-primary">Quantitative Finance</h3>
              <ul className="text-foreground/80 space-y-2">
                <li>• Algorithmic Trading Strategies</li>
                <li>• Risk Management Models</li>
                <li>• Portfolio Optimization</li>
                <li>• Derivatives Pricing</li>
                <li>• Market Microstructure</li>
              </ul>
            </div>
            
            <div className="glass-card p-6 morphic-hover gradient-border">
              <h3 className="text-xl font-bold mb-3 text-primary">Quantitative Research</h3>
              <ul className="text-foreground/80 space-y-2">
                <li>• Statistical Analysis & Modeling</li>
                <li>• Econometric Methods</li>
                <li>• Time Series Analysis</li>
                <li>• Bayesian Statistics</li>
                <li>• Experimental Design</li>
              </ul>
            </div>
            
            <div className="glass-card p-6 morphic-hover gradient-border">
              <h3 className="text-xl font-bold mb-3 text-primary">Financial Technology</h3>
              <ul className="text-foreground/80 space-y-2">
                <li>• High-Frequency Trading Systems</li>
                <li>• Alternative Data Analysis</li>
                <li>• Cryptocurrency & DeFi</li>
                <li>• RegTech & Compliance</li>
                <li>• Blockchain Applications</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section
      <section className="px-6 pb-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center glow-text">By the Numbers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="glass-card p-6 text-center morphic-hover gradient-border">
                <div className="w-12 h-12 glass-card rounded-xl flex items-center justify-center pulse-glow mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-3xl font-bold glow-text mb-2">{stat.value}</div>
                <div className="text-foreground/70 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* What We Offer Section */}
      <section className="px-6 pb-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center glow-text">What We Offer</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="glass-card p-6 morphic-hover gradient-border">
              <div className="w-12 h-12 glass-card rounded-xl flex items-center justify-center pulse-glow mb-4">
                <Play className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Expert Profiles</h3>
              <p className="text-foreground/80">
                In-depth profiles of leading professionals in quantitative finance, 
                machine learning, and research. Learn from their stories, insights, and career journeys.
              </p>
            </div>
            
            <div className="glass-card p-6 morphic-hover gradient-border">
              <div className="w-12 h-12 glass-card rounded-xl flex items-center justify-center pulse-glow mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Industry Insights</h3>
              <p className="text-foreground/80">
                Get exclusive perspectives from quantitative analysts, ML engineers, researchers, and 
                traders from top financial institutions and tech companies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Research Papers Section */}
      <section className="px-6 pb-16">
        <div className="container mx-auto">
          <div className="glass-card p-8 rounded-2xl gradient-border">
            <h2 className="text-3xl font-bold mb-6 text-center glow-text">Community Research Hub</h2>
            <p className="text-lg text-foreground/80 leading-relaxed text-center max-w-3xl mx-auto mb-8">
              While we're building our interview library, we want to hear from YOU! Share your favorite research papers 
              that have shaped your understanding of quantitative methods, machine learning, or finance.
            </p>
            
            <div className="grid grid-cols-1 gap-6 mb-8">
              <div className="glass-card p-6 md:p-8 gradient-border">
                <div className="flex items-center mb-4">
                  <div className="text-2xl mr-3">📚</div>
                  <h3 className="text-xl md:text-2xl font-bold text-primary">Share Your Favorites</h3>
                </div>
                <p className="text-foreground/80 mb-6 text-base md:text-lg leading-relaxed">
                  Found a groundbreaking paper in ML, quant finance, or research methodology? 
                  Share it with the community and tell us why it's impactful.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-foreground/70 text-sm md:text-base">Paper title and authors</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-foreground/70 text-sm md:text-base">Brief summary of key insights</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-foreground/70 text-sm md:text-base">Why it influenced your work</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-foreground/70 text-sm md:text-base">Practical applications you've seen</span>
                  </div>
                </div>
              </div>
              
              <div className="glass-card p-6 md:p-8 gradient-border">
                <div className="flex items-center mb-4">
                  <div className="text-2xl mr-3">💬</div>
                  <h3 className="text-xl md:text-2xl font-bold text-primary">Discuss & Connect</h3>
                </div>
                <p className="text-foreground/80 mb-6 text-base md:text-lg leading-relaxed">
                  Comment on papers shared by others, ask questions, and build connections 
                  with fellow quants and researchers.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-foreground/70 text-sm md:text-base">Ask implementation questions</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-foreground/70 text-sm md:text-base">Share related work you've found</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-foreground/70 text-sm md:text-base">Discuss real-world applications</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-foreground/70 text-sm md:text-base">Connect with like-minded professionals</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl p-6 mb-6">
                <h3 className="text-2xl font-bold mb-3 glow-text">📝 Help Us Build the Collection!</h3>
                <p className="text-foreground/80 mb-4">
                  <strong>What papers would you love to see discussed in future interviews?</strong>
                  <br />
                  Share papers you think would make great interview topics with the authors or practitioners who've implemented them.
                </p>
                <div className="flex flex-wrap justify-center gap-2 text-sm text-accent mb-4">
                  <span className="bg-accent/20 px-3 py-1 rounded-full">#Transformers</span>
                  <span className="bg-accent/20 px-3 py-1 rounded-full">#BlackScholes</span>
                  <span className="bg-accent/20 px-3 py-1 rounded-full">#ReinforcementLearning</span>
                  <span className="bg-accent/20 px-3 py-1 rounded-full">#QuantTrading</span>
                  <span className="bg-accent/20 px-3 py-1 rounded-full">#TimeSeriesAnalysis</span>
                </div>
              </div>
              
              <div className="flex flex-col gap-4 justify-center">
                <a href="mailto:bryanrodasquant@gmail.com?subject=Research Paper Recommendation&body=Hi Bryan,%0D%0A%0D%0AI'd like to share a research paper with the Quanty community:%0D%0A%0D%0APaper Title: %0D%0AAuthors: %0D%0ALink/DOI: %0D%0A%0D%0AWhy it's impactful: %0D%0A%0D%0AKey insights: %0D%0A%0D%0APractical applications: %0D%0A%0D%0ABest regards," className="w-full">
                  <Button className="glass-card bg-primary/20 hover:bg-primary/30 border border-primary/30 text-primary morphic-hover w-full py-3 text-base">
                    <Mail className="w-5 h-5 mr-3" />
                    Share a Research Paper
                  </Button>
                </a>
                <a href="mailto:bryanrodasquant@gmail.com?subject=Interview Suggestion&body=Hi Bryan,%0D%0A%0D%0AI think this would make a great interview topic:%0D%0A%0D%0APaper/Research Area: %0D%0AAuthor/Researcher: %0D%0AWhy it would be interesting: %0D%0A%0D%0ABest regards," className="w-full">
                  <Button variant="outline" className="glass-card border-white/20 hover:bg-white/5 morphic-hover w-full py-3 text-base">
                    <Star className="w-5 h-5 mr-3" />
                    Suggest Interview Topic
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="px-6 pb-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center glow-text">Our Team</h2>
          <div className="flex justify-center">
            {team.map((member, index) => (
              <div key={index} className="glass-card p-6 morphic-hover gradient-border max-w-md">
                <div className="text-center">
                  <div className="w-24 h-24 glass-card rounded-xl overflow-hidden mx-auto mb-4">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover object-top" />
                  </div>
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-primary text-sm mb-3">{member.role}</p>
                  <p className="text-foreground/80 mb-4">{member.bio}</p>
                  <div className="flex justify-center space-x-3">
                    <a href={`mailto:${member.social.email}`}>
                      <Button variant="ghost" size="sm" className="glass-card p-2">
                        <Mail className="w-4 h-4" />
                      </Button>
                    </a>
                    <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" size="sm" className="glass-card p-2">
                        <Linkedin className="w-4 h-4" />
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="px-6 pb-16">
        <div className="container mx-auto">
          <div className="glass-card p-8 rounded-2xl gradient-border text-center">
            <h2 className="text-3xl font-bold mb-6 glow-text">Get in Touch</h2>
            <p className="text-lg text-foreground/80 mb-6 max-w-2xl mx-auto">
              Have questions about quantitative methods, want to contribute your expertise, or looking for specific 
              implementations? We'd love to hear from quants, researchers, and practitioners!
            </p>
            <div className="flex justify-center space-x-4">
              <a href="mailto:bryanrodasquant@gmail.com">
                <Button className="glass-card bg-primary/20 hover:bg-primary/30 border border-primary/30 text-primary morphic-hover">
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Us
                </Button>
              </a>
              <a href="https://github.com/bryan446" target="_blank" rel="noopener noreferrer">
                {/* <Button variant="outline" className="glass-card border-white/20 hover:bg-white/5 morphic-hover">
                  <Github className="w-4 h-4 mr-2" />
                  Contribute
                </Button> */}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
