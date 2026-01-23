import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://mmtebylmfvbzklfjxfvm.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1tdGVieWxtZnZiemtsZmp4ZnZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkxMDUyMTMsImV4cCI6MjA4NDY4MTIxM30.FogPXh03vu4Tx4kQFCIYZKHXhv7fHdfVY9kMt8ZoYHE';

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);