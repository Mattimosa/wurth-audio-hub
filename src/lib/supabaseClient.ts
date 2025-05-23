
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';

const SUPABASE_URL = "https://dewslmhqmwgpdelmymnn.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRld3NsbWhxbXdncGRlbG15bW5uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5MDc4MzQsImV4cCI6MjA2MzQ4MzgzNH0.68qFmpkECi0bGK7K_n-kQk7DPJxeSzJ1HNxIzXFj0Ls";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);

export function getSupabaseUrl() {
  return SUPABASE_URL;
}
