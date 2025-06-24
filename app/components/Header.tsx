'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useTheme } from '../lib/context/ThemeContext';
import { useAuth } from '../lib/context/AuthContext';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import { hoverEffects } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from './ui/Button';
import { Input } from './ui/Input';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, signOut } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsRegisterModalOpen(false);
  };

  const openRegisterModal = () => {
    setIsRegisterModalOpen(true);
    setIsLoginModalOpen(false);
  };

  const closeModals = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(false);
  };

  const handleLogout = async () => {
    const { error } = await signOut();
    if (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <>
      <header className="flex items-center justify-between whitespace-nowrap border-b border-card px-4 md:px-10 py-3 bg-background">
        <div className="flex items-center gap-4 md:gap-8">
          <div className="flex items-center gap-2 md:gap-4 text-primary">
            <div className="size-4">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <Link href="/" className="text-lg font-bold leading-tight tracking-[-0.015em] text-primary">
              Leziz
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-6 lg:gap-9">
            <Link 
              href="/" 
              className="text-sm font-medium leading-normal transition-colors text-primary hover-link"
            >
              Anasayfa
            </Link>
            <Link 
              href="/recipes" 
              className="text-sm font-medium leading-normal transition-colors text-primary hover-link"
            >
              Tarifler
            </Link>
            <Link 
              href="/categories" 
              className="text-sm font-medium leading-normal transition-colors text-primary hover-link"
            >
              Kategoriler
            </Link>
            <Link 
              href="/about" 
              className="text-sm font-medium leading-normal transition-colors text-primary hover-link"
            >
              Hakkımızda
            </Link>
          </div>
        </div>
        <div className="flex flex-1 justify-end gap-4 md:gap-8">
          {/* Search Bar */}
          <label className="flex flex-col min-w-32 md:min-w-40 !h-10 max-w-64">
            <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
              <div
                className="flex border-none items-center justify-center pl-4 rounded-l-xl border-r-0 bg-card text-secondary"
                data-icon="MagnifyingGlass"
                data-size="24px"
                data-weight="regular"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                  <path
                    d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"
                  ></path>
                </svg>
              </div>
              <Input
                placeholder="Ara"
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl focus:outline-0 focus:ring-0 border-none focus:border-none h-full px-4 rounded-l-none border-l-0 pl-2 text-sm md:text-base font-normal leading-normal bg-card text-primary"
              />
            </div>
          </label>
          
          {/* Theme Toggle Button */}
          <Button
            onClick={toggleTheme}
            variant="secondary"
            size="md"
            className="min-w-[40px] max-w-[40px] h-10 px-3 rounded-xl bg-card text-primary hover-card"
            aria-label="Tema Değiştir"
          >
            {theme === 'light' ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
                <path d="M233.54,142.23a8,8,0,0,0-8-2,88.08,88.08,0,0,1-109.8-109.8,8,8,0,0,0-10-10,104.84,104.84,0,0,0-52.91,37A104,104,0,0,0,136,224a103.09,103.09,0,0,0,62.52-20.88,104.84,104.84,0,0,0,37-52.91A8,8,0,0,0,233.54,142.23ZM188.9,193.8A88,88,0,0,1,65.67,72.11a89,89,0,0,1,31.4-26.46,72.39,72.39,0,0,0,1.68,71.83A40.29,40.29,0,0,0,168,112.66a72.4,72.4,0,0,0,71.86,1.68A89,89,0,0,1,188.9,193.8Z"></path>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
                <path d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm72,88a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128ZM58.34,69.66A8,8,0,0,0,69.66,58.34l16-16A8,8,0,0,0,69.66,42.34Zm0,116.68-16,16a8,8,0,0,0,11.32,11.32l16-16a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l16-16a8,8,0,0,0-11.32-11.32l-16,16A8,8,0,0,0,192,72Zm5.66,114.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32-11.32ZM48,128a8,8,0,0,0-8-8H16a8,8,0,0,0,0,16H40A8,8,0,0,0,48,128Zm80,80a8,8,0,0,0-8,8v24a8,8,0,0,0,16,0V216A8,8,0,0,0,128,208Zm112-88H216a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16Z"></path>
              </svg>
            )}
          </Button>
          
          {/* Auth Section - Conditional Rendering */}
          {!isAuthenticated ? (
            // Login/Register Buttons (when not authenticated)
            <div className="flex gap-2">
              <Button 
                onClick={openRegisterModal}
                variant="accent"
                size="md"
                className="min-w-[70px] md:min-w-[84px] max-w-[480px] h-10 px-3 md:px-4 text-xs md:text-sm font-bold leading-normal tracking-[0.015em]"
              >
                <span className="truncate">Kayıt Ol</span>
              </Button>
              <Button 
                onClick={openLoginModal}
                variant="secondary"
                size="md"
                className="min-w-[70px] md:min-w-[84px] max-w-[480px] h-10 px-3 md:px-4 text-xs md:text-sm font-bold leading-normal tracking-[0.015em]"
              >
                <span className="truncate">Giriş Yap</span>
              </Button>
            </div>
          ) : (
            // User Menu (when authenticated) - Using shadcn/ui DropdownMenu
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="flex items-center gap-2 px-3 py-2 rounded-xl transition-colors h-10" variant="ghost" size="md">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium bg-accent text-white">
                    {user?.user_metadata?.full_name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <span className="hidden md:block text-sm font-medium truncate max-w-24 text-primary">
                    {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}
                  </span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    fill="currentColor" 
                    viewBox="0 0 256 256"
                    className="text-primary"
                  >
                    <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,133.66,90.34L128,95.92l-5.66-5.58A8,8,0,0,1,133.66,90.34Z"></path>
                  </svg>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profil</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings">Ayarlar</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  Çıkış Yap
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </header>

      {/* Modals */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={closeModals} 
        onSwitchToRegister={openRegisterModal}
      />
      <RegisterModal 
        isOpen={isRegisterModalOpen} 
        onClose={closeModals} 
        onSwitchToLogin={openLoginModal}
      />
    </>
  );
} 