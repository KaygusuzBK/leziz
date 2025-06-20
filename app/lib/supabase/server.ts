import { createClient } from '@supabase/supabase-js'
import type { Database } from '../types/supabase'
import { supabaseConfig, validateSupabaseConfig, validateServiceRoleKey } from '../config/supabase'

// Server-side Supabase instance with service role key
export const createSupabaseServerClient = () => {
  if (!validateSupabaseConfig()) {
    throw new Error('Supabase configuration is invalid')
  }

  if (!validateServiceRoleKey()) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is required for server-side admin operations')
  }

  return createClient<Database>(supabaseConfig.url, supabaseConfig.serviceRoleKey!, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
}

// Server-side client with admin privileges
export const getSupabaseServerClient = () => {
  return createSupabaseServerClient()
}

// Opsiyonel: Eğer service role key yoksa anon key ile server client oluştur
export const createSupabaseServerClientWithAnon = () => {
  if (!validateSupabaseConfig()) {
    throw new Error('Supabase configuration is invalid')
  }

  return createClient<Database>(supabaseConfig.url, supabaseConfig.anonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
} 