-- Kullanıcı tarifleri için recipes tablosu
CREATE TABLE IF NOT EXISTS user_recipes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  ingredients JSONB NOT NULL, -- Malzemeler array olarak
  instructions TEXT NOT NULL, -- Hazırlanış adımları
  category_id UUID REFERENCES categories(id),
  cooking_time INTEGER, -- Dakika cinsinden
  difficulty_level TEXT CHECK (difficulty_level IN ('Kolay', 'Orta', 'Zor')),
  servings INTEGER, -- Kaç kişilik
  image_url TEXT, -- Resim URL'i
  video_url TEXT, -- Video URL'i
  is_public BOOLEAN DEFAULT true, -- Tarif herkese açık mı?
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS (Row Level Security) politikaları
ALTER TABLE user_recipes ENABLE ROW LEVEL SECURITY;

-- Kullanıcılar kendi tariflerini görebilir
CREATE POLICY "Users can view their own recipes" ON user_recipes
  FOR SELECT USING (auth.uid() = user_id);

-- Herkes public tarifleri görebilir
CREATE POLICY "Anyone can view public recipes" ON user_recipes
  FOR SELECT USING (is_public = true);

-- Kullanıcılar kendi tariflerini oluşturabilir
CREATE POLICY "Users can insert their own recipes" ON user_recipes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Kullanıcılar kendi tariflerini güncelleyebilir
CREATE POLICY "Users can update their own recipes" ON user_recipes
  FOR UPDATE USING (auth.uid() = user_id);

-- Kullanıcılar kendi tariflerini silebilir
CREATE POLICY "Users can delete their own recipes" ON user_recipes
  FOR DELETE USING (auth.uid() = user_id);

-- Updated at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_user_recipes_updated_at 
    BEFORE UPDATE ON user_recipes 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Indexes
CREATE INDEX idx_user_recipes_user_id ON user_recipes(user_id);
CREATE INDEX idx_user_recipes_category_id ON user_recipes(category_id);
CREATE INDEX idx_user_recipes_created_at ON user_recipes(created_at DESC);
CREATE INDEX idx_user_recipes_is_public ON user_recipes(is_public); 