# Supabase RLS Optimizasyonu

Bu dosya, Supabase'deki Row Level Security (RLS) politikalarının performans sorunlarını çözmek için oluşturulmuştur.

## 🔍 Sorunlar

### 1. auth.uid() Performans Sorunu
- `auth.uid()` fonksiyonu her satır için yeniden değerlendiriliyor
- Bu, büyük ölçekte suboptimal query performansına neden oluyor
- **Çözüm**: `auth.uid()` yerine `(select auth.uid())` kullanmak

### 2. Çoklu Permissive Politikalar
- Aynı tablo için birden fazla SELECT politikası var
- Bu, query planner'ı karıştırıyor ve performansı düşürüyor
- **Çözüm**: Politikaları birleştirmek

## 🛠️ Çözüm Adımları

### 1. Supabase Dashboard'a Giriş
1. [Supabase Dashboard](https://supabase.com/dashboard) açın
2. Projenizi seçin
3. Sol menüden "SQL Editor" seçin

### 2. Optimizasyon SQL'ini Çalıştırın
1. `supabaseSql/6.optimize-rls-policies.sql` dosyasının içeriğini kopyalayın
2. SQL Editor'da yeni bir query oluşturun
3. Kodu yapıştırın ve "Run" butonuna tıklayın

### 3. Sonuçları Kontrol Edin
1. "Database" > "Policies" bölümüne gidin
2. Tüm tabloların politikalarının güncellendiğini kontrol edin
3. Artık uyarı mesajları görünmemeli

## 📊 Yapılan Değişiklikler

### Önceki Durum (Sorunlu)
```sql
-- Her satır için auth.uid() yeniden değerlendiriliyor
CREATE POLICY "Users can view own profile" ON public.user_profiles
  FOR SELECT USING (auth.uid() = id);

-- Çoklu permissive politikalar
CREATE POLICY "Users can view public recipes" ON public.recipes
  FOR SELECT USING (is_public = true);
CREATE POLICY "Users can view own recipes" ON public.recipes
  FOR SELECT USING (auth.uid() = user_id);
```

### Sonraki Durum (Optimize Edilmiş)
```sql
-- auth.uid() bir kez değerlendiriliyor
CREATE POLICY "Users can view own profile" ON public.user_profiles
  FOR SELECT USING ((select auth.uid()) = id);

-- Birleştirilmiş politikalar
CREATE POLICY "Users can view recipes" ON public.recipes
  FOR SELECT USING (
    is_public = true OR (select auth.uid()) = user_id
  );
```

## 🚀 Performans İyileştirmeleri

### 1. Indexler Eklendi
- `idx_user_profiles_id`: User profiles için hızlı arama
- `idx_recipes_user_id`: Kullanıcı tarifleri için hızlı arama
- `idx_recipes_is_public`: Public tarifler için filtreleme
- Composite indexler: Çoklu koşul sorguları için
- Partial indexler: Sadece public tarifler için

### 2. Politikalar Optimize Edildi
- Tüm `auth.uid()` çağrıları `(select auth.uid())` ile değiştirildi
- Çoklu SELECT politikaları birleştirildi
- Storage politikaları da optimize edildi

## 📋 Etkilenen Tablolar

1. **public.user_profiles**
   - View, Update, Insert politikaları optimize edildi

2. **public.recipes**
   - Çoklu SELECT politikaları birleştirildi
   - Tüm CRUD politikaları optimize edildi

3. **public.user_recipes**
   - Çoklu SELECT politikaları birleştirildi
   - Tüm CRUD politikaları optimize edildi

4. **public.user_favorites**
   - View, Insert, Delete politikaları optimize edildi

5. **public.user_follows**
   - View, Insert, Delete politikaları optimize edildi

6. **storage.objects**
   - Avatar yükleme/görüntüleme politikaları optimize edildi

## ⚠️ Önemli Notlar

1. **Güvenlik**: Bu optimizasyonlar güvenliği etkilemez, sadece performansı iyileştirir
2. **Uyumluluk**: Mevcut uygulama kodunuzda değişiklik yapmanız gerekmez
3. **Yedekleme**: SQL'i çalıştırmadan önce veritabanınızı yedekleyin
4. **Test**: Production'a geçmeden önce test ortamında deneyin

## 🔧 Manuel Kontrol

Optimizasyon sonrası şu komutlarla kontrol edebilirsiniz:

```sql
-- Politikaları listele
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE schemaname = 'public';

-- Indexleri listele
SELECT indexname, tablename, indexdef 
FROM pg_indexes 
WHERE schemaname = 'public' 
AND indexname LIKE 'idx_%';
```

## 📞 Destek

Herhangi bir sorun yaşarsanız:
1. Supabase Discord topluluğuna katılın
2. GitHub Issues'da sorun bildirin
3. Supabase dokümantasyonunu inceleyin

---

**Not**: Bu optimizasyonlar Supabase'in önerdiği best practice'lere uygun olarak hazırlanmıştır. 