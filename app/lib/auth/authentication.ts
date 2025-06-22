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

    if (data.user) {
      // After successful sign-up, create a profile entry
      const { error: profileError } = await supabase
        .from('user_profiles')
        .insert({
          id: data.user.id,
          email: data.user.email
        });

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