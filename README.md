# 🍳 Leziz - Yemek Tarifi Platformu

Modern, kullanıcı dostu ve güvenli bir yemek tarifi paylaşım platformu.

## 🚀 Özellikler

- **🔐 Güvenli Kimlik Doğrulama** - Supabase Auth ile
- **📱 Responsive Tasarım** - Tüm cihazlarda mükemmel görünüm
- **🌙 Dark/Light Mode** - Kullanıcı tercihi
- **📝 Tarif Paylaşımı** - Resim, video ve detaylı açıklamalarla
- **❤️ Favoriler** - Beğendiğiniz tarifleri kaydedin
- **👥 Sosyal Özellikler** - Kullanıcıları takip edin
- **🔍 Gelişmiş Arama** - Tarifleri kolayca bulun
- **📊 Kategoriler** - Tarifleri kategorilere göre filtreleyin

## 🛠️ Teknolojiler

- **Frontend:** Next.js 15, React 18, TypeScript
- **Styling:** Tailwind CSS, Shadcn/ui
- **Backend:** Supabase (PostgreSQL, Auth, Storage)
- **Deployment:** Vercel (önerilen)

## 📁 Proje Yapısı

```
leziz/
├── 📁 app/                    # Next.js App Router
│   ├── 📁 components/         # UI Bileşenleri
│   ├── 📁 lib/               # Yardımcı fonksiyonlar
│   └── 📁 [pages]/           # Sayfa bileşenleri
├── 📁 components/            # Global UI bileşenleri
├── 📁 docs/                  # 📚 Dokümantasyon
│   ├── 📁 auth/              # Kimlik doğrulama dokümantasyonu
│   ├── 📁 setup/             # Kurulum rehberleri
│   └── 📁 supabase/          # Supabase konfigürasyonu
├── 📁 lib/                   # Yardımcı kütüphaneler
├── 📁 public/                # Statik dosyalar
├── 📁 supabaseSql/           # Veritabanı scriptleri
└── 📄 README.md              # Bu dosya
```

## 🚀 Hızlı Başlangıç

### 1. Projeyi Klonlayın
```bash
git clone https://github.com/KaygusuzBK/leziz.git
cd leziz
```

### 2. Bağımlılıkları Yükleyin
```bash
npm install
```

### 3. Environment Variables
`.env.local` dosyası oluşturun:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 4. Veritabanını Kurun
1. [Supabase Dashboard](https://supabase.com/dashboard) açın
2. Yeni proje oluşturun
3. SQL Editor'da sırasıyla şu dosyaları çalıştırın:
   - `supabaseSql/1.supabase-setup.sql`
   - `supabaseSql/6.optimize-rls-policies.sql`
   - `supabaseSql/7.fix-remaining-issues.sql`

### 5. Geliştirme Sunucusunu Başlatın
```bash
npm run dev
```

## 📚 Dokümantasyon

### 🔐 Kimlik Doğrulama
- [Auth Kullanım Rehberi](docs/auth/AUTH_USAGE.md)
- [Auth Ayarları](docs/auth/SUPABASE_AUTH_SETTINGS.md)

### 🛠️ Kurulum
- [Supabase Kurulum](docs/setup/SUPABASE_SETUP.md)
- [Profil Kurulum](docs/setup/PROFILE_SETUP.md)

### ⚡ Optimizasyon
- [RLS Optimizasyonu](docs/supabase/SUPABASE_RLS_OPTIMIZATION.md)

## 🔧 Geliştirme

### Scripts
```bash
npm run dev          # Geliştirme sunucusu
npm run build        # Production build
npm run start        # Production sunucusu
npm run lint         # ESLint kontrolü
```

### Kod Yapısı
- **TypeScript** kullanılıyor
- **ESLint** ve **Prettier** konfigürasyonu mevcut
- **Tailwind CSS** ile styling
- **Shadcn/ui** componentleri

## 🚀 Deployment

### Vercel (Önerilen)
1. [Vercel](https://vercel.com) hesabı oluşturun
2. GitHub repository'nizi bağlayın
3. Environment variables'ları ayarlayın
4. Deploy edin!

### Diğer Platformlar
- **Netlify**: Static site olarak deploy edebilirsiniz
- **Railway**: Full-stack deployment
- **DigitalOcean**: App Platform

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 👨‍💻 Geliştirici

**Berkan Kaygusuz**
- GitHub: [@KaygusuzBK](https://github.com/KaygusuzBK)
- LinkedIn: [Berkan Kaygusuz](https://linkedin.com/in/berkankaygusuz)

## 🙏 Teşekkürler

- [Supabase](https://supabase.com) - Backend as a Service
- [Next.js](https://nextjs.org) - React Framework
- [Tailwind CSS](https://tailwindcss.com) - CSS Framework
- [Shadcn/ui](https://ui.shadcn.com) - UI Components

---

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!