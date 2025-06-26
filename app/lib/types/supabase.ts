export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          bio: string | null
          location: string | null
          website: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          bio?: string | null
          location?: string | null
          website?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          bio?: string | null
          location?: string | null
          website?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string | null
        }
      },
      user_recipes: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          ingredients: string[]
          instructions: string
          category_id: string
          cooking_time: number
          difficulty_level: 'Kolay' | 'Orta' | 'Zor'
          servings: number
          image_url: string | null
          video_url: string | null
          is_public: boolean
          created_at: string
          updated_at: string | null
        }
        Insert: {
          user_id: string
          title: string
          description?: string | null
          ingredients: string[]
          instructions: string
          category_id: string
          cooking_time: number
          difficulty_level: 'Kolay' | 'Orta' | 'Zor'
          servings: number
          image_url?: string | null
          video_url?: string | null
          is_public: boolean
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          user_id?: string
          title?: string
          description?: string | null
          ingredients?: string[]
          instructions?: string
          category_id?: string
          cooking_time?: number
          difficulty_level?: 'Kolay' | 'Orta' | 'Zor'
          servings?: number
          image_url?: string | null
          video_url?: string | null
          is_public?: boolean
          created_at?: string
          updated_at?: string | null
        }
      },
      // Burada veritabanı tablolarınızı tanımlayabilirsiniz
      // Örnek:
      // users: {
      //   Row: {
      //     id: string
      //     email: string
      //     created_at: string
      //   }
      //   Insert: {
      //     id?: string
      //     email: string
      //     created_at?: string
      //   }
      //   Update: {
      //     id?: string
      //     email?: string
      //     created_at?: string
      //   }
      // }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 