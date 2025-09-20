import { Metadata } from "next"
import { Shield, Eye, Cookie, Database, User, Calendar } from "lucide-react"

export const metadata: Metadata = {
  title: "Política de Privacidad | Inktellect",
  description: "Conoce cómo protegemos y utilizamos tu información personal en Inktellect.",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Política de Privacidad
          </h1>
          
          <div className="bg-card rounded-xl p-8 shadow-lg border border-border/50">
            <div className="flex items-center gap-3 mb-8">
              <Shield className="h-8 w-8 text-violet-600" />
              <p className="text-lg text-muted-foreground m-0">
                En Trazo AI, valoramos tu privacidad y nos comprometemos a proteger tu información personal. 
                Esta política explica cómo recopilamos, utilizamos y protegemos tus datos.
              </p>
            </div>

            <div className="grid gap-8">
              <section className="bg-gradient-to-br from-violet-50 to-blue-50 dark:from-violet-950/20 dark:to-blue-950/20 rounded-lg p-6 border border-violet-200/50 dark:border-violet-800/30">
                <div className="flex items-center gap-3 mb-4">
                  <User className="h-6 w-6 text-violet-600" />
                  <h2 className="text-2xl font-semibold text-foreground m-0">Información Personal</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white/50 dark:bg-black/20 rounded-lg p-4">
                    <h3 className="font-semibold text-foreground mb-2">🔍 Recopilación</h3>
                    <p className="text-sm text-muted-foreground m-0">Recopilamos información básica como nombre, email y preferencias de tatuajes para mejorar tu experiencia.</p>
                  </div>
                  <div className="bg-white/50 dark:bg-black/20 rounded-lg p-4">
                    <h3 className="font-semibold text-foreground mb-2">⚡ Uso</h3>
                    <p className="text-sm text-muted-foreground m-0">Tu información se utiliza para personalizar sugerencias y mejorar nuestros servicios.</p>
                  </div>
                  <div className="bg-white/50 dark:bg-black/20 rounded-lg p-4">
                    <h3 className="font-semibold text-foreground mb-2">🛡️ Protección</h3>
                    <p className="text-sm text-muted-foreground m-0">Empleamos medidas de seguridad estándar para proteger tus datos.</p>
                  </div>
                  <div className="bg-white/50 dark:bg-black/20 rounded-lg p-4">
                    <h3 className="font-semibold text-foreground mb-2">🔒 Compartir</h3>
                    <p className="text-sm text-muted-foreground m-0">No compartimos información personal con terceros sin tu consentimiento.</p>
                  </div>
                </div>
              </section>

              <section className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 rounded-lg p-6 border border-blue-200/50 dark:border-blue-800/30">
                <div className="flex items-center gap-3 mb-4">
                  <Cookie className="h-6 w-6 text-blue-600" />
                  <h2 className="text-2xl font-semibold text-foreground m-0">Cookies y Tecnologías</h2>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 bg-white/50 dark:bg-black/20 rounded-lg p-4">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 font-bold text-sm">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Uso de Cookies</h3>
                      <p className="text-sm text-muted-foreground m-0">Utilizamos cookies para mejorar la funcionalidad del sitio y recordar tus preferencias.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white/50 dark:bg-black/20 rounded-lg p-4">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Análisis</h3>
                      <p className="text-sm text-muted-foreground m-0">Empleamos herramientas de análisis para entender cómo los usuarios interactúan con nuestro sitio.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white/50 dark:bg-black/20 rounded-lg p-4">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 font-bold text-sm">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Control</h3>
                      <p className="text-sm text-muted-foreground m-0">Puedes gestionar las preferencias de cookies a través de la configuración de tu navegador.</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-cyan-950/20 dark:to-teal-950/20 rounded-lg p-6 border border-cyan-200/50 dark:border-cyan-800/30">
                <div className="flex items-center gap-3 mb-4">
                  <Database className="h-6 w-6 text-cyan-600" />
                  <h2 className="text-2xl font-semibold text-foreground m-0">Datos de Diseños Generados</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center bg-white/50 dark:bg-black/20 rounded-lg p-4">
                    <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Database className="h-6 w-6 text-cyan-600" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Almacenamiento</h3>
                    <p className="text-sm text-muted-foreground m-0">Los diseños se almacenan de forma segura en nuestros servidores.</p>
                  </div>
                  <div className="text-center bg-white/50 dark:bg-black/20 rounded-lg p-4">
                    <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Eye className="h-6 w-6 text-cyan-600" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Privacidad</h3>
                    <p className="text-sm text-muted-foreground m-0">Tus diseños privados solo son visibles para ti cuando estás conectado.</p>
                  </div>
                  <div className="text-center bg-white/50 dark:bg-black/20 rounded-lg p-4">
                    <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Shield className="h-6 w-6 text-cyan-600" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Galería Pública</h3>
                    <p className="text-sm text-muted-foreground m-0">Los diseños sin cuenta se muestran de forma anónima.</p>
                  </div>
                </div>
              </section>

              <section className="bg-gradient-to-br from-teal-50 to-green-50 dark:from-teal-950/20 dark:to-green-950/20 rounded-lg p-6 border border-teal-200/50 dark:border-teal-800/30">
                <div className="flex items-center gap-3 mb-4">
                  <User className="h-6 w-6 text-teal-600" />
                  <h2 className="text-2xl font-semibold text-foreground m-0">Derechos del Usuario</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 bg-white/50 dark:bg-black/20 rounded-lg p-4">
                    <div className="w-10 h-10 bg-teal-100 dark:bg-teal-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-teal-600 text-lg">👁️</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Acceso</h3>
                      <p className="text-sm text-muted-foreground m-0">Accede a toda tu información personal.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-white/50 dark:bg-black/20 rounded-lg p-4">
                    <div className="w-10 h-10 bg-teal-100 dark:bg-teal-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-teal-600 text-lg">✏️</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Rectificación</h3>
                      <p className="text-sm text-muted-foreground m-0">Corrige información inexacta.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-white/50 dark:bg-black/20 rounded-lg p-4">
                    <div className="w-10 h-10 bg-teal-100 dark:bg-teal-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-teal-600 text-lg">🗑️</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Eliminación</h3>
                      <p className="text-sm text-muted-foreground m-0">Elimina tu cuenta y datos asociados.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-white/50 dark:bg-black/20 rounded-lg p-4">
                    <div className="w-10 h-10 bg-teal-100 dark:bg-teal-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-teal-600 text-lg">📦</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Portabilidad</h3>
                      <p className="text-sm text-muted-foreground m-0">Solicita una copia de tus datos.</p>
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