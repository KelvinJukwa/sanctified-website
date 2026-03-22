import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://jjltlpsujnrjenhsnitn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqbHRscHN1am5yamVuaHNuaXRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQxMzMyMzYsImV4cCI6MjA4OTcwOTIzNn0._A0pFRoN53mWfsaKtnwwydGngTjEZMMdWnZnoXvLryo';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
