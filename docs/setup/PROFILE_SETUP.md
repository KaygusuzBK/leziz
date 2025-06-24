# Profile Sayfası Kurulum Rehberi

## 🚀 Hızlı Başlangıç

Profile sayfasına erişim sorunu yaşıyorsanız, aşağıdaki adımları takip edin:

### 1. Supabase Kurulumu

1. **Supabase Dashboard'a gidin**: https://supabase.com/dashboard
2. **Projenizi seçin** veya yeni proje oluşturun
3. **SQL Editor'a gidin**: Sol menüden "SQL Editor" seçin
4. **SQL dosyasını çalıştırın**: `supabase-setup.sql` dosyasının içeriğini kopyalayıp yapıştırın ve "Run" butonuna tıklayın

### 2. Storage Bucket Oluşturma

1. **Storage sekmesine gidin**: Sol menüden "Storage" seçin
2. **Yeni bucket oluşturun**: "New bucket" butonuna tıklayın
3. **Bucket adı**: `avatars` yazın
4. **Public bucket**: İşaretleyin
5. **Oluştur**: "Create bucket" butonuna tıklayın

### 3. Environment Variables Kontrolü

`.env.local` dosyanızda şu değişkenlerin olduğundan emin olun:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Bu değerleri Supabase Dashboard > Settings > API bölümünden bulabilirsiniz.

### 4. Uygulamayı Yeniden Başlatın

```bash
npm run dev
```

## 🔧 Detaylı Kurulum

### SQL Kurulumu Detayları

`supabase-setup.sql` dosyası şu tabloları oluşturur:

#### user_profiles Tablosu
- Kullanıcı profil bilgilerini saklar
- auth.users tablosu ile ilişkili
- RLS (Row Level Security) ile korunur

#### recipes Tablosu
- Tarif bilgilerini saklar
- Gelecekte kullanım için hazır

#### categories Tablosu
- Tarif kategorilerini saklar
- Örnek kategoriler otomatik eklenir

#### user_favorites Tablosu
- Kullanıcı favorilerini saklar

#### user_follows Tablosu
- Kullanıcı takip sistemini saklar

### RLS (Row Level Security) Politikaları

Tüm tablolar için güvenlik politikaları otomatik oluşturulur:

- Kullanıcılar sadece kendi verilerini okuyabilir/güncelleyebilir
- Public veriler herkes tarafından görüntülenebilir
- Storage bucket'ları için güvenli dosya yükleme

### Trigger Fonksiyonları

- Yeni kullanıcı kaydolduğunda otomatik profil oluşturma
- updated_at alanlarının otomatik güncellenmesi

## 🐛 Sorun Giderme

### Profile Sayfasına Erişim Sorunu

**Belirtiler:**
- Sayfa yüklenmiyor
- "Giriş Yapın" mesajı görünüyor
- Hata mesajları

**Çözümler:**
1. **Kullanıcı girişi kontrolü**: Giriş yaptığınızdan emin olun
2. **Database tabloları**: `user_profiles` tablosunun oluşturulduğunu kontrol edin
3. **RLS politikaları**: Supabase Dashboard > Authentication > Policies'den kontrol edin

### Avatar Yükleme Sorunu

**Belirtiler:**
- Fotoğraf yüklenmiyor
- "Avatar yüklenirken hata oluştu" mesajı

**Çözümler:**
1. **Storage bucket**: `avatars` bucket'ının oluşturulduğunu kontrol edin
2. **Bucket ayarları**: Public bucket olduğundan emin olun
3. **RLS politikaları**: Storage RLS politikalarının doğru ayarlandığını kontrol edin

### Database Bağlantı Sorunu

**Belirtiler:**
- "Database bağlantı hatası" mesajları
- Veriler yüklenmiyor

**Çözümler:**
1. **Environment variables**: `.env.local` dosyasını kontrol edin
2. **Supabase projesi**: Projenin aktif olduğunu kontrol edin
3. **Network**: İnternet bağlantınızı kontrol edin

## 📱 Test Etme

### 1. Giriş Yapma Testi
1. Uygulamayı açın: `http://localhost:3000`
2. "Giriş Yap" butonuna tıklayın
3. Google, GitHub veya Facebook ile giriş yapın
4. Başarılı giriş yapıldığını kontrol edin

### 2. Profile Sayfası Testi
1. Giriş yaptıktan sonra `/profile` sayfasına gidin
2. Profil bilgilerinin yüklendiğini kontrol edin
3. Form alanlarının düzenlenebilir olduğunu kontrol edin

### 3. Avatar Yükleme Testi
1. Profil fotoğrafı alanına tıklayın
2. Bir fotoğraf seçin
3. Yükleme işleminin başarılı olduğunu kontrol edin

### 4. Form Güncelleme Testi
1. Form alanlarını düzenleyin
2. "Profili Güncelle" butonuna tıklayın
3. Başarı mesajının göründüğünü kontrol edin

## 🔒 Güvenlik Notları

- Tüm kullanıcı verileri RLS ile korunur
- Kullanıcılar sadece kendi verilerini görebilir/güncelleyebilir
- Avatar dosyaları güvenli şekilde yüklenir
- E-posta adresi değiştirilemez (güvenlik için)

## 📞 Destek

Sorun yaşıyorsanız:

1. **Console hatalarını kontrol edin**: Browser Developer Tools > Console
2. **Network isteklerini kontrol edin**: Browser Developer Tools > Network
3. **Supabase loglarını kontrol edin**: Supabase Dashboard > Logs
4. **Environment variables'ları kontrol edin**: `.env.local` dosyası

## 🎯 Sonraki Adımlar

Profile sayfası çalıştıktan sonra:

1. **Tarif ekleme sistemi** geliştirilebilir
2. **Kullanıcı takip sistemi** eklenebilir
3. **Favori tarifler sistemi** geliştirilebilir
4. **Profil istatistikleri** genişletilebilir 