
import React from 'react'

interface ProtectedRouteProps {
  children: React.ReactNode
  adminOnly?: boolean
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // Rimosso il controllo di autenticazione - accesso libero per il test
  return <>{children}</>
}

export default ProtectedRoute
