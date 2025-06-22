import SectionTitle from "./components/SectionTitle";
import RecipeCard from "./components/RecipeCard";
import CategoryCard from "./components/CategoryCard";
import { getCategories, getFeaturedRecipes, getLatestRecipes } from "./lib/supabase/queries";
import { toast } from "sonner";

export default async function Home() {

  const { data: featuredRecipes, error: featuredError } = await getFeaturedRecipes();
  const { data: latestRecipes, error: latestError } = await getLatestRecipes();
  const { data: categories, error: categoriesError } = await getCategories();

  if (featuredError || latestError || categoriesError) {
    // This is a server component, so we can't use hooks like toast here.
    // The error will be logged on the server by the query function.
    // We can render a fallback UI.
    return <div className="text-center py-10">Hata: Veriler yüklenemedi. Lütfen daha sonra tekrar deneyin.</div>
  }

  return (
    <div className="layout-container flex h-full grow flex-col max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-12">
      {/* Hero Section */}
      <div className="mb-8 px-4 md:px-8 lg:px-12">
        <div className="px-2 md:px-4 py-2 md:py-3">
          <div
            className="bg-cover bg-center flex flex-col justify-end overflow-hidden rounded-xl min-h-60 md:min-h-80 bg-hero"
          >
            <div className="flex p-4">
              <p className="text-white tracking-light text-xl md:text-2xl lg:text-[28px] font-bold leading-tight">
                Lezzetli Tarifleri Keşfet
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Recipes */}
      {featuredRecipes && featuredRecipes.length > 0 && (
        <>
          <SectionTitle title="Öne Çıkan Tarifler" showWebhookButton={true} />
          <div className="flex overflow-x-auto scrollbar-hide">
            <div className="flex items-stretch p-4 gap-3 min-w-full">
              {featuredRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} {...recipe} />
              ))}
            </div>
          </div>
        </>
      )}

      {/* Latest Recipes */}
      {latestRecipes && latestRecipes.length > 0 && (
        <>
          <SectionTitle title="En Yeni Tarifler" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-4">
            {latestRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} {...recipe} />
            ))}
          </div>
        </>
      )}


      {/* Popular Categories */}
      {categories && categories.length > 0 && (
        <>
          <SectionTitle title="Popüler Kategoriler" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4">
            {categories.map((cat) => (
              <CategoryCard key={cat.id} {...cat} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
