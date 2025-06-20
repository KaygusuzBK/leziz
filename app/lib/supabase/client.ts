import { createClient } from '@supabase/supabase-js'
import type { Database } from '../types/supabase'
import { supabaseConfig, validateSupabaseConfig } from '../config/supabase'

// Client-side Supabase instance
export const createSupabaseClient = () => {
  if (!validateSupabaseConfig()) {
    throw new Error('Supabase configuration is invalid')
  }

  return createClient<Database>(supabaseConfig.url, supabaseConfig.anonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  })
}

// Singleton instance for client-side
let supabaseClient: ReturnType<typeof createSupabaseClient> | null = null

export const getSupabaseClient = () => {
  if (!supabaseClient) {
    supabaseClient = createSupabaseClient()
  }
  return supabaseClient
} 