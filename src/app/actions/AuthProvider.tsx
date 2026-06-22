'use client'
import { useEffect } from 'react'
import { createClient } from '@/lib/supabaseClient'

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const supabase = createClient()

    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        supabase.auth.signInAnonymously()
      }
    })
  }, [])

  return <>{children}</>
}