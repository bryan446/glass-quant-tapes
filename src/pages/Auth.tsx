import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock, User, Sparkles, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user, loading: authLoading, continueAsGuest } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  if (!authLoading && user) {
    return <Navigate to="/home" replace />;
  }

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        // Determine the correct redirect URL based on environment
        const currentOrigin = window.location.origin;
        const redirectTo = currentOrigin.includes('localhost') 
          ? `${currentOrigin}/home`
          : `${currentOrigin}/home`;
        
        console.log('Email signup redirect will go to:', redirectTo);
        
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: redirectTo
          }
        });

        if (error) {
          toast({
            title: "Sign Up Error",
            description: error.message,
            variant: "destructive"
          });
        } else {
          toast({
            title: "Check your email",
            description: "We sent you a confirmation link to complete your registration.",
          });
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          toast({
            title: "Sign In Error", 
            description: error.message,
            variant: "destructive"
          });
        }
      }
    } catch (error) {
      toast({
        title: "Authentication Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      // Get the current origin and ensure it matches your Supabase OAuth settings
      const currentOrigin = window.location.origin;
      const redirectTo = `${currentOrigin}/auth/callback`;
      
      console.log('=== GOOGLE OAUTH DEBUG ===');
      console.log('OAuth redirect will go to:', redirectTo);
      console.log('Current origin:', currentOrigin);
      console.log('Full current URL:', window.location.href);
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectTo,
          // Add scopes if needed
          scopes: 'email profile'
        }
      });

      if (error) {
        console.error('Google Auth Error:', error);
        toast({
          title: "Google Sign In Error",
          description: error.message,
          variant: "destructive"
        });
      } else {
        console.log('OAuth initiation successful, redirecting to Google...');
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Authentication Error",
        description: "Failed to sign in with Google. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleGuestMode = () => {
    continueAsGuest();
    navigate('/home');
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center p-4">
      {/* Background effects */}
      <div className="floating-particle" style={{ top: '10%', left: '20%' }}></div>
      <div className="floating-particle" style={{ top: '30%', right: '15%' }}></div>
      <div className="floating-particle" style={{ bottom: '20%', left: '10%' }}></div>
      <div className="floating-particle" style={{ top: '60%', right: '30%' }}></div>
      <div className="floating-particle" style={{ bottom: '40%', right: '10%' }}></div>

      <div className="glass-card p-8 w-full max-w-md gradient-border">
        <div className="text-center mb-8">
          <div className="w-16 h-16 glass-card rounded-2xl flex items-center justify-center pulse-glow border border-white/20 mx-auto mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-white via-accent to-primary rounded-xl flex items-center justify-center">
              <div className="w-5 h-5 bg-background rounded-sm"></div>
            </div>
          </div>
          <h1 className="text-3xl font-bold glow-text bg-gradient-to-r from-white via-accent to-primary bg-clip-text text-transparent mb-2">
            Welcome to Quanty
          </h1>
          <p className="text-foreground/70">
            {isSignUp ? 'Create your account to get started' : 'Sign in to access expert profiles'}
          </p>
        </div>

        <form onSubmit={handleEmailAuth} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-foreground/80">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground/50" />
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="glass-card bg-white/5 border-white/10 focus:border-primary/50 pl-10"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-foreground/80">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground/50" />
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="glass-card bg-white/5 border-white/10 focus:border-primary/50 pl-10"
                required
                minLength={6}
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full glass-card bg-primary/20 hover:bg-primary/30 border border-primary/30 text-primary morphic-hover"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
            ) : (
              <LogIn className="w-4 h-4 mr-2" />
            )}
            {isSignUp ? 'Create Account' : 'Sign In'}
          </Button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-white/10"></div>
          <span className="px-3 text-sm text-foreground/60">or</span>
          <div className="flex-1 border-t border-white/10"></div>
        </div>

        <Button
          onClick={handleGoogleAuth}
          variant="outline"
          className="w-full glass-card border-white/20 hover:bg-white/5 morphic-hover"
        >
          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </Button>

        <div className="flex items-center my-4">
          <div className="flex-1 border-t border-white/10"></div>
          <span className="px-3 text-xs text-foreground/50">or</span>
          <div className="flex-1 border-t border-white/10"></div>
        </div>

        <Button
          onClick={handleGuestMode}
          variant="ghost"
          className="w-full glass-card bg-white/5 hover:bg-white/10 border border-white/10 text-foreground/70 hover:text-foreground morphic-hover"
        >
          <UserCheck className="w-4 h-4 mr-2" />
          Continue as Guest
        </Button>

        <div className="text-center mt-6">
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-sm text-foreground/70 hover:text-foreground transition-colors"
          >
            {isSignUp 
              ? 'Already have an account? Sign in' 
              : "Don't have an account? Sign up"
            }
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;