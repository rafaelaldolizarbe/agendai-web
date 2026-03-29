'use client'

import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface RouteGuardProps {
  children: React.ReactNode
  roles: ('owner' | 'hairdresser' | 'client')[]
}

export function RouteGuard({ children, roles }: RouteGuardProps) {
  const { isOwner, isHairdresser, isClient } = useAuth()
  const router = useRouter()

  const userRoles = {
    owner: isOwner,
    hairdresser: isHairdresser,
    client: isClient,
  }

  const hasAccess = roles.some((role) => userRoles[role])

  useEffect(() => {
    if (!hasAccess) {
      router.replace('/dashboard')
    }
  }, [hasAccess, router])

  if (!hasAccess) return null

  return <>{children}</>
}
