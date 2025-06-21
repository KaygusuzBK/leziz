# Supabase Kurulum Rehberi

## 1. Supabase Projesi Oluşturma

1. [Supabase Dashboard](https://supabase.com/dashboard)'a gidin
2. "New Project" butonuna tıklayın
3. Proje adını girin (örn: "leziz-app")
4. Database şifresi belirleyin
5. Region seçin (en yakın bölgeyi seçin)
6. "Create new project" butonuna tıklayın

## 2. Environment Variables

Proje oluşturulduktan sonra, `.env.local` dosyası oluşturun ve aşağıdaki değişkenleri ekleyin:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

Bu değerleri Supabase Dashboard > Settings > API bölümünden bulabilirsiniz.

## 3. Google OAuth Kurulumu

### 3.1 Google Cloud Console'da OAuth 2.0 Client ID Oluşturma

1. [Google Cloud Console](https://console.cloud.google.com/)'a gidin
2. Yeni bir proje oluşturun veya mevcut projeyi seçin
3. "APIs & Services" > "Credentials" bölümüne gidin
4. "Create Credentials" > "OAuth 2.0 Client IDs" seçin
5. Application type olarak "Web application" seçin
6. Authorized redirect URIs'e şunu ekleyin:
   ```
   https://your-project-ref.supabase.co/auth/v1/callback
   ```
7. Client ID ve Client Secret'ı not edin

### 3.2 Supabase'de Google Provider'ı Etkinleştirme

1. Supabase Dashboard > Authentication > Providers
2. Google provider'ını bulun ve "Enable" yapın
3. Google Cloud Console'dan aldığınız Client ID ve Client Secret'ı girin
4. "Save" butonuna tıklayın

## 4. Database Schema (Opsiyonel)

Eğer kullanıcı profilleri için ek tablolar istiyorsanız:

```sql
-- Kullanıcı profilleri için tablo
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS (Row Level Security) etkinleştirme
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Kullanıcıların sadece kendi profillerini görebilmesi
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

-- Kullanıcıların kendi profillerini güncelleyebilmesi
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Yeni kullanıcı kaydolduğunda otomatik profil oluşturma
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
```

## 5. Test Etme

1. Uygulamayı başlatın: `npm run dev`
2. "Giriş Yap" veya "Kayıt Ol" butonuna tıklayın
3. "Google ile Giriş Yap" butonuna tıklayın
4. Google hesabınızla giriş yapın
5. Başarılı bir şekilde giriş yapıldığını kontrol edin

## 6. Sorun Giderme

### Yaygın Hatalar:

1. **"Invalid redirect URI" hatası**: Google Cloud Console'da redirect URI'yi doğru şekilde ayarladığınızdan emin olun
2. **"Client ID not found" hatası**: Supabase'de Google provider ayarlarını kontrol edin
3. **Environment variables bulunamıyor**: `.env.local` dosyasının doğru konumda olduğundan emin olun

### Debug İpuçları:

- Browser console'da hataları kontrol edin
- Supabase Dashboard > Logs bölümünde authentication loglarını inceleyin
- Network tab'ında OAuth callback isteklerini kontrol edin 