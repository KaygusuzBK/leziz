import { getSupabaseClient } from '../supabase/client'
import type { AuthResult } from './types'

const supabase = getSupabaseClient()

/**
 * Mevcut kullanıcıyı al
 */
export const getCurrentUser = async (): Promise<AuthResult> => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error) {
      return {
        success: false,
        error: error.message
      }
    }

    return {
      success: true,
      data: { user }
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Kullanıcı bilgisi alınırken bir hata oluştu'
    }
  }
}

/**
 * Mevcut session'ı al
 */
export const getCurrentSession = async (): Promise<AuthResult> => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession()

    if (error) {
      return {
        success: false,
        error: error.message
      }
    }

    return {
      success: true,
      data: { session }
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Session bilgisi alınırken bir hata oluştu'
    }
  }
}

/**
 * Kullanıcının giriş yapmış olup olmadığını kontrol et
 */
export const isAuthenticated = async (): Promise<boolean> => {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    return !!user
  } catch {
    return false
  }
} 