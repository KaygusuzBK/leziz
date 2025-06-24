# Supabase Auth Ayarları

Bu dosya, Supabase Dashboard'dan manuel olarak yapılması gereken Auth ayarlarını açıklar.

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