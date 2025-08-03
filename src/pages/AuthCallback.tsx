import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const AuthCallback = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        console.log('AuthCallback component loaded');
        console.log('Current URL:', window.location.href);
        console.log('Search params:', window.location.search);
        console.log('Hash:', window.location.hash);
        
        // More comprehensive check for OAuth parameters
        const hasAuthCode = searchParams.has('code');
        const hasAccessToken = searchParams.has('access_token') || window.location.hash.includes('access_token');
        const hasRefreshToken = searchParams.has('refresh_token') || window.location.hash.includes('refresh_token');
        const hasAuthParams = hasAuthCode || hasAccessToken || hasRefreshToken;
        
        console.log('Auth params check:', { hasAuthCode, hasAccessToken, hasRefreshToken, hasAuthParams });
        
        if (!hasAuthParams) {
          console.log('No OAuth parameters found - this might be a direct access');
          console.log('Redirecting to auth page...');
          setIsProcessing(false);
          navigate('/auth', { replace: true });
          return;
        }
        
        console.log('Processing OAuth callback...');
        
        // For OAuth with PKCE (which Supabase uses), we need to exchange the code
        if (hasAuthCode) {
          console.log('Exchanging code for session...');
          const code = searchParams.get('code');
          const { data, error } = await supabase.auth.exchangeCodeForSession(code!);
          
          if (error) {
            console.error('Code exchange error:', error);
            toast({
              title: "Authentication Error",
              description: error.message,
              variant: "destructive"
            });
            setIsProcessing(false);
            navigate('/auth', { replace: true });
            return;
          }
          
          if (data.session) {
            console.log('OAuth login successful:', data.session.user.email);
            toast({
              title: "Welcome!",
              description: "Successfully signed in with Google.",
            });
            setIsProcessing(false);
            navigate('/home', { replace: true });
            return;
          }
        }
        
        // Fallback: Handle the OAuth callback using getSession
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('OAuth callback error:', error);
          toast({
            title: "Authentication Error",
            description: error.message,
            variant: "destructive"
          });
          setIsProcessing(false);
          navigate('/auth', { replace: true });
          return;
        }

        if (data.session) {
          console.log('OAuth login successful:', data.session.user.email);
          toast({
            title: "Welcome!",
            description: "Successfully signed in with Google.",
          });
          setIsProcessing(false);
          navigate('/home', { replace: true });
        } else {
          console.log('No session found after OAuth callback');
          setIsProcessing(false);
          navigate('/auth', { replace: true });
        }
      } catch (error) {
        console.error('Unexpected error in OAuth callback:', error);
        toast({
          title: "Authentication Error",
          description: "An unexpected error occurred during sign in.",
          variant: "destructive"
        });
        setIsProcessing(false);
        navigate('/auth', { replace: true });
      }
    };

    // Add a small delay to ensure URL params are fully loaded
    const timer = setTimeout(handleAuthCallback, 100);
    
    return () => clearTimeout(timer);
  }, [navigate, toast, searchParams]);

  if (!isProcessing) {
    return null; // Component will unmount due to navigation
  }

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
