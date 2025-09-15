// lib/style-options.ts

export type TattooStyle =
  | "sketch"
  | "realistic"
  | "photorealistic"
  | "surreal"
  | "black-and-white"
  | "geometric"
  | "blackwork"
  | "watercolor"
  | "tribal"
  | "new-school"
  | "old-school"
  | "cartoon"
  | "dotwork"
  | "abstract"
  | "negative-space"
  | "lettering"
  | "biomechanical"
  | "portrait"
  | "3d"
  | "japanese"
  | "minimalist";

export type ColorMode = "full" | "single" | "bw";

// Añadido: alias para que ai.ts pueda importar StyleId
export type StyleId = TattooStyle;

export interface ColorInput {
  mode: ColorMode;
  /**
   * Para "single": nombre del color (en español o inglés).
   * Ej: "rojo", "azul", "emerald green", etc.
   */
  singleColor?: string;
}

/**
 * Opciones para el <Select/> del formulario
 */
export const STYLE_OPTIONS: Array<{ value: TattooStyle; label: string }> = [
  { value: "sketch", label: "Boceto" },
  { value: "realistic", label: "Realista" },
  { value: "photorealistic", label: "Fotorealista" },
  { value: "surreal", label: "Surrealista" },
  { value: "black-and-white", label: "Blanco y Negro" },
  { value: "geometric", label: "Geometrico" },
  { value: "blackwork", label: "Blackwork" },
  { value: "watercolor", label: "Acuarela" },
  { value: "tribal", label: "Tribal" },
  { value: "new-school", label: "New School" },
  { value: "old-school", label: "Old School" },
  { value: "cartoon", label: "Caricatura" },
  { value: "dotwork", label: "Dotwork" },
  { value: "abstract", label: "Abstracto" },
  { value: "negative-space", label: "Espacio Negativo" },
  { value: "lettering", label: "Lettering" },
  { value: "biomechanical", label: "Biomecánico" },
  { value: "portrait", label: "Retrato" },
  { value: "3d", label: "3D" },
  { value: "japanese", label: "Japones" },
  { value: "minimalist", label: "Minimalista" },
];

/**
 * Mapea el estilo seleccionado a descriptores en inglés
 * (los modelos suelen responder mejor en inglés).
 */
const STYLE_PROMPTS: Record<TattooStyle, string> = {
  sketch:
    "pencil sketch, loose lines, rough shading, raw concept drawing, textured paper feel",
  realistic:
    "realistic tattoo, true-to-life proportions, detailed textures, natural lighting",
  photorealistic:
    "photorealistic finish, lifelike textures, precise shading, realistic lighting",
  surreal:
    "surreal tattoo, dreamlike imagery, unexpected juxtapositions, imaginative composition",
  "black-and-white":
    "black and white tattoo, crisp line art with smooth grey shading",
  geometric:
    "geometric tattoo, precise shapes, symmetry, sacred geometry, clean linework",
  blackwork:
    "blackwork tattoo, bold fills, high contrast, negative space, solid blacks",
  watercolor:
    "watercolor tattoo, paint splashes, soft gradients, bleeds, delicate edges",
  tribal:
    "tribal tattoo, bold black shapes, Polynesian/Maori influences, negative space",
  "new-school":
    "new school tattoo, exaggerated proportions, cartoon vibes, vibrant colors",
  "old-school":
    "old school tattoo, thick outlines, limited vintage palette, classic motifs, whip shading",
  cartoon:
    "cartoon tattoo, playful designs, expressive characters, clean bold lines",
  dotwork:
    "dotwork tattoo, stippling, dense dot shading, smooth gradients from dots",
  abstract:
    "abstract tattoo, expressive shapes, artistic composition, dynamic flow",
  "negative-space":
    "negative space tattoo, clever cutouts, figure–ground contrast, silhouette play",
  lettering:
    "lettering tattoo, balanced kerning, clean strokes, ornamental flourishes",
  biomechanical:
    "biomechanical tattoo, organic-mechanical fusion, sinewy textures, metallic sheen",
  portrait:
    "portrait tattoo, accurate likeness, realistic skin tones, subtle shading, depth",
  "3d":
    "3D tattoo, depth illusions, realistic shadows, pop-out effect, tactile realism",
  japanese:
    "japanese irezumi style, flowing composition, bold outlines, traditional motifs",
  minimalist:
    "minimalist tattoo, few lines, subtle design, negative space, elegant simplicity",
};

/**
 * Señales de color para el modelo según la selección del usuario.
 */
export function colorToCue(colors: ColorInput): string {
  switch (colors.mode) {
    case "bw":
      return "black ink with smooth grey wash shading, no color";
    case "single": {
      const c =
        (colors.singleColor ?? "").trim() ||
        "single-color monochrome ink"; // fallback
      return `monochrome ${c} ink, tonal variations of ${c}`;
    }
    case "full":
    default:
      return "tasteful full-color palette, harmonious tones, professional color grading";
  }
}

/**
 * Devuelve un descriptor base para el estilo elegido.
 */
export function styleToPrompt(style: TattooStyle): string {
  return STYLE_PROMPTS[style] ?? "tattoo design";
}

/**
 * Construye el prompt final que enviamos al servicio de IA.
 *
 * - userPrompt: lo que escribe el usuario (en español vale)
 * - style: uno de los TattooStyle
 * - colors: configuración de color
 */
export function buildTattooPrompt(
  userPrompt: string,
  style: TattooStyle,
  colors: ColorInput
): string {
  const base = styleToPrompt(style);
  const colorCue = colorToCue(colors);

  // Asegura un punto final para frasear mejor
  const trimmed = (userPrompt ?? "").trim();
  const userText = /[.!?]$/.test(trimmed) ? trimmed : `${trimmed}.`;

  const cohesion =
    "clean neutral paper background, consistent studio lighting, centered composition, high-res tattoo design output";

  return `${userText} ${base}. ${colorCue}. ${cohesion}.`;
}

// Añadido: shim con la firma esperada por lib/ai.ts
export function buildPrompt(args: {
  userPrompt: string;
  styleId: StyleId;
  colorMode: ColorMode;
  colorHex: string | null;
}): string {
  const colors: ColorInput =
    args.colorMode === "single"
      ? { mode: "single", singleColor: args.colorHex || "single-color monochrome ink" }
      : { mode: args.colorMode };
  return buildTattooPrompt(args.userPrompt, args.styleId, colors);
}

// Opcional: export default para máxima compatibilidad
export default buildPrompt;

// compat: mantener el nombre usado antes en los componentes
export const TATTOO_STYLES = STYLE_OPTIONS;

// Agregar esta función al final del archivo
export function getStyleLabel(style: string): string {
  const styleOption = STYLE_OPTIONS.find(option => option.value === style);
  return styleOption ? styleOption.label : style;
}
