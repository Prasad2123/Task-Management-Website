import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ajgkqjemiqsyqirainok.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_TZmXiU28oRtMd8R93WKisA_RE4tPkyb';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
