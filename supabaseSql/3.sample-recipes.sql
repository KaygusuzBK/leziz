-- Örnek Tarif Verileri
-- Bu dosyayı Supabase SQL Editor'da çalıştırın

-- Önce mevcut tarifleri temizle (isteğe bağlı)
-- DELETE FROM public.recipe_categories;
-- DELETE FROM public.recipes;

-- Örnek tarifler ekle
INSERT INTO public.recipes (
  id,
  user_id,
  title,
  description,
  ingredients,
  instructions,
  cooking_time,
  difficulty,
  servings,
  image_url,
  is_public,
  created_at,
  updated_at
) VALUES 
(
  gen_random_uuid(),
  (SELECT id FROM auth.users LIMIT 1), -- İlk kullanıcıyı al
  'Mercimek Çorbası',
  'Geleneksel Türk mutfağının vazgeçilmez lezzeti, kırmızı mercimek çorbası. Hem besleyici hem de lezzetli bir çorba tarifi.',
  '["1 su bardağı kırmızı mercimek", "1 adet soğan", "1 adet havuç", "2 yemek kaşığı tereyağı", "1 yemek kaşığı un", "6 su bardağı su", "Tuz, karabiber", "Kırmızı pul biber"]',
  '["Mercimekleri yıkayıp süzün.", "Soğanı ve havucu küp küp doğrayın.", "Tereyağında soğanları kavurun.", "Havuçları ekleyip 2-3 dakika daha kavurun.", "Mercimekleri ve suyu ekleyin.", "Kaynayınca altını kısın ve 30 dakika pişirin.", "Blenderdan geçirin.", "Un ve baharatları ekleyip 5 dakika daha pişirin."]',
  45,
  'easy',
  4,
  'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800',
  true,
  NOW(),
  NOW()
),
(
  gen_random_uuid(),
  (SELECT id FROM auth.users LIMIT 1),
  'Tavuk Sote',
  'Pratik ve lezzetli tavuk sote tarifi. Sebzelerle birlikte pişirilen bu yemek hem sağlıklı hem de doyurucu.',
  '["500g tavuk göğsü", "2 adet biber", "1 adet soğan", "2 adet domates", "3 yemek kaşığı zeytinyağı", "Tuz, karabiber", "Kekik"]',
  '["Tavukları kuşbaşı doğrayın.", "Sebzeleri julyen doğrayın.", "Zeytinyağında tavukları kavurun.", "Sebzeleri ekleyin.", "Baharatları ekleyip 15 dakika pişirin.", "Domatesleri ekleyip 5 dakika daha pişirin."]',
  30,
  'medium',
  4,
  'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800',
  true,
  NOW(),
  NOW()
),
(
  gen_random_uuid(),
  (SELECT id FROM auth.users LIMIT 1),
  'Brownie',
  'Çikolatalı brownie tarifi. Dışı çıtır, içi yumuşak olan bu tatlı herkesin favorisi.',
  '["200g bitter çikolata", "150g tereyağı", "3 adet yumurta", "200g şeker", "100g un", "1 paket vanilya", "1 çay kaşığı tuz"]',
  '["Çikolatayı benmari usulü eritin.", "Tereyağını ekleyip karıştırın.", "Yumurta ve şekeri çırpın.", "Çikolata karışımını ekleyin.", "Un ve vanilyayı ekleyip karıştırın.", "180°C fırında 25 dakika pişirin."]',
  45,
  'medium',
  8,
  'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800',
  true,
  NOW(),
  NOW()
),
(
  gen_random_uuid(),
  (SELECT id FROM auth.users LIMIT 1),
  'Pizza Margherita',
  'Klasik İtalyan pizza tarifi. Domates sosu, mozzarella peyniri ve fesleğen ile hazırlanan bu pizza gerçek bir lezzet.',
  '["Pizza hamuru", "Domates sosu", "Mozzarella peyniri", "Fesleğen", "Zeytinyağı", "Tuz"]',
  '["Hamuru açın.", "Domates sosunu sürün.", "Mozzarella peynirini ekleyin.", "Fesleğen yapraklarını ekleyin.", "250°C fırında 12-15 dakika pişirin.", "Zeytinyağı ile servis yapın."]',
  30,
  'medium',
  4,
  'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800',
  true,
  NOW(),
  NOW()
),
(
  gen_random_uuid(),
  (SELECT id FROM auth.users LIMIT 1),
  'Sushi Roll',
  'Ev yapımı sushi roll tarifi. Taze balık, pirinç ve sebzelerle hazırlanan bu Japon lezzeti.',
  '["Sushi pirinci", "Nori yaprağı", "Somon", "Salatalık", "Avokado", "Wasabi", "Soya sosu"]',
  '["Pirinci pişirin ve soğutun.", "Nori yaprağını yayın.", "Pirinci yayın.", "Balık ve sebzeleri ekleyin.", "Rulo yapın.", "Dilimleyin ve servis yapın."]',
  60,
  'hard',
  2,
  'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800',
  true,
  NOW(),
  NOW()
);

-- Tarif-kategori ilişkilerini ekle (ON CONFLICT DO NOTHING ile duplicate'leri önle)
INSERT INTO public.recipe_categories (recipe_id, category_id)
SELECT 
  r.id,
  c.id
FROM public.recipes r
CROSS JOIN public.categories c
WHERE 
  (r.title = 'Mercimek Çorbası' AND c.name = 'Çorbalar') OR
  (r.title = 'Tavuk Sote' AND c.name = 'Ana Yemekler') OR
  (r.title = 'Brownie' AND c.name = 'Tatlılar') OR
  (r.title = 'Pizza Margherita' AND c.name = 'İtalyan Mutfağı') OR
  (r.title = 'Sushi Roll' AND c.name = 'Ana Yemekler')
ON CONFLICT (recipe_id, category_id) DO NOTHING; 