# Supabase Setup Guide

## Hızlı Kurulum

1. **SQL Dosyasını Çalıştırın**: `supabase-setup.sql` dosyasını Supabase SQL Editor'da çalıştırın
2. **Storage Bucket Oluşturun**: Dashboard > Storage > New Bucket > `avatars` (public)
3. **Environment Variables**: `.env.local` dosyasını kontrol edin

## Detaylı Kurulum Adımları

### 1. SQL Kurulumu

Supabase Dashboard > SQL Editor'a gidin ve `supabase-setup.sql` dosyasını çalıştırın. Bu dosya şunları oluşturur:

- `user_profiles` tablosu
- `recipes` tablosu  
- `categories` tablosu
- `user_favorites` tablosu
- `user_follows` tablosu
- RLS (Row Level Security) politikaları
- Trigger fonksiyonları

### 2. Storage Bucket Setup

Profil fotoğrafları için storage bucket oluşturun:

1. Supabase Dashboard'a gidin
2. Storage sekmesine tıklayın
3. "New bucket" butonuna tıklayın
4. Bucket adı: `avatars`
5. Public bucket olarak işaretleyin

### 3. Environment Variables

`.env.local` dosyanızda şu değişkenlerin olduğundan emin olun:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Authentication Setup

1. Authentication > Settings > Site URL: `http://localhost:3000`
2. Redirect URLs: `http://localhost:3000/auth/callback`

### 5. OAuth Providers (Opsiyonel)

Google, GitHub veya Facebook ile giriş için:

1. **Google**: Google Cloud Console'da OAuth 2.0 client oluşturun
2. **GitHub**: GitHub Developer Settings'de OAuth App oluşturun  
3. **Facebook**: Facebook Developer Console'da App oluşturun
4. Her provider için Client ID ve Client Secret'ı Supabase'e ekleyin

## Tablo Yapısı

### user_profiles
- `id` (UUID, Primary Key)
- `email` (TEXT, Unique)
- `full_name` (TEXT)
- `bio` (TEXT)
- `location` (TEXT)
- `website` (TEXT)
- `avatar_url` (TEXT)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### recipes
- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key)
- `title` (TEXT)
- `description` (TEXT)
- `ingredients` (JSONB)
- `instructions` (JSONB)
- `cooking_time` (INTEGER)
- `difficulty` (TEXT)
- `servings` (INTEGER)
- `image_url` (TEXT)
- `is_public` (BOOLEAN)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### categories
- `id` (UUID, Primary Key)
- `name` (TEXT, Unique)
- `description` (TEXT)
- `image_url` (TEXT)
- `created_at` (TIMESTAMP)

## RLS Politikaları

Tüm tablolar için Row Level Security etkinleştirilmiştir:

- Kullanıcılar sadece kendi verilerini okuyabilir/güncelleyebilir
- Public veriler (recipes, categories) herkes tarafından görüntülenebilir
- Storage bucket'ları için güvenli dosya yükleme politikaları

## Sorun Giderme

### Profile Sayfasına Erişim Sorunu
1. Kullanıcının giriş yaptığından emin olun
2. `user_profiles` tablosunun oluşturulduğunu kontrol edin
3. RLS politikalarının doğru ayarlandığını kontrol edin

### Avatar Yükleme Sorunu
1. `avatars` storage bucket'ının oluşturulduğunu kontrol edin
2. Storage RLS politikalarının doğru ayarlandığını kontrol edin
3. Bucket'ın public olduğundan emin olun

### Database Bağlantı Sorunu
1. Environment variables'ların doğru olduğunu kontrol edin
2. Supabase projesinin aktif olduğunu kontrol edin
3. Network bağlantısını kontrol edin 