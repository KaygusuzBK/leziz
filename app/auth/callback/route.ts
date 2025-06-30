import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

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
  let redirectUrl = '/'; // Varsayılan olarak ana sayfa

  // State parametresinden redirect URL'yi al
  if (state) {
    try {
      // State parametresi mevcut URL'i içeriyor
      const stateUrl = new URL(state);
      const requestOrigin = new URL(request.url).origin;
      
      // URL'nin aynı domain'den olduğunu kontrol et
      if (stateUrl.origin === requestOrigin) {
        redirectUrl = stateUrl.pathname + stateUrl.search;
      }
    } catch (error) {
      console.warn('Invalid state parameter:', error);
    }
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(redirectUrl);
} 