import { supabaseAdmin } from "@/lib/supabase/admin";

/**
 * Sube un archivo al bucket de Supabase Storage y devuelve la URL pública.
 * Requiere SUPABASE_SERVICE_ROLE_KEY.
 */
export async function uploadToBucket(
  bucket: string,
  path: string,
  file: Buffer,
  contentType: string,
): Promise<string> {
  const { error: uploadError } = await supabaseAdmin.storage
    .from(bucket)
    .upload(path, file, {
      contentType,
      upsert: false,
    });
  if (uploadError) throw uploadError;

  const { data } = supabaseAdmin.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}
