'use server'

import { getSupabaseServer as createClient } from '@/lib/supabase'

export async function mergeCartOnLogin(newUserId: string) {
  const supabase = createClient()

  const { data: { user: oldUser } } = await supabase.auth.getUser()
  
  if (!oldUser) return; 

  const { data: oldCart } = await supabase
    .from('carts')
    .select('id')
    .eq('user_id', oldUser.id)
    .single()

  if (oldCart) {
    await supabase
      .from('carts')
      .update({ user_id: newUserId })
      .eq('id', oldCart.id)
  }
}