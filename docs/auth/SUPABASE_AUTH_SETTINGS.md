# Supabase Auth Ayarları

Bu dokümantasyon, Leziz projesinin auth işlemleri için Supabase konfigürasyonunu açıklar.

## Production URL Konfigürasyonu

Proje production'da `https://leziz.vercel.app/` URL'ini kullanmaktadır. Auth işlemleri için aşağıdaki ayarları yapmanız gerekmektedir.

## Supabase Dashboard Ayarları

### 1. Authentication > URL Configuration

Supabase Dashboard'da **Authentication > URL Configuration** bölümünde aşağıdaki URL'leri ekleyin:

#### Site URL
```
https://leziz.vercel.app
```

#### Redirect URLs
```
https://leziz.vercel.app/auth/callback
https://leziz.vercel.app/auth/reset-password
```

### 2. Email Templates

Email template'lerinde kullanılan URL'lerin doğru olduğundan emin olun:

#### Confirm Signup Email
- **Action URL**: `{{ .SiteURL }}/auth/callback`

#### Reset Password Email  
- **Action URL**: `{{ .SiteURL }}/auth/reset-password`

### 3. OAuth Providers (Eğer kullanılıyorsa)

OAuth provider'lar için redirect URL'leri:

#### Google OAuth
```
https://leziz.vercel.app/auth/callback
```

#### GitHub OAuth
```
https://leziz.vercel.app/auth/callback
```

## Development vs Production

Proje otomatik olarak environment'a göre URL'leri ayarlar:

- **Development**: `http://localhost:3000`
- **Production**: `https://leziz.vercel.app`

Bu ayarlar `app/lib/config/supabase.ts` dosyasında tanımlanmıştır.

## Environment Variables

Production'da aşağıdaki environment variable'ların doğru ayarlandığından emin olun:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NODE_ENV=production
```

## Test Etme

1. Production'da auth işlemlerini test edin
2. Email confirmation link'lerinin doğru URL'e yönlendirdiğini kontrol edin
3. Password reset link'lerinin çalıştığını doğrulayın
4. OAuth provider'ların (eğer kullanılıyorsa) doğru çalıştığını test edin

## Sorun Giderme

### Auth callback çalışmıyor
- Supabase Dashboard'da redirect URL'lerin doğru eklendiğini kontrol edin
- Environment variable'ların doğru ayarlandığından emin olun

### Email link'leri yanlış URL'e yönlendiriyor
- Email template'lerindeki Action URL'leri kontrol edin
- Site URL'in doğru ayarlandığından emin olun

### Development'ta çalışıyor ama production'da çalışmıyor
- Production environment variable'larını kontrol edin
- Supabase Dashboard'da production URL'lerinin eklendiğinden emin olun

## 🔧 Manuel Yapılması Gereken Ayarlar

### 1. Email OTP Expiry Ayarı

**Sorun:** Email OTP expiry 1 saatten fazla ayarlanmış
**Çözüm:** 

1. [Supabase Dashboard](https://supabase.com/dashboard) açın
2. Projenizi seçin
3. Sol menüden **"Authentication"** seçin
4. **"Providers"** sekmesine gidin
5. **"Email"** provider'ını bulun
6. **"OTP Expiry"** değerini **60 dakikadan küçük** bir değere ayarlayın:
   - **Önerilen:** 10-30 dakika
   - **Varsayılan:** 10 dakika

### 2. HaveIBeenPwned Şifre Kontrolü

**Sorun:** Compromised password kontrolü aktif değil
**Çözüm:**

1. [Supabase Dashboard](https://supabase.com/dashboard) açın
2. Projenizi seçin
3. Sol menüden **"Authentication"** seçin
4. **"Passwords"** sekmesine gidin
5. **"Check passwords against HaveIBeenPwned"** seçeneğini **aktif edin**
6. **"Save"** butonuna tıklayın

## 📋 Kontrol Listesi

### SQL Dosyaları (Otomatik)
- [x] `supabaseSql/6.optimize-rls-policies.sql` - RLS optimizasyonları
- [x] `supabaseSql/7.fix-remaining-issues.sql` - Kalan sorunlar

### Dashboard Ayarları (Manuel)
- [ ] Email OTP Expiry: 60 dakikadan az
- [ ] HaveIBeenPwned: Aktif

## 🚀 Sonuç

Bu ayarları yaptıktan sonra:
- ✅ Tüm Supabase uyarıları çözülecek
- ✅ Performans artacak
- ✅ Güvenlik seviyesi yükselecek
- ✅ Best practice'lere uygun hale gelecek

## 📞 Destek

Herhangi bir sorun yaşarsanız:
1. Supabase Discord topluluğuna katılın
2. Supabase dokümantasyonunu inceleyin
3. GitHub Issues'da sorun bildirin

---

**Not:** SQL dosyalarını çalıştırdıktan sonra bu manuel ayarları da yapmayı unutmayın! 