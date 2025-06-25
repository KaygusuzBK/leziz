import { getSupabaseClient } from '../supabase/client'
import type { AuthResult } from './types'
import { getResetPasswordUrl } from '../config/supabase'

const supabase = getSupabaseClient()

/**
 * Şifre sıfırlama emaili gönder
 */
export const resetPassword = async (email: string): Promise<AuthResult> => {
  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: getResetPasswordUrl()
    })

    if (error) {
      return {
        success: false,
        error: error.message
      }
    }

    return {
      success: true,
      data: { message: 'Şifre sıfırlama emaili gönderildi' }
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Şifre sıfırlama emaili gönderilirken bir hata oluştu'
    }
  }
}

/**
 * Yeni şifre belirle (şifre sıfırlama sonrası)
 */
export const updatePassword = async (newPassword: string): Promise<AuthResult> => {
  try {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword
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
        message: 'Şifre başarıyla güncellendi'
      }
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Şifre güncellenirken bir hata oluştu'
    }
  }
} 