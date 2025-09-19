import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()
    
    // Obtener tatuajes públicos para la galería desde landing page
    const { data: publicTattoos, error } = await supabase
      .from('tattoos')
      .select(`
        id,
        prompt,
        style,
        url,
        created_at,
        user_id
      `)
      .eq('is_public', true)
      .order('created_at', { ascending: false })
      .limit(60)

    if (error) {
      console.error('Error fetching public tattoos:', error)
      return NextResponse.json({ error: 'Error fetching public tattoos' }, { status: 500 })
    }

    return NextResponse.json({ items: publicTattoos || [] })
  } catch (error) {
    console.error('Public gallery API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}