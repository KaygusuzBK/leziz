'use client'

import { useState, useEffect, useRef } from 'react'
import Modal from './Modal'
import { useAuth } from '../lib/context/AuthContext'
import { createSupabaseClient } from '../lib/supabase/client'

interface CreateRecipeModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

interface RecipeFormData {
  title: string
  description: string
  ingredients: string[]
  instructions: string
  category_id: string
  cooking_time: number
  difficulty_level: 'Kolay' | 'Orta' | 'Zor'
  servings: number
  image_url: string
  video_url: string
  is_public: boolean
}

const DIFFICULTY_LEVELS = ['Kolay', 'Orta', 'Zor'] as const

export default function CreateRecipeModal({ isOpen, onClose, onSuccess }: CreateRecipeModalProps) {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [currentIngredient, setCurrentIngredient] = useState('')
  const [categories, setCategories] = useState<Array<{ id: string; name: string }>>([])
  const [formData, setFormData] = useState<RecipeFormData>({
    title: '',
    description: '',
    ingredients: [],
    instructions: '',
    category_id: '',
    cooking_time: 30,
    difficulty_level: 'Orta',
    servings: 4,
    image_url: '',
    video_url: '',
    is_public: true
  })
  const [imageUploading, setImageUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Kategorileri yükle
  useEffect(() => {
    const loadCategories = async () => {
      const supabase = createSupabaseClient()
      const { data } = await supabase.from('categories').select('id, name')
      if (data) setCategories(data)
    }
    loadCategories()
  }, [])

  const handleInputChange = (field: keyof RecipeFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const addIngredient = () => {
    if (currentIngredient.trim() && !formData.ingredients.includes(currentIngredient.trim())) {
      setFormData(prev => ({
        ...prev,
        ingredients: [...prev.ingredients, currentIngredient.trim()]
      }))
      setCurrentIngredient('')
    }
  }

  const removeIngredient = (index: number) => {
    setFormData(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setIsLoading(true)
    try {
      const supabase = createSupabaseClient()
      const { error } = await supabase.from('user_recipes').insert({
        user_id: user.id,
        ...formData
      })

      if (error) throw error

      // Form'u sıfırla
      setFormData({
        title: '',
        description: '',
        ingredients: [],
        instructions: '',
        category_id: '',
        cooking_time: 30,
        difficulty_level: 'Orta',
        servings: 4,
        image_url: '',
        video_url: '',
        is_public: true
      })
      
      onSuccess?.()
      onClose()
    } catch (error) {
      console.error('Tarif oluşturma hatası:', error)
      alert('Tarif oluşturulurken bir hata oluştu.')
    } finally {
      setIsLoading(false)
    }
  }

  // Fotoğraf yükleme fonksiyonu
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImageUploading(true)
    try {
      const supabase = createSupabaseClient()
      const fileExt = file.name.split('.').pop()
      const fileName = `${user?.id}_${Date.now()}.${fileExt}`
      // Aynı isimde dosya varsa sil
      await supabase.storage.from('recipe-images').remove([fileName])
      // Yükle
      const { error: uploadError } = await supabase.storage.from('recipe-images').upload(fileName, file, { upsert: true })
      if (uploadError) throw uploadError
      // Public URL al
      const { data: publicUrlData } = supabase.storage.from('recipe-images').getPublicUrl(fileName)
      if (!publicUrlData?.publicUrl) throw new Error('Public URL alınamadı')
      setFormData(prev => ({ ...prev, image_url: publicUrlData.publicUrl }))
    } catch (err: any) {
      alert('Fotoğraf yüklenirken bir hata oluştu: ' + (err?.message || ''))
    } finally {
      setImageUploading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Yeni Tarif Oluştur">
      <div className="">
        <div className="overflow-y-auto max-h-[65vh] pr-1">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Tarif Başlığı */}
            <div>
              <label className="block text-sm font-medium mb-2 text-primary">
                Tarif Adı *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 bg-card text-primary border-card"
                placeholder="Örn: Ev Yapımı Pizza"
              />
            </div>

            {/* Açıklama */}
            <div>
              <label className="block text-sm font-medium mb-2 text-primary">
                Açıklama
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={2}
                className="w-full px-3 py-2 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 bg-card text-primary border-card"
                placeholder="Tarifiniz hakkında kısa bir açıklama..."
              />
            </div>

            {/* Kategori */}
            <div>
              <label className="block text-sm font-medium mb-2 text-primary">
                Kategori *
              </label>
              <select
                required
                value={formData.category_id}
                onChange={(e) => handleInputChange('category_id', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 bg-card text-primary border-card"
              >
                <option value="">Kategori seçin</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Malzemeler */}
            <div>
              <label className="block text-sm font-medium mb-2 text-primary">
                Malzemeler *
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={currentIngredient}
                  onChange={(e) => setCurrentIngredient(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addIngredient())}
                  className="flex-1 px-3 py-2 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 bg-card text-primary border-card"
                  placeholder="Malzeme ekle..."
                />
                <button
                  type="button"
                  onClick={addIngredient}
                  className="px-3 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm"
                >
                  Ekle
                </button>
              </div>
              
              {/* Seçili malzemeler */}
              <div className="flex flex-wrap gap-1">
                {formData.ingredients.map((ingredient, index) => (
                  <span
                    key={index}
                    className="flex items-center gap-1 px-2 py-1 rounded-full bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 text-xs font-medium"
                  >
                    {ingredient}
                    <button
                      type="button"
                      onClick={() => removeIngredient(index)}
                      className="ml-1 rounded-full hover:bg-orange-200 dark:hover:bg-orange-800 p-0.5"
                    >
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 8.586l3.536-3.535a1 1 0 111.415 1.414L11.414 10l3.535 3.536a1 1 0 01-1.414 1.415L10 11.414l-3.536 3.535a1 1 0 01-1.415-1.414L8.586 10 5.05 6.464A1 1 0 016.464 5.05L10 8.586z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Hazırlanış */}
            <div>
              <label className="block text-sm font-medium mb-2 text-primary">
                Hazırlanış Adımları *
              </label>
              <textarea
                required
                value={formData.instructions}
                onChange={(e) => handleInputChange('instructions', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 bg-card text-primary border-card"
                placeholder="Tarifin hazırlanış adımlarını detaylı olarak yazın..."
              />
            </div>

            {/* Detaylar Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Pişirme Süresi */}
              <div>
                <label className="block text-sm font-medium mb-2 text-primary">
                  Pişirme Süresi (dk)
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.cooking_time}
                  onChange={(e) => handleInputChange('cooking_time', parseInt(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 bg-card text-primary border-card"
                />
              </div>

              {/* Zorluk Seviyesi */}
              <div>
                <label className="block text-sm font-medium mb-2 text-primary">
                  Zorluk Seviyesi
                </label>
                <select
                  value={formData.difficulty_level}
                  onChange={(e) => handleInputChange('difficulty_level', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 bg-card text-primary border-card"
                >
                  {DIFFICULTY_LEVELS.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>

              {/* Kaç Kişilik */}
              <div>
                <label className="block text-sm font-medium mb-2 text-primary">
                  Kaç Kişilik
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.servings}
                  onChange={(e) => handleInputChange('servings', parseInt(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 bg-card text-primary border-card"
                />
              </div>

              {/* Public/Private */}
              <div>
                <label className="block text-sm font-medium mb-2 text-primary">
                  Görünürlük
                </label>
                <select
                  value={formData.is_public ? 'public' : 'private'}
                  onChange={(e) => handleInputChange('is_public', e.target.value === 'public')}
                  className="w-full px-3 py-2 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 bg-card text-primary border-card"
                >
                  <option value="public">Herkese Açık</option>
                  <option value="private">Sadece Ben</option>
                </select>
              </div>
            </div>

            {/* Medya Yükleme Alanı */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-2 text-primary">
                  Fotoğraf Yükle
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                    disabled={imageUploading}
                  />
                  {imageUploading && <span className="text-xs text-secondary">Yükleniyor...</span>}
                </div>
                {formData.image_url && (
                  <img src={formData.image_url} alt="Yemek Fotoğrafı" className="mt-2 rounded-lg max-h-32 object-contain border" />
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-primary">
                  Video URL'i
                </label>
                <input
                  type="url"
                  value={formData.video_url}
                  onChange={(e) => handleInputChange('video_url', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 bg-card text-primary border-card"
                  placeholder="https://..."
                />
              </div>
            </div>

            {/* Butonlar */}
            <div className="flex justify-end gap-3 pt-4 sticky bottom-0 bg-card/80 backdrop-blur-sm">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-background border border-card text-primary hover:bg-card transition-colors text-sm"
              >
                İptal
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-colors disabled:opacity-50 text-sm"
              >
                {isLoading ? 'Oluşturuluyor...' : 'Tarifi Oluştur'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  )
} 