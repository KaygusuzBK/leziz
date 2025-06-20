'use client';

import { useAuth } from '../lib/context/AuthContext';
import { useTheme } from '../lib/context/ThemeContext';

export default function DeveloperBar() {
  const { user, isAuthenticated, logout } = useAuth();
  const { theme } = useTheme();

  if (!isAuthenticated) {
    return (
      <div 
        className="fixed bottom-4 right-4 z-40 p-4 rounded-xl shadow-lg border max-w-xs"
        style={{ 
          backgroundColor: 'var(--card-bg)', 
          borderColor: 'var(--card-border)',
          color: 'var(--text-primary)'
        }}
      >
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="flex-1">
            <div className="text-sm font-medium">Developer Bar</div>
            <div className="text-xs opacity-70">Giriş yapılmadı</div>
          </div>
        </div>
        <div className="mt-2 text-xs opacity-60">
          Tema: {theme}
        </div>
      </div>
    );
  }

  return (
    <div 
      className="fixed bottom-4 right-4 z-40 p-4 rounded-xl shadow-lg border max-w-xs"
      style={{ 
        backgroundColor: 'var(--card-bg)', 
        borderColor: 'var(--card-border)',
        color: 'var(--text-primary)'
      }}
    >
      <div className="flex items-center gap-3">
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <div className="flex-1">
          <div className="text-sm font-medium">Developer Bar</div>
          <div className="text-xs opacity-70">Giriş yapıldı</div>
        </div>
      </div>
      
      <div className="mt-3 space-y-2">
        <div className="text-xs">
          <span className="opacity-60">ID:</span> {user?.id}
        </div>
        <div className="text-xs">
          <span className="opacity-60">Ad:</span> {user?.name}
        </div>
        <div className="text-xs">
          <span className="opacity-60">Email:</span> {user?.email}
        </div>
        <div className="text-xs opacity-60">
          Tema: {theme}
        </div>
      </div>
      
      <button
        onClick={logout}
        className="mt-3 w-full py-1 px-2 text-xs rounded-lg transition-colors"
        style={{ 
          backgroundColor: 'var(--accent)', 
          color: '#fcf9f8' 
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--accent-hover)'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--accent)'}
      >
        Çıkış Yap
      </button>
    </div>
  );
} 