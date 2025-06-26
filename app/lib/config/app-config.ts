// Tüm ortam değişkenleri ve mesaj şablonları burada merkezi olarak tutulur

export const appConfig = {
  // n8n entegrasyonu
  n8nWebhookUrl: 'https://bedbug-tender-publicly.ngrok-free.app/webhook/cb6a2e6d-a869-41fd-81b6-96ad5dd25731',
  n8nApiKey: process.env.NEXT_PUBLIC_N8N_API_KEY || '',
  n8nDefaultMessage: 'bir yemek tarifi ver detaylı bir şekilde nasıl yapıldığını ve hangi malzemeleri ne kadar kullanmam gerektiğini söyle. Sadece türkçe konuş.',
  n8nIngredientsMessage: (ingredients: string[]) =>
    `Elimde şu malzemeler var: ${ingredients.join(', ')}. Bu malzemelerle güzel bir yemek tarifi ver, detaylıca anlat, miktarları ve adımları yaz. Sadece Türkçe konuş.`,
  n8nParams: (ingredients: string[]) => ({ ingredients }),
  // Mesaj şablonları
  messages: {
    loginSuccess: 'Başarıyla giriş yapıldı!',
    loginError: 'Giriş yapılırken bir hata oluştu.',
    registerSuccess: 'Başarıyla kayıt olundu!',
    registerError: 'Kayıt olurken bir hata oluştu.',
    logoutSuccess: 'Başarıyla çıkış yapıldı.',
    logoutError: 'Çıkış yapılırken bir hata oluştu.',
    // Diğer mesajlar buraya eklenebilir
  },
  // Diğer değişkenler
  supportEmail: 'destek@leziz.com',
  infoEmail: 'info@leziz.com',
  // ...
}; 