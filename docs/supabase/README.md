# ⚡ Supabase

Bu klasör, Leziz projesinin Supabase konfigürasyonu ve optimizasyonları ile ilgili dokümantasyonu içerir.

## 📁 Dosyalar

- **[SUPABASE_RLS_OPTIMIZATION.md](SUPABASE_RLS_OPTIMIZATION.md)** - Row Level Security optimizasyonu

## 🚀 Hızlı Başlangıç

1. **RLS Optimizasyonu**: [SUPABASE_RLS_OPTIMIZATION.md](SUPABASE_RLS_OPTIMIZATION.md) dosyasını inceleyin
2. **SQL Scriptleri**: `supabaseSql/` klasöründeki scriptleri çalıştırın

## 🔧 Optimizasyonlar

### Row Level Security (RLS)
- ✅ `auth.uid()` optimizasyonu
- ✅ Çoklu permissive politikalar birleştirildi
- ✅ Performans indexleri eklendi
- ✅ Storage politikaları optimize edildi

### Veritabanı Performansı
- ✅ Composite indexler
- ✅ Partial indexler
- ✅ Query optimizasyonu
- ✅ Güvenlik iyileştirmeleri

## 📊 Veritabanı Yapısı

### Ana Tablolar
- `user_profiles` - Kullanıcı profilleri
- `recipes` - Tarifler
- `user_recipes` - Kullanıcı tarifleri
- `categories` - Kategoriler
- `user_favorites` - Favoriler
- `user_follows` - Takip sistemi

### Storage Buckets
- `avatars` - Kullanıcı avatarları
- `recipe-images` - Tarif resimleri

## 📞 Destek

Supabase ile ilgili sorun yaşarsanız:
- Supabase dokümantasyonunu inceleyin
- Supabase Discord topluluğuna katılın
- GitHub Issues'da sorun bildirin 