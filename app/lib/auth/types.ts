import type { User, Session } from '@supabase/supabase-js'

// Auth durumu için tip tanımları
export interface AuthState {
  user: User | null
  session: Session | null
  loading: boolean
}

export interface AuthResult {
  success: boolean
  data?: Record<string, unknown>
  error?: string
}

export interface UserProfileData {
  id?: string;
  email?: string;
  full_name?: string | null;
  bio?: string | null;
  location?: string | null;
  website?: string | null;
  avatar_url?: string | null;
}

export interface UserProfileUpdates {
  email?: string
  password?: string
  data?: Partial<UserProfileData>
} 