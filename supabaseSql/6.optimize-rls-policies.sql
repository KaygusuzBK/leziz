-- RLS Politikalarını Optimize Etme
-- Bu dosyayı Supabase SQL Editor'da çalıştırın

-- 1. Önce eski politikaları silelim
DROP POLICY IF EXISTS "Users can view own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.user_profiles;

DROP POLICY IF EXISTS "Users can view public recipes" ON public.recipes;
DROP POLICY IF EXISTS "Users can view own recipes" ON public.recipes;
DROP POLICY IF EXISTS "Users can insert own recipes" ON public.recipes;
DROP POLICY IF EXISTS "Users can update own recipes" ON public.recipes;
DROP POLICY IF EXISTS "Users can delete own recipes" ON public.recipes;

DROP POLICY IF EXISTS "Users can view own favorites" ON public.user_favorites;
DROP POLICY IF EXISTS "Users can insert own favorites" ON public.user_favorites;
DROP POLICY IF EXISTS "Users can delete own favorites" ON public.user_favorites;

DROP POLICY IF EXISTS "Users can view follows" ON public.user_follows;
DROP POLICY IF EXISTS "Users can insert own follows" ON public.user_follows;
DROP POLICY IF EXISTS "Users can delete own follows" ON public.user_follows;

DROP POLICY IF EXISTS "Users can view their own recipes" ON public.user_recipes;
DROP POLICY IF EXISTS "Anyone can view public recipes" ON public.user_recipes;
DROP POLICY IF EXISTS "Users can insert their own recipes" ON public.user_recipes;
DROP POLICY IF EXISTS "Users can update their own recipes" ON public.user_recipes;
DROP POLICY IF EXISTS "Users can delete their own recipes" ON public.user_recipes;

-- 2. Optimize edilmiş user_profiles politikaları
CREATE POLICY "Users can view own profile" ON public.user_profiles
  FOR SELECT USING ((select auth.uid()) = id);

CREATE POLICY "Users can update own profile" ON public.user_profiles
  FOR UPDATE USING ((select auth.uid()) = id);

CREATE POLICY "Users can insert own profile" ON public.user_profiles
  FOR INSERT WITH CHECK ((select auth.uid()) = id);

-- 3. Optimize edilmiş recipes politikaları (çoklu permissive politikaları birleştirildi)
CREATE POLICY "Users can view recipes" ON public.recipes
  FOR SELECT USING (
    is_public = true OR (select auth.uid()) = user_id
  );

CREATE POLICY "Users can insert own recipes" ON public.recipes
  FOR INSERT WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can update own recipes" ON public.recipes
  FOR UPDATE USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can delete own recipes" ON public.recipes
  FOR DELETE USING ((select auth.uid()) = user_id);

-- 4. Optimize edilmiş user_favorites politikaları
CREATE POLICY "Users can view own favorites" ON public.user_favorites
  FOR SELECT USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can insert own favorites" ON public.user_favorites
  FOR INSERT WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can delete own favorites" ON public.user_favorites
  FOR DELETE USING ((select auth.uid()) = user_id);

-- 5. Optimize edilmiş user_follows politikaları
CREATE POLICY "Users can view follows" ON public.user_follows
  FOR SELECT USING (true);

CREATE POLICY "Users can insert own follows" ON public.user_follows
  FOR INSERT WITH CHECK ((select auth.uid()) = follower_id);

CREATE POLICY "Users can delete own follows" ON public.user_follows
  FOR DELETE USING ((select auth.uid()) = follower_id);

-- 6. Optimize edilmiş user_recipes politikaları (çoklu permissive politikaları birleştirildi)
CREATE POLICY "Users can view user recipes" ON public.user_recipes
  FOR SELECT USING (
    is_public = true OR (select auth.uid()) = user_id
  );

CREATE POLICY "Users can insert their own recipes" ON public.user_recipes
  FOR INSERT WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can update their own recipes" ON public.user_recipes
  FOR UPDATE USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can delete their own recipes" ON public.user_recipes
  FOR DELETE USING ((select auth.uid()) = user_id);

-- 7. Storage politikalarını da optimize edelim
DROP POLICY IF EXISTS "Users can upload their own avatar" ON storage.objects;
DROP POLICY IF EXISTS "Users can view all avatars" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own avatar" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own avatar" ON storage.objects;

CREATE POLICY "Users can upload their own avatar" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'avatars' AND 
    (select auth.uid())::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can view all avatars" ON storage.objects
  FOR SELECT USING (bucket_id = 'avatars');

CREATE POLICY "Users can update their own avatar" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'avatars' AND 
    (select auth.uid())::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their own avatar" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'avatars' AND 
    (select auth.uid())::text = (storage.foldername(name))[1]
  );

-- 8. Performans için ek indexler
CREATE INDEX IF NOT EXISTS idx_user_profiles_id ON public.user_profiles(id);
CREATE INDEX IF NOT EXISTS idx_recipes_user_id ON public.recipes(user_id);
CREATE INDEX IF NOT EXISTS idx_recipes_is_public ON public.recipes(is_public);
CREATE INDEX IF NOT EXISTS idx_user_favorites_user_id ON public.user_favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_user_follows_follower_id ON public.user_follows(follower_id);
CREATE INDEX IF NOT EXISTS idx_user_recipes_user_id ON public.user_recipes(user_id);
CREATE INDEX IF NOT EXISTS idx_user_recipes_is_public ON public.user_recipes(is_public);

-- 9. Composite indexler (daha iyi performans için)
CREATE INDEX IF NOT EXISTS idx_recipes_user_public ON public.recipes(user_id, is_public);
CREATE INDEX IF NOT EXISTS idx_user_recipes_user_public ON public.user_recipes(user_id, is_public);

-- 10. Partial indexler (sadece public tarifler için)
CREATE INDEX IF NOT EXISTS idx_recipes_public_only ON public.recipes(user_id) WHERE is_public = true;
CREATE INDEX IF NOT EXISTS idx_user_recipes_public_only ON public.user_recipes(user_id) WHERE is_public = true; 