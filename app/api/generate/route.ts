// app/api/generate/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { generateWithModel } from "@/lib/ai";
import type { StyleId, ColorMode } from "@/lib/style-options";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    console.log("🚀 POST /api/generate - Iniciando");
    
    const body = await req.json();
    console.log("📝 Body recibido:", JSON.stringify(body, null, 2));
    
    // Validación básica
    if (!body.prompt || typeof body.prompt !== 'string') {
      console.error("❌ Prompt inválido:", body.prompt);
      throw new Error("Prompt es requerido y debe ser string");
    }

    if (!body.style || typeof body.style !== 'string') {
      console.error("❌ Style inválido:", body.style);
      throw new Error("Style es requerido");
    }

    // Normalizar colors
    let normalizedColors = body.colors;
    console.log("🎨 Colors original:", body.colors, typeof body.colors);
    
    if (typeof body.colors === 'string') {
      switch (body.colors) {
        case "black-and-white":
        case "bw":
          normalizedColors = { mode: "bw", hex: null };
          break;
        case "single-color":
        case "single":
          normalizedColors = { mode: "single", hex: null };
          break;
        case "full-color":
        case "full":
        default:
          normalizedColors = { mode: "full", hex: null };
          break;
      }
    }
    
    console.log("🎨 Colors normalizado:", normalizedColors);

    // Obtener usuario autenticado (si existe)
    const supabase = createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    // 🔥 LÓGICA CORREGIDA:
    // - Landing (source="landing") → SIEMPRE público (independiente del usuario)
    // - Dashboard (source="dashboard") → SIEMPRE privado (requiere usuario)
    const isPublic = body.source === "landing";
    const userId = (body.source === "dashboard" && user) ? user.id : null;

    console.log("🔐 Lógica de guardado:", {
      source: body.source,
      hasUser: !!user,
      isPublic,
      userId: userId ? "presente" : "null"
    });

    const payload = {
      prompt: body.prompt.trim(),
      style: body.style,
      colors: normalizedColors,
      public: isPublic,
    };

    console.log("📦 Payload final:", JSON.stringify(payload, null, 2));

    // Verificar variables de entorno
    const hfBaseUrl = process.env.HF_BASE_URL;
    
    if (!hfBaseUrl) {
      throw new Error("HF_BASE_URL no está configurado en .env");
    }

    // Generar imagen con IA
    const result = await generateWithModel(payload);
    console.log("✅ Resultado IA:", { url: result.url?.substring(0, 50) + "...", model: result.model_version });

    // Guardar en base de datos
    const { data: savedImage, error: dbError } = await supabase
      .from('images')
      .insert({
        user_id: userId, // null para público, user.id para privado
        url: result.url,
        prompt: body.prompt.trim(),
        style: body.style,
        colors: JSON.stringify(normalizedColors),
        is_public: isPublic,
        model_version: result.model_version
      })
      .select()
      .single();

    if (dbError) {
      console.error("❌ Error al guardar en BD:", dbError);
      // No fallar si hay error en BD, pero loggear
    } else {
      console.log("✅ Imagen guardada en BD:", {
        id: savedImage?.id,
        is_public: savedImage?.is_public,
        user_id: savedImage?.user_id ? "presente" : "null"
      });
    }

    // Retornar respuesta compatible con el frontend
    return NextResponse.json({ 
      id: savedImage?.id, 
      url: result.url 
    });

  } catch (e: any) {
    console.error("❌ ERROR COMPLETO:", {
      message: e.message,
      stack: e.stack,
      name: e.name,
      cause: e.cause
    });
    
    return NextResponse.json(
      { error: e.message || "Error interno del servidor" },
      { status: 500 }
    );
  }
}