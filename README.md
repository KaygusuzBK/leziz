# 🍳 Leziz - Modern Yemek Tarifi Platformu

<div align="center">

![Leziz Logo](app/logo.jpg)

**Modern, kullanıcı dostu ve güvenli yemek tarifi paylaşım platformu**

[![Next.js](https://img.shields.io/badge/Next.js-15.3.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-2.50.0-green?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

[🚀 Canlı Demo](#) • [📖 Dokümantasyon](#-dokümantasyon) • [🛠️ Kurulum](#-kurulum) • [🤝 Katkıda Bulunma](#-katkıda-bulunma)

</div>

---

## ✨ Özellikler

### 🔐 **Güvenlik & Kimlik Doğrulama**
- Supabase Auth ile güvenli kullanıcı yönetimi
- JWT token tabanlı oturum yönetimi
- Row Level Security (RLS) ile veri güvenliği
- Şifre sıfırlama ve email doğrulama

### 🎨 **Kullanıcı Deneyimi**
- Responsive tasarım (mobil, tablet, desktop)
- Dark/Light tema desteği
- Modern ve sezgisel arayüz
- Hızlı yükleme süreleri
- Progressive Web App (PWA) desteği

### 📝 **Tarif Yönetimi**
- Zengin metin editörü ile tarif oluşturma
- Resim ve video yükleme
- Kategori bazlı organizasyon
- Etiketleme sistemi
- Arama ve filtreleme

### 👥 **Sosyal Özellikler**
- Kullanıcı profilleri
- Tarif beğenme ve kaydetme
- Kullanıcıları takip etme
- Yorum sistemi
- Tarif paylaşımı

### 🔍 **Gelişmiş Arama**
- Anlık arama önerileri
- Kategori bazlı filtreleme
- Zorluk seviyesi filtreleme
- Hazırlama süresi filtreleme
- Malzeme bazlı arama

## 🛠️ Teknoloji Stack'i

### **Frontend**
- **Next.js 15** - React framework with App Router
- **React 19** - UI kütüphanesi
- **TypeScript** - Tip güvenliği
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Modern UI componentleri
- **Lucide React** - İkon kütüphanesi

### **Backend & Veritabanı**
- **Supabase** - Backend as a Service
- **PostgreSQL** - İlişkisel veritabanı
- **Row Level Security** - Veri güvenliği
- **Real-time subscriptions** - Canlı güncellemeler

### **Deployment & Analytics**
- **Vercel** - Hosting platformu
- **Vercel Analytics** - Performans takibi
- **Vercel Speed Insights** - Hız optimizasyonu

## 📁 Proje Yapısı

```
leziz/
├── 📁 app/                          # Next.js App Router
│   ├── 📁 about/                    # Hakkımızda sayfası
│   ├── 📁 auth/                     # Kimlik doğrulama
│   │   └── 📁 callback/             # Auth callback
│   ├── 📁 categories/               # Kategori sayfaları
│   ├── 📁 components/               # UI Bileşenleri
│   │   ├── 📁 ui/                   # Temel UI bileşenleri
│   │   ├── CategoryCard.tsx         # Kategori kartı
│   │   ├── CreateRecipeModal.tsx    # Tarif oluşturma modalı
│   │   ├── Header.tsx               # Site başlığı
│   │   ├── Footer.tsx               # Site altbilgisi
│   │   ├── LoginModal.tsx           # Giriş modalı
│   │   ├── RecipeCard.tsx           # Tarif kartı
│   │   └── ...                      # Diğer bileşenler
│   ├── 📁 contact/                  # İletişim sayfası
│   ├── 📁 lib/                      # Yardımcı kütüphaneler
│   │   ├── 📁 auth/                 # Kimlik doğrulama
│   │   ├── 📁 config/               # Konfigürasyon
│   │   ├── 📁 context/              # React Context
│   │   ├── 📁 supabase/             # Supabase client
│   │   └── 📁 types/                # TypeScript tipleri
│   ├── 📁 profile/                  # Profil sayfaları
│   ├── 📁 recipes/                  # Tarif sayfaları
│   │   └── 📁 [id]/                 # Dinamik tarif sayfası
│   ├── 📁 settings/                 # Ayarlar sayfası
│   ├── globals.css                  # Global stiller
│   ├── layout.tsx                   # Root layout
│   └── page.tsx                     # Ana sayfa
├── 📁 components/                   # Global UI bileşenleri
├── 📁 docs/                         # 📚 Dokümantasyon
│   ├── 📁 auth/                     # Kimlik doğrulama rehberleri
│   ├── 📁 setup/                    # Kurulum rehberleri
│   └── 📁 supabase/                 # Supabase konfigürasyonu
├── 📁 lib/                          # Yardımcı kütüphaneler
├── 📁 public/                       # Statik dosyalar
├── 📁 supabaseSql/                  # Veritabanı scriptleri
├── .gitignore                       # Git ignore kuralları
├── components.json                  # Shadcn/ui konfigürasyonu
├── middleware.ts                    # Next.js middleware
├── next.config.ts                   # Next.js konfigürasyonu
├── package.json                     # Proje bağımlılıkları
├── tailwind.config.js               # Tailwind konfigürasyonu
└── tsconfig.json                    # TypeScript konfigürasyonu
```

## 🚀 Hızlı Başlangıç

### 📋 Ön Gereksinimler

- **Node.js** 18.17 veya üzeri
- **npm** veya **yarn** paket yöneticisi
- **Git** versiyon kontrol sistemi
- **Supabase** hesabı

### 🔧 Kurulum Adımları

#### 1. **Projeyi Klonlayın**
```bash
git clone https://github.com/KaygusuzBK/leziz.git
cd leziz
```

#### 2. **Bağımlılıkları Yükleyin**
```bash
npm install
# veya
yarn install
```

#### 3. **Environment Variables Oluşturun**
`.env.local` dosyası oluşturun:
```env
# Supabase Konfigürasyonu
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Opsiyonel: Analytics
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your_vercel_analytics_id
```

#### 4. **Supabase Projesini Kurun**
1. [Supabase Dashboard](https://supabase.com/dashboard) açın
2. Yeni proje oluşturun
3. SQL Editor'da sırasıyla şu dosyaları çalıştırın:
   ```sql
   -- 1. Temel tablo yapısı
   \i supabaseSql/1.supabase-setup.sql
   
   -- 2. Örnek veriler
   \i supabaseSql/3.sample-recipes.sql
   
   -- 3. RLS politikaları
   \i supabaseSql/6.optimize-rls-policies.sql
   
   -- 4. Son düzeltmeler
   \i supabaseSql/7.fix-remaining-issues.sql
   ```

#### 5. **Geliştirme Sunucusunu Başlatın**
```bash
npm run dev
# veya
yarn dev
```

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

## 📚 Dokümantasyon

### 🔐 **Kimlik Doğrulama**
- [Auth Kullanım Rehberi](docs/auth/AUTH_USAGE.md) - Kimlik doğrulama nasıl kullanılır
- [Auth Ayarları](docs/auth/SUPABASE_AUTH_SETTINGS.md) - Supabase Auth konfigürasyonu

### 🛠️ **Kurulum Rehberleri**
- [Supabase Kurulum](docs/setup/SUPABASE_SETUP.md) - Detaylı Supabase kurulumu
- [Profil Kurulum](docs/setup/PROFILE_SETUP.md) - Kullanıcı profili yapılandırması

### ⚡ **Optimizasyon**
- [RLS Optimizasyonu](docs/supabase/SUPABASE_RLS_OPTIMIZATION.md) - Veri güvenliği optimizasyonu

## 🔧 Geliştirme

### 📜 **Kullanılabilir Scripts**
```bash
npm run dev          # Geliştirme sunucusu (http://localhost:3000)
npm run build        # Production build
npm run start        # Production sunucusu
npm run lint         # ESLint kod kontrolü
```

### 🎨 **Kod Standartları**
- **TypeScript** - Tip güvenliği için zorunlu
- **ESLint** - Kod kalitesi kontrolü
- **Prettier** - Kod formatlaması
- **Tailwind CSS** - Utility-first CSS yaklaşımı
- **Shadcn/ui** - Tutarlı UI componentleri

### 🧪 **Test Stratejisi**
- **Unit Tests** - Bileşen testleri
- **Integration Tests** - API entegrasyon testleri
- **E2E Tests** - Kullanıcı senaryo testleri

## 🚀 Deployment

### **Vercel (Önerilen)**

1. **Vercel Hesabı Oluşturun**
   - [vercel.com](https://vercel.com) adresine gidin
   - GitHub hesabınızla giriş yapın

2. **Projeyi Bağlayın**
   ```bash
   npx vercel
   ```

3. **Environment Variables Ayarlayın**
   - Vercel Dashboard > Settings > Environment Variables
   - `.env.local` dosyasındaki değişkenleri ekleyin

4. **Deploy Edin**
   ```bash
   git push origin main
   ```

### **Diğer Platformlar**

#### **Netlify**
```bash
npm run build
# dist/ klasörünü Netlify'a yükleyin
```

#### **Railway**
```bash
railway login
railway init
railway up
```

#### **DigitalOcean App Platform**
- GitHub repository'nizi bağlayın
- Build command: `npm run build`
- Run command: `npm start`

## 🔒 Güvenlik

### **Environment Variables**
```bash
# ✅ Güvenli (public)
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY

# 🔒 Gizli (server-side only)
SUPABASE_SERVICE_ROLE_KEY
```

### **Veri Güvenliği**
- Row Level Security (RLS) politikaları
- JWT token tabanlı kimlik doğrulama
- HTTPS zorunluluğu
- XSS ve CSRF koruması

### **Dosya Güvenliği**
- `.env*` dosyaları `.gitignore`'da
- `node_modules/` ve `.next/` gizli
- Hassas bilgiler environment variables'da

## 🤝 Katkıda Bulunma

Katkılarınızı bekliyoruz! İşte nasıl katkıda bulunabilirsiniz:

### **1. Fork Edin**
```bash
git clone https://github.com/YOUR_USERNAME/leziz.git
cd leziz
```

### **2. Branch Oluşturun**
```bash
git checkout -b feature/amazing-feature
# veya
git checkout -b fix/bug-fix
```

### **3. Değişikliklerinizi Yapın**
- Kod standartlarına uyun
- TypeScript tiplerini ekleyin
- Testler yazın

### **4. Commit Edin**
```bash
git add .
git commit -m 'feat: add amazing feature'
git commit -m 'fix: resolve bug in authentication'
```

### **5. Push Edin**
```bash
git push origin feature/amazing-feature
```

### **6. Pull Request Oluşturun**
- GitHub'da Pull Request açın
- Değişikliklerinizi açıklayın
- Test sonuçlarını ekleyin

### **📋 Commit Mesaj Formatı**
```
type(scope): description

feat(auth): add social login with Google
fix(ui): resolve mobile navigation issue
docs(readme): update installation guide
style(components): improve button styling
refactor(api): optimize database queries
test(auth): add unit tests for login
```

## 🐛 Sorun Bildirimi

Bir hata mı buldunuz? [GitHub Issues](https://github.com/KaygusuzBK/leziz/issues) sayfasında bildirin.

**Hata bildirirken şunları ekleyin:**
- İşletim sistemi ve tarayıcı bilgisi
- Hata mesajının tam metni
- Hatanın nasıl oluştuğu
- Beklenen davranış

## 📄 Lisans

Bu proje [MIT Lisansı](LICENSE) altında lisanslanmıştır.

```
MIT License

Copyright (c) 2024 Berkan Kaygusuz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 👨‍💻 Geliştirici

<div align="center">

**Berkan Kaygusuz**

[![GitHub](https://img.shields.io/badge/GitHub-@KaygusuzBK-181717?style=for-the-badge&logo=github)](https://github.com/KaygusuzBK)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Berkan%20Kaygusuz-0077B5?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/berkankaygusuz)
[![Email](https://img.shields.io/badge/Email-berkan@example.com-D14836?style=for-the-badge&logo=gmail)](mailto:berkan@example.com)

</div>

## 🙏 Teşekkürler

Bu proje aşağıdaki harika teknolojiler ve topluluklar sayesinde mümkün oldu:

- **[Supabase](https://supabase.com)** - Backend as a Service platformu
- **[Next.js](https://nextjs.org)** - React framework
- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first CSS framework
- **[Shadcn/ui](https://ui.shadcn.com)** - Modern UI componentleri
- **[Vercel](https://vercel.com)** - Deployment platformu
- **[TypeScript](https://www.typescriptlang.org)** - Tip güvenliği
- **[React](https://reactjs.org)** - UI kütüphanesi

## 📊 Proje İstatistikleri

<div align="center">

![GitHub stars](https://img.shields.io/github/stars/KaygusuzBK/leziz?style=social)
![GitHub forks](https://img.shields.io/github/forks/KaygusuzBK/leziz?style=social)
![GitHub issues](https://img.shields.io/github/issues/KaygusuzBK/leziz)
![GitHub pull requests](https://img.shields.io/github/issues-pr/KaygusuzBK/leziz)
![GitHub license](https://img.shields.io/github/license/KaygusuzBK/leziz)

</div>

---

<div align="center">

⭐ **Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!** ⭐

**Leziz** - Yemek tariflerini paylaşmanın en lezzetli yolu! 🍳

</div>