// lib/ai.ts
import type { StyleId, ColorMode } from "./style-options";
import * as StyleOptions from "./style-options";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type GenerateColors = { mode: ColorMode; hex?: string | null };
export interface GeneratePayload {
  prompt: string;
  style: StyleId;
  colors: GenerateColors | string; // Permitir string del formulario
  public?: boolean; // generación desde landing sin login
}

export interface GenerateResult {
  url: string;
  model_version: string;
}

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var ${name}`);
  return v;
}


// Compat: resuelve buildPrompt tanto si es export nombrado como si es default (función o { buildPrompt })
const _buildPromptResolved: unknown =
  (StyleOptions as any).buildPrompt ??
  (typeof (StyleOptions as any).default === "function"
    ? (StyleOptions as any).default
    : (StyleOptions as any).default?.buildPrompt);

// 🎨 FUNCIÓN MEJORADA: Construir prompt especializado para diseños de tatuajes
function buildTattooStudioPrompt(userPrompt: string, style: StyleId, colors: any): string {
  // 🔥 PROMPT BASE MÁS AGRESIVO PARA EVITAR CUERPOS
  const basePrompt = `Tattoo stencil design, tattoo flash art, standalone ${userPrompt} design, isolated artwork, no body, no human`;
  
  const stylePrompts: Record<string, string> = {
    photorealistic: "photorealistic tattoo flash art, detailed shading, realistic stencil artwork",
    tribal: "tribal tattoo flash art, bold black lines, geometric patterns, traditional tribal stencil",
    geometric: "geometric tattoo flash art, clean lines, symmetrical patterns, precise geometry stencil", 
    minimalist: "minimalist tattoo flash art, simple clean lines, elegant simplicity, minimal stencil",
    watercolor: "watercolor tattoo flash art, artistic brush strokes, paint effects, colorful stencil",
    "new-school": "new school tattoo flash art, bold outlines, vibrant cartoon style, modern stencil",
    japanese: "traditional Japanese tattoo flash art, oriental style, cultural motifs, asian stencil",
    "old-school": "traditional old school tattoo flash art, classic americana style, vintage stencil"
  };

  const colorPrompts: Record<string, string> = {
    "bw": "black and white ink stencil, monochrome tattoo art",
    "black-and-white": "black and white ink stencil, monochrome tattoo art",
    "single": "single color ink stencil, minimal color palette", 
    "single-color": "single color ink stencil, minimal color palette",
    "full": "full color tattoo stencil, vibrant colored inks",
    "full-color": "full color tattoo stencil, vibrant colored inks"
  };

  // 🔥 FORMATO DE ESTUDIO MÁS ESPECÍFICO
  const studioFormat = `
tattoo flash sheet style, isolated stencil design, 
clean white background, floating design only, 
no human body, no skin, no person, no anatomical parts,
tattoo parlor reference art, printable stencil template, 
centered composition on plain background, 
professional tattoo artist reference sheet, 
clean outline design ready to transfer, 
standalone artwork, flat design presentation, 
studio quality, tattoo shop wall art style`;

  const colorMode = typeof colors === 'string' ? colors : colors?.mode || 'full';
  
  return `${basePrompt}, ${stylePrompts[style] || stylePrompts.photorealistic}, 
${colorPrompts[colorMode] || colorPrompts.full}, ${studioFormat}`;
}

// 🎲 FUNCIÓN NUEVA: Generar seed aleatorio para variabilidad
function generateRandomSeed(): number {
  return Math.floor(Math.random() * 1000000);
}

// 🎨 FUNCIÓN NUEVA: Añadir variabilidad al prompt
function addVariabilityToPrompt(basePrompt: string): string {
  const variations = [
    "unique interpretation",
    "creative variation", 
    "artistic twist",
    "distinctive style",
    "original design",
    "fresh perspective",
    "innovative approach",
    "custom artwork"
  ];
  
  const randomVariation = variations[Math.floor(Math.random() * variations.length)];
  return `${basePrompt}, ${randomVariation}`;
}

// Normaliza URLs de Hugging Face a subdominio del Space (*.hf.space)
function normalizeHfBaseUrl(input: string): string {
  const trimmed = input.replace(/\/+$/, "");
  const m = trimmed.match(/^https?:\/\/huggingface\.co\/spaces\/([^/]+)\/([^/?#]+)$/i);
  if (m) return `https://${m[1]}-${m[2]}.hf.space`;
  const m2 = trimmed.match(/^https?:\/\/hf\.space\/embed\/([^/]+)\/([^/?#]+)$/i);
  if (m2) return `https://${m2[1]}-${m2[2]}.hf.space`;
  return trimmed;
}

function joinUrl(base: string, path: string): string {
  const b = base.replace(/\/+$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${b}${p}`;
}

function buildPromptSafe(args: {
  userPrompt: string;
  styleId: StyleId;
  colorMode: ColorMode;
  colorHex: string | null;
}): string {
  if (typeof _buildPromptResolved !== "function") {
    throw new Error(
      "buildPrompt no está exportada como función desde ./style-options (usa export function buildPrompt(...) o export default)."
    );
  }
  return (_buildPromptResolved as (a: any) => string)(args);
}

function isProbablyUrl(value: unknown): value is string {
  if (typeof value !== "string") return false;
  try {
    const u = new URL(value);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

function extractImageUrl(data: any): string | null {
  // Direct string
  if (isProbablyUrl(data)) return data;

  // Common fields
  const direct =
    data?.url ??
    data?.file_url ??
    data?.image_url ??
    data?.imageUrl ??
    data?.image ??
    data?.output?.url ??
    data?.result?.url ??
    null;
  if (isProbablyUrl(direct)) return direct;

  // Arrays: images: [ { url }, "http...", ... ]
  const images = data?.images ?? data?.outputs ?? data?.results ?? data?.files;
  if (Array.isArray(images) && images.length > 0) {
    // First URL-like string
    const str = images.find((x: any) => isProbablyUrl(x));
    if (str) return str;
    // First object with url
    const objWithUrl = images.find(
      (x: any) => isProbablyUrl(x?.url) || isProbablyUrl(x?.file_url)
    );
    if (objWithUrl?.url) return objWithUrl.url;
    if (objWithUrl?.file_url) return objWithUrl.file_url;
  }

  // Nested data/data[0]
  const nested =
    data?.data?.url ??
    data?.data?.file_url ??
    data?.data?.image_url ??
    data?.data?.[0]?.url ??
    data?.data?.[0]?.file_url ??
    null;
  if (isProbablyUrl(nested)) return nested;

  return null;
}

// Upload real a Supabase Storage
async function uploadImageToStorage(imageBlob: Blob): Promise<string> {
  try {
    const supabase = createSupabaseServerClient();
    const bucket = process.env.SUPABASE_STORAGE_BUCKET || "tattoo-images";
    
    // Generar nombre único
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 8);
    const fileName = `tattoo-${timestamp}-${randomId}.png`;

    // Subir imagen a Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, imageBlob, {
        contentType: 'image/png',
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error("Error uploading to Supabase Storage:", error);
      // Fallback a data URL si falla el storage
      const buffer = await imageBlob.arrayBuffer();
      const base64 = Buffer.from(buffer).toString('base64');
      return `data:image/png;base64,${base64}`;
    }

    // Obtener URL pública
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    return publicUrl;
  } catch (error) {
    console.error("Supabase storage error:", error);
    // Fallback a data URL
    const buffer = await imageBlob.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    return `data:image/png;base64,${base64}`;
  }
}

/** Llama al Space de Hugging Face (FastAPI) */
export async function callTattooService(
  finalPrompt: string,
  opts?: { public?: boolean; timeoutMs?: number; style?: StyleId; colors?: any }
): Promise<GenerateResult> {
  if (typeof window !== "undefined") {
    throw new Error("callTattooService debe ejecutarse solo en el servidor.");
  }

  const rawBase = requireEnv("HF_BASE_URL");
  const base = normalizeHfBaseUrl(rawBase);
  const path = "/generate";
  const endpoint = joinUrl(base, path);

  const serviceToken = process.env.HF_API_KEY;
  const controller = new AbortController();
  const timeoutMs = Math.max(1, opts?.timeoutMs ?? 300_000);
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    // 🔥 PROMPT MEJORADO CON VARIABILIDAD
    let enhancedPrompt = buildTattooStudioPrompt(
      finalPrompt, 
      opts?.style || "photorealistic", 
      opts?.colors
    );
    
    // 🎲 AÑADIR VARIABILIDAD PARA DISEÑOS ÚNICOS
    enhancedPrompt = addVariabilityToPrompt(enhancedPrompt);

    const payload = {
      prompt: enhancedPrompt,
      style: opts?.style || "realistic",
      colors: getColorsString(opts?.colors),
      seed: generateRandomSeed(), // 🎲 SEED ALEATORIO PARA VARIABILIDAD
      steps: 35, // Más pasos para mejor calidad
      width: 1024,
      height: 1024,
      guidance_scale: 12.0, // 🔥 AUMENTADO para mayor adherencia al prompt
      negative_prompt: "human body, person, people, skin, face, hands, arms, legs, torso, anatomy, body parts, muscle, flesh, realistic skin texture, body outline, anatomical, limbs, shoulders, chest, back, stomach, neck, head, human figure, mannequin, model, portrait, selfie, photo of person, man, woman, child, crowd, group, on skin, tattooed on body, body placement, arm tattoo, leg tattoo, chest tattoo, back tattoo, blurred, low quality, deformed, extra limbs, multiple designs, text, watermark, signature, cluttered background, messy, dirty, complex background, detailed background"
    };

    const headers: Record<string, string> = {
      "content-type": "application/json",
      accept: "image/png",
    };

    if (serviceToken) {
      headers["x-api-key"] = serviceToken;
    }

    console.log("📤 Headers:", headers);
    console.log("🎨 Enhanced prompt:", enhancedPrompt);
    console.log("🎲 Random seed:", payload.seed);

    const res = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
      cache: "no-store",
      next: { revalidate: 0 },
      signal: controller.signal,
    });

    console.log("📥 Response status:", res.status);
    console.log("📥 Response headers:", Object.fromEntries(res.headers.entries()));

    if (!res.ok) {
      const isJson = res.headers.get("content-type")?.includes("application/json");
      const bodyText = isJson ? JSON.stringify(await res.json()) : await res.text();
      
      console.error("❌ Response error body:", bodyText);
      
      if (res.status === 401) {
        throw new Error(
          `HF service error 401: Unauthorized. Verifica SERVICE_TOKEN en tu Space y HF_API_KEY en .env. Endpoint: ${endpoint}`
        );
      }
      
      throw new Error(`HF service error ${res.status}: ${bodyText}. Endpoint: ${endpoint}`);
    }

    const imageBlob = await res.blob();
    console.log("✅ Received blob size:", imageBlob.size);
    
    const imageUrl = await uploadImageToStorage(imageBlob);
    console.log("✅ Uploaded to:", imageUrl);

    return { 
      url: imageUrl, 
      model_version: process.env.MODEL_VERSION || "runwayml/stable-diffusion-v1-5"
    };
  } finally {
    clearTimeout(timeout);
  }
}

// Helper para convertir colors object a string - CORREGIDO
function getColorsString(colors: any): string {
  if (!colors) return "full color";
  
  // Mapeo corregido para valores del formulario
  if (typeof colors === "string") {
    switch (colors) {
      case "black-and-white":
        return "black and white";
      case "single-color":
        return "single color monochrome";
      case "full-color":
      default:
        return "full color";
    }
  }
  
  // Si es objeto con mode
  switch (colors.mode) {
    case "bw":
    case "black-and-white":
      return "black and white";
    case "single":
    case "single-color":
      return `single color ${colors.hex || "monochrome"}`;
    case "full":
    case "full-color":
    default:
      return "full color";
  }
}

export async function generateWithModel(input: GeneratePayload): Promise<GenerateResult> {
  // Convertir colors string a objeto si es necesario
  let colorsObj = input.colors;
  if (typeof input.colors === 'string') {
    switch (input.colors) {
      case "black-and-white":
        colorsObj = { mode: "bw" as ColorMode, hex: null };
        break;
      case "single-color":
        colorsObj = { mode: "single" as ColorMode, hex: null };
        break;
      case "full-color":
      default:
        colorsObj = { mode: "full" as ColorMode, hex: null };
        break;
    }
  }

  // 🔥 USAR PROMPT DIRECTO EN LUGAR DE buildPromptSafe
  const userPrompt = input.prompt;

  return callTattooService(userPrompt, { 
    public: input.public,
    style: input.style,
    colors: input.colors
  });
}