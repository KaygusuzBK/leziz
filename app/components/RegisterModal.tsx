'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import Modal from './Modal';
import { useAuth } from '../lib/context/AuthContext';
import { signUpWithEmail } from '../lib/auth/authentication';
import { updateUserProfile } from '../lib/auth/profile';
import { Button } from './ui/Button';
import { Input } from './ui/Input';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

export default function RegisterModal({ isOpen, onClose, onSwitchToLogin }: RegisterModalProps) {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { signInWithGoogle, signInWithGitHub, signInWithFacebook } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Şifreler eşleşmiyor!');
      setIsLoading(false);
      return;
    }
    
    try {
      const result = await signUpWithEmail(formData.email, formData.password);

      if (result.success && result.data?.user) {
        // Update the user's profile with their full name
        await updateUserProfile({
          data: { full_name: formData.full_name }
        });
        
        toast.success('Kayıt başarılı! Lütfen e-postanızı kontrol edin.');
        onClose();
      } else {
        toast.error(result.error || 'Kayıt olurken bir hata oluştu.');
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Bilinmeyen bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialRegister = async (provider: 'google' | 'github' | 'facebook') => {
    setIsLoading(true);
    
    try {
      let result;
      switch (provider) {
        case 'google':
          result = await signInWithGoogle();
          break;
        case 'github':
          result = await signInWithGitHub();
          break;
        case 'facebook':
          result = await signInWithFacebook();
          break;
        default:
          throw new Error('Geçersiz provider');
      }
      
      if (result.error) {
        toast.error(result.error.message);
      } else {
        toast.success('Yönlendiriliyorsunuz...');
        onClose();
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Kayıt olurken bir hata oluştu.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Kayıt Ol">
      <div className="relative p-4">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute inset-0 bg-pattern"></div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          {/* Name Input */}
          <div>
            <label htmlFor="full_name-register" className="block text-sm font-medium mb-2 text-primary">
              Ad Soyad
            </label>
            <Input
              type="text"
              id="full_name-register"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              required
              placeholder="Ad Soyad"
              className="mb-0"
            />
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email-register" className="block text-sm font-medium mb-2 text-primary">
              E-posta
            </label>
            <Input
              type="email"
              id="email-register"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="ornek@email.com"
              className="mb-0"
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password-register" className="block text-sm font-medium mb-2 text-primary">
              Şifre
            </label>
            <Input
              type="password"
              id="password-register"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
              className="mb-0"
            />
          </div>

          {/* Confirm Password Input */}
          <div>
            <label htmlFor="confirmPassword-register" className="block text-sm font-medium mb-2 text-primary">
              Şifre Tekrar
            </label>
            <Input
              type="password"
              id="confirmPassword-register"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="••••••••"
              className="mb-0"
            />
          </div>

          {/* Register Button */}
          <Button
            type="submit"
            loading={isLoading}
            variant="accent"
            size="md"
            className="w-full font-medium"
          >
            Kayıt Ol
          </Button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-card" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-background text-secondary">
                veya
              </span>
            </div>
          </div>

          {/* Social Register Buttons */}
          <div className="space-y-3">
            {/* Google */}
            <Button
              type="button"
              onClick={() => handleSocialRegister('google')}
              disabled={isLoading}
              variant="secondary"
              size="md"
              className="w-full flex items-center justify-center gap-3"
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google ile Kayıt Ol
            </Button>

            {/* GitHub */}
            <Button
              type="button"
              onClick={() => handleSocialRegister('github')}
              disabled={isLoading}
              variant="secondary"
              size="md"
              className="w-full flex items-center justify-center gap-3"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub ile Kayıt Ol
            </Button>

            {/* Facebook */}
            <Button
              type="button"
              onClick={() => handleSocialRegister('facebook')}
              disabled={isLoading}
              variant="secondary"
              size="md"
              className="w-full flex items-center justify-center gap-3"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook ile Kayıt Ol
            </Button>
          </div>

          {/* Login Link */}
          <div className="text-center">
            <span className="text-sm text-secondary">
              Zaten hesabınız var mı?{' '}
            </span>
            <Button
              type="button"
              onClick={onSwitchToLogin}
              variant="ghost"
              size="sm"
              className="text-sm font-medium text-accent hover:opacity-80"
            >
              Giriş Yap
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
} 