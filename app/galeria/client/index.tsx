"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import FocusTrap from "focus-trap-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { TATTOO_STYLES, getStyleLabel } from "@/lib/style-options";

interface Tattoo {
  id: string;
  imageUrl: string;
  description: string;
  author: string;
  createdAt: string;
  style: string;
}

export default function GalleryClient({ initialItems }: { initialItems: any[] }) {
  const [tattoos, setTattoos] = useState<Tattoo[]>([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({ style: "all", q: "" });
  const [selectedTattoo, setSelectedTattoo] = useState<Tattoo | null>(null);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const modalCloseButtonRef = useRef<HTMLButtonElement | null>(null);

  // cache con todas las públicas (ya filtradas por style/q)
  const allFilteredRef = useRef<Tattoo[]>([]);

  const mapItems = (items: any[]): Tattoo[] =>
    (items ?? []).map((it: any) => ({
      id: it.id,
      imageUrl: it.url,
      description: it.prompt,
      author: it.user_id ? "Usuario" : "Anónimo",
      createdAt: it.created_at,
      style: it.style,
    }));

  const applyClientFilters = (items: any[], style: string, q: string): Tattoo[] => {
    const mapped = mapItems(items);
    let result = mapped;
    if (style !== "all") {
      result = result.filter((x) => x.style === style);
    }
    if (q) {
      const ql = q.toLowerCase();
      result = result.filter(
        (x) =>
          x.description?.toLowerCase().includes(ql) ||
          x.author?.toLowerCase().includes(ql)
      );
    }
    return result;
  };

  const pageSlice = (arr: Tattoo[], pageNum: number, size = 8) => {
    const start = (pageNum - 1) * size;
    return arr.slice(start, start + size);
  };

  const fetchTattoos = useCallback(
    async (reset = false) => {
      if (isLoading) return;
      setIsLoading(true);

      try {
        // 1) siempre traemos públicas del backend (máx. 60)
        //    para mantener la galería actualizada.
        let filtered: Tattoo[];
        if (reset) {
          const res = await fetch("/api/gallery/public", { cache: "no-store" });
          const data = await res.json();
          filtered = applyClientFilters(data.items ?? [], filters.style, filters.q);
          allFilteredRef.current = filtered;
        } else {
          filtered = allFilteredRef.current;
        }

        // 2) paginar en cliente
        const currentPage = reset ? 1 : page;
        const items = pageSlice(filtered, currentPage, 8);
        setTattoos((prev) => (reset ? items : [...prev, ...items]));

        const nextStart = currentPage * 8;
        const more = nextStart < filtered.length;
        setHasNextPage(more);
        if (more) setPage(currentPage + 1);
      } catch (e) {
        console.error("Failed to fetch tattoos:", e);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, page, filters.style, filters.q]
  );

  // inicializar con SSR items
  useEffect(() => {
    const filtered = applyClientFilters(initialItems, filters.style, filters.q);
    allFilteredRef.current = filtered;
    const first = pageSlice(filtered, 1, 8);
    setTattoos(first);
    setPage(2);
    setHasNextPage(first.length < filtered.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // reset y recarga al cambiar filtros
  useEffect(() => {
    setTattoos([]);
    setPage(1);
    setHasNextPage(true);
    fetchTattoos(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.style, filters.q]);

  // infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isLoading) {
          fetchTattoos();
        }
      },
      { threshold: 1.0 }
    );

    const el = loaderRef.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, [hasNextPage, isLoading, fetchTattoos]);

  // foco inicial en botón cerrar del modal
  useEffect(() => {
    if (selectedTattoo) modalCloseButtonRef.current?.focus();
  }, [selectedTattoo]);

  const handleFilterChange = (key: "style" | "q", value: string) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

  return (
    <div className="container mx-auto py-8 px-4 md:py-16">
      {/* Page Header */}
      <div className="mb-12 flex flex-col items-center justify-center space-y-4 text-center">
        <Badge className="rounded-full px-4 py-1.5 text-sm font-medium" variant="secondary">
          Galería
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight">Explora creaciones de la comunidad</h1>
        <p className="max-w-[800px] text-muted-foreground md:text-lg">
          Descubre y filtra diseños únicos generados por IA.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row">
        <Input
          type="text"
          placeholder="Buscar por descripción o autor..."
          className="flex-grow"
          value={filters.q}
          onChange={(e) => handleFilterChange("q", e.target.value)}
          aria-label="Buscar diseños"
        />
        <Select value={filters.style} onValueChange={(v) => handleFilterChange("style", v)}>
          <SelectTrigger className="w-full md:w-[200px]" aria-label="Filtrar por estilo">
            <SelectValue placeholder="Filtrar por estilo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los estilos</SelectItem>
            {TATTOO_STYLES.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {tattoos.map((tattoo) => (
          <button
            key={tattoo.id}
            type="button"
            className="group relative animate-in overflow-hidden rounded-xl border border-border/40 bg-card text-left shadow-sm transition-all duration-300 hover:shadow-md"
            onClick={() => setSelectedTattoo(tattoo)}
            aria-label={`Ver detalles del tatuaje: ${tattoo.description}`}
          >
            <div className="relative">
              <Image
                src={tattoo.imageUrl || "/placeholder.svg"}
                alt={tattoo.description}
                width={500}
                height={500}
                className="aspect-square h-auto w-full object-cover"
                loading="lazy"
              />
              {/* Gradient overlay + style badge */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-3">
                <span className="inline-flex items-center rounded-full bg-white/85 dark:bg-black/60 px-3 py-1 text-xs font-medium text-foreground dark:text-white backdrop-blur ring-1 ring-black/10 dark:ring-white/10 transition group-hover:bg-white dark:group-hover:bg-black/70">
                  {getStyleLabel(tattoo.style)}
                </span>
              </div>
            </div>
          </button>
        ))}

        {isLoading &&
          Array.from({ length: 8 }).map((_, index) => (
            <div key={`skeleton-${index}`} className="overflow-hidden rounded-lg bg-card shadow-md">
              <Skeleton className="aspect-square h-auto w-full" />
              <div className="p-4">
                <Skeleton className="mb-2 h-4 w-3/4" />
                <div className="mt-2 flex items-center justify-between text-xs">
                  <Skeleton className="h-3 w-1/3" />
                  <Skeleton className="h-3 w-1/4" />
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Loader */}
      <div ref={loaderRef} className="flex items-center justify-center py-8">
        {!hasNextPage && tattoos.length > 0 && (
          <p className="text-muted-foreground">Has llegado al final.</p>
        )}
      </div>

      {/* Modal */}
      {selectedTattoo && (
        <FocusTrap focusTrapOptions={{ returnFocusOnDeactivate: true }}>
          <div className="animate-in fixed inset-0 z-50 flex items-center justify-center p-4">
            <button
              type="button"
              className="absolute inset-0 bg-black/80"
              aria-label="Cerrar modal"
              onClick={() => setSelectedTattoo(null)}
              tabIndex={-1}
            />
            <div
              className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl bg-card md:flex-row"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              aria-describedby="modal-description"
            >
              <div className="w-full md:w-1/2">
                <Image
                  src={selectedTattoo.imageUrl || "/placeholder.svg"}
                  alt={selectedTattoo.description}
                  width={800}
                  height={800}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="flex w-full flex-col p-6 md:w-1/2">
                <div className="mb-4 flex items-start justify-between">
                  <Badge id="modal-title" variant="secondary">
                    {selectedTattoo.style}
                  </Badge>
                  <button
                    ref={modalCloseButtonRef}
                    onClick={() => setSelectedTattoo(null)}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                    aria-label="Cerrar modal"
                  >
                    <X className="size-6" />
                  </button>
                </div>
                <p id="modal-description" className="mb-4 flex-grow overflow-y-auto text-foreground">
                  {selectedTattoo.description}
                </p>
                <div className="mt-auto flex items-center justify-between border-t pt-4">
                  <span className="text-sm font-medium">{selectedTattoo.author}</span>
                  <span className="text-sm text-muted-foreground">
                    {formatDate(selectedTattoo.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </FocusTrap>
      )}
    </div>
  );
}
