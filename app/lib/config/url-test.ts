import { getBaseUrl, getAuthCallbackUrl, getResetPasswordUrl } from './supabase'

/**
 * URL konfigürasyonunu test etmek için utility fonksiyonları
 */
export const testUrlConfiguration = () => {
  const isDevelopment = process.env.NODE_ENV === 'development'
  
  console.log('🔧 URL Konfigürasyon Testi')
  console.log('========================')
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`)
  console.log(`Base URL: ${getBaseUrl()}`)
  console.log(`Auth Callback URL: ${getAuthCallbackUrl()}`)
  console.log(`Reset Password URL: ${getResetPasswordUrl()}`)
  console.log('========================')
  
  return {
    isDevelopment,
    baseUrl: getBaseUrl(),
    authCallbackUrl: getAuthCallbackUrl(),
    resetPasswordUrl: getResetPasswordUrl()
  }
}

/**
 * Production URL'lerini kontrol et
 */
export const validateProductionUrls = () => {
  const baseUrl = getBaseUrl()
  const authCallbackUrl = getAuthCallbackUrl()
  const resetPasswordUrl = getResetPasswordUrl()
  
  const isProduction = process.env.NODE_ENV === 'production'
  
  if (isProduction) {
    const expectedBaseUrl = 'https://leziz.vercel.app'
    const expectedAuthCallback = 'https://leziz.vercel.app/auth/callback'
    const expectedResetPassword = 'https://leziz.vercel.app/auth/reset-password'
    
    const isValid = 
      baseUrl === expectedBaseUrl &&
      authCallbackUrl === expectedAuthCallback &&
      resetPasswordUrl === expectedResetPassword
    
    if (!isValid) {
      console.error('❌ Production URL konfigürasyonu hatalı!')
      console.error(`Expected base URL: ${expectedBaseUrl}, Got: ${baseUrl}`)
      console.error(`Expected auth callback: ${expectedAuthCallback}, Got: ${authCallbackUrl}`)
      console.error(`Expected reset password: ${expectedResetPassword}, Got: ${resetPasswordUrl}`)
      return false
    }
    
    console.log('✅ Production URL konfigürasyonu doğru!')
    return true
  }
  
  return true
} 