import { getSupabaseClient } from '../supabase/client'
import type { AuthResult, UserProfileUpdates, UserProfileData } from './types'

const supabase = getSupabaseClient()!

/**
 * Kullanıcı profil bilgilerini getir
 */
export const getUserProfile = async (): Promise<AuthResult> => {
  try {
    // Önce mevcut kullanıcı bilgilerini al
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return {
        success: false,
        error: 'Kullanıcı bulunamadı'
      }
    }

    // user_profiles tablosundan profil bilgilerini al
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', user.id as string)
      .maybeSingle()

    if (error) {
      return {
        success: false,
        error: error.message
      }
    }

    // Eğer profil yoksa, otomatik olarak oluştur
    if (!data) {
      const { data: newProfile, error: createError } = await supabase
        .from('user_profiles')
        .insert([
          {
            id: user.id,
            email: user.email,
            full_name: user.user_metadata?.full_name || user.user_metadata?.name || '',
            bio: '',
            location: '',
            website: '',
            avatar_url: user.user_metadata?.avatar_url || null
          }
        ] as Partial<UserProfileData>[])
        .select()
        .single()

      if (createError) {
        return {
          success: false,
          error: createError.message
        }
      }

      return {
        success: true,
        data: newProfile
      }
    }

    return {
      success: true,
      data: data
    }
  } catch (error: unknown) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Profil bilgileri alınırken bir hata oluştu'
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

    // Güncellenecek verileri hazırla
    const updateData: Partial<UserProfileData> = {
      id: user.id,
      email: user.email
    }

    // Sadece değişen alanları ekle
    if (updates.data?.full_name !== undefined) updateData.full_name = updates.data.full_name
    if (updates.data?.bio !== undefined) updateData.bio = updates.data.bio
    if (updates.data?.location !== undefined) updateData.location = updates.data.location
    if (updates.data?.website !== undefined) updateData.website = updates.data.website
    if (updates.data?.avatar_url !== undefined) updateData.avatar_url = updates.data.avatar_url

    // user_profiles tablosunu güncelle (upsert ile)
    const { data, error } = await supabase
      .from('user_profiles')
      .upsert(updateData)
      .select()
      .single()

    if (error) {
      console.error('Profile update error:', error)
      return {
        success: false,
        error: error.message
      }
    }

    // Eğer email güncellenecekse auth.users tablosunu da güncelle
    if (updates.email && updates.email !== user.email) {
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
  } catch (error: unknown) {
    console.error('Profile update exception:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Kullanıcı bilgileri güncellenirken bir hata oluştu'
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
      .eq('id', user.id as string)

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
  } catch (error: unknown) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Hesap silinirken bir hata oluştu'
    }
  }
}

/**
 * Kullanıcı istatistiklerini getir
 */
export const getUserStats = async (): Promise<AuthResult> => {
  try {
    // Tarif sayısı
    const { count: recipeCount } = await supabase
      .from('recipes')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id as string)

    // Beğenilen tarif sayısı
    const { count: favoriteCount } = await supabase
      .from('user_favorites')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id as string)

    // Takipçi sayısı
    const { count: followerCount } = await supabase
      .from('user_follows')
      .select('*', { count: 'exact', head: true })
      .eq('following_id', user.id as string)

    return {
      success: true,
      data: {
        recipeCount: recipeCount || 0,
        favoriteCount: favoriteCount || 0,
        followerCount: followerCount || 0
      }
    }
  } catch (error: unknown) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'İstatistikler alınırken bir hata oluştu'
    }
  }
} 