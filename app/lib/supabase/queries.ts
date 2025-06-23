import { createSupabaseServerClient as createServerClient } from './server';

// Helper function to handle Supabase queries
async function executeQuery(query: any) {
  const { data, error } = await query;
  if (error) {
    console.error('Supabase query error:', error.message);
    // In a real app, you might want to throw the error or handle it differently
    return { data: null, error };
  }
  return { data, error: null };
}

/**
 * Fetches a single recipe by ID.
 * @param id - The recipe ID.
 */
export async function getRecipeById(id: string) {
  const supabase = createServerClient();
  const query = supabase
    .from('recipes')
    .select('*')
    .eq('id', id)
    .single();
  return executeQuery(query);
}

/**
 * Fetches all recipes from the database.
 * @param limit - The number of recipes to fetch (optional).
 */
export async function getAllRecipes() {
  const supabase = createServerClient();
  // recipes tablosundaki public tarifler
  const { data: recipes, error: recipesError } = await supabase
    .from('recipes')
    .select('*')
    .eq('is_public', true)
    .order('created_at', { ascending: false });
  // user_recipes tablosundaki public tarifler
  const { data: userRecipes, error: userRecipesError } = await supabase
    .from('user_recipes')
    .select('*')
    .eq('is_public', true)
    .order('created_at', { ascending: false });
  // Hataları birleştir
  if (recipesError && userRecipesError) {
    return { data: [], error: recipesError.message + ' / ' + userRecipesError.message };
  }
  // Tüm tarifleri birleştir
  const all = [...(recipes || []), ...(userRecipes || [])];
  // Tarihe göre sırala
  all.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  return { data: all, error: null };
}

/**
 * Fetches all categories from the database.
 */
export async function getCategories() {
  const supabase = createServerClient();
  const query = supabase.from('categories').select('*').order('name', { ascending: true });
  return executeQuery(query);
}

/**
 * Fetches recipes by category.
 * @param categoryId - The category ID to filter by.
 * @param limit - The number of recipes to fetch.
 */
export async function getRecipesByCategory(categoryId: string, limit = 20) {
  const supabase = createServerClient();
  const query = supabase
    .from('recipes')
    .select(`
      *,
      recipe_categories!inner(category_id)
    `)
    .eq('recipe_categories.category_id', categoryId)
    .order('created_at', { ascending: false })
    .limit(limit);
  return executeQuery(query);
}

/**
 * Fetches the most recent recipes.
 * @param limit - The number of recipes to fetch.
 */
export async function getLatestRecipes(limit = 8) {
  const supabase = createServerClient();
  const query = supabase
    .from('recipes')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);
  return executeQuery(query);
}

/**
 * Fetches featured recipes.
 * For now, this fetches the oldest recipes as a placeholder.
 * You can customize the logic (e.g., based on favorites, a specific flag).
 * @param limit - The number of recipes to fetch.
 */
export async function getFeaturedRecipes(limit = 4) {
    const supabase = createServerClient();
    const query = supabase
        .from('recipes')
        .select('*')
        .order('created_at', { ascending: true }) // Placeholder: oldest recipes
        .limit(limit);
    return executeQuery(query);
} 