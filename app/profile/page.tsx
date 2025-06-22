'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../lib/context/AuthContext'
import { getUserProfile } from '../lib/auth/profile'
import ProfileCard from '../components/ProfileCard'
import ProfileAuthPrompt from '../components/ProfileAuthPrompt'
import ProfileLoading from '../components/ProfileLoading'
import ProfileError from '../components/ProfileError'

interface ProfileData {
  id: string
  email: string
  full_name: string
  bio: string
  location: string
  website: string
  avatar_url: string
  created_at: string
  updated_at: string
}

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [loadingProfile, setLoadingProfile] = useState(true)

  useEffect(() => {
    async function loadUserProfile() {
      if (user) {
        setLoadingProfile(true)
        const { data, error } = await getUserProfile(user.id)
        if (error) {
          console.error('Profile loading error:', error)
          // Eğer profil bulunamazsa, kullanıcının temel bilgilerini kullan
          setProfile({
            id: user.id,
            email: user.email || '',
            full_name: user.user_metadata?.full_name || user.user_metadata?.name || '',
            bio: '',
            location: '',
            website: '',
            avatar_url: user.user_metadata?.avatar_url || '',
            created_at: user.created_at,
            updated_at: user.updated_at || user.created_at
          })
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

  const handleProfileUpdate = (updatedProfile: ProfileData) => {
    setProfile(updatedProfile)
  }

  if (isLoading || (isAuthenticated && loadingProfile)) {
    return <ProfileLoading />
  }

  if (!isAuthenticated) {
    return <ProfileAuthPrompt />
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      {profile ? (
        <ProfileCard 
          profile={profile} 
          onProfileUpdate={handleProfileUpdate}
        />
      ) : (
        <ProfileError />
      )}
    </div>
  )
} 