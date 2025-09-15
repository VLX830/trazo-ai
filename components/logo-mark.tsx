import { cn } from "@/lib/utils"

type LogoMarkProps = {
  className?: string
  title?: string
}

export function LogoMark({ className, title = "Trazo AI" }: LogoMarkProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
      role="img"
      aria-label={title}
      className={cn("inline-block", className)}
    >
      <defs>
        <style>{`.ink { fill: currentColor; } .stroke { stroke: currentColor; stroke-width: 4; stroke-linecap: round; stroke-linejoin: round; fill: none; }`}</style>
      </defs>

      {/* DOTWORK HALO */}
      <g transform="translate(64 64)">
        <g id="dot"><circle className="ink" cx="0" cy="-52" r="2.5" /></g>
        <use href="#dot" transform="rotate(22.5)" />
        <use href="#dot" transform="rotate(45)" />
        <use href="#dot" transform="rotate(67.5)" />
        <use href="#dot" transform="rotate(90)" />
        <use href="#dot" transform="rotate(112.5)" />
        <use href="#dot" transform="rotate(135)" />
        <use href="#dot" transform="rotate(157.5)" />
        <use href="#dot" transform="rotate(180)" />
        <use href="#dot" transform="rotate(202.5)" />
        <use href="#dot" transform="rotate(225)" />
        <use href="#dot" transform="rotate(247.5)" />
        <use href="#dot" transform="rotate(270)" />
        <use href="#dot" transform="rotate(292.5)" />
        <use href="#dot" transform="rotate(315)" />
        <use href="#dot" transform="rotate(337.5)" />
      </g>

      {/* MANDALA GEOMÉTRICO */}
      <g className="stroke" transform="translate(64 64)">
        <polygon points="0,-36 34,-10 21,32 -21,32 -34,-10" />
        <polygon points="0,-26 24,-6 15,22 -15,22 -24,-6" />
      </g>

      {/* AGUJA / PLUMÍN */}
      <g transform="translate(64 64)">
        <rect className="ink" x="-6" y="-8" width="12" height="30" rx="6" />
        <rect className="ink" x="-8" y="20" width="16" height="6" rx="3" />
        <path className="ink" d="M -12 26 L 0 48 L 12 26 Z" />
        <circle cx="0" cy="36" r="2.2" fill="#ffffff" />
      </g>

      {/* RAMAS DE CIRCUITO (IA) */}
      <g className="stroke" transform="translate(64 64)">
        <path d="M -6 -2 H -28" /><circle className="ink" cx="-32" cy="-2" r="3" />
        <path d="M -6 6 H -36" /><circle className="ink" cx="-40" cy="6" r="3" />
        <path d="M -6 14 H -24" /><circle className="ink" cx="-28" cy="14" r="3" />
        <path d="M 6 -2 H 28" /><circle className="ink" cx="32" cy="-2" r="3" />
        <path d="M 6 6 H 36" /><circle className="ink" cx="40" cy="6" r="3" />
        <path d="M 6 14 H 24" /><circle className="ink" cx="28" cy="14" r="3" />
      </g>
    </svg>
  )
}
