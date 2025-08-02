import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
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
      async (event, session) => {
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
    await supabase.auth.signOut();
    // Clear guest mode when signing out
    localStorage.removeItem('guestMode');
    setIsGuest(false);
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