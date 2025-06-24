'use client'

import { useState } from 'react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'

export default function IletisimPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission logic here
    console.log('Form submitted:', formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/10 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6">
              İletişime Geçin
            </h1>
            <p className="text-xl text-secondary mb-8 leading-relaxed">
              Sorularınız, önerileriniz veya işbirliği teklifleriniz için bizimle iletişime geçin. 
              Size en kısa sürede dönüş yapacağız.
            </p>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-orange-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-yellow-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-primary mb-8">İletişim Bilgilerimiz</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/40 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-2">Adres</h3>
                    <p className="text-secondary">
                      Kadıköy Mahallesi, Moda Caddesi No:123<br />
                      Kadıköy, İstanbul, 34710<br />
                      Türkiye
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/40 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-2">E-posta</h3>
                    <p className="text-secondary">
                      <a href="mailto:info@leziz.com" className="hover:text-accent transition-colors">
                        info@leziz.com
                      </a>
                    </p>
                    <p className="text-secondary">
                      <a href="mailto:destek@leziz.com" className="hover:text-accent transition-colors">
                        destek@leziz.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/40 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-2">Telefon</h3>
                    <p className="text-secondary">
                      <a href="tel:+902125550123" className="hover:text-accent transition-colors">
                        +90 (212) 555 0123
                      </a>
                    </p>
                    <p className="text-secondary">
                      <a href="tel:+902125550124" className="hover:text-accent transition-colors">
                        +90 (212) 555 0124
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/40 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-2">Çalışma Saatleri</h3>
                    <p className="text-secondary">
                      Pazartesi - Cuma: 09:00 - 18:00<br />
                      Cumartesi: 10:00 - 16:00<br />
                      Pazar: Kapalı
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-12">
                <h3 className="text-xl font-semibold text-primary mb-6">Sosyal Medyada Takip Edin</h3>
                <div className="flex gap-4">
                  <a href="#" className="w-12 h-12 bg-orange-100 dark:bg-orange-900/40 rounded-full flex items-center justify-center hover:bg-orange-200 dark:hover:bg-orange-900/60 transition-colors">
                    <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-12 h-12 bg-orange-100 dark:bg-orange-900/40 rounded-full flex items-center justify-center hover:bg-orange-200 dark:hover:bg-orange-900/60 transition-colors">
                    <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-12 h-12 bg-orange-100 dark:bg-orange-900/40 rounded-full flex items-center justify-center hover:bg-orange-200 dark:hover:bg-orange-900/60 transition-colors">
                    <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-12 h-12 bg-orange-100 dark:bg-orange-900/40 rounded-full flex items-center justify-center hover:bg-orange-200 dark:hover:bg-orange-900/60 transition-colors">
                    <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <Card className="p-8">
              <h2 className="text-3xl font-bold text-primary mb-8">Mesaj Gönderin</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-primary mb-2">
                      Ad Soyad *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Adınız ve soyadınız"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
                      E-posta *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="ornek@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-primary mb-2">
                    Konu *
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="Mesajınızın konusu"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-primary mb-2">
                    Mesaj *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background text-primary placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
                    placeholder="Mesajınızı buraya yazın..."
                  />
                </div>

                <Button type="submit" variant="accent" size="lg" className="w-full">
                  Mesaj Gönder
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">Konumumuz</h2>
          <div className="bg-gray-200 dark:bg-gray-800 rounded-2xl h-96 flex items-center justify-center">
            <div className="text-center">
              <svg className="w-20 h-20 text-gray-400 mx-auto mb-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Google Maps Entegrasyonu</h3>
              <p className="text-gray-500 mb-4">Kadıköy, İstanbul, Türkiye</p>
              <Button variant="secondary" size="md">
                Haritada Göster
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">Sık Sorulan Sorular</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-primary mb-3">
                Tarif paylaşmak için üye olmam gerekiyor mu?
              </h3>
              <p className="text-secondary">
                Evet, tarif paylaşmak ve yorum yapmak için ücretsiz hesap oluşturmanız gerekiyor.
              </p>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-primary mb-3">
                Tariflerin telif hakkı var mı?
              </h3>
              <p className="text-secondary">
                Paylaştığınız tarifler size aittir. Ancak başka kaynaklardan alınan tarifler için kaynak belirtmeniz gerekir.
              </p>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-primary mb-3">
                İşbirliği tekliflerinizi nasıl gönderebilirim?
              </h3>
              <p className="text-secondary">
                İşbirliği tekliflerinizi info@leziz.com adresine gönderebilir veya iletişim formunu kullanabilirsiniz.
              </p>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-primary mb-3">
                Mobil uygulamanız var mı?
              </h3>
              <p className="text-secondary">
                Şu anda web uygulaması olarak hizmet veriyoruz. Mobil uygulama geliştirme sürecimiz devam ediyor.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Hemen Başlayın
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Leziz topluluğuna katılın, tariflerinizi paylaşın ve binlerce lezzetli tarif keşfedin.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="secondary" size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
              Ücretsiz Kayıt Ol
            </Button>
            <Button variant="ghost" size="lg" className="text-white border-white hover:bg-white/10">
              Tarifleri Keşfet
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
} 