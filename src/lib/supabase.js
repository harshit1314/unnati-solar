// src/lib/supabase.js
// Supabase client singleton — reads from env vars
// anon client: for lead INSERT (public forms)
// admin client: for CRM SELECT/UPDATE (password-protected page)

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.REACT_APP_SUPABASE_SERVICE_KEY;

const configured = Boolean(supabaseUrl && supabaseAnonKey);

if (!configured) {
  console.warn('[SolarHub] Supabase env vars not set — leads will be saved to localStorage (demo mode).');
}

// Public client — only create when configured to avoid "supabaseUrl is required" crash
export const supabase = configured
  ? createClient(supabaseUrl, supabaseAnonKey, { auth: { persistSession: false } })
  : null;

// Admin client — service role, bypasses RLS (CRM only)
export const supabaseAdmin = (supabaseUrl && supabaseServiceKey)
  ? createClient(supabaseUrl, supabaseServiceKey, { auth: { persistSession: false } })
  : null;

export const isSupabaseConfigured = () => configured;
