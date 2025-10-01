"use client"

import { useEffect, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, AlertCircle } from "lucide-react"
import { TATTOO_STYLES } from "@/lib/style-options"

interface FormValues {
  description: string
  style: string
  color: string
}

interface TattooFormProps {
  onStart?: () => void
  onSuccess?: (values: FormValues & { url: string }) => void
  source?: "dashboard" | "landing"
}

export function TattooForm({ onStart, onSuccess, source }: TattooFormProps) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      description: "",
      style: "photorealistic",
      color: "black-and-white",
    },
  })

  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)

  const onSubmit = async (data: FormValues) => {
    onStart?.()
    setApiError(null)
    setIsLoading(true)

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: data.description,
          style: data.style,
          colors: data.color,
          source: source ?? "landing",
        }),
      })
      
      const json = await res.json()
      
      if (!res.ok) {
        setApiError(json.error || "Error al generar")
        return
      }
      
      const { url } = json
      
      if (source === "landing") {
        // En landing, redirigir a página de resultado
        router.push(`/resultado?image=${encodeURIComponent(url)}`)
      } else {
        // En dashboard, llamar callback
        if (onSuccess) onSuccess({ ...data, url })
      }
    } catch (err: any) {
      console.error(err)
      setApiError("Error al generar")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {apiError && (
        <div className="flex items-center gap-3 rounded-lg border border-red-400 bg-red-50 p-4 text-sm text-red-800 mb-6">
          <AlertCircle className="size-5" />
          <p>{apiError}</p>
        </div>
      )}
      <div className="space-y-6">
        <div>
          <Label htmlFor="description" className="text-base text-gray-700 dark:text-gray-300 mb-2 block">
            Describe tu tatuaje:
          </Label>
          <Textarea
            id="description"
            placeholder="Tigre realista con flores en el brazo..."
            className="h-32 w-full rounded-lg px-4 py-2 focus:ring-primary focus:border-primary"
            disabled={isLoading}
            {...register("description", { required: "Por favor proporciona una descripción para tu tatuaje." })}
          />
          {errors.description && <p className="text-sm text-red-600 mt-2">{errors.description.message}</p>}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="style" className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 block">
               Estilo
            </Label>
            <Controller
              name="style"
              control={control}
              rules={{ required: "Por favor selecciona un estilo." }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value} disabled={isLoading}>
                  <SelectTrigger id="style" className="w-full rounded-lg h-12">
                    <SelectValue placeholder="Selecciona un estilo" />
                  </SelectTrigger>
                  <SelectContent>
                    {TATTOO_STYLES.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.style && <p className="text-sm text-red-600 mt-2">{errors.style.message}</p>}
          </div>
          <div>
            <Label htmlFor="color" className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 block">
              Color
            </Label>
            <Controller
              name="color"
              control={control}
              rules={{ required: "Elige el esquema de color" }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value} disabled={isLoading}>
                  <SelectTrigger id="color" className="w-full rounded-lg h-12">
                    <SelectValue placeholder="Selecciona un esquema de color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="black-and-white">Blanco y Negro</SelectItem>
                    <SelectItem value="full-color">Full Color</SelectItem>
                    <SelectItem value="single-color">Single Color</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.color && <p className="text-sm text-red-600 mt-2">{errors.color.message}</p>}
          </div>
        </div>
        <Button
          type="submit"
          className={
            source === "dashboard"
              ? "w-full mt-6 h-12 rounded-lg font-semibold text-base bg-black text-white hover:bg-gray-800 transition-colors disabled:opacity-60"
              : "w-full mt-6 h-12 rounded-lg font-semibold text-base bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-60"
          }
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Generando...
            </>
          ) : (
            "Generar Tatuaje"
          )}
        </Button>
      </div>
    </form>
  )
}

export type { FormValues as TattooFormValues }
