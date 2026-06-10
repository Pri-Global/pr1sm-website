import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [employee, setEmployee] = useState(null)
  const [profileError, setProfileError] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchEmployee = useCallback(async (userId, userEmail) => {
    const { data, error } = await supabase
      .from('employees')
      .select('*')
      .eq('id', userId)
      .single()

    if (error?.code === 'PGRST116' && userEmail) {
      const { data: created, error: insertError } = await supabase
        .from('employees')
        .insert({ id: userId, email: userEmail, first_login: true })
        .select()
        .single()

      if (!insertError && created) {
        setEmployee(created)
        setProfileError(null)
        setLoading(false)
        return
      }
    }

    if (error) {
      console.warn('Failed to fetch employee profile:', error.message)
      setEmployee(null)
      if (error.message?.includes('Could not find the table')) {
        setProfileError('Database not set up yet. Run the SQL script in Supabase (employees table missing).')
      } else {
        setProfileError(error.message)
      }
    } else {
      setEmployee(data)
      setProfileError(null)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    let mounted = true

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return
      setUser(session?.user ?? null)
      if (session?.user) fetchEmployee(session.user.id, session.user.email)
      else setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return
      setUser(session?.user ?? null)
      if (session?.user) {
        setLoading(true)
        fetchEmployee(session.user.id, session.user.email)
      } else {
        setEmployee(null)
        setProfileError(null)
        setLoading(false)
      }
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [fetchEmployee])

  const signIn = useCallback(async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
  }, [])

  const signOut = useCallback(async () => {
    await supabase.auth.signOut()
    setEmployee(null)
  }, [])

  const updatePassword = useCallback(async (newPassword) => {
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    if (error) throw error

    const { data: { user: currentUser } } = await supabase.auth.getUser()
    if (currentUser) {
      await supabase.from('employees').update({ first_login: false }).eq('id', currentUser.id)
      setEmployee((prev) => (prev ? { ...prev, first_login: false } : prev))
    }
  }, [])

  const updateProfile = useCallback(async (updates) => {
    const { data: { user: currentUser } } = await supabase.auth.getUser()
    if (!currentUser) throw new Error('Not authenticated')

    const { error } = await supabase
      .from('employees')
      .update(updates)
      .eq('id', currentUser.id)

    if (error) throw error
    setEmployee((prev) => (prev ? { ...prev, ...updates } : prev))
  }, [])

  const value = useMemo(
    () => ({
      user,
      employee,
      loading,
      profileError,
      signIn,
      signOut,
      updatePassword,
      updateProfile,
    }),
    [user, employee, loading, profileError, signIn, signOut, updatePassword, updateProfile],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
