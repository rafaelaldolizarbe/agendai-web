'use client'

import keycloak from '@/lib/keycloak'
import { useEffect, useState } from 'react'

interface KeycloakProviderProps {
  children: React.ReactNode
}

export function KeycloakProvider({ children }: KeycloakProviderProps) {
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    keycloak
      .init({
        onLoad: 'login-required',
        checkLoginIframe: false,
      })
      .then((authenticated) => {
        if (authenticated) {
          localStorage.setItem('kc_token', keycloak.token!)

          setInterval(() => {
            keycloak.updateToken(60).then((refreshed) => {
              if (refreshed) {
                localStorage.setItem('kc_token', keycloak.token!)
              }
            })
          }, 30000)
        }
        setInitialized(true)
      })
  }, [])

  if (!initialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Carregando...</p>
      </div>
    )
  }

  return <>{children}</>
}
