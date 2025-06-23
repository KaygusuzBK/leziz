'use client'

import { useState } from 'react'
import Modal from './Modal'

type SectionTitleProps = { 
  title: string
  showWebhookButton?: boolean
}

interface RecipeData {
  title?: string
  content?: string
}

export default function SectionTitle({ title, showWebhookButton = false }: SectionTitleProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [recipeData, setRecipeData] = useState<RecipeData | null>(null)

  const handleWebhookTest = async () => {
    setIsLoading(true)
    setIsModalOpen(true) // Hemen modal'ı aç
    setRecipeData({
      title: 'Tarifiniz Hazırlanıyor',
      content: 'loading'
    })
    
    try {
      const response = await fetch('https://bedbug-tender-publicly.ngrok-free.app/webhook/cb6a2e6d-a869-41fd-81b6-96ad5dd25731', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'bir yemek tarifi ver detaylı bir şekilde nasıl yapıldığını ve hangi malzemeleri ne kadar kullanmam gerektiğini söyle. Sadece türkçe konuş.',
          params: {
            message: 'bir yemek tarifi ver detaylı bir şekilde nasıl yapıldığını ve hangi malzemeleri ne kadar kullanmam gerektiğini söyle. Sadece türkçe konuş.',
          },
        }),
      })
      
      if (response.ok) {
        const data = await response.json()
        console.log('Webhook response data:', data)
        
        // data[0].output kısmını al
        let recipeContent = ''
        if (data && Array.isArray(data) && data.length > 0 && data[0].output) {
          recipeContent = data[0].output
        } else if (data && data.output) {
          recipeContent = data.output
        } else {
          recipeContent = 'Tarif yüklenemedi.'
        }
        
        setRecipeData({
          title: 'Günün Tarifi',
          content: recipeContent
        })
      } else {
        console.error('Webhook test hatası:', response.status)
        setRecipeData({
          title: 'Hata',
          content: 'Tarif yüklenirken bir hata oluştu. Lütfen tekrar deneyin.'
        })
      }
    } catch (error) {
      console.error('Webhook test exception:', error)
      setRecipeData({
        title: 'Hata',
        content: 'Bağlantı hatası oluştu. Lütfen internet bağlantınızı kontrol edin.'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setRecipeData(null)
  }

  return (
    <>
      <div className="flex items-center justify-between px-4 pb-3 pt-5">
        <h2 className="text-lg md:text-xl lg:text-[22px] font-bold leading-tight tracking-[-0.015em] text-primary">
          {title}
        </h2>
        
        {showWebhookButton && (
          <button
            onClick={handleWebhookTest}
            disabled={isLoading}
            className="px-3 py-1 bg-orange-500 text-white text-sm font-medium rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Gönderiliyor...' : 'Sürpriz Tarif Oluştur'}
          </button>
        )}
      </div>

      {/* Tarif Popup'ı */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal}
        title={recipeData?.title || 'Günün Tarifi'}
      >
        <div className="space-y-6">
          {isLoading ? (
            // Loading durumu
            <div className="flex flex-col items-center justify-center py-12 space-y-6">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-8 h-8 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold text-gray-800">Tarifiniz Hazırlanıyor</h3>
                <p className="text-gray-600">Lezzetli bir tarif hazırlıyoruz, lütfen bekleyin...</p>
              </div>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          ) : (
            // Tarif içeriği
            <>
              {recipeData?.content && recipeData.content !== 'loading' && (
                <div className="max-h-[70vh] overflow-y-auto">
                  <div className="prose prose-sm max-w-none">
                    <div 
                      className="text-gray-700 leading-relaxed space-y-4"
                      dangerouslySetInnerHTML={{
                        __html: recipeData.content
                          .replace(/\*\*(.*?)\*\*/g, '<strong class="text-orange-600 font-semibold">$1</strong>')
                          .replace(/\*(.*?)\*/g, '<em class="text-gray-600 italic">$1</em>')
                          .replace(/\n\n/g, '</p><p class="mb-4">')
                          .replace(/\n/g, '<br>')
                          .replace(/^/, '<p class="mb-4">')
                          .replace(/$/, '</p>')
                      }}
                    />
                  </div>
                </div>
              )}
              
              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span>Günün Özel Tarifi</span>
                </div>
                <button
                  onClick={closeModal}
                  className="px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Kapat
                </button>
              </div>
            </>
          )}
        </div>
      </Modal>
    </>
  )
} 