'use client'

import { useState, useEffect, useRef } from 'react'
import Modal from './Modal'
import { useAuth } from '../lib/context/AuthContext'
import { createSupabaseClient } from '../lib/supabase/client'
import { toast } from 'sonner'
import { Button } from './ui/Button'
import { Input, Textarea } from './ui/Input'
import { Chip } from './ui/Chip'
import Image from 'next/image'

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

interface CreateRecipeModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
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
      if (data) {
        // Sadece id ve name alanı olanları al
        const typedData = data
          .filter(category => typeof category === 'object' && category && 'id' in category && 'name' in category)
          .map(category => ({
            id: (category as { id: string; name: string }).id,
            name: (category as { id: string; name: string }).name
          }))
        setCategories(typedData)
      }
    }
    loadCategories()
  }, [])

  const handleInputChange = (field: keyof RecipeFormData, value: unknown) => {
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
        ...formData,
        user_id: user.id
      } as Omit<RecipeFormData, 'category_id'> & { user_id: string })

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
      toast.success('Tarif başarıyla oluşturuldu!')
      onSuccess?.()
      onClose()
    } catch (error) {
      console.error('Tarif oluşturma hatası:', error)
      toast.error('Tarif oluşturulurken bir hata oluştu.')
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
    } catch (err: unknown) {
      alert('Fotoğraf yüklenirken bir hata oluştu: ' + (err instanceof Error ? err.message : ''))
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
              <Input
                type="text"
                required
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Örn: Ev Yapımı Pizza"
                className="mb-0"
              />
            </div>

            {/* Açıklama */}
            <div>
              <label className="block text-sm font-medium mb-2 text-primary">
                Açıklama
              </label>
              <Textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={2}
                placeholder="Tarifiniz hakkında kısa bir açıklama..."
                className="mb-0"
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
                className="w-full px-3 py-2 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 bg-card text-primary border-card mb-0"
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
                <Input
                  type="text"
                  value={currentIngredient}
                  onChange={(e) => setCurrentIngredient(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addIngredient())}
                  placeholder="Malzeme ekle..."
                  className="flex-1 mb-0"
                />
                <Button
                  type="button"
                  onClick={addIngredient}
                  variant="accent"
                  size="sm"
                  className="text-sm"
                >
                  Ekle
                </Button>
              </div>
              
              {/* Seçili malzemeler */}
              <div className="flex flex-wrap gap-1">
                {formData.ingredients.map((ingredient, index) => (
                  <Chip
                    key={index}
                    color="accent"
                    onRemove={() => removeIngredient(index)}
                    className="text-xs font-medium"
                  >
                    {ingredient}
                  </Chip>
                ))}
              </div>
            </div>

            {/* Hazırlanış */}
            <div>
              <label className="block text-sm font-medium mb-2 text-primary">
                Hazırlanış Adımları *
              </label>
              <Textarea
                required
                value={formData.instructions}
                onChange={(e) => handleInputChange('instructions', e.target.value)}
                rows={4}
                placeholder="Tarifin hazırlanış adımlarını detaylı olarak yazın..."
                className="mb-0"
              />
            </div>

            {/* Detaylar Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Pişirme Süresi */}
              <div>
                <label className="block text-sm font-medium mb-2 text-primary">
                  Pişirme Süresi (dk)
                </label>
                <Input
                  type="number"
                  min="1"
                  value={formData.cooking_time}
                  onChange={(e) => handleInputChange('cooking_time', parseInt(e.target.value))}
                  className="mb-0"
                />
              </div>

              {/* Zorluk Seviyesi */}
              <div>
                <label className="block text-sm font-medium mb-2 text-primary">
                  Zorluk Seviyesi
                </label>
                <select
                  value={formData.difficulty_level}
                  onChange={(e) => handleInputChange('difficulty_level', e.target.value as 'Kolay' | 'Orta' | 'Zor')}
                  className="w-full px-3 py-2 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 bg-card text-primary border-card mb-0"
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
                <Input
                  type="number"
                  min="1"
                  value={formData.servings}
                  onChange={(e) => handleInputChange('servings', parseInt(e.target.value))}
                  className="mb-0"
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
                  className="w-full px-3 py-2 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 bg-card text-primary border-card mb-0"
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
                  <Input
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
                  <Image src={formData.image_url} alt="Yemek Fotoğrafı" className="mt-2 rounded-lg max-h-32 object-contain border" width={128} height={128} />
                )}
                <span className="text-gray-500 text-xs">* Yalnızca .jpg, .png veya .jpeg dosyaları desteklenir. Maksimum boyut: 2MB.</span>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-primary">
                  Video URL
                </label>
                <Input
                  type="url"
                  value={formData.video_url}
                  onChange={(e) => handleInputChange('video_url', e.target.value)}
                  placeholder="https://..."
                  className="mb-0"
                />
              </div>
            </div>

            {/* Butonlar */}
            <div className="flex justify-end gap-3 pt-4 sticky bottom-0 bg-card/80 backdrop-blur-sm">
              <Button
                type="button"
                onClick={onClose}
                variant="secondary"
                size="md"
                className="text-sm"
              >
                İptal
              </Button>
              <Button
                type="submit"
                loading={isLoading}
                variant="accent"
                size="md"
                className="text-sm"
              >
                Tarifi Oluştur
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  )
} 