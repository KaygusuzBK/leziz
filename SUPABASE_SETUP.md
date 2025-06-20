# Supabase Kurulum ve Kullanım Kılavuzu

## Kurulum

1. **Environment Değişkenlerini Ayarlayın**

`.env.local` dosyası oluşturun ve aşağıdaki değişkenleri ekleyin:

```env
# Zorunlu değişkenler
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Opsiyonel - Sadece server-side admin işlemleri için gerekli
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

**Not:** `SUPABASE_SERVICE_ROLE_KEY` sadece server-side admin işlemleri (örneğin RLS bypass) gerektiğinde kullanılır. Çoğu durumda sadece URL ve anon key yeterlidir.

2. **Supabase Projesi Oluşturun**

- [Supabase Dashboard](https://supabase.com/dashboard) adresine gidin
- Yeni proje oluşturun
- Settings > API bölümünden URL ve anahtarları alın

## Kullanım

### Client-Side Kullanım

```typescript
import { getSupabaseClient } from '@/app/lib'

const supabase = getSupabaseClient()

// Authentication
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password'
})

// Veri okuma
const { data: users, error } = await supabase
  .from('users')
  .select('*')

// Veri ekleme
const { data, error } = await supabase
  .from('users')
  .insert({ name: 'John Doe', email: 'john@example.com' })
  .select()

// Veri güncelleme
const { data, error } = await supabase
  .from('users')
  .update({ name: 'Jane Doe' })
  .eq('id', 'user-id')
  .select()

// Veri silme
const { error } = await supabase
  .from('users')
  .delete()
  .eq('id', 'user-id')

// Real-time subscription
const subscription = supabase
  .channel('table-db-changes')
  .on('postgres_changes', 
    { event: '*', schema: 'public', table: 'users' },
    (payload) => {
      console.log('Change received!', payload)
    }
  )
  .subscribe()
```

### Server-Side Kullanım

```typescript
import { getSupabaseServerClient, createSupabaseServerClientWithAnon } from '@/app/lib'

// Admin yetkileri ile (SUPABASE_SERVICE_ROLE_KEY gerekli)
export async function adminServerAction() {
  const supabase = getSupabaseServerClient()
  
  const { data, error } = await supabase
    .from('users')
    .select('*')
    
  return { data, error }
}

// Anon key ile (SUPABASE_SERVICE_ROLE_KEY gerekli değil)
export async function regularServerAction() {
  const supabase = createSupabaseServerClientWithAnon()
  
  const { data, error } = await supabase
    .from('users')
    .select('*')
    
  return { data, error }
}
```

## Service Role Key Ne Zaman Gerekli?

`SUPABASE_SERVICE_ROLE_KEY` sadece aşağıdaki durumlarda gereklidir:

1. **RLS (Row Level Security) Bypass**: RLS kurallarını atlayarak tüm verilere erişim
2. **Admin İşlemleri**: Kullanıcı yetkilerini aşan işlemler
3. **Sistem Yönetimi**: Kullanıcı hesaplarını yönetme, silme vb.

**Çoğu durumda sadece anon key yeterlidir!**

## Klasör Yapısı

```
app/lib/
├── config/
│   └── supabase.ts          # Konfigürasyon ayarları
├── supabase/
│   ├── client.ts           # Client-side client
│   └── server.ts           # Server-side client
├── types/
│   └── supabase.ts         # TypeScript tipleri
└── index.ts                # Ana export dosyası
```

## Tip Güvenliği

Veritabanı tiplerini `app/lib/types/supabase.ts` dosyasında tanımlayın:

```typescript
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          name: string
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          created_at?: string
        }
      }
    }
  }
}
``` 