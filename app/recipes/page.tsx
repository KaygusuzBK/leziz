"use client"

import { useEffect, useState } from "react";
import { createSupabaseClient } from "../lib/supabase/client";
import RecipeCard from "../components/RecipeCard";
import SectionTitle from "../components/SectionTitle";

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecipes() {
      setLoading(true);
      const supabase = createSupabaseClient();
      // user_recipes tablosu
      const { data: userRecipes, error: userRecipesError } = await supabase
        .from("user_recipes")
        .select("*")
        .eq("is_public", true)
        .order("created_at", { ascending: false });
      // recipes tablosu
      const { data: recipesData, error: recipesError } = await supabase
        .from("recipes")
        .select("*")
        .eq("is_public", true)
        .order("created_at", { ascending: false });
      // Birleştir ve sırala
      const all = [...(userRecipes || []), ...(recipesData || [])];
      all.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      setRecipes(all);
      setLoading(false);
    }
    fetchRecipes();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <SectionTitle title="Tüm Tarifler" />
      {loading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
        </div>
      ) : recipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} {...recipe} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500 text-lg">
          Henüz hiç tarif yok.
        </div>
      )}
    </div>
  );
} 