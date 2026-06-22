'use server'
import { getSupabaseServer as createClient } from '@/lib/supabase' 

export async function updateCartItem(productId: number, change: number) {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Neautorizovaný prístup")

  let { data: cart, error: cartError } = await supabase
    .from('carts')
    .select('id')
    .eq('user_id', user.id)
    .single()

  if (!cart) {
    const { data: newCart, error: insertError } = await supabase
      .from('carts')
      .insert({ user_id: user.id })
      .select()
      .single()
    cart = newCart

    if (insertError) throw insertError
    cart = newCart
  }

  if (!cart) {
    throw new Error("Nepodarilo sa získať ani vytvoriť košík")
  }

  // 3. Kontrola, či produkt už v košíku je
  const { data: existingItem } = await supabase
    .from('cart_items')
    .select('id, quantity')
    .eq('cart_id', cart.id)
    .eq('product_id', productId)
    .single()

  if (existingItem) {
    const newQuantity = existingItem.quantity + change
    
    if (newQuantity <= 0) {
      await supabase.from('cart_items').delete().eq('id', existingItem.id)
    } else {
      await supabase.from('cart_items').update({ quantity: newQuantity }).eq('id', existingItem.id)
    }
  } else if (change > 0) {
    await supabase.from('cart_items').insert({ 
      cart_id: cart.id, 
      product_id: productId, 
      quantity: change 
    })
  }
}