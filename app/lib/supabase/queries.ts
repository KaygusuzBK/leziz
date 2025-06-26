import { createSupabaseServerClient as createServerClient } from './server';

// Helper function to handle Supabase queries
async function executeQuery(query: { then: (callback: (result: { data: unknown; error: unknown }) => void) => void }) {
  const { data, error } = await query;
  if (error) {
    console.error('Supabase query error:', error);
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
  // Önce user_recipes tablosunda ara
  const { data, error } = await supabase.from('user_recipes').select('*').eq('id', id).single();
  if (!data || error) {
    // recipes tablosunda ara
    const { data: data2, error: error2 } = await supabase.from('recipes').select('*').eq('id', id).single();
    if (data2) return { data: data2, error: null };
    return { data: null, error: error2 };
  }
  return { data, error: null };
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
  const { data, error } = await supabase.from('categories').select('*').order('name', { ascending: true });
  return { data, error };
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
  const { data, error } = await supabase
    .from('recipes')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);
  return { data, error };
}

/**
 * Fetches featured recipes.
 * For now, this fetches the oldest recipes as a placeholder.
 * You can customize the logic (e.g., based on favorites, a specific flag).
 * @param limit - The number of recipes to fetch.
 */
export async function getFeaturedRecipes(limit = 4) {
    const supabase = createServerClient();
    const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .order('created_at', { ascending: true }) // Placeholder: oldest recipes
        .limit(limit);
    return { data, error };
}

/**
 * Bir kullanıcıyı takip et
 */
export async function followUser(followerId: string, followingId: string) {
  const supabase = createServerClient();
  const query = supabase.from('follows').insert({ follower_id: followerId, following_id: followingId });
  return executeQuery(query);
}

/**
 * Bir kullanıcıyı takipten çıkar
 */
export async function unfollowUser(followerId: string, followingId: string) {
  const supabase = createServerClient();
  const query = supabase.from('follows').delete().match({ follower_id: followerId, following_id: followingId });
  return executeQuery(query);
}

/**
 * Kullanıcı takip ediyor mu?
 */
export async function isFollowing(followerId: string, followingId: string) {
  const supabase = createServerClient();
  const query = supabase.from('follows').select('id').match({ follower_id: followerId, following_id: followingId }).single();
  return executeQuery(query);
}

/**
 * Bir kullanıcının takipçileri
 */
export async function getFollowers(userId: string) {
  const supabase = createServerClient();
  const query = supabase.from('follows').select('follower_id').eq('following_id', userId);
  return executeQuery(query);
}

/**
 * Bir kullanıcının takip ettikleri
 */
export async function getFollowing(userId: string) {
  const supabase = createServerClient();
  const query = supabase.from('follows').select('following_id').eq('follower_id', userId);
  return executeQuery(query);
}

/**
 * Bir tarife yorum ekle
 */
export async function addComment(recipeId: string, userId: string, content: string) {
  const supabase = createServerClient();
  const query = supabase.from('comments').insert({ recipe_id: recipeId, user_id: userId, content });
  return executeQuery(query);
}

/**
 * Bir yorumu sil
 */
export async function deleteComment(commentId: string, userId: string) {
  const supabase = createServerClient();
  // Sadece yorumu yazan kullanıcı silebilsin
  const query = supabase.from('comments').delete().match({ id: commentId, user_id: userId });
  return executeQuery(query);
}

/**
 * Bir tarifin tüm yorumlarını getir (kullanıcı profiliyle birlikte)
 */
export async function getCommentsByRecipe(recipeId: string) {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from('comments')
    .select('*, user_profiles: user_id (id, full_name, avatar_url)')
    .eq('recipe_id', recipeId)
    .order('created_at', { ascending: true });
  return { data, error };
} 