# Production URL Kurulumu

Bu dokümantasyon, Leziz projesinin production URL'i (`https://leziz.vercel.app/`) ile auth işlemlerinin nasıl yapılandırıldığını açıklar.

## 🎯 Yapılan Değişiklikler

### 1. URL Yönetimi Merkezi Hale Getirildi

`app/lib/config/supabase.ts` dosyasına utility fonksiyonları eklendi:

```typescript
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
```

### 2. Supabase Client Güncellendi

`app/lib/supabase/client.ts` dosyasında auth konfigürasyonu güncellendi:

```typescript
return createClient<Database>(supabaseConfig.url, supabaseConfig.anonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
    redirectTo: getAuthCallbackUrl()
  }
})
```

### 3. Auth Callback Route Güncellendi

`app/auth/callback/route.ts` dosyasında redirect URL'i güncellendi:

```typescript
// URL to redirect to after sign in process completes
return NextResponse.redirect(getBaseUrl());
```

### 4. Auth Fonksiyonları Güncellendi

#### SignUp Fonksiyonu
`app/lib/auth/authentication.ts` dosyasında email redirect URL'i eklendi:

```typescript
const { data, error } = await supabase.auth.signUp({
  email,
  password,
  options: {
    emailRedirectTo: getAuthCallbackUrl()
  }
})
```

#### Password Reset Fonksiyonu
`app/lib/auth/password.ts` dosyasında redirect URL'i güncellendi:

```typescript
const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
  redirectTo: getResetPasswordUrl()
})
```

### 5. Test Fonksiyonları Eklendi

`app/lib/config/url-test.ts` dosyası oluşturuldu:

```typescript
export const testUrlConfiguration = () => {
  // URL'leri test etmek için utility fonksiyon
}

export const validateProductionUrls = () => {
  // Production URL'lerini doğrulamak için fonksiyon
}
```

### 6. Developer Bar'a URL Test Eklendi

`app/components/DeveloperBar.tsx` dosyasına URL test butonu eklendi.

## 🔧 Supabase Dashboard Ayarları

### Authentication > URL Configuration

Supabase Dashboard'da aşağıdaki URL'leri eklemeniz gerekiyor:

#### Site URL
```
https://leziz.vercel.app
```

#### Redirect URLs
```
https://leziz.vercel.app/auth/callback
https://leziz.vercel.app/auth/reset-password
```

### Email Templates

Email template'lerinde Action URL'leri şu şekilde olmalı:

- **Confirm Signup**: `{{ .SiteURL }}/auth/callback`
- **Reset Password**: `{{ .SiteURL }}/auth/reset-password`

## 🧪 Test Etme

### Development'ta Test

1. Developer Bar'ı açın (sağ alt köşe)
2. "🌐 URL Test" butonuna tıklayın
3. Console'da URL'lerin doğru olduğunu kontrol edin

### Production'ta Test

1. Auth işlemlerini test edin (kayıt ol, giriş yap)
2. Email confirmation link'lerinin çalıştığını kontrol edin
3. Password reset link'lerinin çalıştığını doğrulayın

## 📋 Environment Variables

Production'da aşağıdaki environment variable'ların doğru ayarlandığından emin olun:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NODE_ENV=production
```

## 🚀 Deployment

1. Vercel'de environment variable'ları ayarlayın
2. Supabase Dashboard'da URL'leri ekleyin
3. Deploy edin ve test edin

## 🔍 Sorun Giderme

### Auth callback çalışmıyor
- Supabase Dashboard'da redirect URL'lerin doğru eklendiğini kontrol edin
- Environment variable'ların doğru ayarlandığından emin olun

### Email link'leri yanlış URL'e yönlendiriyor
- Email template'lerindeki Action URL'leri kontrol edin
- Site URL'in doğru ayarlandığından emin olun

### Development'ta çalışıyor ama production'da çalışmıyor
- Production environment variable'larını kontrol edin
- Supabase Dashboard'da production URL'lerinin eklendiğinden emin olun

## 📝 Notlar

- Development'ta `http://localhost:3000` kullanılır
- Production'da `https://leziz.vercel.app` kullanılır
- URL'ler otomatik olarak environment'a göre ayarlanır
- Tüm auth işlemleri production URL'i ile uyumlu hale getirildi 