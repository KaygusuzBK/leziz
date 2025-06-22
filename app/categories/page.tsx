import { getCategories } from '../lib/supabase/queries'
import CategoryCard from '../components/CategoryCard'
import SectionTitle from '../components/SectionTitle'

type Category = {
  id: string;
  name: string;
  description?: string;
  image_url?: string;
  created_at?: string;
};

export default async function KategorilerPage() {
  const { data: categories, error } = await getCategories()

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-10">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Kategoriler</h1>
          <p className="text-gray-600">Kategoriler yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <SectionTitle title="Tüm Kategoriler" />
      
      {categories && categories.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {categories.map((category: Category) => (
            <CategoryCard key={category.id} {...category} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-600">Henüz kategori bulunmuyor.</p>
        </div>
      )}
    </div>
  )
} 