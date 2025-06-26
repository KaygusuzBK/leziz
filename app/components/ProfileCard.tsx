'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { updateUserProfile } from '../lib/auth/profile'
import { Button } from './ui/Button'
import { Input, Textarea } from './ui/Input'
import Image from 'next/image'

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
    <div className="bg-card rounded-lg shadow-lg p-8 border border-card">
      <div className="flex flex-col items-center mb-8">
        <Image
          src={profile.avatar_url || 'https://i.pravatar.cc/150'}
          alt="Profile Avatar"
          width={128}
          height={128}
          className="w-32 h-32 rounded-full object-cover border-4 border-orange-200 shadow-lg mb-4"
        />
        <h1 className="text-3xl font-bold text-primary">{profile.full_name || 'İsim Belirtilmemiş'}</h1>
        <p className="text-md text-secondary mb-4">{profile.email}</p>
        
        {!isEditing && (
          <Button
            onClick={startEditing}
            variant="accent"
            size="md"
            className="font-semibold"
          >
            Profili Düzenle
          </Button>
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
          <Input
            type="text"
            name="full_name"
            value={formData.full_name || ''}
            onChange={onInputChange}
            placeholder="Adınız ve soyadınız"
            className="mb-0"
          />
        </div>

        <div>
          <Input
            type="text"
            name="location"
            value={formData.location || ''}
            onChange={onInputChange}
            placeholder="Şehir, Ülke"
            className="mb-0"
          />
        </div>

        <div>
          <Input
            type="url"
            name="website"
            value={formData.website || ''}
            onChange={onInputChange}
            placeholder="https://example.com"
            className="mb-0"
          />
        </div>

        <div>
          <Input
            type="url"
            name="avatar_url"
            value={formData.avatar_url || ''}
            onChange={onInputChange}
            placeholder="https://example.com/avatar.jpg"
            className="mb-0"
          />
        </div>
      </div>

      <div>
        <Textarea
          name="bio"
          value={formData.bio || ''}
          onChange={onInputChange}
          rows={4}
          placeholder="Kendiniz hakkında kısa bir açıklama..."
          className="mb-0"
        />
      </div>

      <div className="flex gap-4">
        <Button
          type="submit"
          variant="accent"
          size="md"
          className="font-semibold"
        >
          Kaydet
        </Button>
        <Button
          type="button"
          onClick={onCancel}
          variant="secondary"
          size="md"
          className="font-semibold"
        >
          İptal
        </Button>
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
      <div className="bg-card rounded-lg p-6 border border-card">
        <h3 className="text-lg font-semibold text-primary mb-4">Hakkımda</h3>
        <p className="text-secondary">
          {profile.bio || 'Henüz bir biyografi eklenmemiş.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {profile.location && (
          <div className="bg-card rounded-lg p-4 border border-card">
            <h4 className="font-semibold text-primary mb-2">Konum</h4>
            <p className="text-secondary">{profile.location}</p>
          </div>
        )}
        
        {profile.website && (
          <div className="bg-card rounded-lg p-4 border border-card">
            <h4 className="font-semibold text-primary mb-2">Website</h4>
            <a 
              href={profile.website} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-accent hover:underline"
            >
              {profile.website}
            </a>
          </div>
        )}
      </div>

      <div className="bg-card rounded-lg p-4 border border-card">
        <h4 className="font-semibold text-primary mb-2">Hesap Bilgileri</h4>
        <p className="text-secondary">
          <span className="font-medium">Üye olma tarihi:</span> {new Date(profile.created_at).toLocaleDateString('tr-TR')}
        </p>
        {profile.updated_at !== profile.created_at && (
          <p className="text-secondary">
            <span className="font-medium">Son güncelleme:</span> {new Date(profile.updated_at).toLocaleDateString('tr-TR')}
          </p>
        )}
      </div>
    </div>
  )
} 