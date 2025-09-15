import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Términos de Uso | Inktellect",
  description: "Conoce los términos y condiciones para el uso de Inktellect y nuestros servicios de IA.",
}

export default function TermsOfUsePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Términos de Uso
          </h1>
          
          <div className="bg-card rounded-lg p-8 shadow-sm border">
            <p className="text-lg text-muted-foreground mb-8">
              Al utilizar Inktellect, aceptas cumplir con estos términos de uso. 
              Por favor, léelos cuidadosamente antes de usar nuestros servicios.
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Aceptación de Términos</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <strong className="text-foreground">Aceptación:</strong> Al usar inktellect.com, aceptas nuestros términos y condiciones.
                </li>
                <li>
                  <strong className="text-foreground">Servicios Ofrecidos:</strong> Este sitio proporciona diseños de tatuajes generados por inteligencia artificial.
                </li>
                <li>
                  <strong className="text-foreground">Modificaciones:</strong> Nos reservamos el derecho de modificar estos términos en cualquier momento.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Conducta del Usuario</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <strong className="text-foreground">Uso Responsable:</strong> Los usuarios no deben subir contenido ofensivo o usar el sitio para actividades ilegales.
                </li>
                <li>
                  <strong className="text-foreground">Contenido Apropiado:</strong> No se permite contenido que sea odioso, obsceno o que viole los estándares de la comunidad.
                </li>
                <li>
                  <strong className="text-foreground">Respeto:</strong> Mantén un comportamiento respetuoso hacia otros usuarios y el servicio.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Propiedad Intelectual</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <strong className="text-foreground">Derechos de Autor:</strong> Todos los diseños generados por IA son propiedad de inktellect.com.
                </li>
                <li>
                  <strong className="text-foreground">Licencia de Uso:</strong> Los usuarios pueden usar los diseños para propósitos personales, pero no pueden venderlos o redistribuirlos sin permiso.
                </li>
                <li>
                  <strong className="text-foreground">Contenido de Usuario:</strong> El contenido proporcionado por tattooai.com es de nuestra propiedad, mientras que el contenido generado por el usuario permanece como propiedad del usuario.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Política de Contenido de Usuario</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <strong className="text-foreground">Propiedad y Derechos:</strong> Los usuarios poseen su contenido pero otorgan al sitio una licencia para mostrarlo y modificarlo para uso del sitio.
                </li>
                <li>
                  <strong className="text-foreground">Uso Aceptable:</strong> No se permite contenido odioso u obsceno. Todas las contribuciones de usuarios deben respetar los estándares de la comunidad.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Limitación de Responsabilidad</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <strong className="text-foreground">Servicio "Como Está":</strong> El servicio se proporciona "como está" sin garantías de ningún tipo.
                </li>
                <li>
                  <strong className="text-foreground">Disponibilidad:</strong> No garantizamos que el servicio esté disponible en todo momento.
                </li>
                <li>
                  <strong className="text-foreground">Calidad:</strong> No nos hacemos responsables de la calidad final de los tatuajes basados en nuestros diseños.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Uso de Diseños</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <strong className="text-foreground">Propósito Personal:</strong> Los diseños están destinados únicamente para uso personal y consulta con profesionales del tatuaje.
                </li>
                <li>
                  <strong className="text-foreground">No Redistribución:</strong> No está permitido revender, redistribuir o reclamar autoría de los diseños generados.
                </li>
                <li>
                  <strong className="text-foreground">Responsabilidad:</strong> Los usuarios son responsables de cualquier modificación o uso final de los diseños.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Contacto</h2>
              <p className="text-muted-foreground">
                Si tienes preguntas sobre estos términos de uso, puedes contactarnos en: 
                <strong className="text-foreground"> legal@inktellect.com</strong>
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