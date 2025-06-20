import { getSupabaseClient } from '../supabase/client'
import type { AuthResult } from './types'

const supabase = getSupabaseClient()

/**
 * Refresh token ile session yenile
 */
export const refreshSession = async (): Promise<AuthResult> => {
  try {
    const { data, error } = await supabase.auth.refreshSession()

    if (error) {
      return {
        success: false,
        error: error.message
      }
    }

    return {
      success: true,
      data: {
        session: data.session,
        user: data.user
      }
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Session yenilenirken bir hata oluştu'
    }
  }
} 