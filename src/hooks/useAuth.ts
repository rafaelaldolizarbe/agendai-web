import keycloak from '@/lib/keycloak'

export function useAuth() {
  const roles = keycloak.realmAccess?.roles ?? []

  return {
    user: {
      name: keycloak.tokenParsed?.name as string,
      email: keycloak.tokenParsed?.email as string,
      username: keycloak.tokenParsed?.preferred_username as string,
    },
    isOwner: roles.includes('owner'),
    isHairdresser: roles.includes('hairdresser'),
    isClient: roles.includes('client'),
    logout: () => keycloak.logout(),
    token: keycloak.token,
  }
}
