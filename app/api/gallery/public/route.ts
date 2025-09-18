import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("images")
    .select("*")
    .eq("is_public", true)
    .order("created_at", { ascending: false })
    .limit(60);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  
  // Mapear los datos para que coincidan con la estructura esperada por el cliente
  const mappedData = data?.map(item => ({
    id: item.id,
    url: item.url,
    prompt: item.prompt,
    user_id: item.user_id,
    created_at: item.created_at,
    style: item.style,
    is_public: item.is_public
  })) || [];

  return NextResponse.json({ items: mappedData });
}
