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

## 3. OAuth Provider Kurulumu

### 3.1 Google OAuth Kurulumu

#### 3.1.1 Google Cloud Console'da OAuth 2.0 Client ID Oluşturma

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

#### 3.1.2 Supabase'de Google Provider'ı Etkinleştirme

1. Supabase Dashboard > Authentication > Providers
2. Google provider'ını bulun ve "Enable" yapın
3. Google Cloud Console'dan aldığınız Client ID ve Client Secret'ı girin
4. "Save" butonuna tıklayın

### 3.2 GitHub OAuth Kurulumu

#### 3.2.1 GitHub'da OAuth App Oluşturma

1. [GitHub Settings > Developer settings > OAuth Apps](https://github.com/settings/developers)'a gidin
2. "New OAuth App" butonuna tıklayın
3. Application name: "Leziz App" (veya istediğiniz bir isim)
4. Homepage URL: `http://localhost:3000` (development için)
5. Authorization callback URL: `https://your-project-ref.supabase.co/auth/v1/callback`
6. "Register application" butonuna tıklayın
7. Client ID ve Client Secret'ı not edin

#### 3.2.2 Supabase'de GitHub Provider'ı Etkinleştirme

1. Supabase Dashboard > Authentication > Providers
2. GitHub provider'ını bulun ve "Enable" yapın
3. GitHub'dan aldığınız Client ID ve Client Secret'ı girin
4. "Save" butonuna tıklayın

### 3.3 Facebook OAuth Kurulumu

#### 3.3.1 Facebook Developer Console'da App Oluşturma

1. [Facebook Developers](https://developers.facebook.com/)'a gidin
2. "Create App" butonuna tıklayın
3. App type olarak "Consumer" seçin
4. App name: "Leziz App" (veya istediğiniz bir isim)
5. App contact email girin
6. "Create App" butonuna tıklayın

#### 3.3.2 Facebook Login Ürününü Ekleme

1. App Dashboard'da "Add Product" butonuna tıklayın
2. "Facebook Login" ürününü bulun ve "Set Up" butonuna tıklayın
3. Platform olarak "Web" seçin
4. Site URL: `http://localhost:3000` (development için)
5. "Save" butonuna tıklayın

#### 3.3.3 Facebook App Settings

1. Sol menüden "Settings" > "Basic" seçin
2. App ID ve App Secret'ı not edin
3. "Add Platform" > "Website" seçin
4. Site URL: `http://localhost:3000` ekleyin
5. "Save Changes" butonuna tıklayın

#### 3.3.4 Facebook Login Settings

1. Sol menüden "Facebook Login" > "Settings" seçin
2. Valid OAuth Redirect URIs'e şunu ekleyin:
   ```
   https://your-project-ref.supabase.co/auth/v1/callback
   ```
3. "Save Changes" butonuna tıklayın

#### 3.3.5 Supabase'de Facebook Provider'ı Etkinleştirme

1. Supabase Dashboard > Authentication > Providers
2. Facebook provider'ını bulun ve "Enable" yapın
3. Facebook'tan aldığınız App ID ve App Secret'ı girin
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
3. İstediğiniz sosyal medya platformu ile giriş yapın:
   - Google ile Giriş Yap
   - GitHub ile Giriş Yap
   - Facebook ile Giriş Yap
4. Başarılı bir şekilde giriş yapıldığını kontrol edin

## 6. Sorun Giderme

### Yaygın Hatalar:

1. **"Invalid redirect URI" hatası**: 
   - Google: Google Cloud Console'da redirect URI'yi doğru şekilde ayarladığınızdan emin olun
   - GitHub: GitHub OAuth App'te callback URL'yi kontrol edin
   - Facebook: Facebook Login Settings'te Valid OAuth Redirect URIs'i kontrol edin

2. **"Client ID not found" hatası**: Supabase'de provider ayarlarını kontrol edin

3. **"App not configured" hatası**: Facebook App'inizin "Live" modda olduğundan emin olun

4. **Environment variables bulunamıyor**: `.env.local` dosyasının doğru konumda olduğundan emin olun

### Debug İpuçları:

- Browser console'da hataları kontrol edin
- Supabase Dashboard > Logs bölümünde authentication loglarını inceleyin
- Network tab'ında OAuth callback isteklerini kontrol edin
- Facebook App'inizin development modunda olduğundan emin olun (production için review gerekebilir)

### Production Deployment

Production'a deploy ederken:

1. **Google**: Authorized redirect URIs'e production URL'nizi ekleyin
2. **GitHub**: Authorization callback URL'yi production URL'si ile güncelleyin
3. **Facebook**: Site URL ve Valid OAuth Redirect URIs'i production URL'si ile güncelleyin
4. **Environment variables**: Production environment'ında doğru değerleri kullandığınızdan emin olun 