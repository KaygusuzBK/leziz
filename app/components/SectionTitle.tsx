'use client'

import { useState } from 'react'
import Modal from './Modal'
import CreateRecipeModal from './CreateRecipeModal'
import { useAuth } from '../lib/context/AuthContext'
import { Button } from './ui/Button'
import { Chip } from './ui/Chip'
import { Loader } from './ui/Loader'

type SectionTitleProps = { 
  title: string
  showWebhookButton?: boolean
}

interface RecipeData {
  title?: string
  content?: string
}

const INGREDIENTS = [
  'Domates',
  'Patates',
  'Tavuk',
  'Soğan',
  'Biber',
  'Pirinç',
  'Kıyma',
  'Yumurta',
  'Sarımsak',
  'Süt',
  'Un',
  'Peynir',
  'Zeytinyağı',
  'Tereyağı',
  'Tuz',
  'Karabiber',
  'Pul biber',
  'Nane',
  'Maydanoz',
  'Limon',
]

export default function SectionTitle({ title, showWebhookButton = false }: SectionTitleProps) {
  const { isAuthenticated } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [recipeData, setRecipeData] = useState<RecipeData | null>(null)
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([])
  const [isIngredientModalOpen, setIsIngredientModalOpen] = useState(false)
  const [tempSelectedIngredients, setTempSelectedIngredients] = useState<string[]>([])
  const [isCreateRecipeModalOpen, setIsCreateRecipeModalOpen] = useState(false)

  const openIngredientModal = () => {
    setTempSelectedIngredients(selectedIngredients)
    setIsIngredientModalOpen(true)
  }
  const closeIngredientModal = () => setIsIngredientModalOpen(false)
  const saveIngredients = () => {
    setSelectedIngredients(tempSelectedIngredients)
    setIsIngredientModalOpen(false)
    if (tempSelectedIngredients.length > 0) {
      setTimeout(() => {
        handleWebhookTest();
      }, 200);
    }
  }
  const handleTempIngredientChange = (ingredient: string) => {
    setTempSelectedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((i) => i !== ingredient)
        : [...prev, ingredient]
    )
  }

  const openCreateRecipeModal = () => {
    if (!isAuthenticated) {
      alert('Tarif oluşturmak için giriş yapmalısınız.')
      return
    }
    setIsCreateRecipeModalOpen(true)
  }

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
          message: selectedIngredients.length > 0
            ? `Elimde şu malzemeler var: ${selectedIngredients.join(', ')}. Bu malzemelerle güzel bir yemek tarifi ver, detaylıca anlat, miktarları ve adımları yaz. Sadece Türkçe konuş.`
            : 'bir yemek tarifi ver detaylı bir şekilde nasıl yapıldığını ve hangi malzemeleri ne kadar kullanmam gerektiğini söyle. Sadece türkçe konuş.',
          params: {
            ingredients: selectedIngredients,
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
      <div className="flex items-center justify-between px-4 pb-3 pt-5 flex-wrap gap-2">
        <h2 className="text-lg md:text-xl lg:text-[22px] font-bold leading-tight tracking-[-0.015em] text-primary">
          {title}
        </h2>
        {showWebhookButton && (
          <div className="flex items-center gap-2 flex-wrap">
            <Button
              type="button"
              onClick={openIngredientModal}
              variant="secondary"
              size="sm"
              className="text-sm font-medium"
            >
              Malzeme Seç {selectedIngredients.length > 0 && <span className='ml-1'>({selectedIngredients.length})</span>}
            </Button>
            <Button
              onClick={handleWebhookTest}
              loading={isLoading}
              variant="accent"
              size="sm"
              className="text-sm font-medium"
            >
              Sürpriz Tarif Oluştur
            </Button>
            {isAuthenticated && (
              <Button
                onClick={openCreateRecipeModal}
                variant="accent"
                size="sm"
                className="text-sm font-medium bg-green-500 hover:bg-green-600"
              >
                Tarif Oluştur
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Malzeme Seçim Modalı */}
      <Modal
        isOpen={isIngredientModalOpen}
        onClose={closeIngredientModal}
        title="Malzeme Seç"
      >
        <div className="space-y-4">
          {/* Seçili malzemeler chip olarak üstte */}
          <div className="flex flex-wrap gap-2 min-h-[32px]">
            {tempSelectedIngredients.length === 0 ? (
              <span className="text-secondary text-sm">Hiç malzeme seçilmedi.</span>
            ) : (
              tempSelectedIngredients.map((ingredient) => (
                <Chip
                  key={ingredient}
                  color="accent"
                  onRemove={() => handleTempIngredientChange(ingredient)}
                  className="text-xs font-medium shadow-sm animate-fade-in"
                >
                  {ingredient}
                </Chip>
              ))
            )}
          </div>
          {/* Malzeme grid'i */}
          <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
            {INGREDIENTS.map((ingredient) => {
              const selected = tempSelectedIngredients.includes(ingredient)
              return (
                <label
                  key={ingredient}
                  className={`flex items-center gap-2 cursor-pointer text-sm px-2 py-2 rounded-lg transition-all duration-150
                    ${selected ? 'bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 scale-[1.03] shadow-md' : 'bg-card text-primary hover:bg-orange-50 dark:hover:bg-orange-900/20'}
                    animate-fade-in`}
                  style={{ userSelect: 'none' }}
                >
                  <input
                    type="checkbox"
                    checked={selected}
                    onChange={() => handleTempIngredientChange(ingredient)}
                    className="accent-orange-500 rounded focus:ring-0"
                  />
                  {ingredient}
                </label>
              )
            })}
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button
              onClick={closeIngredientModal}
              variant="secondary"
              size="md"
              className="text-sm"
            >
              Vazgeç
            </Button>
            <Button
              onClick={saveIngredients}
              variant="accent"
              size="md"
              className="text-sm"
            >
              Oluştur
            </Button>
          </div>
        </div>
      </Modal>

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
                <Loader size={64} className="text-orange-500" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-8 h-8 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold text-primary">Tarifiniz Hazırlanıyor</h3>
                <p className="text-secondary">Lezzetli bir tarif hazırlıyoruz, lütfen bekleyin...</p>
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
              {/* Eğer tarif bulunduysa ve seçili malzeme varsa, üstte chip olarak göster */}
              {selectedIngredients.length > 0 && recipeData?.content && recipeData.content !== 'loading' && (
                <div className="flex flex-wrap gap-2 mb-4 animate-fade-in">
                  {selectedIngredients.map((ingredient) => (
                    <Chip
                      key={ingredient}
                      color="accent"
                      className="text-xs font-medium shadow-sm"
                    >
                      {ingredient}
                    </Chip>
                  ))}
                </div>
              )}
              {recipeData?.content && recipeData.content !== 'loading' && (
                <div className="max-h-[70vh] overflow-y-auto">
                  <div className="prose prose-sm max-w-none">
                    <div 
                      className="text-primary leading-relaxed space-y-4 [&_strong]:text-orange-600 [&_strong]:font-semibold [&_em]:text-secondary [&_em]:italic"
                      dangerouslySetInnerHTML={{
                        __html: recipeData.content
                          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                          .replace(/\*(.*?)\*/g, '<em>$1</em>')
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
                <Button
                  onClick={closeModal}
                  variant="accent"
                  size="md"
                  className="font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Kapat
                </Button>
              </div>
            </>
          )}
        </div>
      </Modal>

      {/* Tarif Oluşturma Modalı */}
      <CreateRecipeModal
        isOpen={isCreateRecipeModalOpen}
        onClose={() => setIsCreateRecipeModalOpen(false)}
        onSuccess={() => {
          console.log('Tarif başarıyla oluşturuldu!')
          // Burada sayfayı yenileyebilir veya başka bir işlem yapabilirsin
        }}
      />
    </>
  )
} 