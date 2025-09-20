import { Metadata } from "next"
import { FileText, Users, Copyright, Shield, Palette, AlertTriangle, Calendar } from "lucide-react"

export const metadata: Metadata = {
  title: "Términos de Uso | Inktellect",
  description: "Conoce los términos y condiciones para el uso de Inktellect y nuestros servicios de IA.",
}

export default function TermsOfUsePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Términos de Uso
          </h1>
          
          <div className="bg-card rounded-xl p-8 shadow-lg border border-border/50">
            <div className="flex items-center gap-3 mb-8">
              <FileText className="h-8 w-8 text-violet-600" />
              <p className="text-lg text-muted-foreground m-0">
                Al utilizar Trazo AI, aceptas cumplir con estos términos de uso. 
                Por favor, léelos cuidadosamente antes de usar nuestros servicios.
              </p>
            </div>

            <div className="grid gap-8">
              <section className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20 rounded-lg p-6 border border-violet-200/50 dark:border-violet-800/30">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="h-6 w-6 text-violet-600" />
                  <h2 className="text-2xl font-semibold text-foreground m-0">Aceptación de Términos</h2>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 bg-white/50 dark:bg-black/20 rounded-lg p-4">
                    <div className="w-8 h-8 bg-violet-100 dark:bg-violet-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-violet-600 font-bold text-sm">✓</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Aceptación</h3>
                      <p className="text-sm text-muted-foreground m-0">Al usar trazoai.com, aceptas nuestros términos y condiciones.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 bg-white/50 dark:bg-black/20 rounded-lg p-4">
                    <div className="w-8 h-8 bg-violet-100 dark:bg-violet-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-violet-600 font-bold text-sm">🎨</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Servicios Ofrecidos</h3>
                      <p className="text-sm text-muted-foreground m-0">Este sitio proporciona diseños de tatuajes generados por inteligencia artificial.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 bg-white/50 dark:bg-black/20 rounded-lg p-4">
                    <div className="w-8 h-8 bg-violet-100 dark:bg-violet-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-violet-600 font-bold text-sm">📝</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Modificaciones</h3>
                      <p className="text-sm text-muted-foreground m-0">Nos reservamos el derecho de modificar estos términos en cualquier momento.</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-lg p-6 border border-blue-200/50 dark:border-blue-800/30">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="h-6 w-6 text-blue-600" />
                  <h2 className="text-2xl font-semibold text-foreground m-0">Conducta del Usuario</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center bg-white/50 dark:bg-black/20 rounded-lg p-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-blue-600 text-xl">🤝</span>
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Uso Responsable</h3>
                    <p className="text-sm text-muted-foreground m-0">No subas contenido ofensivo o uses el sitio para actividades ilegales.</p>
                  </div>
                  <div className="text-center bg-white/50 dark:bg-black/20 rounded-lg p-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-blue-600 text-xl">✨</span>
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Contenido Apropiado</h3>
                    <p className="text-sm text-muted-foreground m-0">No se permite contenido odioso, obsceno o que viole los estándares.</p>
                  </div>
                  <div className="text-center bg-white/50 dark:bg-black/20 rounded-lg p-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-blue-600 text-xl">💙</span>
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Respeto</h3>
                    <p className="text-sm text-muted-foreground m-0">Mantén un comportamiento respetuoso hacia otros usuarios.</p>
                  </div>
                </div>
              </section>

              <section className="bg-gradient-to-br from-indigo-50 to-cyan-50 dark:from-indigo-950/20 dark:to-cyan-950/20 rounded-lg p-6 border border-indigo-200/50 dark:border-indigo-800/30">
                <div className="flex items-center gap-3 mb-4">
                  <Copyright className="h-6 w-6 text-indigo-600" />
                  <h2 className="text-2xl font-semibold text-foreground m-0">Propiedad Intelectual</h2>
                </div>
                <div className="grid gap-4">
                  <div className="flex items-start gap-4 bg-white/50 dark:bg-black/20 rounded-lg p-4">
                    <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Copyright className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Derechos de Autor</h3>
                      <p className="text-sm text-muted-foreground m-0">Todos los diseños generados por IA son propiedad de inktellect.com.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 bg-white/50 dark:bg-black/20 rounded-lg p-4">
                    <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-indigo-600 text-lg">📄</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Licencia de Uso</h3>
                      <p className="text-sm text-muted-foreground m-0">Puedes usar los diseños para propósitos personales, pero no venderlos o redistribuirlos sin permiso.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 bg-white/50 dark:bg-black/20 rounded-lg p-4">
                    <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Contenido de Usuario</h3>
                      <p className="text-sm text-muted-foreground m-0">El contenido de trazoai.com es de nuestra propiedad, mientras que el contenido generado por el usuario permanece como propiedad del usuario.</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-cyan-950/20 dark:to-teal-950/20 rounded-lg p-6 border border-cyan-200/50 dark:border-cyan-800/30">
                <div className="flex items-center gap-3 mb-4">
                  <Palette className="h-6 w-6 text-cyan-600" />
                  <h2 className="text-2xl font-semibold text-foreground m-0">Uso de Diseños</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white/50 dark:bg-black/20 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-cyan-100 dark:bg-cyan-900/30 rounded-full flex items-center justify-center">
                        <span className="text-cyan-600 text-sm">👤</span>
                      </div>
                      <h3 className="font-semibold text-foreground m-0">Propósito Personal</h3>
                    </div>
                    <p className="text-sm text-muted-foreground m-0">Los diseños están destinados únicamente para uso personal y consulta con profesionales del tatuaje.</p>
                  </div>
                  <div className="bg-white/50 dark:bg-black/20 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-cyan-100 dark:bg-cyan-900/30 rounded-full flex items-center justify-center">
                        <span className="text-cyan-600 text-sm">🚫</span>
                      </div>
                      <h3 className="font-semibold text-foreground m-0">No Redistribución</h3>
                    </div>
                    <p className="text-sm text-muted-foreground m-0">No está permitido revender, redistribuir o reclamar autoría de los diseños generados.</p>
                  </div>
                  <div className="bg-white/50 dark:bg-black/20 rounded-lg p-4 md:col-span-2">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-cyan-100 dark:bg-cyan-900/30 rounded-full flex items-center justify-center">
                        <span className="text-cyan-600 text-sm">⚖️</span>
                      </div>
                      <h3 className="font-semibold text-foreground m-0">Responsabilidad</h3>
                    </div>
                    <p className="text-sm text-muted-foreground m-0">Los usuarios son responsables de cualquier modificación o uso final de los diseños.</p>
                  </div>
                </div>
              </section>

              <section className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-lg p-6 border border-amber-200/50 dark:border-amber-800/30">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="h-6 w-6 text-amber-600" />
                  <h2 className="text-2xl font-semibold text-foreground m-0">Limitación de Responsabilidad</h2>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 bg-white/50 dark:bg-black/20 rounded-lg p-4">
                    <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-amber-600 text-sm">⚠️</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Servicio "Como Está"</h3>
                      <p className="text-sm text-muted-foreground m-0">El servicio se proporciona "como está" sin garantías de ningún tipo.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 bg-white/50 dark:bg-black/20 rounded-lg p-4">
                    <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-amber-600 text-sm">🔄</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Disponibilidad</h3>
                      <p className="text-sm text-muted-foreground m-0">No garantizamos que el servicio esté disponible en todo momento.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 bg-white/50 dark:bg-black/20 rounded-lg p-4">
                    <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-amber-600 text-sm">🎨</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Calidad</h3>
                      <p className="text-sm text-muted-foreground m-0">No nos hacemos responsables de la calidad final de los tatuajes basados en nuestros diseños.</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div className="bg-gradient-to-r from-violet-50 to-blue-50 dark:from-violet-950/20 dark:to-blue-950/20 rounded-lg p-6 mt-8 border border-violet-200/50 dark:border-violet-800/30">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-violet-600" />
                <p className="text-sm text-muted-foreground m-0">
                  <strong>Última actualización:</strong> {new Date().toLocaleDateString('es-ES', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}