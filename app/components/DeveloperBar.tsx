'use client';

import { useState } from 'react';
import { useAuth } from '../lib/context/AuthContext';
import { useTheme } from '../lib/context/ThemeContext';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { testUrlConfiguration } from '../lib/config/url-test';

export default function DeveloperBar() {
  const { user, isAuthenticated, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleLogout = async () => {
    const { error } = await signOut();
    if (error) {
      console.error('Logout error:', error);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleUrlTest = () => {
    const result = testUrlConfiguration();
    console.log('URL Test Result:', result);
    alert(`URL Test tamamlandı!\nBase URL: ${result.baseUrl}\nAuth Callback: ${result.authCallbackUrl}\nReset Password: ${result.resetPasswordUrl}`);
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Card className="p-4 shadow-xl border-2 border-orange-200 dark:border-orange-800 max-w-xs">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
            <div className="flex-1">
              <div className="text-sm font-bold text-primary">🚀 Developer Panel</div>
              <div className="text-xs text-secondary">Giriş yapılmadı</div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 h-6 w-6"
            >
              {isExpanded ? '−' : '+'}
            </Button>
          </div>
          
          {isExpanded && (
            <div className="mt-3 space-y-2 pt-3 border-t border-border">
              <div className="text-xs text-secondary">
                <span className="font-medium">Tema:</span> {theme}
              </div>
              <div className="text-xs text-secondary">
                <span className="font-medium">Ortam:</span> Development
              </div>
              <div className="text-xs text-secondary">
                <span className="font-medium">Versiyon:</span> 1.0.0
              </div>
            </div>
          )}
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className="p-4 shadow-xl border-2 border-green-200 dark:border-green-800 max-w-xs">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
          <div className="flex-1">
            <div className="text-sm font-bold text-primary">🚀 Developer Panel</div>
            <div className="text-xs text-secondary">Giriş yapıldı</div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 h-6 w-6"
          >
            {isExpanded ? '−' : '+'}
          </Button>
        </div>
        
        {isExpanded && (
          <div className="mt-3 space-y-3 pt-3 border-t border-border">
            {/* User Info */}
            <div className="space-y-2">
              <div className="text-xs">
                <span className="font-medium text-primary">ID:</span>
                <div className="flex items-center gap-1 mt-1">
                  <code className="text-xs bg-muted px-2 py-1 rounded text-secondary">
                    {user?.id?.slice(0, 8)}...
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(user?.id || '')}
                    className="p-1 h-5 w-5 text-xs"
                  >
                    📋
                  </Button>
                </div>
              </div>
              
              <div className="text-xs">
                <span className="font-medium text-primary">Ad:</span>
                <div className="text-secondary mt-1">
                  {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}
                </div>
              </div>
              
              <div className="text-xs">
                <span className="font-medium text-primary">Email:</span>
                <div className="flex items-center gap-1 mt-1">
                  <code className="text-xs bg-muted px-2 py-1 rounded text-secondary">
                    {user?.email}
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(user?.email || '')}
                    className="p-1 h-5 w-5 text-xs"
                  >
                    📋
                  </Button>
                </div>
              </div>
            </div>

            {/* System Info */}
            <div className="space-y-2 pt-2 border-t border-border">
              <div className="text-xs">
                <span className="font-medium text-primary">Tema:</span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-secondary">{theme}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleTheme}
                    className="p-1 h-5 w-5 text-xs"
                  >
                    🔄
                  </Button>
                </div>
              </div>
              
              <div className="text-xs">
                <span className="font-medium text-primary">Ortam:</span>
                <span className="text-secondary ml-1">Development</span>
              </div>
              
              <div className="text-xs">
                <span className="font-medium text-primary">Versiyon:</span>
                <span className="text-secondary ml-1">1.0.0</span>
              </div>
              
              <div className="text-xs">
                <span className="font-medium text-primary">Platform:</span>
                <span className="text-secondary ml-1">Next.js 14</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-2 pt-2 border-t border-border">
              <div className="text-xs font-medium text-primary">Hızlı İşlemler:</div>
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => window.open('/api/health', '_blank')}
                  className="text-xs px-2 py-1"
                >
                  🔍 API Test
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => console.log('User data:', user)}
                  className="text-xs px-2 py-1"
                >
                  📊 Log User
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleUrlTest}
                  className="text-xs px-2 py-1"
                >
                  🌐 URL Test
                </Button>
              </div>
            </div>

            {/* Logout */}
            <div className="pt-2 border-t border-border">
              <Button
                variant="accent"
                size="sm"
                onClick={handleLogout}
                className="w-full text-xs"
              >
                🚪 Çıkış Yap
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
} 