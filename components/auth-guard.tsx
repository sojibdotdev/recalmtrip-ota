"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface AuthGuardProps {
  children: React.ReactNode
  requireAuth?: boolean
  requireAdmin?: boolean
}

export default function AuthGuard({ children, requireAuth = false, requireAdmin = false }: AuthGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      // Check user session
      const userSession = document.cookie.includes("session=")
      const userData = localStorage.getItem("user")

      // Check admin session
      const adminSession = document.cookie.includes("admin_session=")

      setIsAuthenticated(userSession && userData !== null)
      setIsAdmin(adminSession)
      setLoading(false)

      // Redirect logic
      if (requireAuth && !userSession) {
        router.push("/login")
        return
      }

      if (requireAdmin && !adminSession) {
        router.push("/admin")
        return
      }
    }

    checkAuth()
  }, [requireAuth, requireAdmin, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 bai-jamjuree-regular">Loading...</p>
        </div>
      </div>
    )
  }

  if (requireAuth && !isAuthenticated) {
    return null
  }

  if (requireAdmin && !isAdmin) {
    return null
  }

  return <>{children}</>
}
