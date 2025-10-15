// 📁 lib/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Eğer değişkenlerden biri eksikse log basalım
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("❌ Supabase environment variables are missing!");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
