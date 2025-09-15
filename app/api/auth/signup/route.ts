import { type NextRequest, NextResponse } from "next/server";
import { createSupabaseRouteClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const { email, password } = body as { email?: string; password?: string };

  if (!email || !password) {
    return NextResponse.json({ message: "Email y contraseña son obligatorios" }, { status: 400 });
  }

  let response = NextResponse.json({ ok: true, message: "Revisa tu correo para verificar la cuenta" });
  const supabase = createSupabaseRouteClient(request, response);

  const redirectTo = `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/check-email?verified=1`;

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: redirectTo }
  });

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }

  return response;
}
