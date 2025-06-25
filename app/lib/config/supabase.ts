export const supabaseConfig = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
}

// URL yönetimi için utility fonksiyonları
export const getBaseUrl = (): string => {
  const isDevelopment = process.env.NODE_ENV === 'development'
  return isDevelopment 
    ? 'http://localhost:3000' 
    : 'https://leziz.vercel.app'
}

export const getAuthCallbackUrl = (): string => {
  return `${getBaseUrl()}/auth/callback`
}

export const getResetPasswordUrl = (): string => {
  return `${getBaseUrl()}/auth/reset-password`
}

// Temel environment değişkenlerinin varlığını kontrol et
export const validateSupabaseConfig = (): boolean => {
  if (!supabaseConfig.url) {
    console.error('NEXT_PUBLIC_SUPABASE_URL is not defined')
    return false
  }
  
  if (!supabaseConfig.anonKey) {
    console.error('NEXT_PUBLIC_SUPABASE_ANON_KEY is not defined')
    return false
  }
  
  return true
}

// Service role key'in varlığını kontrol et (sadece server-side işlemler için)
export const validateServiceRoleKey = (): boolean => {
  if (!supabaseConfig.serviceRoleKey) {
    console.warn('SUPABASE_SERVICE_ROLE_KEY is not defined - server-side admin operations will not work')
    return false
  }
  
  return true
} 