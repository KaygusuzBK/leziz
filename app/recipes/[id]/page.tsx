import { notFound } from 'next/navigation'
import { getRecipeById } from '../../lib/supabase/queries'
import Link from 'next/link'

interface RecipeDetailPageProps {
  params: {
    id: string
  }
}

export default async function RecipeDetailPage({ params }: RecipeDetailPageProps) {
  const { data: recipe, error } = await getRecipeById(params.id)

  if (error || !recipe) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <ol className="flex items-center space-x-2 text-sm text-gray-600">
          <li>
            <Link href="/" className="hover:text-orange-500 transition-colors">
              Ana Sayfa
            </Link>
          </li>
          <li>
            <span className="mx-2">/</span>
          </li>
          <li>
            <Link href="/recipes" className="hover:text-orange-500 transition-colors">
              Tarifler
            </Link>
          </li>
          <li>
            <span className="mx-2">/</span>
          </li>
          <li className="text-gray-800 font-medium">{recipe.title}</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recipe Image */}
        <div className="space-y-4">
          <div
            className="w-full aspect-video bg-cover bg-center rounded-xl overflow-hidden"
            style={{ 
              backgroundImage: recipe.image_url 
                ? `url('${recipe.image_url}')` 
                : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
            }}
          >
            {!recipe.image_url && (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-white text-4xl font-bold">{recipe.title.charAt(0)}</span>
              </div>
            )}
          </div>

          {/* Recipe Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {recipe.cooking_time && (
                <div>
                  <div className="text-2xl font-bold text-orange-500">{recipe.cooking_time}</div>
                  <div className="text-sm text-gray-600">Dakika</div>
                </div>
              )}
              {recipe.servings && (
                <div>
                  <div className="text-2xl font-bold text-orange-500">{recipe.servings}</div>
                  <div className="text-sm text-gray-600">Kişilik</div>
                </div>
              )}
              {recipe.difficulty && (
                <div>
                  <div className="text-2xl font-bold text-orange-500">
                    {recipe.difficulty === 'easy' ? 'Kolay' : recipe.difficulty === 'medium' ? 'Orta' : 'Zor'}
                  </div>
                  <div className="text-sm text-gray-600">Zorluk</div>
                </div>
              )}
              <div>
                <div className="text-2xl font-bold text-orange-500">
                  {recipe.is_public ? 'Açık' : 'Gizli'}
                </div>
                <div className="text-sm text-gray-600">Durum</div>
              </div>
            </div>
          </div>
        </div>

        {/* Recipe Content */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{recipe.title}</h1>
            {recipe.description && (
              <p className="text-gray-600 leading-relaxed">{recipe.description}</p>
            )}
          </div>

          {/* Ingredients */}
          {recipe.ingredients && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Malzemeler</h2>
              <div className="bg-gray-50 rounded-lg p-4">
                {Array.isArray(recipe.ingredients) ? (
                  <ul className="space-y-2">
                    {recipe.ingredients.map((ingredient: any, index: number) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                        <span className="text-gray-700">{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600">{recipe.ingredients}</p>
                )}
              </div>
            </div>
          )}

          {/* Instructions */}
          {recipe.instructions && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Hazırlanışı</h2>
              <div className="space-y-4">
                {Array.isArray(recipe.instructions) ? (
                  recipe.instructions.map((instruction: any, index: number) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-700 leading-relaxed">{instruction}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-700 leading-relaxed">{recipe.instructions}</p>
                )}
              </div>
            </div>
          )}

          {/* Recipe Meta */}
          <div className="border-t pt-6">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Oluşturulma: {new Date(recipe.created_at).toLocaleDateString('tr-TR')}</span>
              {recipe.updated_at !== recipe.created_at && (
                <span>Güncellenme: {new Date(recipe.updated_at).toLocaleDateString('tr-TR')}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 