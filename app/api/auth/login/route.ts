import { type NextRequest, NextResponse } from "next/server";
import { createSupabaseRouteClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const { email, password } = body as { email?: string; password?: string };

  if (!email || !password) {
    return NextResponse.json({ message: "Email y contraseña son obligatorios" }, { status: 400 });
  }

  let response = NextResponse.json({ ok: true });
  const supabase = createSupabaseRouteClient(request, response);

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 401 });
  }

  return response;
}
