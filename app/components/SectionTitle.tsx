'use client'

import { useState } from 'react'

type SectionTitleProps = { 
  title: string
  showWebhookButton?: boolean
}

export default function SectionTitle({ title, showWebhookButton = false }: SectionTitleProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleWebhookTest = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('http://localhost:5678/webhook-test/9577fd29-8f7b-4dda-acaa-bb42b21944cb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      if (response.ok) {
        console.log('Webhook test başarılı:', response.status)
        alert('Webhook test başarılı!')
      } else {
        console.error('Webhook test hatası:', response.status)
        alert('Webhook test hatası!')
      }
    } catch (error) {
      console.error('Webhook test exception:', error)
      alert('Webhook test exception!')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-between px-4 pb-3 pt-5">
      <h2 className="text-lg md:text-xl lg:text-[22px] font-bold leading-tight tracking-[-0.015em] text-primary">
        {title}
      </h2>
      
      {showWebhookButton && (
        <button
          onClick={handleWebhookTest}
          disabled={isLoading}
          className="px-3 py-1 bg-orange-500 text-white text-sm font-medium rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Gönderiliyor...' : 'Webhook Test'}
        </button>
      )}
    </div>
  )
} 