import { getSupabaseClient } from '../supabase/client'
import type { AuthResult, UserProfileUpdates } from './types'

const supabase = getSupabaseClient()

/**
 * Kullanıcı bilgilerini güncelle
 */
export const updateUserProfile = async (updates: UserProfileUpdates): Promise<AuthResult> => {
  try {
    const { data, error } = await supabase.auth.updateUser(updates)

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
        message: 'Kullanıcı bilgileri güncellendi'
      }
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Kullanıcı bilgileri güncellenirken bir hata oluştu'
    }
  }
}

/**
 * Kullanıcı hesabını sil
 */
export const deleteUser = async (): Promise<AuthResult> => {
  try {
    const { error } = await supabase.auth.admin.deleteUser(
      (await supabase.auth.getUser()).data.user?.id || ''
    )

    if (error) {
      return {
        success: false,
        error: error.message
      }
    }

    return {
      success: true,
      data: { message: 'Hesap başarıyla silindi' }
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Hesap silinirken bir hata oluştu'
    }
  }
} 