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
 * Fetches all categories from the database.
 */
export async function getCategories() {
  const supabase = createServerClient();
  const query = supabase.from('categories').select('*').order('name', { ascending: true });
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