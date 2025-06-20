// Supabase Clients
export { getSupabaseClient, createSupabaseClient } from './supabase/client'
export { getSupabaseServerClient, createSupabaseServerClient, createSupabaseServerClientWithAnon } from './supabase/server'

// Configuration
export { supabaseConfig, validateSupabaseConfig, validateServiceRoleKey } from './config/supabase'

// Types
export type { Database } from './types/supabase'

// Auth Methods
export {
  signInWithEmail,
  signUpWithEmail,
  signOut,
  resetPassword,
  updatePassword,
  getCurrentUser,
  getCurrentSession,
  isAuthenticated,
  onAuthStateChange,
  subscribeToAuthChanges,
  updateUserProfile,
  deleteUser,
  refreshSession,
  type AuthState,
  type AuthResult,
  type UserProfileUpdates
} from './auth' 