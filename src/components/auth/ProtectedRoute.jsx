import { Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

function AuthSpinner() {
  return (
    <div className="min-h-screen bg-[#080e1e] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#4169E1] border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) return <AuthSpinner />
  if (!user) return <Navigate to="/portal/employee" replace />
  return children
}

export function SetupRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) return <AuthSpinner />
  if (!user) return <Navigate to="/portal/employee" replace />
  return children
}
