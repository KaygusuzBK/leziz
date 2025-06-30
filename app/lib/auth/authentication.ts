import { getSupabaseClient } from '../supabase/client'
import type { AuthResult } from './types'
import { getAuthCallbackUrl } from '../config/supabase'

const supabase = getSupabaseClient()!

/**
 * Email ve şifre ile giriş yap
 */
export const signInWithEmail = async (email: string, password: string, redirectUrl?: string): Promise<AuthResult> => {
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

    // Eğer redirect URL belirtilmişse, o URL'e yönlendir
    if (redirectUrl && typeof window !== 'undefined') {
      window.location.href = redirectUrl;
    }

    return {
      success: true,
      data: {
        user: data.user,
        session: data.session
      }
    }
  } catch (error: unknown) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Giriş yapılırken bir hata oluştu'
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
      password,
      options: {
        emailRedirectTo: getAuthCallbackUrl()
      }
    })

    if (error) {
      return {
        success: false,
        error: error.message
      }
    }

    if (data.user) {
      // After successful sign-up, create a profile entry
      const { error: profileError } = await supabase
        .from('user_profiles')
        .insert([
          {
            id: data.user.id,
            email: data.user.email || ''
          }
        ] as { id: string; email: string }[])

      if (profileError) {
        // If profile creation fails, we might want to handle this,
        // but for now, we'll log it and proceed.
        // In a real-world app, you might want to delete the auth user
        // or queue a retry.
        console.error('Error creating user profile:', profileError);
        return {
          success: false,
          error: 'User created, but profile creation failed.'
        };
      }
    }

    return {
      success: true,
      data: {
        user: data.user,
        session: data.session
      }
    }
  } catch (error: unknown) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Kayıt olurken bir hata oluştu'
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
  } catch (error: unknown) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Çıkış yapılırken bir hata oluştu'
    }
  }
} 