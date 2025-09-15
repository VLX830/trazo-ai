import { createClient } from "@supabase/supabase-js";

/**
 * Supabase Admin client.  Utiliza tu SUPABASE_SERVICE_ROLE_KEY para
 * operaciones privilegiadas en el servidor, como subir a Storage.
 * Nunca expongas esta clave en el cliente.
 */
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: { persistSession: false },
  },
);
