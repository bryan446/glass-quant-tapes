import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const AuthCallback = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        console.log('Handling OAuth callback...');
        
        // Get the current URL to extract the auth data
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('OAuth callback error:', error);
          toast({
            title: "Authentication Error",
            description: error.message,
            variant: "destructive"
          });
          navigate('/auth');
          return;
        }

        if (data.session) {
          console.log('OAuth login successful:', data.session.user.email);
          toast({
            title: "Welcome!",
            description: "Successfully signed in with Google.",
          });
          navigate('/home');
        } else {
          console.log('No session found, redirecting to auth...');
          navigate('/auth');
        }
      } catch (error) {
        console.error('Unexpected error in OAuth callback:', error);
        toast({
          title: "Authentication Error",
          description: "An unexpected error occurred during sign in.",
          variant: "destructive"
        });
        navigate('/auth');
      }
    };

    handleAuthCallback();
  }, [navigate, toast]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-foreground/70">Completing sign in...</p>
      </div>
    </div>
  );
};

export default AuthCallback;
