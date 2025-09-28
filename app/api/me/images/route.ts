import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await supabase
    .from("images")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ items: data });
}

export async function DELETE(request: NextRequest) {
  try {
    const supabase = createSupabaseServerClient();
    
    // Verificar autenticación
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    // Obtener ID de la imagen a eliminar
    const { searchParams } = new URL(request.url);
    const imageId = searchParams.get('id');
    
    if (!imageId) {
      return NextResponse.json({ error: 'Image ID is required' }, { status: 400 });
    }
    
    // Verificar que la imagen pertenece al usuario
    const { data: image, error: fetchError } = await supabase
      .from('images')
      .select('user_id, url')
      .eq('id', imageId)
      .single();
    
    if (fetchError || !image) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }
    
    if (image.user_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    
    // Eliminar la imagen del storage si existe
    if (image.url) {
      // Extraer una ruta robusta del URL/valor guardado en la BD.
      const getStoragePath = (url: string) => {
        if (!url) return null;
        try {
          const parsed = new URL(url);
          const parts = parsed.pathname.split('/').filter(Boolean);
          // Buscar el nombre del bucket en la ruta (soportar distintos formatos)
          const bucketNames = ['tattoo-images', 'images'];
          const idx = parts.findIndex(p => bucketNames.includes(p));
          if (idx >= 0) return parts.slice(idx + 1).join('/');
          // Si la URL pública de Supabase usa /storage/v1/object/public/<bucket>/<path>
          const svIdx = parts.findIndex(p => p === 'public');
          if (svIdx >= 0 && parts.length > svIdx + 1) return parts.slice(svIdx + 2).join('/');
          // fallback: último segmento sin query
          return parsed.pathname.split('/').pop() || null;
        } catch (e) {
          // No es una URL absoluta: tratar como path
          const cleaned = url.split('?')[0].split('#')[0];
          const parts = cleaned.split('/').filter(Boolean);
          return parts.length ? parts[parts.length - 1] : null;
        }
      };

      const imagePath = getStoragePath(image.url as string);
      if (imagePath) {
        const { error: storageError } = await supabase.storage
          .from('tattoo-images')
          .remove([imagePath]);

        if (storageError) {
          // Loguear pero no abortar el flujo de eliminación del registro DB
          console.error('Error deleting file from storage:', storageError);
        }
      }
    }
    
    // Eliminar el registro de la base de datos
    const { error: deleteError } = await supabase
      .from('images')
      .delete()
      .eq('id', imageId)
      .eq('user_id', user.id);
    
    if (deleteError) {
      console.error('Error deleting image:', deleteError);
      return NextResponse.json({ error: 'Error deleting image' }, { status: 500 });
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Image deleted successfully',
      id: imageId 
    });
  } catch (error) {
    console.error('Delete image API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
