import { getSupabaseClient } from '../supabase/client'
import type { User, Session } from '@supabase/supabase-js'

const supabase = getSupabaseClient()

/**
 * Auth durumu değişikliklerini dinle
 */
export const onAuthStateChange = (callback: (event: string, session: Session | null) => void) => {
  return supabase!.auth.onAuthStateChange(callback)
}

/**
 * Auth durumu değişikliklerini dinle (Promise tabanlı)
 */
export const subscribeToAuthChanges = (callback: (user: User | null, session: Session | null) => void) => {
  return supabase!.auth.onAuthStateChange((event, session) => {
    callback(session?.user || null, session)
  })
} 