import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl && (supabaseAnonKey || supabaseServiceKey)
);

let clientInstance: SupabaseClient | null = null;
let adminClientInstance: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  if (!isSupabaseConfigured || !supabaseUrl || !supabaseAnonKey) {
    return null;
  }
  if (!clientInstance) {
    clientInstance = createClient(supabaseUrl, supabaseAnonKey);
  }
  return clientInstance;
}

export function getSupabaseAdminClient(): SupabaseClient | null {
  if (!supabaseUrl || (!supabaseServiceKey && !supabaseAnonKey)) {
    return null;
  }
  if (!adminClientInstance) {
    adminClientInstance = createClient(supabaseUrl, supabaseServiceKey || supabaseAnonKey!);
  }
  return adminClientInstance;
}
