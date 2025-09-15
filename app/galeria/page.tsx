import GalleryClient from "./client";
import { headers } from "next/headers";

export default async function GalleryPage() {
  const h = headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? (host?.includes("localhost") ? "http" : "https");
  const base = host ? `${proto}://${host}` : process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  
  try {
    const res = await fetch(`${base}/api/gallery/public`, { cache: "no-store" });
    const data = await res.json();
    return <GalleryClient initialItems={data.items ?? []} />;
  } catch (error) {
    console.error("Error fetching gallery data:", error);
    return <GalleryClient initialItems={[]} />;
  }
}
