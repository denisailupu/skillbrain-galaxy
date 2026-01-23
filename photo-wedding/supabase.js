import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://mvrxykrbmfwnzbqjrqod.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12cnh5a3JibWZ3bnpicWpycW9kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkxODk0MDksImV4cCI6MjA4NDc2NTQwOX0.J2Vq3A1FcbjaFTBgpe7_1BpuDKSVq_1NWUwNY7CnW1k';

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);