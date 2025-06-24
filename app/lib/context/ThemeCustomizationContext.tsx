'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export interface ColorScheme {
  // Primary Colors
  primary: string
  primaryHover: string
  primaryForeground: string
  
  // Secondary Colors
  secondary: string
  secondaryForeground: string
  
  // Background Colors
  background: string
  cardBackground: string
  cardBorder: string
  cardHover: string
  
  // Text Colors
  textPrimary: string
  textSecondary: string
  muted: string
  mutedForeground: string
  
  // Accent Colors
  accent: string
  accentForeground: string
  
  // Other Colors
  border: string
  input: string
  destructive: string
  destructiveForeground: string
  ring: string
}

export interface ThemeCustomizationContextType {
  colorScheme: ColorScheme
  updateColorScheme: (newScheme: Partial<ColorScheme>) => void
  resetToDefault: () => void
  saveToLocalStorage: () => void
  loadFromLocalStorage: () => void
}

const defaultColorScheme: ColorScheme = {
  // Primary Colors
  primary: '#ef6a42',
  primaryHover: '#d55a38',
  primaryForeground: '#ffffff',
  
  // Secondary Colors
  secondary: '#f3f4f6',
  secondaryForeground: '#1f2937',
  
  // Background Colors
  background: '#ffffff',
  cardBackground: '#f3eae7',
  cardBorder: '#f3eae7',
  cardHover: '#e8dcd8',
  
  // Text Colors
  textPrimary: '#1b110d',
  textSecondary: '#9a5e4c',
  muted: '#f3f4f6',
  mutedForeground: '#6b7280',
  
  // Accent Colors
  accent: '#f3f4f6',
  accentForeground: '#1f2937',
  
  // Other Colors
  border: '#e5e7eb',
  input: '#f9fafb',
  destructive: '#ef4444',
  destructiveForeground: '#ffffff',
  ring: '#ef6a42'
}

const darkColorScheme: ColorScheme = {
  // Primary Colors
  primary: '#ef6a42',
  primaryHover: '#d55a38',
  primaryForeground: '#ffffff',
  
  // Secondary Colors
  secondary: '#374151',
  secondaryForeground: '#ffffff',
  
  // Background Colors
  background: '#1f2937',
  cardBackground: '#1a1a1a',
  cardBorder: '#2a2a2a',
  cardHover: '#2a2a2a',
  
  // Text Colors
  textPrimary: '#f3f3f3',
  textSecondary: '#a0a0a0',
  muted: '#374151',
  mutedForeground: '#9ca3af',
  
  // Accent Colors
  accent: '#374151',
  accentForeground: '#ffffff',
  
  // Other Colors
  border: '#374151',
  input: '#4b5563',
  destructive: '#dc2626',
  destructiveForeground: '#ffffff',
  ring: '#ef6a42'
}

const ThemeCustomizationContext = createContext<ThemeCustomizationContextType | undefined>(undefined)

export function ThemeCustomizationProvider({ children }: { children: React.ReactNode }) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>(defaultColorScheme)
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Load saved color scheme from localStorage
  useEffect(() => {
    const savedScheme = localStorage.getItem('leziz-color-scheme')
    if (savedScheme) {
      try {
        setColorScheme(JSON.parse(savedScheme))
      } catch (error) {
        console.error('Failed to load saved color scheme:', error)
      }
    }
  }, [])

  // Apply color scheme to CSS variables
  useEffect(() => {
    const root = document.documentElement
    
    // Apply custom colors
    root.style.setProperty('--accent-color', colorScheme.primary)
    root.style.setProperty('--accent-hover', colorScheme.primaryHover)
    root.style.setProperty('--text-primary', colorScheme.textPrimary)
    root.style.setProperty('--text-secondary', colorScheme.textSecondary)
    root.style.setProperty('--card-bg', colorScheme.cardBackground)
    root.style.setProperty('--card-border', colorScheme.cardBorder)
    root.style.setProperty('--card-hover', colorScheme.cardHover)
    
    // Apply ShadCN colors
    root.style.setProperty('--primary', hexToHsl(colorScheme.primary))
    root.style.setProperty('--primary-foreground', hexToHsl(colorScheme.primaryForeground))
    root.style.setProperty('--secondary', hexToHsl(colorScheme.secondary))
    root.style.setProperty('--secondary-foreground', hexToHsl(colorScheme.secondaryForeground))
    root.style.setProperty('--background', hexToHsl(colorScheme.background))
    root.style.setProperty('--foreground', hexToHsl(colorScheme.textPrimary))
    root.style.setProperty('--card', hexToHsl(colorScheme.cardBackground))
    root.style.setProperty('--card-foreground', hexToHsl(colorScheme.textPrimary))
    root.style.setProperty('--border', hexToHsl(colorScheme.border))
    root.style.setProperty('--input', hexToHsl(colorScheme.input))
    root.style.setProperty('--accent', hexToHsl(colorScheme.accent))
    root.style.setProperty('--accent-foreground', hexToHsl(colorScheme.accentForeground))
    root.style.setProperty('--muted', hexToHsl(colorScheme.muted))
    root.style.setProperty('--muted-foreground', hexToHsl(colorScheme.mutedForeground))
    root.style.setProperty('--destructive', hexToHsl(colorScheme.destructive))
    root.style.setProperty('--destructive-foreground', hexToHsl(colorScheme.destructiveForeground))
    root.style.setProperty('--ring', hexToHsl(colorScheme.ring))
  }, [colorScheme])

  const updateColorScheme = (newScheme: Partial<ColorScheme>) => {
    setColorScheme(prev => ({ ...prev, ...newScheme }))
  }

  const resetToDefault = () => {
    setColorScheme(defaultColorScheme)
  }

  const saveToLocalStorage = () => {
    localStorage.setItem('leziz-color-scheme', JSON.stringify(colorScheme))
  }

  const loadFromLocalStorage = () => {
    const savedScheme = localStorage.getItem('leziz-color-scheme')
    if (savedScheme) {
      try {
        setColorScheme(JSON.parse(savedScheme))
      } catch (error) {
        console.error('Failed to load saved color scheme:', error)
      }
    }
  }

  const value: ThemeCustomizationContextType = {
    colorScheme,
    updateColorScheme,
    resetToDefault,
    saveToLocalStorage,
    loadFromLocalStorage
  }

  return (
    <ThemeCustomizationContext.Provider value={value}>
      {children}
    </ThemeCustomizationContext.Provider>
  )
}

export function useThemeCustomization() {
  const context = useContext(ThemeCustomizationContext)
  if (context === undefined) {
    throw new Error('useThemeCustomization must be used within a ThemeCustomizationProvider')
  }
  return context
}

// Helper function to convert hex to HSL
function hexToHsl(hex: string): string {
  // Remove # if present
  hex = hex.replace('#', '')
  
  // Parse hex values
  const r = parseInt(hex.substr(0, 2), 16) / 255
  const g = parseInt(hex.substr(2, 2), 16) / 255
  const b = parseInt(hex.substr(4, 2), 16) / 255
  
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2
  
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }
  
  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`
} 