# Supabase Auth Kullanım Kılavuzu

## Import

```typescript
import {
  signInWithEmail,
  signUpWithEmail,
  signOut,
  getCurrentUser,
  isAuthenticated,
  // ... diğer metodlar
} from '@/app/lib'
```

## Klasör Yapısı

```
app/lib/auth/
├── types.ts              # Tip tanımları
├── authentication.ts     # Giriş, kayıt, çıkış
├── user-state.ts         # Kullanıcı durumu
├── password.ts           # Şifre işlemleri
├── listeners.ts          # Real-time dinleme
├── profile.ts            # Profil yönetimi
├── session.ts            # Session işlemleri
└── index.ts              # Ana export dosyası
```

## Temel Auth İşlemleri

### 1. Giriş Yapma (Login)

```typescript
const handleLogin = async (email: string, password: string) => {
  const result = await signInWithEmail(email, password)
  
  if (result.success) {
    console.log('Giriş başarılı!', result.data.user)
    // Kullanıcıyı yönlendir
    router.push('/dashboard')
  } else {
    console.error('Giriş hatası:', result.error)
    // Hata mesajını göster
  }
}
```

### 2. Kayıt Olma (Register)

```typescript
const handleRegister = async (email: string, password: string) => {
  const result = await signUpWithEmail(email, password)
  
  if (result.success) {
    console.log('Kayıt başarılı!', result.data.user)
    // Email doğrulama mesajı göster
  } else {
    console.error('Kayıt hatası:', result.error)
    // Hata mesajını göster
  }
}
```

### 3. Çıkış Yapma (Logout)

```typescript
const handleLogout = async () => {
  const result = await signOut()
  
  if (result.success) {
    console.log('Çıkış başarılı!')
    // Ana sayfaya yönlendir
    router.push('/')
  } else {
    console.error('Çıkış hatası:', result.error)
  }
}
```

### 4. Mevcut Kullanıcıyı Kontrol Etme

```typescript
const checkCurrentUser = async () => {
  const result = await getCurrentUser()
  
  if (result.success && result.data.user) {
    console.log('Giriş yapmış kullanıcı:', result.data.user)
    return result.data.user
  } else {
    console.log('Giriş yapmamış kullanıcı')
    return null
  }
}
```

### 5. Kullanıcının Giriş Yapıp Yapmadığını Kontrol Etme

```typescript
const checkAuthStatus = async () => {
  const isLoggedIn = await isAuthenticated()
  
  if (isLoggedIn) {
    console.log('Kullanıcı giriş yapmış')
    return true
  } else {
    console.log('Kullanıcı giriş yapmamış')
    return false
  }
}
```

## Gelişmiş Auth İşlemleri

### 6. Şifre Sıfırlama

```typescript
const handlePasswordReset = async (email: string) => {
  const result = await resetPassword(email)
  
  if (result.success) {
    console.log('Şifre sıfırlama emaili gönderildi')
    // Kullanıcıya bilgi ver
  } else {
    console.error('Şifre sıfırlama hatası:', result.error)
  }
}
```

### 7. Yeni Şifre Belirleme

```typescript
const handlePasswordUpdate = async (newPassword: string) => {
  const result = await updatePassword(newPassword)
  
  if (result.success) {
    console.log('Şifre güncellendi')
    // Başarı mesajı göster
  } else {
    console.error('Şifre güncelleme hatası:', result.error)
  }
}
```

### 8. Kullanıcı Profilini Güncelleme

```typescript
const handleProfileUpdate = async (updates: {
  email?: string
  password?: string
  data?: any
}) => {
  const result = await updateUserProfile(updates)
  
  if (result.success) {
    console.log('Profil güncellendi', result.data.user)
  } else {
    console.error('Profil güncelleme hatası:', result.error)
  }
}
```

## Real-Time Auth Dinleme

### 9. Auth Durumu Değişikliklerini Dinleme

```typescript
import { useEffect } from 'react'
import { subscribeToAuthChanges } from '@/app/lib'

const AuthListener = () => {
  useEffect(() => {
    const { data: { subscription } } = subscribeToAuthChanges((user, session) => {
      if (user) {
        console.log('Kullanıcı giriş yaptı:', user)
        // Kullanıcı giriş yaptığında yapılacak işlemler
      } else {
        console.log('Kullanıcı çıkış yaptı')
        // Kullanıcı çıkış yaptığında yapılacak işlemler
      }
    })

    // Cleanup
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return null
}
```

## React Hook Örneği

### 10. Custom Auth Hook

```typescript
import { useState, useEffect } from 'react'
import { getCurrentUser, subscribeToAuthChanges, type AuthState } from '@/app/lib'

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true
  })

  useEffect(() => {
    // İlk yüklemede mevcut kullanıcıyı al
    const getInitialUser = async () => {
      const result = await getCurrentUser()
      if (result.success && result.data.user) {
        setAuthState({
          user: result.data.user,
          session: null, // Session'ı ayrı alabilirsiniz
          loading: false
        })
      } else {
        setAuthState({
          user: null,
          session: null,
          loading: false
        })
      }
    }

    getInitialUser()

    // Auth değişikliklerini dinle
    const { data: { subscription } } = subscribeToAuthChanges((user, session) => {
      setAuthState({
        user,
        session,
        loading: false
      })
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return authState
}
```

## Kullanım Örnekleri

### Login Formu

```typescript
import { useState } from 'react'
import { signInWithEmail } from '@/app/lib'

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = await signInWithEmail(email, password)
    
    if (result.success) {
      // Başarılı giriş
      router.push('/dashboard')
    } else {
      setError(result.error || 'Giriş yapılamadı')
    }
    
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Şifre"
        required
      />
      {error && <p className="error">{error}</p>}
      <button type="submit" disabled={loading}>
        {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
      </button>
    </form>
  )
}
```

### Protected Route

```typescript
import { useEffect, useState } from 'react'
import { isAuthenticated } from '@/app/lib'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await isAuthenticated()
      setAuthenticated(isAuth)
      setLoading(false)
    }

    checkAuth()
  }, [])

  if (loading) {
    return <div>Yükleniyor...</div>
  }

  if (!authenticated) {
    return <div>Bu sayfaya erişim için giriş yapmalısınız.</div>
  }

  return <>{children}</>
}
```

## Tüm Auth Metodları

```typescript
// Temel Auth
signInWithEmail(email, password)     // Giriş yap
signUpWithEmail(email, password)     // Kayıt ol
signOut()                           // Çıkış yap

// Kullanıcı Durumu
getCurrentUser()                    // Mevcut kullanıcıyı al
getCurrentSession()                 // Mevcut session'ı al
isAuthenticated()                   // Giriş durumunu kontrol et

// Şifre İşlemleri
resetPassword(email)                // Şifre sıfırlama emaili gönder
updatePassword(newPassword)         // Yeni şifre belirle

// Profil İşlemleri
updateUserProfile(updates)          // Kullanıcı bilgilerini güncelle
deleteUser()                        // Hesabı sil

// Session İşlemleri
refreshSession()                    // Session'ı yenile

// Real-time Dinleme
onAuthStateChange(callback)         // Auth durumu değişikliklerini dinle
subscribeToAuthChanges(callback)    // Auth değişikliklerini dinle (Promise)
```

## Dosya Organizasyonu

Her dosya belirli bir sorumluluğa sahiptir:

- **`types.ts`**: Tüm tip tanımları
- **`authentication.ts`**: Giriş, kayıt, çıkış işlemleri
- **`user-state.ts`**: Kullanıcı durumu kontrolü
- **`password.ts`**: Şifre yönetimi
- **`listeners.ts`**: Real-time dinleme
- **`profile.ts`**: Profil yönetimi
- **`session.ts`**: Session işlemleri
- **`index.ts`**: Tüm metodları export eder 