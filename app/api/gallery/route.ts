import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = createSupabaseServerClient()
    
    // Verificar autenticación para galería privada
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    // Obtener tatuajes del usuario logueado para dashboard
    const { data: userTattoos, error } = await supabase
      .from('tattoos')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(50)

    if (error) {
      console.error('Error fetching user tattoos:', error)
      return NextResponse.json({ error: 'Error fetching user tattoos' }, { status: 500 })
    }

    return NextResponse.json({ tattoos: userTattoos || [] })
  } catch (error) {
    console.error('Private gallery API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}