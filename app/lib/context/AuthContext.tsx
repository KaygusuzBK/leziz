'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { getSupabaseClient } from '../supabase/client';
import { useUserStore } from '../store';
import { getOAuthRedirectUrl } from '../config/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  signInWithGoogle: () => Promise<{ error: AuthError | null }>;
  signInWithGitHub: () => Promise<{ error: AuthError | null }>;
  signInWithFacebook: () => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<{ error: AuthError | null }>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = getSupabaseClient()!;
  const zustandSetUser = useUserStore((state) => state.setUser);
  const zustandLogout = useUserStore((state) => state.logout);

  useEffect(() => {
    // Mevcut session'ı al
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        zustandSetUser({
          id: session.user.id,
          name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'User',
          email: session.user.email || ''
        });
      } else {
        zustandSetUser(null);
      }
      setIsLoading(false);
    };

    getSession();

    // Auth state değişikliklerini dinle
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          zustandSetUser({
            id: session.user.id,
            name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'User',
            email: session.user.email || ''
          });
        } else {
          zustandSetUser(null);
        }
        setIsLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, [supabase.auth, zustandSetUser]);

  // Mevcut URL'i al
  const getCurrentUrl = (): string => {
    if (typeof window !== 'undefined') {
      return window.location.href;
    }
    return '/';
  };

  const signInWithGoogle = async () => {
    const currentUrl = getCurrentUrl();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: getOAuthRedirectUrl(),
        queryParams: {
          state: encodeURIComponent(currentUrl)
        }
      }
    });
    return { error };
  };

  const signInWithGitHub = async () => {
    const currentUrl = getCurrentUrl();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: getOAuthRedirectUrl(),
        queryParams: {
          state: encodeURIComponent(currentUrl)
        }
      }
    });
    return { error };
  };

  const signInWithFacebook = async () => {
    const currentUrl = getCurrentUrl();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'facebook',
      options: {
        redirectTo: getOAuthRedirectUrl(),
        queryParams: {
          state: encodeURIComponent(currentUrl)
        }
      }
    });
    return { error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    zustandLogout();
    return { error };
  };

  const value = {
    user,
    session,
    isAuthenticated: !!user,
    signInWithGoogle,
    signInWithGitHub,
    signInWithFacebook,
    signOut,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 