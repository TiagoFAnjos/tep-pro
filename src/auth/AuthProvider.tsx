import { useEffect, useMemo, useState } from 'react'
import type { Session } from '@supabase/supabase-js'
import { AuthContext, type AuthContextValue } from './AuthContext'
import { supabase } from '../lib/supabase'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [adminLoading, setAdminLoading] = useState(false)

  async function refreshAdminStatus(currentSession: Session | null) {
    if (!currentSession) {
      setIsAdmin(false)
      return
    }

    setAdminLoading(true)
    const { data, error } = await supabase.rpc('is_admin')

    if (error) {
      console.log(error)
      setIsAdmin(false)
    } else {
      setIsAdmin(Boolean(data))
    }

    setAdminLoading(false)
  }

  useEffect(() => {
    let active = true

    supabase.auth.getSession().then(({ data }) => {
      if (!active) return
      setSession(data.session)
      setLoading(false)
      void refreshAdminStatus(data.session)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
      setLoading(false)
      void refreshAdminStatus(nextSession)
    })

    return () => {
      active = false
      listener.subscription.unsubscribe()
    }
  }, [])

  async function signIn(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    return error ? { error: error.message } : {}
  }

  async function signUp(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) return { error: error.message }

    return {
      needsConfirmation: !data.session,
    }
  }

  async function signOut() {
    await supabase.auth.signOut()
    setSession(null)
    setIsAdmin(false)
  }

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      user: session?.user ?? null,
      isAdmin,
      loading,
      adminLoading,
      signIn,
      signUp,
      signOut,
    }),
    [adminLoading, isAdmin, loading, session]
  )

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
