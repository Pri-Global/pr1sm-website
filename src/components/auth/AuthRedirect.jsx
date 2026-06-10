import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'

export default function AuthRedirect() {
  const { user, employee, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        navigate('/portal/employee/setup', { replace: true })
      }
    })
    return () => subscription.unsubscribe()
  }, [navigate])

  useEffect(() => {
    if (loading) return

    const path = location.pathname

    if (user && employee?.first_login && path !== '/portal/employee/setup') {
      navigate('/portal/employee/setup', { replace: true })
      return
    }

    if (user && employee && !employee.first_login && path === '/portal/employee/setup') {
      navigate('/portal/employee/dashboard', { replace: true })
      return
    }

    if (user && employee && path === '/portal/employee') {
      navigate(
        employee.first_login ? '/portal/employee/setup' : '/portal/employee/dashboard',
        { replace: true },
      )
    }
  }, [user, employee, loading, location.pathname, navigate])

  return null
}
