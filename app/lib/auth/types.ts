import type { User, Session } from '@supabase/supabase-js'

// Auth durumu için tip tanımları
export interface AuthState {
  user: User | null
  session: Session | null
  loading: boolean
}

export interface AuthResult {
  success: boolean
  data?: any
  error?: string
}

export interface UserProfileUpdates {
  email?: string
  password?: string
  data?: any
} 