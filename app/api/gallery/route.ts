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

export async function DELETE(request: NextRequest) {
  try {
    const supabase = createSupabaseServerClient()
    
    // Verificar autenticación
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    // Obtener ID del tatuaje a eliminar
    const { searchParams } = new URL(request.url)
    const tattooId = searchParams.get('id')
    
    if (!tattooId) {
      return NextResponse.json({ error: 'Tattoo ID is required' }, { status: 400 })
    }
    
    // Verificar que el tatuaje pertenece al usuario
    const { data: tattoo, error: fetchError } = await supabase
      .from('tattoos')
      .select('user_id, url')
      .eq('id', tattooId)
      .single()
    
    if (fetchError || !tattoo) {
      return NextResponse.json({ error: 'Tattoo not found' }, { status: 404 })
    }
    
    if (tattoo.user_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    
    // Eliminar la imagen del storage de Supabase si existe
    if (tattoo.url) {
      const imagePath = tattoo.url.split('/').pop()
      if (imagePath) {
        await supabase.storage
          .from('tattoos')
          .remove([imagePath])
      }
    }
    
    // Eliminar el registro de la base de datos
    const { error: deleteError } = await supabase
      .from('tattoos')
      .delete()
      .eq('id', tattooId)
      .eq('user_id', user.id)
    
    if (deleteError) {
      console.error('Error deleting tattoo:', deleteError)
      return NextResponse.json({ error: 'Error deleting tattoo' }, { status: 500 })
    }
    
    return NextResponse.json({ success: true, message: 'Tattoo deleted successfully' })
  } catch (error) {
    console.error('Delete tattoo API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}