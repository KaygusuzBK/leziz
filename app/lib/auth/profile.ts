import { getSupabaseClient } from '../supabase/client'
import type { AuthResult, UserProfileUpdates } from './types'

const supabase = getSupabaseClient()

/**
 * Kullanıcı profil bilgilerini getir
 */
export const getUserProfile = async (userId: string): Promise<AuthResult> => {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle()

    if (error) {
      return {
        success: false,
        error: error.message
      }
    }

    return {
      success: true,
      data: data
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Profil bilgileri alınırken bir hata oluştu'
    }
  }
}

/**
 * Kullanıcı bilgilerini güncelle
 */
export const updateUserProfile = async (updates: UserProfileUpdates): Promise<AuthResult> => {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return {
        success: false,
        error: 'Kullanıcı bulunamadı'
      }
    }

    // Önce user_profiles tablosunu güncelle
    const { data, error } = await supabase
      .from('user_profiles')
      .upsert({
        id: user.id,
        email: user.email,
        full_name: updates.data?.full_name,
        bio: updates.data?.bio,
        location: updates.data?.location,
        website: updates.data?.website,
        avatar_url: updates.data?.avatar_url
      })
      .select()
      .single()

    if (error) {
      return {
        success: false,
        error: error.message
      }
    }

    // Eğer email güncellenecekse auth.users tablosunu da güncelle
    if (updates.email) {
      const { error: authError } = await supabase.auth.updateUser({
        email: updates.email
      })

      if (authError) {
        return {
          success: false,
          error: authError.message
        }
      }
    }

    return {
      success: true,
      data: {
        user: data,
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
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return {
        success: false,
        error: 'Kullanıcı bulunamadı'
      }
    }

    // user_profiles tablosundan sil (CASCADE ile otomatik silinir)
    const { error } = await supabase
      .from('user_profiles')
      .delete()
      .eq('id', user.id)

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

/**
 * Kullanıcı istatistiklerini getir
 */
export const getUserStats = async (userId: string): Promise<AuthResult> => {
  try {
    // Tarif sayısı
    const { count: recipeCount } = await supabase
      .from('recipes')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)

    // Beğenilen tarif sayısı
    const { count: favoriteCount } = await supabase
      .from('user_favorites')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)

    // Takipçi sayısı
    const { count: followerCount } = await supabase
      .from('user_follows')
      .select('*', { count: 'exact', head: true })
      .eq('following_id', userId)

    return {
      success: true,
      data: {
        recipeCount: recipeCount || 0,
        favoriteCount: favoriteCount || 0,
        followerCount: followerCount || 0
      }
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'İstatistikler alınırken bir hata oluştu'
    }
  }
} 