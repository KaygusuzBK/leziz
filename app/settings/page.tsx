'use client'

import React, { useState } from 'react'
import { useThemeCustomization } from '../lib/context/ThemeCustomizationContext'
import { ColorSection } from '../components/ColorPicker'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Chip } from '../components/ui/Chip'

export default function AyarlarPage() {
  const { colorScheme, updateColorScheme, resetToDefault, saveToLocalStorage } = useThemeCustomization()
  const [showPreview, setShowPreview] = useState(false)

  const handleColorChange = (key: keyof typeof colorScheme, value: string) => {
    updateColorScheme({ [key]: value })
  }

  const handleSave = () => {
    saveToLocalStorage()
    alert('Renk şeması kaydedildi!')
  }

  const handleReset = () => {
    if (confirm('Tüm renkleri varsayılana sıfırlamak istediğinizden emin misiniz?')) {
      resetToDefault()
    }
  }

  const primaryColors = [
    { key: 'primary', label: 'Ana Renk', description: 'Butonlar ve vurgu öğeleri' },
    { key: 'primaryHover', label: 'Ana Renk Hover', description: 'Buton hover durumu' },
    { key: 'primaryForeground', label: 'Ana Renk Metni', description: 'Ana renk üzerindeki metin' }
  ] as const;

  const secondaryColors = [
    { key: 'secondary', label: 'İkincil Renk', description: 'İkincil butonlar ve arka planlar' },
    { key: 'secondaryForeground', label: 'İkincil Renk Metni', description: 'İkincil renk üzerindeki metin' }
  ] as const;

  const backgroundColors = [
    { key: 'background', label: 'Ana Arka Plan', description: 'Sayfa ana arka planı' },
    { key: 'cardBackground', label: 'Kart Arka Planı', description: 'Kartların arka planı' },
    { key: 'cardBorder', label: 'Kart Kenarlığı', description: 'Kartların kenarlık rengi' },
    { key: 'cardHover', label: 'Kart Hover', description: 'Kart hover durumu' }
  ] as const;

  const textColors = [
    { key: 'textPrimary', label: 'Ana Metin', description: 'Başlıklar ve ana metin' },
    { key: 'textSecondary', label: 'İkincil Metin', description: 'Alt başlıklar ve açıklamalar' },
    { key: 'muted', label: 'Soluk Arka Plan', description: 'Soluk arka planlar' },
    { key: 'mutedForeground', label: 'Soluk Metin', description: 'Soluk metin rengi' }
  ] as const;

  const accentColors = [
    { key: 'accent', label: 'Vurgu Arka Planı', description: 'Vurgu arka planları' },
    { key: 'accentForeground', label: 'Vurgu Metni', description: 'Vurgu üzerindeki metin' }
  ] as const;

  const otherColors = [
    { key: 'border', label: 'Kenarlık', description: 'Genel kenarlık rengi' },
    { key: 'input', label: 'Giriş Alanı', description: 'Input alanları arka planı' },
    { key: 'destructive', label: 'Hata Rengi', description: 'Hata mesajları ve silme işlemleri' },
    { key: 'destructiveForeground', label: 'Hata Metni', description: 'Hata rengi üzerindeki metin' },
    { key: 'ring', label: 'Odak Halkası', description: 'Odaklanma halkası rengi' }
  ] as const;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-primary mb-2">
          Tema Özelleştirme
        </h1>
        <p className="text-secondary">
          Sitenin tüm renklerini buradan özelleştirebilirsiniz. Değişiklikler anında uygulanır.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 mb-8">
        <Button onClick={handleSave} variant="primary">
          Değişiklikleri Kaydet
        </Button>
        <Button onClick={handleReset} variant="secondary">
          Varsayılana Sıfırla
        </Button>
        <Button 
          onClick={() => setShowPreview(!showPreview)} 
          variant="outline"
        >
          {showPreview ? 'Önizlemeyi Gizle' : 'Önizleme Göster'}
        </Button>
      </div>

      {/* Preview Section */}
      {showPreview && (
        <Card className="p-6 mb-8">
          <h3 className="text-lg font-semibold text-primary mb-4">
            Renk Önizlemesi
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="text-sm font-medium">Ana Renkler</div>
              <div className="flex space-x-2">
                <div 
                  className="w-8 h-8 rounded border"
                  style={{ backgroundColor: colorScheme.primary }}
                  title="Primary"
                />
                <div 
                  className="w-8 h-8 rounded border"
                  style={{ backgroundColor: colorScheme.primaryHover }}
                  title="Primary Hover"
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium">Arka Planlar</div>
              <div className="flex space-x-2">
                <div 
                  className="w-8 h-8 rounded border"
                  style={{ backgroundColor: colorScheme.background }}
                  title="Background"
                />
                <div 
                  className="w-8 h-8 rounded border"
                  style={{ backgroundColor: colorScheme.cardBackground }}
                  title="Card Background"
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium">Metinler</div>
              <div className="flex space-x-2">
                <div 
                  className="w-8 h-8 rounded border"
                  style={{ backgroundColor: colorScheme.textPrimary }}
                  title="Text Primary"
                />
                <div 
                  className="w-8 h-8 rounded border"
                  style={{ backgroundColor: colorScheme.textSecondary }}
                  title="Text Secondary"
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium">Örnek Butonlar</div>
              <div className="flex space-x-2">
                <Button size="sm" variant="primary">Ana</Button>
                <Button size="sm" variant="secondary">İkincil</Button>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Color Sections */}
      <div className="space-y-8">
        <ColorSection
          title="Ana Renkler"
          colors={primaryColors}
          colorScheme={colorScheme}
          onColorChange={handleColorChange}
        />

        <ColorSection
          title="İkincil Renkler"
          colors={secondaryColors}
          colorScheme={colorScheme}
          onColorChange={handleColorChange}
        />

        <ColorSection
          title="Arka Plan Renkleri"
          colors={backgroundColors}
          colorScheme={colorScheme}
          onColorChange={handleColorChange}
        />

        <ColorSection
          title="Metin Renkleri"
          colors={textColors}
          colorScheme={colorScheme}
          onColorChange={handleColorChange}
        />

        <ColorSection
          title="Vurgu Renkleri"
          colors={accentColors}
          colorScheme={colorScheme}
          onColorChange={handleColorChange}
        />

        <ColorSection
          title="Diğer Renkler"
          colors={otherColors}
          colorScheme={colorScheme}
          onColorChange={handleColorChange}
        />
      </div>

      {/* Tips Section */}
      <Card className="p-6 mt-8">
        <h3 className="text-lg font-semibold text-primary mb-4">
          İpuçları
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-secondary">
          <div>
            <h4 className="font-medium text-primary mb-2">Renk Uyumu</h4>
            <ul className="space-y-1">
              <li>• Ana renk ile metin rengi arasında yeterli kontrast olmalı</li>
              <li>• Hover renkleri ana renkten biraz daha koyu olmalı</li>
              <li>• Arka plan renkleri metin rengiyle uyumlu olmalı</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-primary mb-2">Erişilebilirlik</h4>
            <ul className="space-y-1">
              <li>• Metin ve arka plan arasında en az 4.5:1 kontrast oranı</li>
              <li>• Renk körlüğü olan kullanıcılar için yeterli kontrast</li>
              <li>• Hata renkleri kırmızı tonlarında olmalı</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  )
} 