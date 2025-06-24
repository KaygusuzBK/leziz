'use client'

import React from 'react'
import { Card } from './ui/Card'

interface ColorPickerProps {
  label: string
  value: string
  onChange: (color: string) => void
  description?: string
}

export function ColorPicker({ label, value, onChange, description }: ColorPickerProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div>
          <label className="text-sm font-medium text-primary">
            {label}
          </label>
          {description && (
            <p className="text-xs text-secondary mt-1">
              {description}
            </p>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <div 
            className="w-8 h-8 rounded border-2 border-border"
            style={{ backgroundColor: value }}
          />
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-8 h-8 rounded cursor-pointer border-2 border-border"
            title={`Seç: ${label}`}
          />
        </div>
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 text-sm border border-border rounded bg-background text-foreground"
        placeholder="#000000"
      />
    </div>
  )
}

interface ColorSectionProps {
  title: string
  colors: ReadonlyArray<{
    key: keyof import('../lib/context/ThemeCustomizationContext').ColorScheme
    label: string
    description?: string
  }>
  colorScheme: import('../lib/context/ThemeCustomizationContext').ColorScheme
  onColorChange: (key: keyof import('../lib/context/ThemeCustomizationContext').ColorScheme, value: string) => void
}

export function ColorSection({ title, colors, colorScheme, onColorChange }: ColorSectionProps) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-primary mb-4">
        {title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {colors.map(({ key, label, description }) => (
          <ColorPicker
            key={key}
            label={label}
            value={colorScheme[key]}
            onChange={(color) => onColorChange(key, color)}
            description={description}
          />
        ))}
      </div>
    </Card>
  )
} 