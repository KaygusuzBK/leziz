-- Kalan Supabase Uyarılarını Düzeltme
-- Bu dosyayı Supabase SQL Editor'da çalıştırın

-- 1. categories tablosu için RLS aktif etme
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- Herkes kategorileri görebilsin (public erişim)
CREATE POLICY "Public can view categories" ON public.categories
  FOR SELECT USING (true);

-- 2. recipe_categories tablosu için RLS aktif etme
ALTER TABLE public.recipe_categories ENABLE ROW LEVEL SECURITY;

-- Herkes recipe_categories'i görebilsin (public erişim)
CREATE POLICY "Public can view recipe_categories" ON public.recipe_categories
  FOR SELECT USING (true);

-- 3. handle_new_user fonksiyonunu search_path ile yeniden oluşturma
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name')
  );
  RETURN NEW;
END;
$$;

-- 4. update_updated_at_column fonksiyonunu search_path ile yeniden oluşturma
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- 5. Performans için ek indexler
CREATE INDEX IF NOT EXISTS idx_categories_name ON public.categories(name);
CREATE INDEX IF NOT EXISTS idx_recipe_categories_recipe_id ON public.recipe_categories(recipe_id);
CREATE INDEX IF NOT EXISTS idx_recipe_categories_category_id ON public.recipe_categories(category_id);

-- 6. Composite indexler
CREATE INDEX IF NOT EXISTS idx_recipe_categories_composite ON public.recipe_categories(recipe_id, category_id);

-- 7. Mevcut trigger'ları yeniden oluştur (search_path için)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 8. Diğer trigger'ları da yeniden oluştur
DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON public.user_profiles;
CREATE TRIGGER update_user_profiles_updated_at 
  BEFORE UPDATE ON public.user_profiles 
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_recipes_updated_at ON public.recipes;
CREATE TRIGGER update_recipes_updated_at 
  BEFORE UPDATE ON public.recipes 
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_user_recipes_updated_at ON public.user_recipes;
CREATE TRIGGER update_user_recipes_updated_at 
  BEFORE UPDATE ON public.user_recipes 
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 9. Fonksiyonların güvenlik ayarlarını kontrol et
COMMENT ON FUNCTION public.handle_new_user() IS 'New user registration handler with secure search_path';
COMMENT ON FUNCTION public.update_updated_at_column() IS 'Updated timestamp handler with secure search_path'; 