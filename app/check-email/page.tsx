"use client"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, CheckCircle2 } from "lucide-react"
import { useEffect, Suspense } from "react"

function CheckEmailContent() {
  const router = useRouter()
  const params = useSearchParams()
  const sent = params.get("sent") === "1"
  const verified = params.get("verified") === "1"
  const email = params.get("email") || ""

  return (
    <div className="mx-auto grid min-h-[70vh] max-w-md place-items-center p-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{verified ? "Email verificado" : "Verifica tu correo"}</CardTitle>
          <CardDescription>
            {verified
              ? "Tu cuenta ha sido verificada correctamente. Ya puedes iniciar sesión."
              : "Te hemos enviado un correo con un enlace para verificar tu cuenta."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!verified ? (
            <div className="flex items-start gap-3 rounded-md border p-3 text-sm">
              <Mail className="mt-0.5 h-4 w-4 shrink-0" />
              <div>
                <p>Busca un email con el asunto <strong>"Confirm your sign up"</strong>.</p>
                {email && <p className="text-muted-foreground mt-1">Enviado a: <strong>{email}</strong></p>}
                <p className="text-muted-foreground mt-1">Si no lo ves, revisa <strong>Spam</strong> o <strong>Promociones</strong>.</p>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-3 rounded-md border p-3 text-sm">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
              <div>
                <p>Tu email fue verificado. Continúa al inicio de sesión para acceder a tu cuenta.</p>
              </div>
            </div>
          )}

          <div className="flex gap-2">
            {!verified ? (
              <Button asChild className="w-full">
                <Link href="/login">Ir al inicio de sesión</Link>
              </Button>
            ) : (
              <Button asChild className="w-full">
                <Link href="/login?verified=1">Ir a iniciar sesión</Link>
              </Button>
            )}
          </div>

          {!verified && (
            <p className="text-xs text-muted-foreground">
              ¿Aún no te llega? Espera unos minutos o vuelve a intentarlo desde el formulario de registro.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default function CheckEmailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckEmailContent />
    </Suspense>
  )
}
