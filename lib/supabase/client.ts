import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * Browser Supabase client (singleton, aman untuk React StrictMode / re-render).
 * Kredensial hanya dari env publik — tidak ada kredensial service/secret di sini.
 */

let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
    if (!url || !publishableKey) {
      throw new Error(
        'Supabase env belum diisi. Salin .env.example -> .env.local lalu restart dev server.',
      );
    }
    client = createClient(url, publishableKey, {
      auth: { persistSession: true, autoRefreshToken: true },
      realtime: { params: { eventsPerSecond: 10 } },
    });
  }
  return client;
}
