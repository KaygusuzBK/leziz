'use client'

import { useState, useEffect } from 'react'
import { getAllRecipes, getCategories, getRecipesByCategory } from '../lib/supabase/queries'
import RecipeCard from '../components/RecipeCard'
import SectionTitle from '../components/SectionTitle'

interface Recipe {
  id: string
  title: string
  description?: string
  image_url?: string
  cooking_time?: number
  difficulty?: string
  servings?: number
  created_at: string
}

interface Category {
  id: string
  name: string
  description?: string
  image_url?: string
}

export default function TariflerPage() {
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [categoryLoading, setCategoryLoading] = useState(false)

  // İlk yükleme - tüm tarifler ve kategoriler
  useEffect(() => {
    async function loadData() {
      try {
        const [recipesResult, categoriesResult] = await Promise.all([
          getAllRecipes(),
          getCategories()
        ])

        console.log('Recipes result:', recipesResult)
        console.log('Categories result:', categoriesResult)

        if (recipesResult.data) {
          setAllRecipes(recipesResult.data)
          setFilteredRecipes(recipesResult.data)
        }
        if (categoriesResult.data) setCategories(categoriesResult.data)
      } catch (error) {
        console.error('Data loading error:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // Kategori filtreleme
  useEffect(() => {
    async function filterByCategory() {
      if (selectedCategory === 'all') {
        setFilteredRecipes(allRecipes)
        return
      }

      setCategoryLoading(true)
      try {
        const categoryResult = await getRecipesByCategory(selectedCategory)
        if (categoryResult.data) {
          setFilteredRecipes(categoryResult.data)
        }
      } catch (error) {
        console.error('Category filtering error:', error)
      } finally {
        setCategoryLoading(false)
      }
    }

    filterByCategory()
  }, [selectedCategory, allRecipes])

  // Arama filtreleme
  useEffect(() => {
    if (!searchTerm) {
      // Arama terimi yoksa, mevcut kategori filtresini koru
      if (selectedCategory === 'all') {
        setFilteredRecipes(allRecipes)
      }
      return
    }

    // Arama terimi varsa, mevcut tariflerde ara
    const searchResults = filteredRecipes.filter(recipe =>
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (recipe.description && recipe.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    setFilteredRecipes(searchResults)
  }, [searchTerm, selectedCategory, allRecipes])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <SectionTitle title="Tüm Tarifler" />
      
      {/* İstatistikler */}
      <div className="mb-6 text-center">
        <p className="text-gray-600">
          Toplam <span className="font-semibold text-orange-500">{allRecipes.length}</span> tarif bulundu
          {selectedCategory !== 'all' && (
            <span className="ml-2">
              • <span className="font-semibold text-orange-500">{filteredRecipes.length}</span> tarif seçili kategoride
            </span>
          )}
        </p>
      </div>
      
      {/* Filtreler */}
      <div className="mb-8 space-y-4">
        {/* Arama */}
        <div className="relative">
          <input
            type="text"
            placeholder="Tarif ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900"
          />
          <svg
            className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Kategori Filtreleri */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Kategoriler</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Tümü ({allRecipes.length})
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Loading durumu */}
      {categoryLoading && (
        <div className="flex justify-center items-center py-8">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-8 w-8"></div>
          <span className="ml-2 text-gray-600">Kategori yükleniyor...</span>
        </div>
      )}

      {/* Sonuçlar */}
      {!categoryLoading && (
        <>
          {filteredRecipes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} {...recipe} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
                </svg>
              </div>
              <p className="text-gray-600 text-lg">
                {searchTerm 
                  ? 'Arama kriterlerinize uygun tarif bulunamadı.' 
                  : selectedCategory !== 'all'
                    ? 'Bu kategoride henüz tarif bulunmuyor.'
                    : 'Henüz tarif bulunmuyor.'
                }
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Aramayı Temizle
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
} 