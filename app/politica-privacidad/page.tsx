import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Política de Privacidad | Inktellect",
  description: "Conoce cómo protegemos y utilizamos tu información personal en Inktellect.",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Política de Privacidad
          </h1>
          
          <div className="bg-card rounded-lg p-8 shadow-sm border">
            <p className="text-lg text-muted-foreground mb-8">
              En Inktellect, valoramos tu privacidad y nos comprometemos a proteger tu información personal. 
              Esta política explica cómo recopilamos, utilizamos y protegemos tus datos.
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Información Personal</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <strong className="text-foreground">Recopilación:</strong> Recopilamos información básica del usuario como nombre, email y preferencias de tatuajes para mejorar tu experiencia.
                </li>
                <li>
                  <strong className="text-foreground">Uso:</strong> Tu información se utiliza para personalizar sugerencias y mejorar nuestros servicios.
                </li>
                <li>
                  <strong className="text-foreground">Protección:</strong> Empleamos medidas de seguridad estándar para proteger tus datos.
                </li>
                <li>
                  <strong className="text-foreground">Compartir:</strong> No compartimos información personal con terceros sin tu consentimiento.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Cookies y Tecnologías Similares</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <strong className="text-foreground">Uso de Cookies:</strong> Utilizamos cookies para mejorar la funcionalidad del sitio y recordar tus preferencias.
                </li>
                <li>
                  <strong className="text-foreground">Análisis:</strong> Empleamos herramientas de análisis para entender cómo los usuarios interactúan con nuestro sitio.
                </li>
                <li>
                  <strong className="text-foreground">Control:</strong> Puedes gestionar las preferencias de cookies a través de la configuración de tu navegador.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Datos de Diseños Generados</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <strong className="text-foreground">Almacenamiento:</strong> Los diseños que generas se almacenan de forma segura en nuestros servidores.
                </li>
                <li>
                  <strong className="text-foreground">Privacidad:</strong> Tus diseños privados solo son visibles para ti cuando estás conectado.
                </li>
                <li>
                  <strong className="text-foreground">Galería Pública:</strong> Los diseños generados sin cuenta se muestran en la galería pública de forma anónima.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Derechos del Usuario</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <strong className="text-foreground">Acceso:</strong> Tienes derecho a acceder a toda la información personal que tenemos sobre ti.
                </li>
                <li>
                  <strong className="text-foreground">Rectificación:</strong> Puedes solicitar la corrección de información inexacta o incompleta.
                </li>
                <li>
                  <strong className="text-foreground">Eliminación:</strong> Puedes solicitar la eliminación de tu cuenta y datos asociados.
                </li>
                <li>
                  <strong className="text-foreground">Portabilidad:</strong> Puedes solicitar una copia de tus datos en formato legible.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Contacto</h2>
              <p className="text-muted-foreground">
                Si tienes preguntas sobre esta política de privacidad o sobre el tratamiento de tus datos personales, 
                puedes contactarnos en: <strong className="text-foreground">privacy@inktellect.com</strong>
              </p>
            </section>

            <div className="bg-muted/50 rounded-lg p-6 mt-8">
              <p className="text-sm text-muted-foreground">
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
  )
}