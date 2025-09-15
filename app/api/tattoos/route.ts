import { type NextRequest, NextResponse } from "next/server"

// Mock data for the gallery
const tattoos = Array.from({ length: 50 }, (_, i) => ({
  id: `tattoo-${i + 1}`,
  imageUrl: `https://picsum.photos/seed/tattoo${i + 1}/500/500`,
  description: `A stunning ${i % 2 === 0 ? "lion" : "dragon"} tattoo with intricate details, showcasing a powerful and majestic design. Perfect for a bold statement.`,
  author: `Artist${(i % 5) + 1}`,
  createdAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
  style: ["photorealistic", "watercolor", "tribal", "new-school", "japanese", "minimalist"][i % 6],
}))

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const page = Number.parseInt(searchParams.get("page") || "1", 10)
  const limit = Number.parseInt(searchParams.get("limit") || "8", 10)
  const style = searchParams.get("style")
  const query = searchParams.get("q")

  let filteredTattoos = tattoos

  if (style) {
    filteredTattoos = filteredTattoos.filter((t) => t.style === style)
  }

  if (query) {
    const lowercasedQuery = query.toLowerCase()
    filteredTattoos = filteredTattoos.filter(
      (t) => t.description.toLowerCase().includes(lowercasedQuery) || t.author.toLowerCase().includes(lowercasedQuery),
    )
  }

  const startIndex = (page - 1) * limit
  const endIndex = page * limit
  const paginatedTattoos = filteredTattoos.slice(startIndex, endIndex)

  return NextResponse.json({
    tattoos: paginatedTattoos,
    hasNextPage: endIndex < filteredTattoos.length,
  })
}
