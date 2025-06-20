import { getSupabaseClient } from '../supabase/client'
import type { AuthResult } from './types'

const supabase = getSupabaseClient()

/**
 * Email ve şifre ile giriş yap
 */
export const signInWithEmail = async (email: string, password: string): Promise<AuthResult> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      return {
        success: false,
        error: error.message
      }
    }

    return {
      success: true,
      data: {
        user: data.user,
        session: data.session
      }
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Giriş yapılırken bir hata oluştu'
    }
  }
}

/**
 * Email ve şifre ile kayıt ol
 */
export const signUpWithEmail = async (email: string, password: string): Promise<AuthResult> => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    })

    if (error) {
      return {
        success: false,
        error: error.message
      }
    }

    return {
      success: true,
      data: {
        user: data.user,
        session: data.session
      }
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Kayıt olurken bir hata oluştu'
    }
  }
}

/**
 * Çıkış yap
 */
export const signOut = async (): Promise<AuthResult> => {
  try {
    const { error } = await supabase.auth.signOut()

    if (error) {
      return {
        success: false,
        error: error.message
      }
    }

    return {
      success: true,
      data: { message: 'Başarıyla çıkış yapıldı' }
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Çıkış yapılırken bir hata oluştu'
    }
  }
} 