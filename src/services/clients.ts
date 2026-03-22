import api from '@/lib/axios'
import { Client } from '@/types'

export const clientsService = {
  list: async (): Promise<Client[]> => {
    const { data } = await api.get('/api/v1/clients')
    return data
  },

  getById: async (id: string): Promise<Client> => {
    const { data } = await api.get(`/api/v1/clients/${id}`)
    return data
  },

  create: async (payload: {
    keycloakUserId: string
    name: string
    phone: string
    whatsApp: string
  }): Promise<Client> => {
    const { data } = await api.post('/api/v1/clients', payload)
    return data
  },
}
