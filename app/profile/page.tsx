'use client'

import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { useAuth } from '../lib/context/AuthContext'
import { getUserProfile, updateUserProfile } from '../lib/auth/profile'
import LoginModal from '../components/LoginModal'
import RegisterModal from '../components/RegisterModal'

interface ProfileData {
  full_name: string
  email: string
  bio: string
  location: string
  website: string
  avatar_url: string
}

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [loadingProfile, setLoadingProfile] = useState(true)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showRegisterModal, setShowRegisterModal] = useState(false)

  useEffect(() => {
    async function loadUserProfile() {
      if (user) {
        setLoadingProfile(true)
        const { data, error } = await getUserProfile(user.id)
        if (error) {
          toast.error("Profil bilgileri yüklenirken bir hata oluştu: " + error)
        } else if (data) {
          setProfile(data)
        }
        setLoadingProfile(false)
      }
    }

    if (!isLoading) {
      if(isAuthenticated) {
        loadUserProfile()
      } else {
        setLoadingProfile(false)
      }
    }
  }, [user, isAuthenticated, isLoading])

  const handleUpdateProfile = async (formData: Partial<ProfileData>) => {
    const result = await updateUserProfile({ data: formData });
    if (result.success) {
      toast.success('Profil başarıyla güncellendi!');
      if(result.data?.user) setProfile(result.data.user);
    } else {
      toast.error('Hata: ' + result.error);
    }
  }

  if (isLoading || (isAuthenticated && loadingProfile)) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <>
        <div className="flex flex-col justify-center items-center min-h-[60vh] text-center">
          <h2 className="text-2xl font-semibold mb-4">Profilinizi Görüntüleyin</h2>
          <p className="text-gray-600 mb-8">Tariflerinizi yönetmek ve diğer kullanıcılarla etkileşimde bulunmak için giriş yapın veya kaydolun.</p>
          <div className="flex gap-4">
            <button
              onClick={() => setShowLoginModal(true)}
              className="px-6 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
            >
              Giriş Yap
            </button>
            <button
              onClick={() => setShowRegisterModal(true)}
              className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
            >
              Kayıt Ol
            </button>
          </div>
        </div>
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onSwitchToRegister={() => {
            setShowLoginModal(false)
            setShowRegisterModal(true)
          }}
        />
        <RegisterModal
          isOpen={showRegisterModal}
          onClose={() => setShowRegisterModal(false)}
          onSwitchToLogin={() => {
            setShowRegisterModal(false)
            setShowLoginModal(true)
          }}
        />
      </>
    )
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      {profile ? (
        <div className="flex flex-col items-center">
          <img
            src={profile.avatar_url || 'https://i.pravatar.cc/150'} // Default avatar
            alt="Profile Avatar"
            className="w-32 h-32 rounded-full object-cover border-4 border-orange-200 shadow-lg mb-4"
          />
          <h1 className="text-3xl font-bold">{profile.full_name || 'İsim Belirtilmemiş'}</h1>
          <p className="text-md text-gray-500 mb-4">{profile.email}</p>
          <p className="text-center max-w-md my-4">{profile.bio || 'Henüz bir biyografi eklenmemiş.'}</p>
          
          <div className="text-left w-full mt-6">
            {profile.location && <p><span className="font-semibold">Konum:</span> {profile.location}</p>}
            {profile.website && <p><span className="font-semibold">Website:</span> <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:underline">{profile.website}</a></p>}
          </div>

          <button onClick={() => handleUpdateProfile({ full_name: "Test Name" })} className="mt-4 px-6 py-2 bg-blue-500 text-white rounded">
            Update Name (Test)
          </button>
        </div>
      ) : (
         <p>Kullanıcı profili bulunamadı. Lütfen destek ile iletişime geçin.</p>
      )}
    </div>
  )
} 