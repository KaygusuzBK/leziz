import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Hover efektleri için utility fonksiyonlar
export const hoverEffects = {
  // Link hover efekti
  linkHover: {
    onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
      e.currentTarget.style.color = 'var(--accent)';
    },
    onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
      e.currentTarget.style.color = 'var(--text-primary)';
    }
  },
  
  // Secondary link hover efekti
  secondaryLinkHover: {
    onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
      e.currentTarget.style.color = 'var(--accent)';
    },
    onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
      e.currentTarget.style.color = 'var(--text-secondary)';
    }
  },
  
  // Card hover efekti
  cardHover: {
    onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
      e.currentTarget.style.backgroundColor = 'var(--card-hover)';
    },
    onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
      e.currentTarget.style.backgroundColor = 'var(--card-bg)';
    }
  },
  
  // Accent button hover efekti
  accentButtonHover: {
    onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
      e.currentTarget.style.backgroundColor = 'var(--accent-hover)';
    },
    onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
      e.currentTarget.style.backgroundColor = 'var(--accent)';
    }
  }
};

// CSS değişkenleri için utility fonksiyonlar
export const cssVars = {
  textPrimary: 'var(--text-primary)',
  textSecondary: 'var(--text-secondary)',
  cardBg: 'var(--card-bg)',
  cardBorder: 'var(--card-border)',
  accent: 'var(--accent)',
  accentHover: 'var(--accent-hover)',
  cardHover: 'var(--card-hover)',
  background: 'var(--background)'
};
