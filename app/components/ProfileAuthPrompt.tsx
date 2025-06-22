'use client'

import LoginModal from './LoginModal'
import RegisterModal from './RegisterModal'
import { useState } from 'react'

export default function ProfileAuthPrompt() {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showRegisterModal, setShowRegisterModal] = useState(false)

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-[60vh] text-center">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Profilinizi Görüntüleyin</h2>
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