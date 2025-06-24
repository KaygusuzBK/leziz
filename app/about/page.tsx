'use client'

import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'

export default function HakkimizdaPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/10 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6">
              Leziz'e Hoş Geldiniz
            </h1>
            <p className="text-xl text-secondary mb-8 leading-relaxed">
              Türkiye'nin en büyük yemek tarifi platformunda, binlerce lezzetli tarif ve 
              mutfak tutkunlarıyla buluşun. Geleneksel tatları modern mutfakla buluşturuyoruz.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="accent" size="lg">
                Tarifleri Keşfet
              </Button>
              <Button variant="secondary" size="lg">
                Bize Katıl
              </Button>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-orange-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-yellow-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">10K+</div>
              <div className="text-secondary">Tarif</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">50K+</div>
              <div className="text-secondary">Kullanıcı</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">100+</div>
              <div className="text-secondary">Kategori</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">5M+</div>
              <div className="text-secondary">Görüntülenme</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-primary mb-6">Misyonumuz</h2>
              <p className="text-lg text-secondary leading-relaxed mb-6">
                Türk mutfağının zenginliklerini dijital dünyaya taşıyarak, 
                herkesin kolayca lezzetli yemekler yapabilmesini sağlamak. 
                Geleneksel tarifleri korurken, modern mutfak tekniklerini de 
                destekleyerek mutfak kültürümüzü gelecek nesillere aktarmak.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/40 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-primary font-medium">Kaliteli ve Güvenilir Tarifler</span>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-orange-100 to-yellow-100 dark:from-orange-900/20 dark:to-yellow-900/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-primary mb-4">Vizyonumuz</h3>
                <p className="text-secondary leading-relaxed">
                  Türkiye'nin en büyük ve güvenilir yemek tarifi platformu olmak. 
                  Kullanıcılarımızın mutfak deneyimini kolaylaştırmak, 
                  yemek yapma tutkusunu artırmak ve topluluk ruhunu güçlendirmek.
                </p>
              </div>
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-orange-500 rounded-full"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-yellow-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-primary text-center mb-12">Değerlerimiz</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/40 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary mb-4">Kalite</h3>
              <p className="text-secondary">
                Her tarifimiz test edilmiş, güvenilir ve lezzetli sonuçlar verir.
              </p>
            </Card>
            
            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/40 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary mb-4">Tutku</h3>
              <p className="text-secondary">
                Yemek yapma tutkusunu herkesle paylaşmak ve ilham vermek.
              </p>
            </Card>
            
            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary mb-4">Topluluk</h3>
              <p className="text-secondary">
                Mutfak tutkunlarını bir araya getiren güçlü bir topluluk.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-primary text-center mb-12">Ekibimiz</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                BK
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">Berkan Kaygusuz</h3>
              <p className="text-accent mb-4">Kurucu & CEO</p>
              <p className="text-secondary text-sm">
                Mutfak tutkunu ve teknoloji meraklısı. Leziz'i hayata geçiren vizyoner.
              </p>
            </Card>
            
            <Card className="text-center p-6">
              <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                MK
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">Mutfak Uzmanı</h3>
              <p className="text-accent mb-4">Şef & İçerik Editörü</p>
              <p className="text-secondary text-sm">
                15 yıllık deneyimiyle tariflerimizin kalitesini garanti eden uzman şef.
              </p>
            </Card>
            
            <Card className="text-center p-6">
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                TK
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">Teknoloji Uzmanı</h3>
              <p className="text-accent mb-4">CTO & Geliştirici</p>
              <p className="text-secondary text-sm">
                Platformumuzun teknik altyapısını güçlendiren teknoloji uzmanı.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-primary text-center mb-12">Bizi Ziyaret Edin</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-primary mb-6">İstanbul Merkez Ofisimiz</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/40 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-primary font-medium">Adres</p>
                    <p className="text-secondary">Kadıköy, İstanbul, Türkiye</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/40 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-primary font-medium">E-posta</p>
                    <p className="text-secondary">info@leziz.com</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/40 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-primary font-medium">Telefon</p>
                    <p className="text-secondary">+90 (212) 555 0123</p>
                  </div>
                </div>
              </div>
              
              <Button variant="accent" size="lg" className="mt-8">
                İletişime Geçin
              </Button>
            </div>
            
            <div className="bg-gray-200 dark:bg-gray-800 rounded-2xl h-80 flex items-center justify-center">
              <div className="text-center">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <p className="text-gray-500">Harita burada görünecek</p>
                <p className="text-gray-400 text-sm">Google Maps entegrasyonu</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Mutfak Maceranıza Başlayın
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Binlerce lezzetli tarif ve mutfak tutkunlarıyla buluşun. 
            Hemen ücretsiz hesap oluşturun ve tariflerinizi paylaşmaya başlayın.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="secondary" size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
              Ücretsiz Kayıt Ol
            </Button>
            <Button variant="ghost" size="lg" className="text-white border-white hover:bg-white/10">
              Daha Fazla Bilgi
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
} 