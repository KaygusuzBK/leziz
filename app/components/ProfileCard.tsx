'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { updateUserProfile } from '../lib/auth/profile'

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

interface ProfileCardProps {
  profile: ProfileData
  onProfileUpdate: (updatedProfile: ProfileData) => void
}

export default function ProfileCard({ profile, onProfileUpdate }: ProfileCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<Partial<ProfileData>>({})

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()

    // Boş string'leri null'a çevir
    const cleanedFormData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [
        key, 
        value === '' ? null : value
      ])
    )

    const result = await updateUserProfile({ data: cleanedFormData });
    if (result.success) {
      toast.success('Profil başarıyla güncellendi!');
      if(result.data?.user) {
        onProfileUpdate(result.data.user as ProfileData);
      }
      setIsEditing(false);
    } else {
      toast.error('Hata: ' + result.error);
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  const startEditing = () => {
    setFormData({
      full_name: profile?.full_name || '',
      bio: profile?.bio || '',
      location: profile?.location || '',
      website: profile?.website || '',
      avatar_url: profile?.avatar_url || ''
    });
    setIsEditing(true);
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="flex flex-col items-center mb-8">
        <img
          src={profile.avatar_url || 'https://i.pravatar.cc/150'}
          alt="Profile Avatar"
          className="w-32 h-32 rounded-full object-cover border-4 border-orange-200 shadow-lg mb-4"
        />
        <h1 className="text-3xl font-bold text-gray-800">{profile.full_name || 'İsim Belirtilmemiş'}</h1>
        <p className="text-md text-gray-600 mb-4">{profile.email}</p>
        
        {!isEditing && (
          <button
            onClick={startEditing}
            className="px-6 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
          >
            Profili Düzenle
          </button>
        )}
      </div>

      {isEditing ? (
        <ProfileEditForm 
          formData={formData}
          onInputChange={handleInputChange}
          onSubmit={handleUpdateProfile}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <ProfileInfo profile={profile} />
      )}
    </div>
  )
}

// Profile Edit Form Component
interface ProfileEditFormProps {
  formData: Partial<ProfileData>
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onSubmit: (e: React.FormEvent) => void
  onCancel: () => void
}

function ProfileEditForm({ formData, onInputChange, onSubmit, onCancel }: ProfileEditFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ad Soyad
          </label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name || ''}
            onChange={onInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900"
            placeholder="Adınız ve soyadınız"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Konum
          </label>
          <input
            type="text"
            name="location"
            value={formData.location || ''}
            onChange={onInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900"
            placeholder="Şehir, Ülke"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Website
          </label>
          <input
            type="url"
            name="website"
            value={formData.website || ''}
            onChange={onInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900"
            placeholder="https://example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Avatar URL
          </label>
          <input
            type="url"
            name="avatar_url"
            value={formData.avatar_url || ''}
            onChange={onInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900"
            placeholder="https://example.com/avatar.jpg"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Hakkımda
        </label>
        <textarea
          name="bio"
          value={formData.bio || ''}
          onChange={onInputChange}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900"
          placeholder="Kendiniz hakkında kısa bir açıklama..."
        />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          className="px-6 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
        >
          Kaydet
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 transition-colors"
        >
          İptal
        </button>
      </div>
    </form>
  )
}

// Profile Info Component
interface ProfileInfoProps {
  profile: ProfileData
}

function ProfileInfo({ profile }: ProfileInfoProps) {
  return (
    <div className="space-y-6">
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Hakkımda</h3>
        <p className="text-gray-600">
          {profile.bio || 'Henüz bir biyografi eklenmemiş.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {profile.location && (
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-2">Konum</h4>
            <p className="text-gray-600">{profile.location}</p>
          </div>
        )}
        
        {profile.website && (
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-2">Website</h4>
            <a 
              href={profile.website} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-orange-500 hover:underline"
            >
              {profile.website}
            </a>
          </div>
        )}
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-800 mb-2">Hesap Bilgileri</h4>
        <p className="text-gray-600">
          <span className="font-medium">Üye olma tarihi:</span> {new Date(profile.created_at).toLocaleDateString('tr-TR')}
        </p>
        {profile.updated_at !== profile.created_at && (
          <p className="text-gray-600">
            <span className="font-medium">Son güncelleme:</span> {new Date(profile.updated_at).toLocaleDateString('tr-TR')}
          </p>
        )}
      </div>
    </div>
  )
} 