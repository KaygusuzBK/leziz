'use client'

import LoginModal from './LoginModal'
import RegisterModal from './RegisterModal'
import { useState } from 'react'
import { Button } from './ui/Button'

export default function ProfileAuthPrompt() {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showRegisterModal, setShowRegisterModal] = useState(false)

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-[60vh] text-center">
        <h2 className="text-2xl font-semibold mb-4 text-primary">Profilinizi Görüntüleyin</h2>
        <p className="text-secondary mb-8">Tariflerinizi yönetmek ve diğer kullanıcılarla etkileşimde bulunmak için giriş yapın veya kaydolun.</p>
        <div className="flex gap-4">
          <Button
            onClick={() => setShowLoginModal(true)}
            variant="accent"
            size="md"
            className="font-semibold"
          >
            Giriş Yap
          </Button>
          <Button
            onClick={() => setShowRegisterModal(true)}
            variant="secondary"
            size="md"
            className="font-semibold"
          >
            Kayıt Ol
          </Button>
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