import { useState, useEffect } from 'react';
import { User, Session, AuthChangeEvent } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface UserProfile {
  id: string;
  full_name?: string;
  role?: string;
  created_at?: string;
  updated_at?: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    // Check for guest mode in localStorage
    const guestMode = localStorage.getItem('guestMode') === 'true';
    if (guestMode) {
      setIsGuest(true);
      setLoading(false);
      return;
    }

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session: Session | null) => {
        console.log('Auth state change:', event, session?.user?.email);
        
        if (event === 'SIGNED_OUT') {
          // Clear everything on sign out
          setSession(null);
          setUser(null);
          setProfile(null);
          setIsGuest(false);
          localStorage.removeItem('guestMode');
          setLoading(false);
          return;
        }
        
        setSession(session);
        setUser(session?.user ?? null);
        
        // Fetch user profile if logged in
        if (session?.user) {
          setTimeout(async () => {
            const { data: profileData } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();
            setProfile(profileData);
          }, 0);
        } else {
          setProfile(null);
        }
        
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        setTimeout(async () => {
          const { data: profileData } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
          setProfile(profileData);
        }, 0);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    try {
      console.log('=== SIGN OUT DEBUG ===');
      console.log('Starting sign out process...');
      console.log('Current URL before signout:', window.location.href);
      
      // Sign out from Supabase FIRST (before clearing local state)
      console.log('Calling Supabase signOut...');
      const { error } = await supabase.auth.signOut({
        scope: 'global' // This signs out from all sessions
      });
      
      if (error) {
        console.error('Supabase signOut error:', error);
        // Continue with cleanup even if there's an error
      } else {
        console.log('Supabase signOut successful');
      }
      
      // Clear all local state after Supabase signout
      setLoading(true);
      setUser(null);
      setSession(null);
      setProfile(null);
      setIsGuest(false);
      
      // Clear all possible localStorage items
      localStorage.removeItem('guestMode');
      localStorage.removeItem('supabase.auth.token');
      
      // Clear specific Supabase auth keys
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('supabase.auth.')) {
          keysToRemove.push(key);
        }
      }
      console.log('Removing localStorage keys:', keysToRemove);
      keysToRemove.forEach(key => localStorage.removeItem(key));
      
      // Clear sessionStorage as well
      sessionStorage.clear();
      
      console.log('Sign out completed, redirecting to /auth');
      console.log('Will redirect to:', window.location.origin + '/auth');
      
      // Add a small delay to ensure cleanup is complete
      setTimeout(() => {
        // Use window.location.replace to avoid adding to history
        window.location.replace('/auth');
      }, 100);
      
    } catch (error) {
      console.error('Error during sign out:', error);
      // Force clear everything and redirect anyway
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('supabase.auth.')) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(key => localStorage.removeItem(key));
      localStorage.removeItem('guestMode');
      sessionStorage.clear();
      setUser(null);
      setSession(null);
      setProfile(null);
      setIsGuest(false);
      
      setTimeout(() => {
        window.location.replace('/auth');
      }, 100);
    }
  };

  const continueAsGuest = () => {
    localStorage.setItem('guestMode', 'true');
    setIsGuest(true);
    setLoading(false);
  };

  const exitGuestMode = () => {
    localStorage.removeItem('guestMode');
    setIsGuest(false);
  };

  const MASTER_ADMIN_EMAIL = 'bryanrodas201@gmail.com';
  
  const isAdmin = profile?.role === 'admin';
  const isMasterAdmin = user?.email === MASTER_ADMIN_EMAIL;
  const isAuthenticated = user || isGuest;

  return {
    user,
    session,
    profile,
    loading,
    signOut,
    isAdmin,
    isMasterAdmin,
    isGuest,
    isAuthenticated,
    continueAsGuest,
    exitGuestMode
  };
};