import { describe, it, expect } from 'vitest'
import { GET } from '../../app/api/tattoos/route'

// helper to create Next-like request
function makeRequest(url: string) {
  return new Request(url)
}

describe('GET /api/tattoos', () => {
  it('paginates results', async () => {
    const req = makeRequest('http://localhost/api/tattoos?page=2&limit=5')
    const res = await GET(req as any)
    const data = await res.json()

    expect(data.tattoos).toHaveLength(5)
    expect(data.tattoos[0].id).toBe('tattoo-6')
    expect(data.hasNextPage).toBe(true)
  })

  it('filters by style', async () => {
    const req = makeRequest('http://localhost/api/tattoos?style=tribal&limit=10')
    const res = await GET(req as any)
    const data = await res.json()

    expect(data.tattoos.every((t: any) => t.style === 'tribal')).toBe(true)
    expect(data.tattoos.length).toBe(8)
    expect(data.hasNextPage).toBe(false)
  })

  it('filters by query', async () => {
    const req = makeRequest('http://localhost/api/tattoos?q=lion&limit=25')
    const res = await GET(req as any)
    const data = await res.json()

    expect(data.tattoos.length).toBe(25)
    expect(
      data.tattoos.every(
        (t: any) => t.description.toLowerCase().includes('lion') || t.author.toLowerCase().includes('lion'),
      ),
    ).toBe(true)
    expect(data.hasNextPage).toBe(false)
  })
})
