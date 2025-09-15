import Image from "next/image"
import Link from "next/link"
import { Check, ArrowRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { TattooForm } from "@/components/tattoo-form"

export default function LandingPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <main className="flex-1">
        {/* Hero Section */}
  <section className="w-full py-8 md:py-16 overflow-visible">
          <div className="container px-4 md:px-6 relative overflow-visible">
            <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

            <div className="text-center mx-auto mb-12 animate-in overflow-visible">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.25] pt-2 pb-2 pr-8 md:pr-12 mb-6 whitespace-nowrap block w-fit mx-auto">
                <span className="relative">
                  <span
                    className="bg-gradient-to-r from-orange-500 via-pink-500 via-purple-500 to-teal-400 dark:from-orange-400 dark:via-pink-400 dark:via-purple-400 dark:to-teal-300 bg-clip-text text-transparent drop-shadow-sm [text-shadow:0_0_8px_rgba(255,255,255,0.15)]"
                  >
                    AI-powered
                  </span>{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                    tattoo generator
                  </span>
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                La plataforma todo en uno que te ayuda a diseñar tatuajes únicos y personalizados con IA. Optimiza tu
                proceso de creación y obtén resultados profesionales.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="rounded-full h-12 px-8 text-base">
                  <Link href="/signup">
                    Crear tatuaje
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              </div>
              <div className="flex items-center justify-center gap-4 mt-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Check className="size-4 text-primary" />
                  <span>Sin tarjeta</span>
                </div>
                <div className="flex items-center gap-1">
                  <Check className="size-4 text-primary" />
                  <span>Diseños únicos</span>
                </div>
                <div className="flex items-center gap-1">
                  <Check className="size-4 text-primary" />
                  <span>Alta resolución</span>
                </div>
              </div>
            </div>

            <div className="relative mx-auto max-w-6xl animate-in">
              {/* Desvanecimiento del fondo: visible hasta el top de las imágenes y un poco más */}
              <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-20 md:h-24 bg-gradient-to-b from-transparent to-background dark:to-black"></div>
              {/* Grid de 4 imágenes, manteniendo el mismo tratamiento de borde/gradiente por tarjeta */}
              <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
          className="group relative rounded-xl overflow-hidden shadow-2xl border border-border/40 bg-gradient-to-b from-background to-muted/20"
                  >
                    <div className="relative aspect-square">
                      <Image
                        src={`/placeholder.jpg`}
                        alt={`Vista ${i}`}
                        fill
                        className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03] will-change-transform transform-gpu"
                        sizes="(max-width:768px) 50vw, 25vw"
                        priority={i === 1}
                      />
                    </div>
                    <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-black/10 dark:ring-white/10"></div>
                  </div>
                ))}
              </div>
  <div className="absolute -bottom-10 -right-6 -z-10 h-[320px] w-[320px] rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 blur-3xl opacity-70"></div>
              <div className="absolute -top-6 -left-6 -z-10 h-[300px] w-[300px] rounded-full bg-gradient-to-br from-secondary/30 to-primary/30 blur-3xl opacity-70"></div>
            </div>
            
          </div>
        </section>
        
        {/* Highlights Strip (compacta para mantener ritmo visual) */}
        <section className="w-full pt-6 md:pt-8 pb-12 md:pb-16 relative overflow-hidden">
          <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_50%,#000_30%,transparent_100%)]"></div>
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { title: "10k+", desc: "diseños generados" },
                { title: "4.9/5", desc: "valoración media", icon: true },
                { title: "30+", desc: "estilos disponibles" },
                { title: "< 20s", desc: "tiempo de entrega" },
              ].map((item, i) => (
                <Card
                  key={i}
                  className="overflow-hidden border-border/40 bg-gradient-to-b from-background to-muted/10 backdrop-blur transition-all hover:shadow-md"
                >
                  <CardContent className="p-5 flex items-center gap-4">
                    <div className="size-9 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary">
                      {item.icon ? <Star className="size-4" /> : <Check className="size-4" />}
                    </div>
                    <div>
                      <p className="text-xl font-bold leading-tight">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Design Your Tattoo Section */}
  <section className="w-full pt-12 md:pt-16 pb-12 md:pb-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <Badge className="rounded-full px-4 py-1.5 text-sm font-medium" variant="secondary">
                Diseño
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Diseña Tu Tatuaje con IA</h2>
              <p className="max-w-[800px] text-muted-foreground md:text-lg">
                Describe tu idea, elige estilo y color, y obtén un diseño único listo para tatuar.
              </p>
            </div>
            <Card className="w-full max-w-4xl mx-auto shadow-md rounded-2xl bg-white dark:bg-background">
  <CardContent className="px-6 py-8 md:px-10 md:py-12">
  <TattooForm source="landing" />
  </CardContent>
</Card>
          </div>
        </section>

        

        {/* How It Works Section */}
        <section className="w-full py-20 md:py-32 bg-muted/30 relative overflow-hidden">
          <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_40%,transparent_100%)]"></div>

          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16 animate-in">
              <Badge className="rounded-full px-4 py-1.5 text-sm font-medium" variant="secondary">
                Cómo funciona
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Proceso Simple, Resultados Profesionales</h2>
              <p className="max-w-[800px] text-muted-foreground md:text-lg">
                Desde la idea inicial hasta el archivo final, optimizado para tu tatuador. Empieza gratis y sin tarjeta.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 md:gap-12 relative">
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-border to-transparent -translate-y-1/2 z-0"></div>

              {[
                {
                  step: "01",
                  title: "Crea tu Cuenta",
                  description: "Regístrate en segundos solo con tu correo electrónico. No necesitas tarjeta.",
                },
                {
                  step: "02",
                  title: "Diseña con Precisión",
                  description: "Describe tu tatuaje, elige estilo y color, y ajusta los detalles a tu gusto.",
                },
                {
                  step: "03",
                  title: "Descarga en Alta Calidad",
                  description: "Obtén tu diseño limpio, sin fondo y listo para llevar al estudio.",
                },
              ].map((step, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center text-center space-y-4 animate-in">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/70 text-primary-foreground text-xl font-bold shadow-lg">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="w-full py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12 animate-in">
              <Badge className="rounded-full px-4 py-1.5 text-sm font-medium" variant="secondary">
                Testimonials
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Loved by Teams Worldwide</h2>
              <p className="max-w-[800px] text-muted-foreground md:text-lg">
                Don't just take our word for it. See what our customers have to say about their experience.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  quote:
                    "La calidad del diseño fue impecable y mi tatuador lo usó tal cual, sin tener que retocar nada.",
                  author: "Laura M.",
                  role: "Madrid",
                  avatar: "https://randomuser.me/api/portraits/women/68.jpg",
                  rating: 5,
                },
                {
                  quote:
                    "En segundos tuve varias opciones originales; elegí una que encajó perfecto con mi idea y el tatuador trabajó rapidísimo.",
                  author: "Diego R.",
                  role: "Valencia",
                  avatar: "https://randomuser.me/api/portraits/men/75.jpg",
                  rating: 5,
                },
                {
                  quote:
                    "Los trazos y proporciones estaban muy cuidados y el archivo le facilitó muchísimo el trabajo a mi tatuadora.",
                  author: "Claudia S.",
                  role: "Barcelona",
                  avatar: "https://randomuser.me/api/portraits/women/65.jpg",
                  rating: 5,
                },
                {
                  quote:
                    "Me generó el diseño en menos de medio minuto y era totalmente original; mi tatuador agradeció lo limpio de las líneas.",
                  author: "Sergio P.",
                  role: "Sevilla",
                  avatar: "https://randomuser.me/api/portraits/men/28.jpg",
                  rating: 5,
                },
                {
                  quote:
                    "Probé varios estilos y el minimalista encajó perfecto; la plantilla salió lista para transferir sin ajustes.",
                  author: "Marta G.",
                  role: "Bilbao",
                  avatar: "https://randomuser.me/api/portraits/women/9.jpg",
                  rating: 5,
                },
                {
                  quote:
                    "La resolución es altísima y pude revisar cada detalle antes de llevarlo al estudio, lo que ahorró tiempo al tatuador.",
                  author: "Andrés L.",
                  role: "Zaragoza",
                  avatar: "https://randomuser.me/api/portraits/men/11.jpg",
                  rating: 5,
                },
                {
                  quote:
                    "La IA captó mi idea a la primera y creó una variante blackwork súper original; la artista lo calcó directamente.",
                  author: "Paula T.",
                  role: "Málaga",
                  avatar: "https://randomuser.me/api/portraits/women/21.jpg",
                  rating: 5,
                },
                {
                  quote:
                    "El sombreado y la composición venían muy cuidados; convirtió mi briefing en un diseño listo y la sesión fue más corta.",
                  author: "Iván C.",
                  role: "A Coruña",
                  avatar: "https://randomuser.me/api/portraits/men/32.jpg",
                  rating: 5,
                },
                {
                  quote:
                    "Rápido y preciso: exporté el archivo como me pidió el tatuador y me dijo que así da gusto trabajar.",
                  author: "Nuria V.",
                  role: "Alicante",
                  avatar: "https://randomuser.me/api/portraits/women/14.jpg",
                  rating: 5,
                },
              ].map((testimonial, i) => (
                <div key={i} className="animate-in">
                  <Card className="h-full overflow-hidden border-border/40 bg-gradient-to-b from-background to-muted/10 backdrop-blur transition-all hover:shadow-md">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex mb-4">
                        {Array(testimonial.rating)
                          .fill(0)
                          .map((_, j) => (
                            <Star key={j} className="size-4 text-yellow-500 fill-yellow-500" />
                          ))}
                      </div>
                      <p className="text-lg mb-6 flex-grow">{testimonial.quote}</p>
                      <div className="flex items-center gap-4 mt-auto pt-4 border-t border-border/40">
                        <Image
                          src={testimonial.avatar || "/placeholder-user.jpg"}
                          alt={testimonial.author}
                          width={40}
                          height={40}
                          className="size-10 rounded-full object-cover ring-1 ring-border/40"
                        />
                        <div>
                          <p className="font-medium">{testimonial.author}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="w-full py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12 animate-in">
              <Badge className="rounded-full px-4 py-1.5 text-sm font-medium" variant="secondary">
                FAQ
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Preguntas Frecuentes</h2>
              <p className="max-w-[800px] text-muted-foreground md:text-lg">
                Respuestas rápidas a las dudas más comunes sobre nuestra plataforma de generación de tatuajes con IA.
              </p>
            </div>

            <div className="mx-auto max-w-3xl">
              <Accordion type="single" collapsible className="w-full">
                {[
                  {
                    question: "¿Cómo funciona el generador de tatuajes con IA?",
                    answer:
                      "El generador de tatuajes con inteligencia artificial transforma tu idea en un diseño único. Solo describe lo que quieres, elige estilo y color, y en pocos segundos recibirás un diseño profesional listo para descargar.",
                  },
                  {
                    question: "¿Los diseños de tatuajes creados son realmente únicos?",
                    answer:
                      "Sí. Cada tatuaje se genera a partir de tu descripción y parámetros elegidos, lo que garantiza un resultado exclusivo que no se repetirá con otros usuarios.",
                  },
                  {
                    question: "¿La calidad del diseño es suficiente para tatuar?",
                    answer:
                      "Sí. Los diseños se entregan en alta resolución, con líneas limpias y fondos homogéneos, ideales para usar como plantilla para tatuar sin pérdida de calidad.",
                  },
                  {
                    question: "¿Puedo usar el generador de tatuajes gratis?",
                    answer:
                      "Sí. Puedes probar el generador de tatuajes con IA gratis y sin tarjeta. Dispones de créditos iniciales para crear tus primeros diseños y, si necesitas más, puedes adquirir créditos adicionales o suscribirte a un plan.",
                  },
                  {
                    question: "¿Mis datos y diseños están seguros en la plataforma?",
                    answer:
                      "Sí. La plataforma protege tus datos y diseños de tatuajes con cifrado y medidas de seguridad avanzadas. Además, tienes la opción de eliminarlos en cualquier momento desde tu cuenta.",
                  },
                  {
                    question: "¿Qué tipo de soporte ofrecen?",
                    answer:
                      "Se ofrece soporte por email y chat para resolver dudas, ayudar con problemas técnicos y asesorar sobre cómo optimizar tu diseño para obtener el mejor resultado posible.",
                  },
                ].map((faq, i) => (
                  <div key={i} className="animate-in">
                    <AccordionItem value={`item-${i}`} className="border-b border-border/40 py-2">
                      <AccordionTrigger className="text-left font-medium hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  </div>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
