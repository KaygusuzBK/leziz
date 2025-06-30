import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { getBaseUrl } from '../../lib/config/supabase';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const state = requestUrl.searchParams.get('state');

  if (code) {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: Record<string, unknown>) {
            try {
              cookieStore.set({ name, value, ...options });
            } catch {
              // The `set` method was called from a Server Component.
              // This can be ignored if you have middleware refreshing
              // user sessions.
            }
          },
          remove(name: string, options: Record<string, unknown>) {
            try {
              cookieStore.set({ name, value: '', ...options });
            } catch {
              // The `delete` method was called from a Server Component.
              // This can be ignored if you have middleware refreshing
              // user sessions.
            }
          },
        },
      }
    );

    await supabase.auth.exchangeCodeForSession(code);
  }

  // Redirect URL'yi belirle
  let redirectUrl = getBaseUrl(); // Varsayılan olarak ana sayfa

  // State parametresinden redirect URL'yi al
  if (state) {
    try {
      // State parametresi base64 encoded olabilir
      const decodedState = decodeURIComponent(state);
      
      // Eğer state bir URL içeriyorsa, onu kullan
      if (decodedState.startsWith('http') || decodedState.startsWith('/')) {
        // URL'nin aynı domain'den olduğunu kontrol et
        const stateUrl = new URL(decodedState, getBaseUrl());
        const baseUrl = new URL(getBaseUrl());
        
        if (stateUrl.origin === baseUrl.origin) {
          redirectUrl = stateUrl.toString();
        }
      }
    } catch (error) {
      console.warn('Invalid state parameter:', error);
    }
  }

  // Referer header'ından da redirect URL'yi alabiliriz
  const referer = request.headers.get('referer');
  if (referer && !state) {
    try {
      const refererUrl = new URL(referer);
      const baseUrl = new URL(getBaseUrl());
      
      // Referer'ın aynı domain'den olduğunu kontrol et
      if (refererUrl.origin === baseUrl.origin) {
        redirectUrl = refererUrl.toString();
      }
    } catch (error) {
      console.warn('Invalid referer:', error);
    }
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(redirectUrl);
} 